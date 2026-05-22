import Link from "next/link";
import { Globe } from "lucide-react";
import { APP_NAME } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-unity-surface/50 py-12">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6 text-cyan-400" />
            <span className="font-display font-bold neon-text">{APP_NAME}</span>
          </div>
          <p className="text-center text-sm text-slate-500">
            Connecting organizations worldwide to solve humanity&apos;s greatest challenges.
          </p>
          <div className="flex gap-6 text-sm text-slate-400">
            <Link href="/hub" className="hover:text-cyan-400">Hub</Link>
            <Link href="/map" className="hover:text-cyan-400">Map</Link>
            <Link href="/dashboard" className="hover:text-cyan-400">Analytics</Link>
            <Link href="/blockchain" className="hover:text-cyan-400">Blockchain</Link>
            <Link href="/auth/register" className="hover:text-cyan-400">Join</Link>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} UnitySphere AI. Built for global impact.
        </p>
      </div>
    </footer>
  );
}
