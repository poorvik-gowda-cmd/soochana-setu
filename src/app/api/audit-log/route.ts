import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { citizen_id, action, data } = await req.json();

    if (!citizen_id || !action || !data) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Generate SHA256 Hash
    const hashData = `${citizen_id}${action}${JSON.stringify(data)}`;
    const hash = crypto.createHash('sha256').update(hashData).digest('hex');

    // 2. Store in Supabase
    const { data: log, error } = await supabase
      .from("audit_logs")
      .insert({
        citizen_id,
        action,
        data,
        hash,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(log);
  } catch (error: any) {
    console.error("Audit log error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const citizenId = searchParams.get("citizen_id");

    let query = supabase.from("audit_logs").select("*").order("created_at", { ascending: false });

    if (citizenId) {
      query = query.eq("citizen_id", citizenId);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
