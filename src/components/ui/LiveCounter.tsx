"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LiveCounterProps {
  value: number;
  label: string;
  icon?: React.ReactNode;
  suffix?: string;
}

export function LiveCounter({ value, label, icon, suffix = "" }: LiveCounterProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplay(value);
        clearInterval(timer);
      } else {
        setDisplay(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  const formatted =
    display >= 1000000
      ? `${(display / 1000000).toFixed(1)}M`
      : display >= 1000
        ? `${(display / 1000).toFixed(1)}K`
        : display.toLocaleString();

  return (
    <motion.div
      className="glass-card-hover p-6 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      {icon && (
        <div className="mb-3 flex justify-center text-cyan-400">{icon}</div>
      )}
      <div className="font-display text-3xl font-bold neon-text md:text-4xl">
        {formatted}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-slate-400">{label}</p>
    </motion.div>
  );
}
