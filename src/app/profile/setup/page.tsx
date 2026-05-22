"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CHALLENGE_CATEGORIES } from "@/lib/constants";
import type { ChallengeCategory } from "@/types";

export default function ProfileSetupPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [mission, setMission] = useState("");
  const [categories, setCategories] = useState<ChallengeCategory[]>([]);

  const toggleCategory = (id: ChallengeCategory) => {
    setCategories((c) =>
      c.includes(id) ? c.filter((x) => x !== id) : [...c, id]
    );
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass-card p-8">
        <h1 className="font-display text-2xl font-bold neon-text">Setup Your Profile</h1>
        <p className="mt-2 text-slate-400">Step {step} of 2</p>

        {step === 1 && (
          <div className="mt-8">
            <label className="text-sm text-slate-400">Mission Statement</label>
            <textarea
              value={mission}
              onChange={(e) => setMission(e.target.value)}
              className="input-field mt-2 min-h-[120px]"
              placeholder="What global challenge are you solving?"
            />
            <button
              type="button"
              onClick={() => setStep(2)}
              disabled={!mission.trim()}
              className="btn-primary mt-6 w-full"
            >
              Continue
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="mt-8">
            <label className="text-sm text-slate-400">Challenge Categories</label>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {CHALLENGE_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => toggleCategory(cat.id)}
                  className={`rounded-xl border p-3 text-left text-sm transition ${
                    categories.includes(cat.id)
                      ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                      : "border-white/10 hover:border-white/20"
                  }`}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="btn-primary mt-6 w-full"
            >
              Complete Setup
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
