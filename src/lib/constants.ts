import type { ChallengeCategory } from "@/types";

export const APP_NAME = "UnitySphere AI";
export const APP_TAGLINE =
  "Connecting the World to Solve Humanity's Greatest Challenges.";

export const CHALLENGE_CATEGORIES: {
  id: ChallengeCategory;
  name: string;
  icon: string;
  color: string;
  description: string;
}[] = [
  {
    id: "climate-change",
    name: "Climate Change",
    icon: "🌍",
    color: "#10b981",
    description: "Carbon reduction, renewable energy, climate resilience",
  },
  {
    id: "women-safety",
    name: "Women Safety",
    icon: "🛡️",
    color: "#ec4899",
    description: "Safe zones, protection networks, advocacy",
  },
  {
    id: "mental-health",
    name: "Mental Health",
    icon: "🧠",
    color: "#a855f7",
    description: "Counseling, awareness, community support",
  },
  {
    id: "healthcare",
    name: "Healthcare",
    icon: "🏥",
    color: "#ef4444",
    description: "Medical access, telehealth, emergency care",
  },
  {
    id: "hunger",
    name: "Hunger",
    icon: "🍽️",
    color: "#f59e0b",
    description: "Food security, distribution, nutrition",
  },
  {
    id: "education",
    name: "Education",
    icon: "📚",
    color: "#3b82f6",
    description: "Learning access, digital literacy, scholarships",
  },
  {
    id: "energy",
    name: "Energy",
    icon: "⚡",
    color: "#eab308",
    description: "Clean power, grid access, efficiency",
  },
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    icon: "🔐",
    color: "#6366f1",
    description: "Digital safety, infrastructure protection",
  },
  {
    id: "disaster-management",
    name: "Disaster Management",
    icon: "🚨",
    color: "#f97316",
    description: "Response, recovery, preparedness",
  },
  {
    id: "water-scarcity",
    name: "Water Scarcity",
    icon: "💧",
    color: "#06b6d4",
    description: "Clean water, sanitation, conservation",
  },
];

export const SDG_GOALS = [
  { id: 1, name: "No Poverty" },
  { id: 2, name: "Zero Hunger" },
  { id: 3, name: "Good Health" },
  { id: 4, name: "Quality Education" },
  { id: 5, name: "Gender Equality" },
  { id: 6, name: "Clean Water" },
  { id: 7, name: "Clean Energy" },
  { id: 8, name: "Decent Work" },
  { id: 9, name: "Innovation" },
  { id: 10, name: "Reduced Inequalities" },
  { id: 11, name: "Sustainable Cities" },
  { id: 12, name: "Responsible Consumption" },
  { id: 13, name: "Climate Action" },
  { id: 14, name: "Life Below Water" },
  { id: 15, name: "Life on Land" },
  { id: 16, name: "Peace & Justice" },
  { id: 17, name: "Partnerships" },
];

export const ROLE_LABELS: Record<string, string> = {
  ngo: "NGO",
  startup: "Startup",
  volunteer: "Volunteer",
  university: "University",
  government: "Government",
  company: "Company",
  admin: "Administrator",
};

export const MOCK_GLOBAL_STATS = {
  activeOrganizations: 12847,
  volunteersConnected: 89234,
  countriesInvolved: 156,
  globalProjectsActive: 4521,
  livesImpacted: 2847291,
};
