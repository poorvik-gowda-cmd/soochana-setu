import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { type, csvData } = await req.json();

    if (!type || !csvData) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // CSV Parsing: Simple split by newline and comma
    const lines = csvData.split("\n").filter((l: string) => l.trim() !== "");
    const headers = lines[0].split(",").map((h: string) => h.trim());
    const rows = lines.slice(1).map((line: string) => {
      const values = line.split(",").map((v: string) => v.trim());
      return headers.reduce((obj: any, header: string, i: number) => {
        obj[header] = values[i];
        return obj;
      }, {});
    });

    let result;
    if (type === "citizens") {
      result = await supabase.from("citizens").insert(rows).select();
    } else if (type === "records") {
      result = await supabase.from("department_records").insert(rows).select();
    } else if (type === "policies") {
      result = await supabase.from("policies").insert(rows).select();
    } else {
      return NextResponse.json({ error: "Invalid upload type" }, { status: 400 });
    }

    if (result.error) throw result.error;

    return NextResponse.json({ message: `Successfully uploaded ${rows.length} records.`, data: result.data });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
