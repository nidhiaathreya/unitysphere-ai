"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  LayoutDashboard,
  Map,
  MessageSquare,
  Shield,
  Sparkles,
  Menu,
  X,
  Zap,
  Trophy,
  Users,
} from "lucide-react";
import { useState } from "react";
import { APP_NAME } from "@/lib/constants";
import { useAppStore } from "@/store/useAppStore";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "/hub", label: "Challenge Hub", icon: Globe },
  { href: "/map", label: "Global Map", icon: Map },
  { href: "/matching", label: "AI Matching", icon: Sparkles },
  { href: "/dashboard", label: "Analytics", icon: LayoutDashboard },
  { href: "/chat", label: "Collaborate", icon: MessageSquare },
  { href: "/crisis", label: "Crisis Mode", icon: Zap },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { crisisMode, setUnityAIOpen } = useAppStore();

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-unity-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-purple-600 shadow-glow">
            <Globe className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-lg font-bold neon-text hidden sm:block">
            {APP_NAME}
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-all",
                pathname === href
                  ? "bg-cyan-500/20 text-cyan-400"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {crisisMode && (
            <span className="hidden animate-pulse rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400 md:block">
              CRISIS ACTIVE
            </span>
          )}
          <button
            type="button"
            onClick={() => setUnityAIOpen(true)}
            className="btn-primary flex items-center gap-2 !py-2 !px-4 text-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span className="hidden sm:inline">Unity AI</span>
          </button>
          <Link href="/auth/login" className="btn-secondary hidden sm:flex !py-2 !px-4 text-sm">
            <Users className="h-4 w-4 mr-1" />
            Sign In
          </Link>
          <Link href="/admin" className="hidden md:flex p-2 text-slate-500 hover:text-white">
            <Shield className="h-5 w-5" />
          </Link>
          <button
            type="button"
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-white/10 bg-unity-bg/95 overflow-hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {NAV_LINKS.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-4 py-3",
                    pathname === href ? "bg-cyan-500/20 text-cyan-400" : "text-slate-300"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </Link>
              ))}
              <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="btn-primary mt-2 text-center">
                Sign In
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
