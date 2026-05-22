import { NextResponse } from "next/server";
import { MOCK_GLOBAL_STATS } from "@/lib/constants";

export async function GET() {
  const base = { ...MOCK_GLOBAL_STATS };
  const jitter = () => Math.floor(Math.random() * 20) - 10;
  return NextResponse.json({
    activeOrganizations: base.activeOrganizations + jitter(),
    volunteersConnected: base.volunteersConnected + jitter() * 50,
    countriesInvolved: base.countriesInvolved,
    globalProjectsActive: base.globalProjectsActive + jitter(),
    livesImpacted: base.livesImpacted + jitter() * 100,
    updatedAt: new Date().toISOString(),
  });
}
