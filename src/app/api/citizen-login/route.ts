import { NextRequest, NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
    }

    // Citizen login logic: Match name/phone and ID as password
    const { data: citizen, error } = await supabase
      .from("citizens")
      .select("*")
      .or(`name.ilike.${username},phone.eq.${username}`)
      .eq("id", password)
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
