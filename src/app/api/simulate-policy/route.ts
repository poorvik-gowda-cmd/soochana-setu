import { NextResponse } from "next/server";
import { supabase } from "../../../lib/supabase";
import { Mistral } from "@mistralai/mistralai";

const apiKey = process.env.MISTRAL_API_KEY;
const client = new Mistral({ apiKey });

export async function POST(req: Request) {
  try {
    const { policy } = await req.json();

    if (!policy) {
      return NextResponse.json({ error: "Missing policy definition" }, { status: 400 });
    }

    // 1. Fetch All Citizens & Their Departmental Records
    const { data: citizens, error: cError } = await supabase.from("citizens").select("*");
    const { data: records, error: rError } = await supabase.from("department_records").select("*");

    if (cError || rError) throw new Error("Database fetch failure during simulation");

    // 2. Aggregate Data per Citizen (Reality Synthesis)
    const dataset = citizens.map(citizen => {
      const citizenRecords = records.filter(r => r.citizen_id === citizen.id);
      
      // Calculate latest/average reality
      const incomes = citizenRecords.map(r => r.income);
      const avgIncome = incomes.length > 0 ? (incomes.reduce((a, b) => a + b, 0) / incomes.length) : 0;
      
      // Most frequent category
      const categories = citizenRecords.map(r => r.category);
      const category = categories.sort((a, b) => 
        categories.filter(v => v === a).length - categories.filter(v => v === b).length
      ).pop() || "General";

      // Existing same-department benefits (Conflict Check)
      const hasDuplicateBenefit = citizenRecords.some(r => r.department === policy.department);

      return {
        id: citizen.id,
        name: citizen.name,
        reality: {
          income: Math.round(avgIncome),
          category: category,
          is_already_covered: hasDuplicateBenefit
        }
      };
    });

    // 3. AI Evaluation with Mistral
    const prompt = `
      Evaluate the following 100% real citizens against a proposed NEW government policy.
      
      PROPOSED POLICY:
      - Department: ${policy.department}
      - Scheme: ${policy.scheme}
      - Type: ${policy.type}
      - Min Income: ${policy.min_income}
      - Max Income: ${policy.max_income}
      - Required Category: ${policy.required_category}
      - Additional Rule: ${policy.additional_rule}

      CITIZEN DATASET:
      ${JSON.stringify(dataset)}

      For EACH citizen, analyze if they qualify under these specific rules.
      Pay special attention to "is_already_covered" - if true, mark as "partial" or "eligible" but include a conflict warning.

      Return a JSON array of objects:
      [
        {
          "citizen_id": "...",
          "name": "...",
          "income": number,
          "category": "...",
          "eligibility_percentage": number (0-100),
          "status": "Eligible" | "Partial" | "Not Eligible",
          "reason": "...",
          "has_conflict": boolean
        }
      ]
      
      Wrap the response in a "results" key and include a "summary" object with:
      - total_eligible: number
      - avg_eligibility: number
      - high_conflict_cases: number
    `;

    const chatResponse = await client.chat.complete({
      model: "mistral-small-latest",
      messages: [{ role: "user", content: prompt }],
      responseFormat: { type: "json_object" }
    });

    const result = JSON.parse(chatResponse.choices![0].message.content as string);
    return NextResponse.json(result);

  } catch (error: any) {
    console.error("Simulation API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
