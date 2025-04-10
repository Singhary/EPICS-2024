import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { previousCrop } = await req.json();

  // Simple mock logic for crop rotation
  const rotationMap: { [key: string]: string[] } = {
    wheat: ["legumes", "corn"],
    corn: ["soybeans", "wheat"],
    soybeans: ["corn", "wheat"],
  };

  const suggestions = rotationMap[previousCrop.toLowerCase()] || ["legumes", "corn"];
  return NextResponse.json({ suggestions });
}