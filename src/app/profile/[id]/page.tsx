"use client";

import { use } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BadgeCheck,
  MapPin,
  Target,
  Handshake,
  BarChart3,
} from "lucide-react";
import { MOCK_ORGANIZATIONS } from "@/lib/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { SDG_GOALS, ROLE_LABELS } from "@/lib/constants";
import { notFound } from "next/navigation";

export default function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const org = MOCK_ORGANIZATIONS.find((o) => o.id === id);

  if (!org) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-purple-600 text-3xl font-bold text-white shadow-glow">
            {org.name.charAt(0)}
          </div>
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-3xl font-bold text-white">{org.name}</h1>
              {org.verified && (
                <span className="flex items-center gap-1 rounded-full bg-cyan-500/20 px-3 py-1 text-sm text-cyan-400">
                  <BadgeCheck className="h-4 w-4" />
                  Verified
                </span>
              )}
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  org.collaborationStatus === "open"
                    ? "bg-green-500/20 text-green-400"
                    : org.collaborationStatus === "emergency"
                      ? "bg-red-500/20 text-red-400"
                      : "bg-yellow-500/20 text-yellow-400"
                }`}
              >
                {org.collaborationStatus}
              </span>
            </div>
            <p className="mt-1 text-slate-400">{ROLE_LABELS[org.role]}</p>
            <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
              <MapPin className="h-4 w-4" />
              {org.location.city}, {org.location.country}
            </p>
          </div>
          <Link href={`/matching?org=${org.id}`} className="btn-primary">
            <Handshake className="h-5 w-5 mr-2 inline" />
            Find Partners
          </Link>
        </div>

        <p className="mt-8 text-lg text-slate-300">{org.mission}</p>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        <GlassCard className="lg:col-span-2">
          <h2 className="font-semibold text-white">Current Projects</h2>
          <div className="mt-4 space-y-4">
            {org.projects.map((p) => (
              <div key={p.id} className="rounded-xl bg-white/5 p-4">
                <div className="flex justify-between">
                  <h3 className="font-medium text-white">{p.title}</h3>
                  <span className="text-xs text-cyan-400 capitalize">{p.status}</span>
                </div>
                <p className="mt-2 text-sm text-slate-400">{p.description}</p>
                {p.fundingRequired && (
                  <p className="mt-2 text-sm text-green-400">
                    Funding needed: ${p.fundingRequired.toLocaleString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        <div className="space-y-6">
          <GlassCard>
            <h2 className="flex items-center gap-2 font-semibold text-white">
              <BarChart3 className="h-5 w-5 text-cyan-400" />
              Impact Metrics
            </h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Lives Impacted</dt>
                <dd className="text-white">{org.impactMetrics.livesImpacted.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Carbon Reduced</dt>
                <dd className="text-white">{org.impactMetrics.carbonReduced}t</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Volunteers</dt>
                <dd className="text-white">{org.impactMetrics.volunteersActive}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Sustainability</dt>
                <dd className="neon-text font-bold">{org.impactMetrics.sustainabilityScore}%</dd>
              </div>
            </dl>
          </GlassCard>

          <GlassCard>
            <h2 className="font-semibold text-white">SDG Goals</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {org.sdgGoals.map((g) => {
                const goal = SDG_GOALS.find((s) => s.id === g);
                return (
                  <span
                    key={g}
                    className="rounded-lg bg-purple-500/10 px-2 py-1 text-xs text-purple-300"
                  >
                    SDG {g}: {goal?.name}
                  </span>
                );
              })}
            </div>
          </GlassCard>
        </div>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <GlassCard>
          <h2 className="flex items-center gap-2 font-semibold text-white">
            <Target className="h-5 w-5 text-orange-400" />
            Resources Needed
          </h2>
          <ul className="mt-4 space-y-2">
            {org.resourcesNeeded.map((r) => (
              <li key={r} className="text-sm text-slate-300">
                • {r}
              </li>
            ))}
          </ul>
        </GlassCard>
        <GlassCard>
          <h2 className="font-semibold text-green-400">Resources Available</h2>
          <ul className="mt-4 space-y-2">
            {org.resourcesAvailable.map((r) => (
              <li key={r} className="text-sm text-slate-300">
                • {r}
              </li>
            ))}
          </ul>
        </GlassCard>
      </div>
    </div>
  );
}
