"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Leaf,
  Heart,
  Users,
  Target,
  Award,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import {
  ImpactAreaChart,
  CarbonBarChart,
  SDGPieChart,
  VolunteerLineChart,
} from "@/components/charts/ImpactCharts";
import { MOCK_ORGANIZATIONS } from "@/lib/mock-data";
import { formatNumber } from "@/lib/utils";

export default function DashboardPage() {
  const org = MOCK_ORGANIZATIONS[0];
  const metrics = org.impactMetrics;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title">
          Impact <span className="neon-text">Analytics</span>
        </h1>
        <p className="mt-4 text-slate-400">
          Premium dashboard tracking sustainability, carbon reduction, and real-world impact.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Heart, label: "Lives Impacted", value: metrics.livesImpacted, color: "text-pink-400" },
          { icon: Leaf, label: "Carbon Reduced (tons)", value: metrics.carbonReduced, color: "text-green-400" },
          { icon: Users, label: "Active Volunteers", value: metrics.volunteersActive, color: "text-purple-400" },
          { icon: Target, label: "Sustainability Score", value: metrics.sustainabilityScore, color: "text-cyan-400", suffix: "%" },
        ].map(({ icon: Icon, label, value, color, suffix }) => (
          <GlassCard key={label}>
            <Icon className={`h-8 w-8 ${color}`} />
            <p className="mt-4 font-display text-3xl font-bold text-white">
              {formatNumber(value)}{suffix || ""}
            </p>
            <p className="text-sm text-slate-500">{label}</p>
          </GlassCard>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <GlassCard>
          <h3 className="mb-4 flex items-center gap-2 font-semibold text-white">
            <BarChart3 className="h-5 w-5 text-cyan-400" />
            Lives Impacted Over Time
          </h3>
          <ImpactAreaChart />
        </GlassCard>
        <GlassCard>
          <h3 className="mb-4 font-semibold text-white">Carbon Reduction</h3>
          <CarbonBarChart />
        </GlassCard>
        <GlassCard>
          <h3 className="mb-4 font-semibold text-white">SDG Focus Distribution</h3>
          <SDGPieChart />
        </GlassCard>
        <GlassCard>
          <h3 className="mb-4 font-semibold text-white">Volunteer Activity</h3>
          <VolunteerLineChart />
        </GlassCard>
      </div>

      <GlassCard className="mt-8">
        <h3 className="flex items-center gap-2 font-semibold text-white">
          <Award className="h-5 w-5 text-yellow-400" />
          AI Sustainability Scoring
        </h3>
        <div className="mt-6">
          <div className="flex justify-between text-sm">
            <span>Overall Score</span>
            <span className="neon-text font-bold">{metrics.sustainabilityScore}%</span>
          </div>
          <div className="mt-2 h-4 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-purple-500"
              initial={{ width: 0 }}
              animate={{ width: `${metrics.sustainabilityScore}%` }}
              transition={{ duration: 1.5 }}
            />
          </div>
          <p className="mt-4 text-sm text-slate-400">
            AI analysis: Strong performance in climate and community impact. Recommend scaling partnerships in water security.
          </p>
        </div>
      </GlassCard>
    </div>
  );
}
