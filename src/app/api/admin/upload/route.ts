import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { parseCSV } from "@/lib/csv";

export async function POST(req: Request) {
  try {
    const { type, csvData } = await req.json();

    if (!type || !csvData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const rows = parseCSV(csvData);
    if (rows.length === 0) {
      return NextResponse.json({ error: "No data found in CSV" }, { status: 400 });
    }

    let stats = { added: 0, updated: 0, skipped: 0 };

    if (type === "citizens") {
      const { data, error } = await supabase.from("citizens").upsert(rows, { onConflict: 'aadhaar' }).select();
      if (error) throw error;
      stats.added = data?.length || 0;

    } else if (type === "records") {
      // Relational Ingestion: Link records to citizens automatically
      for (const row of rows) {
        // 1. Resolve Citizen ID (By Aadhaar or Name)
        let { data: citizen, error: cError } = await supabase
          .from("citizens")
          .select("id")
          .eq("aadhaar", row.aadhaar || "")
          .single();

        if (!citizen && row.citizen_name) {
          // Attempt name lookup if aadhaar fails (less unique but supported)
          const { data: nameCitizen } = await supabase
            .from("citizens")
            .select("id")
            .eq("name", row.citizen_name)
            .single();
          citizen = nameCitizen;
        }

        if (!citizen) {
          // Create new citizen if not found
          const { data: newCitizen, error: nError } = await supabase
            .from("citizens")
            .insert({
              name: row.citizen_name || "Unknown",
              aadhaar: row.aadhaar || `GEN-${Math.random().toString(36).substr(2, 9)}`,
              phone: row.phone || ""
            })
            .select("id")
            .single();
          if (nError) {
            console.error("Citizen creation failed for row:", row, nError);
            stats.skipped++;
            continue;
          }
          citizen = newCitizen;
        }

        // 2. Insert Department Record linked to Resolved ID
        const { error: rError } = await supabase.from("department_records").insert({
          citizen_id: citizen.id,
          department: row.department,
          income: parseFloat(row.income) || 0,
          category: row.category,
          scheme: row.scheme
        });

        if (rError) {
          console.error("Record insertion failed:", rError);
          stats.skipped++;
        } else {
          stats.added++;
        }
      }

    } else if (type === "policies") {
      const { data, error } = await supabase.from("policies").upsert(rows, { onConflict: 'scheme' }).select();
      if (error) throw error;
      stats.added = data?.length || 0;

    } else {
      return NextResponse.json({ error: "Invalid upload type" }, { status: 400 });
    }

    return NextResponse.json({
      message: `Sync Complete. Processed ${rows.length} rows.`,
      summary: stats
    });

  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
