import { NextResponse } from "next/server";
import { MOCK_AI_INSIGHTS } from "@/lib/mock-data";

export async function GET() {
  const insights = MOCK_AI_INSIGHTS.map((i) => ({
    ...i,
    confidence: i.confidence + (Math.random() * 0.04 - 0.02),
  }));
  return NextResponse.json({ insights });
}
