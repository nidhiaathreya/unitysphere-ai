"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Users,
  AlertCircle,
  CheckCircle,
  BarChart3,
  Megaphone,
} from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";
import { MOCK_ORGANIZATIONS } from "@/lib/mock-data";

export default function AdminPage() {
  const stats = {
    totalOrgs: 12847,
    pendingVerification: 23,
    flaggedAccounts: 5,
    activeCrises: 3,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title flex items-center gap-3">
          <Shield className="h-10 w-10 text-purple-400" />
          Admin <span className="neon-text">Panel</span>
        </h1>
        <p className="mt-4 text-slate-400">
          Manage organizations, verify projects, monitor platform analytics.
        </p>
      </motion.div>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Organizations", value: stats.totalOrgs, icon: Users },
          { label: "Pending Verification", value: stats.pendingVerification, icon: CheckCircle },
          { label: "Flagged Accounts", value: stats.flaggedAccounts, icon: AlertCircle },
          { label: "Active Crises", value: stats.activeCrises, icon: BarChart3 },
        ].map(({ label, value, icon: Icon }) => (
          <GlassCard key={label}>
            <Icon className="h-6 w-6 text-cyan-400" />
            <p className="mt-4 text-2xl font-bold text-white">{value.toLocaleString()}</p>
            <p className="text-sm text-slate-500">{label}</p>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="mt-8">
        <h2 className="font-semibold text-white">Organization Management</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-slate-500">
                <th className="py-3 pr-4">Name</th>
                <th className="py-3 pr-4">Role</th>
                <th className="py-3 pr-4">Status</th>
                <th className="py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ORGANIZATIONS.map((org) => (
                <tr key={org.id} className="border-b border-white/5">
                  <td className="py-3 text-white">{org.name}</td>
                  <td className="py-3 text-slate-400 capitalize">{org.role}</td>
                  <td className="py-3">
                    {org.verified ? (
                      <span className="text-green-400">Verified</span>
                    ) : (
                      <span className="text-yellow-400">Pending</span>
                    )}
                  </td>
                  <td className="py-3">
                    <button type="button" className="text-cyan-400 hover:underline text-xs mr-3">
                      Verify
                    </button>
                    <button type="button" className="text-red-400 hover:underline text-xs">
                      Flag
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      <GlassCard className="mt-6">
        <h2 className="flex items-center gap-2 font-semibold text-white">
          <Megaphone className="h-5 w-5" />
          Global Announcement
        </h2>
        <textarea
          className="input-field mt-4 min-h-[80px]"
          placeholder="Broadcast message to all organizations..."
        />
        <button type="button" className="btn-primary mt-4">
          Publish Announcement
        </button>
      </GlassCard>
    </div>
  );
}
