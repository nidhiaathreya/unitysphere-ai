import { NextRequest, NextResponse } from "next/server";
import { queryUnityAI } from "@/lib/ai/unity-ai";
import type { ChallengeCategory } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt, category, organizationName } = body as {
      prompt: string;
      category?: ChallengeCategory;
      organizationName?: string;
    };
    if (!prompt?.trim()) {
      return NextResponse.json({ error: "Prompt required" }, { status: 400 });
    }
    const response = await queryUnityAI(prompt, { category, organizationName });
    return NextResponse.json(response);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "AI error" },
      { status: 500 }
    );
  }
}
