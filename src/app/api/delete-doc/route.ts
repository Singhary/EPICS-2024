import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { file_id } = await req.json();

  const headers = {
    accept: "application/json",
    "Content-Type": "application/json",
  };

  try {
    const response = await fetch("https://rag-backend-ej9k.onrender.com/delete-doc", {
      method: "POST",
      headers,
      body: JSON.stringify({ file_id }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to delete document. Error: ${response.status}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: `An error occurred: ${error}` }, { status: 500 });
  }
}