import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { Mistral } from "@mistralai/mistralai";

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey });

export async function POST(req: Request) {
  try {
    const { citizen_id } = await req.json();

    if (!citizen_id) {
       return NextResponse.json({ error: "Citizen ID is required" }, { status: 400 });
    }

    // 1. Fetch Citizen Profile & Records from Database
    const { data: citizen, error: cError } = await supabase.from("citizens").select("*").eq("id", citizen_id).single();
    const { data: records, error: rError } = await supabase.from("department_records").select("*").eq("citizen_id", citizen_id);
    const { data: policies, error: pError } = await supabase.from("policies").select("*");

    if (cError || rError || pError) throw new Error("Database error fetching profile records");

    // 2. Synthesize Context for AI
    const profileContext = `
      Citizen: ${citizen.name}
      Departmental Records: ${JSON.stringify(records)}
      Current Active Policies: ${JSON.stringify(policies)}
    `;

    const prompt = `
      You are a Government Policy Intelligence Engine. 
      Analyze the citizen's records against the provided policies.
      
      ${profileContext}

      Return a JSON response with:
      1. eligible_policies: Array of { policy_name, department, status, reason, eligibility_percentage }
      2. summary: A 2-sentence empathetic summary of their eligibility.

      Only return the JSON.
    `;

    const chatResponse = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [{ role: "user", content: prompt }],
      responseFormat: { type: "json_object" }
    });

    const result = JSON.parse(chatResponse.choices![0].message.content as string);
    return NextResponse.json(result);

  } catch (error: any) {
    console.error("AI Eligibility Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
