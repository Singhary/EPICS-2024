import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { question, session_id, model } = await req.json();

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };
  const data = { question, model, ...(session_id && { session_id }) };

  try {
    const response = await fetch("https://rag-backend-ej9k.onrender.com/chat", {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `API request failed with status code ${response.status}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: `An error occurred: ${error}` }, { status: 500 });
  }
}