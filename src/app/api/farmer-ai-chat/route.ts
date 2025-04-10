import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question, language } = await req.json();

  if (!question || !language) {
    return NextResponse.json(
      { error: "Missing required fields: question and language" },
      { status: 400 }
    );
  }

  if (!["hi_IN", "en_XX"].includes(language)) {
    return NextResponse.json(
      { error: "Invalid language. Choose 'hi_IN' for Hindi or 'en_XX' for English." },
      { status: 400 }
    );
  }

  try {
    const geminiResponse = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GOOGLE_API_KEY || "",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: question }] }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 1024 },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      throw new Error(`Gemini API error: ${geminiResponse.status} - ${errorText}`);
    }

    const geminiResult = await geminiResponse.json();
    const geminiAnswer = geminiResult?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!geminiAnswer) {
      throw new Error("No valid response from Gemini API");
    }

    let finalAnswer = geminiAnswer;

    if (language === "hi_IN") {
      const translationResponse = await fetch(
        "https://api-inference.huggingface.co/models/facebook/mbart-large-50-many-to-many-mmt",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            inputs: geminiAnswer,
            parameters: { src_lang: "en_XX", tgt_lang: "hi_IN" },
          }),
        }
      );

      if (!translationResponse.ok) {
        const errorText = await translationResponse.text();
        throw new Error(`Hugging Face API error: ${translationResponse.status} - ${errorText}`);
      }

      const translationResult = await translationResponse.json();
      finalAnswer = translationResult[0]?.translation_text || geminiAnswer; // Fallback to English if translation fails
    }

    return NextResponse.json({ answer: finalAnswer });
  } catch (error) {
    console.error("Error in farmer-ai-chat:", error);
    return NextResponse.json(
      { error: `An error occurred: ${error instanceof Error ? error.message : String(error)}` },
      { status: 500 }
    );
  }
}