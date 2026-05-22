"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Target, TrendingUp, Handshake } from "lucide-react";
import { MOCK_ORGANIZATIONS } from "@/lib/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";
import type { CollaborationMatch } from "@/types";

export default function MatchingPage() {
  const [sourceOrg] = useState(MOCK_ORGANIZATIONS[0]);
  const [matches, setMatches] = useState<CollaborationMatch[]>([]);
  const [loading, setLoading] = useState(false);
  const [mission, setMission] = useState(sourceOrg.mission);

  const runMatching = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          organizationId: sourceOrg.id,
          mission,
          categories: sourceOrg.categories,
        }),
      });
      const data = await res.json();
      setMatches(data.matches || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title flex items-center gap-3">
          <Sparkles className="h-10 w-10 text-cyan-400" />
          AI Organization <span className="neon-text">Matching</span>
        </h1>
        <p className="mt-4 max-w-2xl text-slate-400">
          Our NLP-powered engine analyzes missions, SDG alignment, and resource complementarity to predict collaboration success.
        </p>
      </motion.div>

      <GlassCard className="mt-10">
        <h2 className="font-semibold text-white">Your Organization</h2>
        <p className="mt-1 text-cyan-400">{sourceOrg.name}</p>
        <textarea
          value={mission}
          onChange={(e) => setMission(e.target.value)}
          className="input-field mt-4 min-h-[100px]"
          placeholder="Describe your mission..."
        />
        <button
          type="button"
          onClick={runMatching}
          disabled={loading}
          className="btn-primary mt-4"
        >
          {loading ? "Analyzing embeddings..." : "Find AI Partnership Matches"}
        </button>
      </GlassCard>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {matches.length === 0 && !loading && (
          <p className="col-span-2 text-center text-slate-500 py-12">
            Click the button above to discover AI-powered collaboration partners
          </p>
        )}
        {matches.map((match, i) => (
          <motion.div
            key={match.organizationId}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard className="relative overflow-hidden">
              <div className="absolute right-4 top-4">
                <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-cyan-500/50 bg-cyan-500/10">
                  <span className="text-2xl font-bold neon-text">{match.score}%</span>
                </div>
              </div>
              <Handshake className="h-8 w-8 text-purple-400" />
              <h3 className="mt-4 text-xl font-bold text-white">
                {match.organizationName}
              </h3>
              <p className="mt-2 text-sm text-slate-400">
                <span className="text-green-400 font-medium">
                  {match.predictedSuccess}% predicted success
                </span>{" "}
                — Mission compatibility score
              </p>
              <ul className="mt-4 space-y-2">
                {match.reasons.map((r) => (
                  <li key={r} className="flex items-start gap-2 text-sm text-slate-300">
                    <Target className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    {r}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex gap-3">
                <button type="button" className="btn-primary flex-1 text-sm">
                  Initiate Partnership
                </button>
                <button type="button" className="btn-secondary text-sm">
                  View Profile
                </button>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {matches.length > 0 && (
        <GlassCard className="mt-8 border-purple-500/30">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-purple-400" />
            <p className="text-white">
              <strong>Top recommendation:</strong> {matches[0]?.organizationName} shares{" "}
              {matches[0]?.score}% mission compatibility with {sourceOrg.name}.
            </p>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
