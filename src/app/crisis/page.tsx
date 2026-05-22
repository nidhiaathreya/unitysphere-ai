"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  AlertTriangle,
  Users,
  Package,
  FileText,
  Bell,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { useAppStore } from "@/store/useAppStore";
import type { CrisisAlert } from "@/types";
import { MOCK_CRISIS_ALERTS } from "@/lib/mock-data";
import { PredictionPanel } from "@/components/ai/PredictionPanel";

export default function CrisisPage() {
  const { setCrisisMode, setUnityAIOpen } = useAppStore();
  const [crises, setCrises] = useState<CrisisAlert[]>(MOCK_CRISIS_ALERTS);
  const [activeId, setActiveId] = useState(MOCK_CRISIS_ALERTS[0].id);

  useEffect(() => {
    fetch("/api/crisis")
      .then((r) => r.json())
      .then((d) => {
        if (d.crises?.length) {
          setCrises(d.crises);
          setActiveId(d.crises[0].id);
        }
      })
      .catch(() => {});
  }, []);

  const active = crises.find((c) => c.id === activeId) || crises[0];

  const activateCrisisMode = () => {
    setCrisisMode(true, active);
    setUnityAIOpen(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h1 className="section-title flex items-center gap-3">
            <Zap className="h-10 w-10 text-red-400 animate-pulse" />
            Crisis <span className="text-red-400">Response Mode</span>
          </h1>
          <p className="mt-4 text-slate-400">
            AI detects disasters via live APIs, alerts organizations, matches volunteers, and generates emergency action plans.
          </p>
        </div>
        <button
          type="button"
          onClick={activateCrisisMode}
          className="rounded-xl bg-red-500/20 border border-red-500/50 px-6 py-3 font-semibold text-red-400 hover:bg-red-500/30 transition animate-pulse"
        >
          Activate Emergency Protocol
        </button>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-400">Detected Crises</h2>
          {crises.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setActiveId(c.id)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                activeId === c.id
                  ? "border-red-500/50 bg-red-500/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium capitalize text-white">{c.type}</span>
                <span
                  className={`text-xs font-bold uppercase ${
                    c.severity === "critical"
                      ? "text-red-400"
                      : c.severity === "high"
                        ? "text-orange-400"
                        : "text-yellow-400"
                  }`}
                >
                  {c.severity}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-400">
                {c.region}, {c.country}
              </p>
            </button>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="border-red-500/30">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-12 w-12 text-red-400 shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-white capitalize">
                  {active?.type} — {active?.region}
                </h2>
                <p className="mt-2 text-slate-300">{active?.description}</p>
                <p className="mt-4 text-sm text-cyan-400">
                  <Bell className="inline h-4 w-4 mr-1" />
                  {active?.organizationsNotified} organizations notified
                </p>
              </div>
            </div>
          </GlassCard>

          {active?.actionPlan && (
            <GlassCard>
              <h3 className="flex items-center gap-2 font-semibold text-white">
                <FileText className="h-5 w-5 text-cyan-400" />
                AI Emergency Action Plan
              </h3>
              <ol className="mt-4 space-y-3">
                {active.actionPlan.split(". ").filter(Boolean).map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-300">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-xs text-cyan-400">
                      {i + 1}
                    </span>
                    {step.trim()}
                  </li>
                ))}
              </ol>
            </GlassCard>
          )}

          <div className="grid gap-4 sm:grid-cols-3">
            <GlassCard>
              <Users className="h-8 w-8 text-purple-400" />
              <p className="mt-4 text-2xl font-bold text-white">234</p>
              <p className="text-sm text-slate-500">Volunteers Matched</p>
            </GlassCard>
            <GlassCard>
              <Package className="h-8 w-8 text-green-400" />
              <p className="mt-4 text-2xl font-bold text-white">12</p>
              <p className="text-sm text-slate-500">Supply Routes</p>
            </GlassCard>
            <GlassCard>
              <Zap className="h-8 w-8 text-cyan-400" />
              <p className="mt-4 text-2xl font-bold text-white">4.2h</p>
              <p className="text-sm text-slate-500">Avg Response Time</p>
            </GlassCard>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <PredictionPanel />
      </div>
    </div>
  );
}
