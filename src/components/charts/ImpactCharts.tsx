"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const IMPACT_DATA = [
  { month: "Jan", lives: 120000, carbon: 800, projects: 45 },
  { month: "Feb", lives: 180000, carbon: 1200, projects: 52 },
  { month: "Mar", lives: 250000, carbon: 1800, projects: 61 },
  { month: "Apr", lives: 320000, carbon: 2400, projects: 68 },
  { month: "May", lives: 410000, carbon: 3100, projects: 78 },
  { month: "Jun", lives: 520000, carbon: 4000, projects: 89 },
];

const SDG_DATA = [
  { name: "Climate", value: 28, color: "#10b981" },
  { name: "Health", value: 22, color: "#ef4444" },
  { name: "Education", value: 18, color: "#3b82f6" },
  { name: "Water", value: 15, color: "#06b6d4" },
  { name: "Gender", value: 17, color: "#ec4899" },
];

const VOLUNTEER_DATA = [
  { week: "W1", active: 1200 },
  { week: "W2", active: 1450 },
  { week: "W3", active: 1680 },
  { week: "W4", active: 2100 },
  { week: "W5", active: 2450 },
];

const tooltipStyle = {
  backgroundColor: "rgba(15, 23, 42, 0.9)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px",
  color: "#e2e8f0",
};

export function ImpactAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={IMPACT_DATA}>
        <defs>
          <linearGradient id="livesGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
        <YAxis stroke="#64748b" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Area
          type="monotone"
          dataKey="lives"
          stroke="#22d3ee"
          fill="url(#livesGrad)"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function CarbonBarChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={IMPACT_DATA}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
        <YAxis stroke="#64748b" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="carbon" fill="#10b981" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function SDGPieChart() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <PieChart>
        <Pie
          data={SDG_DATA}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={4}
          dataKey="value"
        >
          {SDG_DATA.map((entry) => (
            <Cell key={entry.name} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip contentStyle={tooltipStyle} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function VolunteerLineChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={VOLUNTEER_DATA}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
        <XAxis dataKey="week" stroke="#64748b" fontSize={12} />
        <YAxis stroke="#64748b" fontSize={12} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line
          type="monotone"
          dataKey="active"
          stroke="#a855f7"
          strokeWidth={2}
          dot={{ fill: "#a855f7" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
