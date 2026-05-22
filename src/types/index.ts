export type UserRole =
  | "ngo"
  | "startup"
  | "volunteer"
  | "university"
  | "government"
  | "company"
  | "admin";

export type ChallengeCategory =
  | "climate-change"
  | "women-safety"
  | "mental-health"
  | "healthcare"
  | "hunger"
  | "education"
  | "energy"
  | "cybersecurity"
  | "disaster-management"
  | "water-scarcity";

export interface Organization {
  id: string;
  userId: string;
  name: string;
  role: UserRole;
  logo?: string;
  mission: string;
  categories: ChallengeCategory[];
  location: { country: string; city: string; lat: number; lng: number };
  projects: Project[];
  resourcesNeeded: string[];
  resourcesAvailable: string[];
  sdgGoals: number[];
  impactMetrics: ImpactMetrics;
  verified: boolean;
  collaborationStatus: "open" | "busy" | "emergency";
  embedding?: number[];
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  category: ChallengeCategory;
  status: "active" | "completed" | "planning";
  fundingRequired?: number;
  impactScore?: number;
}

export interface ImpactMetrics {
  livesImpacted: number;
  carbonReduced: number;
  volunteersActive: number;
  projectsCompleted: number;
  sustainabilityScore: number;
}

export interface CollaborationMatch {
  organizationId: string;
  organizationName: string;
  score: number;
  reasons: string[];
  predictedSuccess: number;
}

export interface CrisisAlert {
  id: string;
  type: "flood" | "earthquake" | "wildfire" | "hurricane" | "drought" | "conflict" | "health";
  severity: "low" | "medium" | "high" | "critical";
  region: string;
  country: string;
  lat: number;
  lng: number;
  description: string;
  detectedAt: string;
  organizationsNotified: number;
  actionPlan?: string;
}

export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  userName: string;
  content: string;
  timestamp: string;
  type: "text" | "system" | "ai-summary";
}

export interface LeaderboardEntry {
  rank: number;
  organizationId: string;
  name: string;
  impactScore: number;
  collaborationScore: number;
  badges: string[];
}

export interface GlobalStats {
  activeOrganizations: number;
  volunteersConnected: number;
  countriesInvolved: number;
  globalProjectsActive: number;
  livesImpacted: number;
}

export interface AIInsight {
  id: string;
  title: string;
  summary: string;
  category: ChallengeCategory | "global";
  confidence: number;
  timestamp: string;
}

export interface ActivityFeedItem {
  id: string;
  type: "collaboration" | "crisis" | "project" | "donation" | "volunteer";
  message: string;
  organization?: string;
  region?: string;
  timestamp: string;
}
