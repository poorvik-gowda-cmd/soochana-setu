import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const citizen_id = searchParams.get("citizen_id");

    if (!citizen_id) {
      return NextResponse.json({ error: "Citizen ID is required" }, { status: 400 });
    }

    // 1. Fetch Citizen from Database
    const { data: citizen, error: cError } = await supabase
      .from("citizens")
      .select("*")
      .eq("id", citizen_id)
      .maybeSingle();

    if (cError) throw cError;
    if (!citizen) return NextResponse.json({ error: "Citizen not found" }, { status: 404 });

    // 2. Fetch Records from Database
    const { data: records, error: rError } = await supabase
      .from("department_records")
      .select("*")
      .eq("citizen_id", citizen_id);

    if (rError) throw rError;

    // 3. Fetch Policies from Database
    const { data: policies, error: pError } = await supabase
      .from("policies")
      .select("*");

    if (pError) throw pError;

    return NextResponse.json({ citizen, records: records || [], policies: policies || [] });
  } catch (error: any) {
    console.error("Citizen data API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
