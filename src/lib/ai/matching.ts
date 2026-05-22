import type { Organization, CollaborationMatch } from "@/types";

/** Simple semantic similarity via token overlap + category/SDG weighting */
function tokenize(text: string): Set<string> {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 2)
  );
}

function jaccardSimilarity(a: Set<string>, b: Set<string>): number {
  const intersection = new Set([...a].filter((x) => b.has(x)));
  const union = new Set([...a, ...b]);
  return union.size === 0 ? 0 : intersection.size / union.size;
}

function categoryOverlap(orgA: Organization, orgB: Organization): number {
  const shared = orgA.categories.filter((c) => orgB.categories.includes(c));
  const total = new Set([...orgA.categories, ...orgB.categories]).size;
  return total === 0 ? 0 : shared.length / total;
}

function sdgOverlap(orgA: Organization, orgB: Organization): number {
  const shared = orgA.sdgGoals.filter((g) => orgB.sdgGoals.includes(g));
  const total = new Set([...orgA.sdgGoals, ...orgB.sdgGoals]).size;
  return total === 0 ? 0 : shared.length / total;
}

function resourceComplementarity(orgA: Organization, orgB: Organization): number {
  const aNeeds = orgA.resourcesNeeded.map((r) => r.toLowerCase());
  const bAvail = orgB.resourcesAvailable.map((r) => r.toLowerCase());
  const bNeeds = orgB.resourcesNeeded.map((r) => r.toLowerCase());
  const aAvail = orgA.resourcesAvailable.map((r) => r.toLowerCase());

  let matches = 0;
  let total = 0;
  for (const need of aNeeds) {
    total++;
    if (bAvail.some((a) => need.includes(a.split(" ")[0]) || a.includes(need.split(" ")[0])))
      matches++;
  }
  for (const need of bNeeds) {
    total++;
    if (aAvail.some((a) => need.includes(a.split(" ")[0]) || a.includes(need.split(" ")[0])))
      matches++;
  }
  return total === 0 ? 0 : matches / total;
}

export function computeCollaborationScore(
  orgA: Organization,
  orgB: Organization
): { score: number; reasons: string[]; predictedSuccess: number } {
  const missionA = tokenize(orgA.mission);
  const missionB = tokenize(orgB.mission);
  const missionSim = jaccardSimilarity(missionA, missionB);
  const catSim = categoryOverlap(orgA, orgB);
  const sdgSim = sdgOverlap(orgA, orgB);
  const resourceSim = resourceComplementarity(orgA, orgB);

  const score = Math.round(
    (missionSim * 0.35 + catSim * 0.3 + sdgSim * 0.2 + resourceSim * 0.15) * 100
  );

  const reasons: string[] = [];
  if (catSim > 0.3)
    reasons.push(
      `Shared focus areas: ${orgA.categories.filter((c) => orgB.categories.includes(c)).join(", ")}`
    );
  if (sdgSim > 0.2)
    reasons.push(`Aligned SDG goals (${Math.round(sdgSim * 100)}% overlap)`);
  if (resourceSim > 0.2)
    reasons.push("Complementary resources — needs match availability");
  if (missionSim > 0.15)
    reasons.push("Similar mission language and objectives");
  if (reasons.length === 0) reasons.push("Potential cross-sector collaboration");

  const predictedSuccess = Math.min(
    99,
    Math.round(score * 0.85 + orgA.impactMetrics.sustainabilityScore * 0.05 + orgB.impactMetrics.sustainabilityScore * 0.05)
  );

  return { score: Math.min(99, Math.max(score, 45)), reasons, predictedSuccess };
}

export function findTopMatches(
  source: Organization,
  candidates: Organization[],
  limit = 5
): CollaborationMatch[] {
  return candidates
    .filter((c) => c.id !== source.id)
    .map((candidate) => {
      const { score, reasons, predictedSuccess } = computeCollaborationScore(
        source,
        candidate
      );
      return {
        organizationId: candidate.id,
        organizationName: candidate.name,
        score,
        reasons,
        predictedSuccess,
      };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

/** Pseudo-embedding for API route (bag-of-words vector) */
export function generateEmbedding(text: string, dims = 64): number[] {
  const vec = new Array(dims).fill(0);
  const tokens = text.toLowerCase().split(/\s+/);
  for (const token of tokens) {
    let hash = 0;
    for (let i = 0; i < token.length; i++) {
      hash = (hash << 5) - hash + token.charCodeAt(i);
      hash |= 0;
    }
    const idx = Math.abs(hash) % dims;
    vec[idx] += 1;
  }
  const norm = Math.sqrt(vec.reduce((s, v) => s + v * v, 0)) || 1;
  return vec.map((v) => v / norm);
}

export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let na = 0;
  let nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}
