import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://rag-backend-ej9k.onrender.com/list-docs");
    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch document list. Error: ${response.status}` },
        { status: response.status }
      );
    }
    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: `An error occurred: ${error}` }, { status: 500 });
  }
}