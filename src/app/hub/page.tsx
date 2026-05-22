"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Users, DollarSign } from "lucide-react";
import { CHALLENGE_CATEGORIES } from "@/lib/constants";
import { MOCK_ORGANIZATIONS } from "@/lib/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { Suspense } from "react";

function HubContent() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const categories = activeCategory
    ? CHALLENGE_CATEGORIES.filter((c) => c.id === activeCategory)
    : CHALLENGE_CATEGORIES;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title">
          Global <span className="neon-text">Challenge Hub</span>
        </h1>
        <p className="mt-4 max-w-2xl text-slate-400">
          Explore live statistics, active projects, and top organizations across every global challenge category.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8">
        {categories.map((cat, idx) => {
          const orgs = MOCK_ORGANIZATIONS.filter((o) =>
            o.categories.includes(cat.id)
          );
          const stats = {
            projects: Math.floor(Math.random() * 200) + 50,
            funding: Math.floor(Math.random() * 5) + 1,
            zones: Math.floor(Math.random() * 15) + 3,
          };

          return (
            <GlassCard key={cat.id} delay={idx * 0.05} className="overflow-hidden">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4">
                    <span className="text-4xl">{cat.icon}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{cat.name}</h2>
                      <p className="text-slate-400">{cat.description}</p>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-3 gap-4">
                    <div className="rounded-xl bg-white/5 p-4 text-center">
                      <TrendingUp className="mx-auto h-5 w-5 text-cyan-400" />
                      <p className="mt-2 text-2xl font-bold text-white">{stats.projects}</p>
                      <p className="text-xs text-slate-500">Active Projects</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 text-center">
                      <DollarSign className="mx-auto h-5 w-5 text-green-400" />
                      <p className="mt-2 text-2xl font-bold text-white">${stats.funding}M</p>
                      <p className="text-xs text-slate-500">Funding Needed</p>
                    </div>
                    <div className="rounded-xl bg-white/5 p-4 text-center">
                      <Users className="mx-auto h-5 w-5 text-purple-400" />
                      <p className="mt-2 text-2xl font-bold text-white">{stats.zones}</p>
                      <p className="text-xs text-slate-500">Crisis Zones</p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                    <p className="text-sm font-medium text-cyan-400">AI Insight</p>
                    <p className="mt-2 text-sm text-slate-300">
                      Trending: High collaboration potential in {cat.name.toLowerCase()}.
                      {orgs.length > 0
                        ? ` Top partner: ${orgs[0]?.name} (${orgs[0]?.impactMetrics.sustainabilityScore}% sustainability).`
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="lg:w-80">
                  <h3 className="mb-3 text-sm font-semibold text-slate-400">
                    Top Organizations
                  </h3>
                  <div className="space-y-2">
                    {(orgs.length ? orgs : MOCK_ORGANIZATIONS.slice(0, 2)).map((org) => (
                      <Link
                        key={org.id}
                        href={`/profile/${org.id}`}
                        className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-3 transition hover:bg-white/10"
                      >
                        <span className="text-sm font-medium text-white">{org.name}</span>
                        {org.verified && (
                          <span className="text-xs text-cyan-400">✓ Verified</span>
                        )}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/matching?category=${cat.id}`}
                    className="mt-4 flex items-center gap-2 text-sm text-cyan-400 hover:underline"
                  >
                    Find AI matches <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>
    </div>
  );
}

export default function HubPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading hub...</div>}>
      <HubContent />
    </Suspense>
  );
}
