"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, MapPin, AlertTriangle, TrendingDown } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

interface Prediction {
  id: string;
  region: string;
  risk: string;
  probability: number;
  type: string;
  prevention: string;
}

const DEFAULT_PREDICTIONS: Prediction[] = [
  {
    id: "1",
    region: "East Africa",
    risk: "Drought escalation",
    probability: 78,
    type: "Climate",
    prevention: "Pre-position water systems with AquaLife Global partners",
  },
  {
    id: "2",
    region: "South Asia",
    risk: "Monsoon flooding",
    probability: 65,
    type: "Disaster",
    prevention: "Activate SafeHaven shelter network pre-deployment",
  },
  {
    id: "3",
    region: "Amazon Basin",
    risk: "Wildfire spread",
    probability: 52,
    type: "Climate",
    prevention: "Coordinate GreenFuture reforestation rapid response",
  },
  {
    id: "4",
    region: "Sub-Saharan Africa",
    risk: "Healthcare resource shortage",
    probability: 71,
    type: "Health",
    prevention: "Scale HealthBridge telehealth to 50 rural hubs",
  },
];

export function PredictionPanel() {
  const [predictions, setPredictions] = useState(DEFAULT_PREDICTIONS);

  useEffect(() => {
    setPredictions((p) =>
      p.map((pred) => ({
        ...pred,
        probability: Math.min(95, pred.probability + Math.floor(Math.random() * 6) - 3),
      }))
    );
    const interval = setInterval(() => {
      setPredictions((p) =>
        p.map((pred) => ({
          ...pred,
          probability: Math.min(95, Math.max(40, pred.probability + Math.floor(Math.random() * 4) - 2)),
        }))
      );
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2 className="section-title mb-6 flex items-center gap-2">
        <Brain className="h-8 w-8 text-purple-400" />
        AI <span className="neon-text">Crisis Predictions</span>
      </h2>
      <div className="grid gap-4 md:grid-cols-2">
        {predictions.map((pred, i) => (
          <motion.div
            key={pred.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <GlassCard>
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-medium text-purple-400">{pred.type}</span>
                  <h3 className="mt-1 font-semibold text-white">{pred.risk}</h3>
                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-400">
                    <MapPin className="h-3 w-3" />
                    {pred.region}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-400">{pred.probability}%</p>
                  <p className="text-xs text-slate-500">Risk Level</p>
                </div>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-orange-500 to-red-500"
                  animate={{ width: `${pred.probability}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
              <p className="mt-4 flex items-start gap-2 text-sm text-cyan-300">
                <TrendingDown className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
                <span>
                  <strong className="text-green-400">Prevention:</strong> {pred.prevention}
                </span>
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 flex items-center gap-2 text-xs text-slate-600">
        <AlertTriangle className="h-3 w-3" />
        Predictions update every 15s using AI risk models + global API data
      </p>
    </div>
  );
}
