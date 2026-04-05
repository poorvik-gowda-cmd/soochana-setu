import { NextResponse } from "next/server";
import { supabase } from "../../../../lib/supabase";
import { Mistral } from "@mistralai/mistralai";

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey });

export async function POST(req: Request) {
  try {
    const { rawText } = await req.json();

    if (!rawText) {
      return NextResponse.json({ error: "Missing source data" }, { status: 400 });
    }

    // 1. Mistral Extraction Prompt (Structured Entity Recognition)
    const prompt = `
      Extract government entities from the following semi-structured text.
      The text contains citizens, their departmental records, and potential policy rules.
      
      TEXT:
      ${rawText}

      Return a JSON object with:
      1. citizens: Array of { name: string, aadhaar: string (generate if missing), phone: string (generate if missing) }
      2. department_records: Array of { citizen_name: string, department: string, income: number, category: string, scheme: string }
      3. policies: Array of { department: string, scheme: string, type: string, eligibility_rules: string }

      Rules:
      - Deduplicate citizens by name.
      - Map category to: "BPL" | "Poor" | "Middle" | "Rich" based on income or text.
      - Ensure 'income' is a pure number.
    `;

    const chatResponse = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [{ role: "user", content: prompt }],
      responseFormat: { type: "json_object" }
    });

    const entities = JSON.parse(chatResponse.choices![0].message.content as string);

    // 2. Database Sync Loop
    const results = { citizens: 0, records: 0, policies: 0 };

    for (const c of entities.citizens) {
      // Create or Get Citizen ID
      let { data: citizen, error: cError } = await supabase
        .from("citizens")
        .select("id")
        .eq("name", c.name)
        .single();

      if (!citizen) {
        const { data: newCitizen, error: nError } = await supabase
          .from("citizens")
          .insert({ name: c.name, aadhaar: c.aadhaar, phone: c.phone })
          .select()
          .single();
        if (nError) throw nError;
        citizen = newCitizen;
      }
      results.citizens++;

      // Map Records to this Citizen ID
      const citizenRecords = entities.department_records.filter((r: any) => r.citizen_name === c.name);
      for (const r of citizenRecords) {
        const { error: rError } = await supabase.from("department_records").insert({
          citizen_id: citizen.id,
          department: r.department,
          income: r.income,
          category: r.category,
          scheme: r.scheme
        });
        if (rError) throw rError;
        results.records++;
      }
    }

    // 3. Sync Policies
    if (entities.policies && entities.policies.length > 0) {
      const { error: pError } = await supabase.from("policies").insert(entities.policies);
      if (pError) throw pError;
      results.policies = entities.policies.length;
    }

    return NextResponse.json({ 
      message: `Successfully synchronized ${results.citizens} citizens, ${results.records} departmental realities, and ${results.policies} policies.`,
      summary: results 
    });

  } catch (error: any) {
    console.error("AI Ingest error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
