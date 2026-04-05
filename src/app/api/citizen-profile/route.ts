import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const identifier = searchParams.get("identifier");

    if (!identifier) {
      return NextResponse.json({ error: "Identifier is required" }, { status: 400 });
    }

    // 1. Fetch Citizen (by Name, Aadhaar, or Phone)
    const { data: citizen, error: cError } = await supabase
      .from("citizens")
      .select("*")
      .or(`name.ilike.%${identifier}%,aadhaar.eq.${identifier},phone.eq.${identifier}`)
      .maybeSingle();

    if (cError) throw cError;
    if (!citizen) return NextResponse.json({ error: "Citizen not found in official registry" }, { status: 404 });

    // 2. Fetch Departmental Records
    const { data: records, error: rError } = await supabase
      .from("department_records")
      .select("*")
      .eq("citizen_id", citizen.id);

    if (rError) throw rError;

    // 3. Fetch All Policies for the Engine
    const { data: policies, error: pError } = await supabase
      .from("policies")
      .select("*");

    if (pError) throw pError;

    // 4. Calculate Basic Truth Score (Minimal vs Maximal divergence)
    const incomeValues = (records || []).map(r => r.income);
    let truthScore = 100;
    if (incomeValues.length > 1) {
        const min = Math.min(...incomeValues);
        const max = Math.max(...incomeValues);
        truthScore = Math.round((min / max) * 100);
    }

    return NextResponse.json({
      citizen,
      records: records || [],
      policies: policies || [],
      conflicts: [], // Conflicts will be calculated on the frontend based on the real records
      truth_score: truthScore
    });

  } catch (error: any) {
    console.error("Profile API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
