import { NextRequest, NextResponse } from "next/server";
import { findTopMatches, generateEmbedding, cosineSimilarity } from "@/lib/ai/matching";
import { MOCK_ORGANIZATIONS } from "@/lib/mock-data";
import type { Organization } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { organizationId, mission, categories } = body as {
      organizationId?: string;
      mission?: string;
      categories?: string[];
    };

    let source = MOCK_ORGANIZATIONS.find((o) => o.id === organizationId);
    if (!source && mission) {
      source = {
        ...MOCK_ORGANIZATIONS[0],
        id: "custom",
        mission,
        categories: (categories || []) as Organization["categories"],
      };
    }
    if (!source) {
      source = MOCK_ORGANIZATIONS[0];
    }

    const matches = findTopMatches(source, MOCK_ORGANIZATIONS);

    if (mission) {
      const srcEmb = generateEmbedding(mission);
      const enhanced = matches.map((m) => {
        const org = MOCK_ORGANIZATIONS.find((o) => o.id === m.organizationId);
        if (!org) return m;
        const embSim = cosineSimilarity(srcEmb, generateEmbedding(org.mission));
        return {
          ...m,
          score: Math.min(99, Math.round(m.score * 0.6 + embSim * 100 * 0.4)),
        };
      });
      enhanced.sort((a, b) => b.score - a.score);
      return NextResponse.json({ matches: enhanced, source: source.name });
    }

    return NextResponse.json({ matches, source: source.name });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Match error" },
      { status: 500 }
    );
  }
}
