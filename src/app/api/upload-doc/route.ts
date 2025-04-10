import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    // Either use the file variable or remove it

    const response = await fetch(
      "https://rag-backend-ej9k.onrender.com/upload-doc",
      {
        method: "POST",
        body: formData, // You're using formData directly, not the file variable
      }
    );

    console.log("Response from server:", response); // Log the response for debugging

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to upload file. Error: ${response.status}` },
        { status: response.status }
      );
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: `An error occurred: ${error}` },
      { status: 500 }
    );
  }
}
