import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body. Please provide valid JSON." },
      { status: 400 }
    );
  }

  const { ph, nitrogen, phosphorus, potassium } = body;

  if (!ph || !nitrogen || !phosphorus || !potassium) {
    return NextResponse.json(
      { error: "Missing required fields: ph, nitrogen, phosphorus, potassium" },
      { status: 400 }
    );
  }

  try {
    const soilData = {
      pH: parseFloat(ph),
      nitrogen: parseFloat(nitrogen),
      phosphorus: parseFloat(phosphorus),
      potassium: parseFloat(potassium),
    };

    if (
      isNaN(soilData.pH) ||
      isNaN(soilData.nitrogen) ||
      isNaN(soilData.phosphorus) ||
      isNaN(soilData.potassium)
    ) {
      return NextResponse.json(
        { error: "Invalid input: All values must be numeric" },
        { status: 400 }
      );
    }

    const prompt = `
      Analyze the following soil test results and provide:
      1. A soil health score from 1-10
      2. A brief recommendation for soil treatment
      3. Specific insights about each nutrient level

      Soil test data:
      pH: ${soilData.pH}
      Nitrogen: ${soilData.nitrogen} ppm
      Phosphorus: ${soilData.phosphorus} ppm
      Potassium: ${soilData.potassium} ppm
    `;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GOOGLE_API_KEY || "",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const geminiResult = await response.json();
    const analysisText =
      geminiResult?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!analysisText) {
      return NextResponse.json({
        healthScore: calculateFallbackScore(soilData),
        recommendation: getFallbackRecommendation(soilData),
        soilData,
        note: "Used fallback calculation due to empty Gemini API response",
        rawModelResponse: geminiResult,
      });
    }

    const scoreMatch = analysisText.match(/score:?\s*(\d+(\.\d+)?)/i);
    const healthScore =
      scoreMatch && scoreMatch[1]
        ? parseFloat(scoreMatch[1])
        : calculateFallbackScore(soilData);

    const recommendationMatch = analysisText.match(
      /recommendation:?\s*([^]*?)(?=\n\n\*?\s*[A-Za-z0-9]+:|$)/i
    );
    const recommendation =
      recommendationMatch && recommendationMatch[1]
        ? recommendationMatch[1].trim()
        : getFallbackRecommendation(soilData);

    return NextResponse.json({
      healthScore,
      recommendation,
      soilData,
      analysisDetails: analysisText,
      rawModelResponse: geminiResult,
    });
  } catch (error) {
    console.error("Error processing soil data:", error);

    const soilData = {
      pH: parseFloat(ph || "7.0"),
      nitrogen: parseFloat(nitrogen || "50"),
      phosphorus: parseFloat(phosphorus || "30"),
      potassium: parseFloat(potassium || "40"),
    };

    return NextResponse.json(
      {
        error: `Failed to process soil data with Gemini API: ${
          error instanceof Error ? error.message : String(error)
        }`,
        healthScore: calculateFallbackScore(soilData),
        recommendation: getFallbackRecommendation(soilData),
        soilData,
      },
      { status: 500 }
    );
  }
}

function calculateFallbackScore(soilData: {
  pH: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}) {
  return (
    (soilData.pH * 10 +
      soilData.nitrogen * 0.5 +
      soilData.phosphorus * 0.3 +
      soilData.potassium * 0.2) /
    10
  );
}

function getFallbackRecommendation(soilData: {
  pH: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}) {
  const healthScore = calculateFallbackScore(soilData);
  if (healthScore < 5)
    return "Soil is poor. Add organic compost and nitrogen-rich fertilizers.";
  if (healthScore < 7)
    return "Soil is average. Consider balanced NPK fertilizers.";
  return "Soil is healthy. Maintain current practices.";
}
