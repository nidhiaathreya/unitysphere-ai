"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Globe2,
  Heart,
  Rocket,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";
import { EarthGlobe } from "@/components/globe/EarthGlobe";
import { LiveCounter } from "@/components/ui/LiveCounter";
import { GlassCard } from "@/components/ui/GlassCard";
import { APP_TAGLINE } from "@/lib/constants";
import { MOCK_AI_INSIGHTS, MOCK_ACTIVITY_FEED } from "@/lib/mock-data";
import { fetchGlobalStats } from "@/lib/api/external";
import type { GlobalStats } from "@/types";
import { timeAgo } from "@/lib/utils";
import { CHALLENGE_CATEGORIES } from "@/lib/constants";

export default function HomePage() {
  const [stats, setStats] = useState<GlobalStats | null>(null);

  useEffect(() => {
    fetchGlobalStats().then(setStats);
    const interval = setInterval(() => fetchGlobalStats().then(setStats), 30000);
    return () => clearInterval(interval);
  }, []);

  const s = stats || {
    activeOrganizations: 12847,
    volunteersConnected: 89234,
    countriesInvolved: 156,
    globalProjectsActive: 4521,
    livesImpacted: 2847291,
  };

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative mx-auto max-w-7xl px-4 pb-24 pt-8 md:px-6 md:pt-16">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-400">
              <Sparkles className="h-4 w-4" />
              AI-Powered Global Collaboration
            </span>
            <h1 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
              Connecting the World to Solve{" "}
              <span className="neon-text">Humanity&apos;s Greatest Challenges</span>
            </h1>
            <p className="mt-6 text-lg text-slate-400">{APP_TAGLINE}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/auth/register" className="btn-primary inline-flex items-center gap-2">
                Join the Mission
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/hub" className="btn-secondary inline-flex items-center gap-2">
                Explore Challenges
                <Globe2 className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[400px] md:h-[500px]"
          >
            <EarthGlobe className="h-full w-full" />
          </motion.div>
        </div>
      </section>

      {/* Live Stats */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <h2 className="section-title mb-8 text-center">
          Live <span className="neon-text">Global Impact</span>
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <LiveCounter value={s.activeOrganizations} label="Active Organizations" icon={<Building2 className="h-6 w-6" />} />
          <LiveCounter value={s.volunteersConnected} label="Volunteers Connected" icon={<Users className="h-6 w-6" />} />
          <LiveCounter value={s.countriesInvolved} label="Countries Involved" icon={<Globe2 className="h-6 w-6" />} />
          <LiveCounter value={s.globalProjectsActive} label="Global Projects Active" icon={<Rocket className="h-6 w-6" />} />
          <LiveCounter value={s.livesImpacted} label="Lives Impacted" icon={<Heart className="h-6 w-6" />} />
        </div>
      </section>

      {/* Challenge cards */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <h2 className="section-title mb-2">Global Challenge Categories</h2>
        <p className="mb-10 text-slate-400">Tackle the world&apos;s most urgent problems together</p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {CHALLENGE_CATEGORIES.slice(0, 10).map((cat, i) => (
            <Link key={cat.id} href={`/hub?category=${cat.id}`}>
              <GlassCard delay={i * 0.05} className="h-full cursor-pointer group">
                <span className="text-3xl">{cat.icon}</span>
                <h3 className="mt-3 font-semibold text-white group-hover:text-cyan-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="mt-2 text-xs text-slate-500 line-clamp-2">{cat.description}</p>
                <div
                  className="mt-4 h-1 rounded-full opacity-60"
                  style={{ background: cat.color }}
                />
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>

      {/* AI Insights + Activity Feed */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="section-title mb-6 flex items-center gap-2">
              <Zap className="h-8 w-8 text-cyan-400" />
              AI World Insights
            </h2>
            <div className="space-y-4">
              {MOCK_AI_INSIGHTS.map((insight, i) => (
                <GlassCard key={insight.id} delay={i * 0.1}>
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-white">{insight.title}</h3>
                      <p className="mt-2 text-sm text-slate-400">{insight.summary}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-cyan-500/20 px-3 py-1 text-xs font-medium text-cyan-400">
                      {Math.round(insight.confidence * 100)}%
                    </span>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
          <div>
            <h2 className="section-title mb-6">Live Global Activity</h2>
            <div className="space-y-3">
              {MOCK_ACTIVITY_FEED.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="glass-card flex items-center gap-4 p-4"
                >
                  <div
                    className={`h-2 w-2 rounded-full ${
                      item.type === "crisis"
                        ? "bg-red-500 animate-pulse"
                        : item.type === "collaboration"
                          ? "bg-cyan-400"
                          : "bg-purple-400"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-white">{item.message}</p>
                    <p className="text-xs text-slate-500">{timeAgo(item.timestamp)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:px-6">
        <motion.div
          className="relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 p-12 text-center"
          whileInView={{ scale: [0.98, 1] }}
          viewport={{ once: true }}
        >
          <div className="pointer-events-none absolute inset-0 hologram-shine" />
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            Ready to Change the World?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-400">
            Join thousands of organizations using AI to collaborate, respond to crises, and measure real impact.
          </p>
          <Link href="/auth/register" className="btn-primary mt-8 inline-flex items-center gap-2">
            Start Your Mission
            <ArrowRight className="h-5 w-5" />
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
