"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Award, Star } from "lucide-react";
import { MOCK_LEADERBOARD } from "@/lib/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";

export default function LeaderboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title flex items-center gap-3">
          <Trophy className="h-10 w-10 text-yellow-400" />
          Global <span className="neon-text">Leaderboard</span>
        </h1>
        <p className="mt-4 text-slate-400">
          Impact badges, collaboration scores, and organization rankings.
        </p>
      </motion.div>

      <div className="mt-12 space-y-4">
        {MOCK_LEADERBOARD.map((entry, i) => (
          <motion.div
            key={entry.organizationId}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-xl font-display text-2xl font-bold ${
                    entry.rank === 1
                      ? "bg-yellow-500/20 text-yellow-400"
                      : entry.rank === 2
                        ? "bg-slate-400/20 text-slate-300"
                        : "bg-orange-600/20 text-orange-400"
                  }`}
                >
                  {entry.rank === 1 ? (
                    <Trophy className="h-8 w-8" />
                  ) : entry.rank === 2 ? (
                    <Medal className="h-8 w-8" />
                  ) : (
                    <Award className="h-8 w-8" />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{entry.name}</h3>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {entry.badges.map((b) => (
                      <span
                        key={b}
                        className="rounded-full bg-cyan-500/10 px-2 py-0.5 text-xs text-cyan-400"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-1 justify-end gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold neon-text">{entry.impactScore}</p>
                  <p className="text-xs text-slate-500">Impact Score</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">{entry.collaborationScore}</p>
                  <p className="text-xs text-slate-500">Collaboration</p>
                </div>
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-bold">#{entry.rank}</span>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      <GlassCard className="mt-12">
        <h3 className="font-semibold text-white">Your Achievements</h3>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {["First Partnership", "Crisis Responder", "SDG Champion", "100K Impact"].map(
            (badge) => (
              <div
                key={badge}
                className="rounded-xl border border-dashed border-white/20 p-4 text-center opacity-60"
              >
                <Award className="mx-auto h-8 w-8 text-slate-500" />
                <p className="mt-2 text-xs text-slate-500">{badge}</p>
              </div>
            )
          )}
        </div>
      </GlassCard>
    </div>
  );
}
