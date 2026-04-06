import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { username, citizenId, password } = await request.json();

    if (!username || !citizenId || !password) {
      return NextResponse.json({ error: "Username, Citizen ID, and Password are required" }, { status: 400 });
    }

    // Elite triple-factor logic: Match name/phone + ID + Password
    const { data: citizen, error } = await supabase
      .from("citizens")
      .select("*")
      .or(`name.ilike.${username},phone.eq.${username}`)
      .eq("id", citizenId)
      .eq("password", password)
      .maybeSingle();

    if (error) throw error;
    if (!citizen) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    return NextResponse.json(citizen);
  } catch (error: any) {
    console.error("Login API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
