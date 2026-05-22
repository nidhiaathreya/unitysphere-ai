"use client";

import { motion } from "framer-motion";
import { Link2, Shield, CheckCircle, ExternalLink } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const TRANSACTIONS = [
  {
    id: "tx-001",
    from: "Global Impact Fund",
    to: "SafeHaven Foundation",
    amount: "$50,000",
    hash: "0x7f3a...9c2b",
    verified: true,
    impact: "Emergency shelter deployment",
  },
  {
    id: "tx-002",
    from: "Climate Ventures",
    to: "GreenFuture Alliance",
    amount: "$120,000",
    hash: "0x2b1e...4f8a",
    verified: true,
    impact: "Solar micro-grid installation",
  },
  {
    id: "tx-003",
    from: "Anonymous Donor",
    to: "EduReach University",
    amount: "$25,000",
    hash: "0x9d4c...1e7f",
    verified: true,
    impact: "Digital classroom tablets",
  },
];

export default function BlockchainPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title">
          Blockchain <span className="neon-text">Transparency</span>
        </h1>
        <p className="mt-4 text-slate-400">
          Verified donations, anti-fraud protection, and immutable impact proof records.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Link2, title: "Transparent Donations", desc: "Every transaction on-chain" },
          { icon: Shield, title: "Anti-Fraud AI", desc: "ML anomaly detection" },
          { icon: CheckCircle, title: "Impact Proof", desc: "Verified outcome records" },
        ].map(({ icon: Icon, title, desc }) => (
          <GlassCard key={title}>
            <Icon className="h-8 w-8 text-cyan-400" />
            <h3 className="mt-4 font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm text-slate-400">{desc}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mt-8">
        <h2 className="font-semibold text-white">Recent Verified Transactions</h2>
        <div className="mt-6 space-y-4">
          {TRANSACTIONS.map((tx) => (
            <div
              key={tx.id}
              className="flex flex-col gap-4 rounded-xl border border-green-500/20 bg-green-500/5 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-white">
                  {tx.from} → {tx.to}
                </p>
                <p className="text-sm text-slate-400">{tx.impact}</p>
                <p className="mt-1 font-mono text-xs text-cyan-400">{tx.hash}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-green-400">{tx.amount}</span>
                <span className="flex items-center gap-1 text-sm text-green-400">
                  <CheckCircle className="h-4 w-4" />
                  Verified
                </span>
                <button type="button" className="text-slate-400 hover:text-white">
                  <ExternalLink className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
