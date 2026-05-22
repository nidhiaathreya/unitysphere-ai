import type { ChallengeCategory } from "@/types";

export interface UnityAIResponse {
  message: string;
  suggestions?: string[];
  actionPlan?: string[];
  organizations?: string[];
}

const DEMO_RESPONSES: Record<string, UnityAIResponse> = {
  default: {
    message:
      "I'm Unity AI, your global collaboration copilot. I can help with partnerships, crisis response, impact analysis, and project roadmaps. What challenge are you working on?",
    suggestions: [
      "Find collaboration partners",
      "Analyze climate impact in East Africa",
      "Generate emergency action plan",
      "Show SDG progress tracker",
    ],
  },
  match: {
    message:
      "Based on semantic analysis, **GreenFuture Alliance** and **AquaLife Global** share **94% mission compatibility**. Their solar + water purification synergy could impact 250,000 lives in drought-affected regions.",
    suggestions: ["Initiate partnership", "View full compatibility report"],
    organizations: ["GreenFuture Alliance", "AquaLife Global"],
  },
  crisis: {
    message:
      "**Crisis detected:** Severe flooding in Sylhet, Bangladesh. I've alerted 47 nearby organizations and generated an emergency action plan.",
    actionPlan: [
      "Deploy SafeHaven Foundation emergency shelters",
      "Activate HealthBridge Tech telehealth triage",
      "Route AquaLife water purification units",
      "Match 234 available volunteers to relief zones",
      "Coordinate supply chain via blockchain-verified donations",
    ],
    organizations: ["SafeHaven Foundation", "HealthBridge Tech", "AquaLife Global"],
  },
  roadmap: {
    message:
      "Here's your AI-generated 90-day project roadmap for climate resilience:",
    actionPlan: [
      "Week 1-2: Partner discovery & resource audit",
      "Week 3-4: Pilot deployment in 3 communities",
      "Week 5-8: Scale with matched NGO/startup partners",
      "Week 9-12: Impact measurement & SDG reporting",
    ],
  },
};

export async function queryUnityAI(
  prompt: string,
  context?: { category?: ChallengeCategory; organizationName?: string }
): Promise<UnityAIResponse> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.GEMINI_API_KEY;
  const lower = prompt.toLowerCase();

  if (lower.includes("match") || lower.includes("partner") || lower.includes("collaborat"))
    return DEMO_RESPONSES.match;
  if (lower.includes("crisis") || lower.includes("flood") || lower.includes("emergency"))
    return DEMO_RESPONSES.crisis;
  if (lower.includes("roadmap") || lower.includes("plan") || lower.includes("project"))
    return DEMO_RESPONSES.roadmap;

  if (apiKey && process.env.OPENAI_API_KEY) {
    try {
      const OpenAI = (await import("openai")).default;
      const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are Unity AI, the AI assistant for UnitySphere AI — a global collaboration platform solving humanity's challenges. Be concise, actionable, and inspiring. Context: ${JSON.stringify(context || {})}`,
          },
          { role: "user", content: prompt },
        ],
        max_tokens: 500,
      });
      const text = completion.choices[0]?.message?.content || DEMO_RESPONSES.default.message;
      return { message: text, suggestions: DEMO_RESPONSES.default.suggestions };
    } catch {
      // fall through to demo
    }
  }

  return {
    message: `Analyzing your query about "${prompt.slice(0, 80)}..." — ${context?.organizationName ? `For ${context.organizationName}, ` : ""}I recommend exploring partnerships in the ${context?.category || "global"} hub. Enable OPENAI_API_KEY for live AI responses.`,
    suggestions: DEMO_RESPONSES.default.suggestions,
  };
}
