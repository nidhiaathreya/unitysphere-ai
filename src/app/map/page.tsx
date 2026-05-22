"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, AlertTriangle, Cloud, Building2 } from "lucide-react";
import { MOCK_ORGANIZATIONS, MOCK_CRISIS_ALERTS } from "@/lib/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";
import type { CrisisAlert } from "@/types";

export default function MapPage() {
  const [crises, setCrises] = useState<CrisisAlert[]>(MOCK_CRISIS_ALERTS);
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    fetch("/api/crisis")
      .then((r) => r.json())
      .then((d) => setCrises(d.crises || MOCK_CRISIS_ALERTS))
      .catch(() => {});
  }, []);

  const allMarkers = [
    ...MOCK_ORGANIZATIONS.map((o) => ({
      id: o.id,
      type: "org" as const,
      lat: o.location.lat,
      lng: o.location.lng,
      title: o.name,
      subtitle: o.location.city,
      severity: null,
    })),
    ...crises.map((c) => ({
      id: c.id,
      type: "crisis" as const,
      lat: c.lat,
      lng: c.lng,
      title: c.type.toUpperCase(),
      subtitle: c.region,
      severity: c.severity,
    })),
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title">
          Real-Time <span className="neon-text">Global Map</span>
        </h1>
        <p className="mt-4 text-slate-400">
          Live crises, organization locations, climate events, and mission deployments worldwide.
        </p>
      </motion.div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="relative h-[500px] overflow-hidden rounded-2xl border border-white/10 map-grid">
            {mapsKey ? (
              <iframe
                title="Global Map"
                className="h-full w-full"
                src={`https://www.google.com/maps/embed/v1/view?key=${mapsKey}&center=20,0&zoom=2&maptype=satellite`}
                allowFullScreen
              />
            ) : (
              <div className="relative h-full w-full bg-gradient-to-b from-unity-surface to-unity-bg">
                {/* SVG world map approximation */}
                <svg
                  viewBox="0 0 1000 500"
                  className="h-full w-full opacity-30"
                  fill="none"
                  stroke="rgba(34,211,238,0.3)"
                  strokeWidth="0.5"
                >
                  <ellipse cx="500" cy="250" rx="480" ry="230" />
                  <path d="M200,200 Q350,150 500,180 T800,200" />
                  <path d="M150,300 Q400,350 600,320 T850,280" />
                </svg>
                {allMarkers.map((m) => {
                  const x = ((m.lng + 180) / 360) * 100;
                  const y = ((90 - m.lat) / 180) * 100;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-150 ${
                        m.type === "crisis" ? "animate-pulse" : ""
                      }`}
                      style={{ left: `${x}%`, top: `${y}%` }}
                      onClick={() => setSelectedMarker(m.id)}
                    >
                      {m.type === "crisis" ? (
                        <AlertTriangle
                          className={`h-6 w-6 ${
                            m.severity === "critical"
                              ? "text-red-500"
                              : "text-orange-400"
                          }`}
                        />
                      ) : (
                        <Building2 className="h-5 w-5 text-cyan-400" />
                      )}
                    </button>
                  );
                })}
                <div className="absolute bottom-4 left-4 rounded-lg bg-black/60 px-3 py-2 text-xs text-slate-400 backdrop-blur">
                  Demo map • Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY for live Google Maps
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <GlassCard>
            <h3 className="flex items-center gap-2 font-semibold text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Active Crises ({crises.length})
            </h3>
            <div className="mt-4 max-h-48 space-y-2 overflow-y-auto">
              {crises.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setSelectedMarker(c.id)}
                  className={`w-full rounded-lg p-3 text-left text-sm transition ${
                    selectedMarker === c.id ? "bg-red-500/20" : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <span className="font-medium text-white capitalize">{c.type}</span>
                  <span className="ml-2 text-xs text-red-400">{c.severity}</span>
                  <p className="text-xs text-slate-500">{c.region}, {c.country}</p>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="flex items-center gap-2 font-semibold text-cyan-400">
              <Building2 className="h-5 w-5" />
              Organizations
            </h3>
            <div className="mt-4 space-y-2">
              {MOCK_ORGANIZATIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setSelectedMarker(o.id)}
                  className="flex w-full items-center gap-2 rounded-lg bg-white/5 p-3 text-left text-sm hover:bg-white/10"
                >
                  <MapPin className="h-4 w-4 text-cyan-400" />
                  <div>
                    <p className="text-white">{o.name}</p>
                    <p className="text-xs text-slate-500">{o.location.city}</p>
                  </div>
                </button>
              ))}
            </div>
          </GlassCard>

          <GlassCard>
            <h3 className="flex items-center gap-2 font-semibold text-green-400">
              <Cloud className="h-5 w-5" />
              Weather Layer
            </h3>
            <p className="mt-2 text-sm text-slate-400">
              OpenWeather integration active when API key configured.
            </p>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
