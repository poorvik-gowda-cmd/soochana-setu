import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { citizen_data, department_records, policies } = await request.json();
    const apiKey = process.env.MISTRAL_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Mistral API Key not configured" }, { status: 500 });
    }

    const prompt = `Analyze the following citizen data and government policy rules. 
Return eligibility percentage for each scheme and explain reasoning.

Citizen:
${JSON.stringify(citizen_data, null, 2)}

Records:
${JSON.stringify(department_records, null, 2)}

Policies:
${JSON.stringify(policies, null, 2)}

Return JSON:
{
  "eligibility": [
    {
      "department": "",
      "scheme": "",
      "percentage": number,
      "reason": ""
    }
  ],
  "overall_confidence": number,
  "summary": ""
}`;

    const response = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "mistral-small-latest",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || "Mistral API error");
    }

    const data = await response.json();
    const result = JSON.parse(data.choices[0].message.content);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("AI Evaluation error:", error);
    return NextResponse.json({ error: error.message || "Failed to analyze with AI" }, { status: 500 });
  }
}
