import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const image = formData.get("image") as File;

  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/google/vit-base-patch16-224",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        },
        body: image,
      }
    );

    console.log("Response from Hugging Face API:", response); // Debugging line

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Hugging Face API request failed with status ${response.status}: ${errorText}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    // Filter results for pest-like labels (custom logic)
    const pestPrediction = result.find((r: { label: string; score: number }) =>
      ["insect", "bug", "pest"].some((keyword) => r.label.toLowerCase().includes(keyword))
    ) || result[0]; // Fallback to top prediction

    return NextResponse.json([pestPrediction]);
  } catch (error) {
    return NextResponse.json({ error: `An error occurred: ${error}` }, { status: 500 });
  }
}