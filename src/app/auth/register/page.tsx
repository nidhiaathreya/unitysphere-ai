"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Lock, Chrome } from "lucide-react";
import { signUpWithEmail, signInWithGoogle } from "@/lib/firebase/auth";
import { useAppStore } from "@/store/useAppStore";
import type { UserRole } from "@/types";
import { ROLE_LABELS } from "@/lib/constants";

export default function RegisterPage() {
  const router = useRouter();
  const setUser = useAppStore((s) => s.setUser);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("ngo");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const user = await signUpWithEmail(email, password, name, role);
      setUser(user);
      router.push("/profile/setup");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8"
      >
        <h1 className="font-display text-2xl font-bold neon-text">Join the Mission</h1>
        <p className="mt-2 text-slate-400">Create your UnitySphere account</p>

        <form onSubmit={handleRegister} className="mt-8 space-y-4">
          <div>
            <label className="text-sm text-slate-400">Organization Type</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
              className="input-field mt-1"
            >
              {(["ngo", "startup", "volunteer", "university", "government", "company"] as UserRole[]).map(
                (r) => (
                  <option key={r} value={r}>
                    {ROLE_LABELS[r]}
                  </option>
                )
              )}
            </select>
          </div>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              placeholder="Organization / Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field pl-11"
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field pl-11"
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
            <input
              type="password"
              placeholder="Password (6+ chars)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field pl-11"
              minLength={6}
              required
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <button
          type="button"
          onClick={async () => {
            setLoading(true);
            const user = await signInWithGoogle(role);
            setUser(user);
            router.push("/profile/setup");
            setLoading(false);
          }}
          className="btn-secondary mt-4 flex w-full items-center justify-center gap-2"
        >
          <Chrome className="h-5 w-5" />
          Sign up with Google
        </button>

        <p className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-cyan-400 hover:underline">
            Sign In
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
