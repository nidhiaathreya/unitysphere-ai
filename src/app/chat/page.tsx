"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Hash, Shield, MessageCircle, Send, Bot } from "lucide-react";
import { GlassCard } from "@/components/ui/GlassCard";

const ROOMS = [
  { id: "global", name: "Global Collaboration", type: "public", members: 1240 },
  { id: "climate", name: "Climate Action Coalition", type: "group", members: 89 },
  { id: "emergency", name: "Emergency Response", type: "emergency", members: 47 },
  { id: "partners", name: "Partnership Lounge", type: "group", members: 156 },
];

const INITIAL_MESSAGES = [
  {
    id: "1",
    user: "GreenFuture Alliance",
    content: "We're deploying solar micro-grids in Kenya. Looking for water partners.",
    time: "2m ago",
    ai: false,
  },
  {
    id: "2",
    user: "Unity AI",
    content:
      "AI Summary: 3 organizations in this room share SDG 7 & 13 alignment. Suggested match: AquaLife Global (94% compatibility).",
    time: "1m ago",
    ai: true,
  },
  {
    id: "3",
    user: "AquaLife Global",
    content: "Interested! We have IoT water systems ready for East Africa deployment.",
    time: "Just now",
    ai: false,
  },
];

export default function ChatPage() {
  const [activeRoom, setActiveRoom] = useState("global");
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");

  const send = () => {
    if (!input.trim()) return;
    setMessages((m) => [
      ...m,
      { id: Date.now().toString(), user: "You", content: input, time: "Now", ai: false },
    ]);
    setInput("");
  };

  const room = ROOMS.find((r) => r.id === activeRoom);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="section-title">
          Real-Time <span className="neon-text">Collaboration</span>
        </h1>
        <p className="mt-4 text-slate-400">
          Live chat, group rooms, emergency channels, and AI meeting summaries.
        </p>
      </motion.div>

      <div className="mt-8 grid h-[600px] gap-4 lg:grid-cols-4">
        <GlassCard className="overflow-y-auto !p-4" hover={false}>
          <h3 className="mb-4 text-sm font-semibold text-slate-400">Channels</h3>
          {ROOMS.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setActiveRoom(r.id)}
              className={`mb-2 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition ${
                activeRoom === r.id ? "bg-cyan-500/20 text-cyan-400" : "hover:bg-white/5 text-slate-300"
              }`}
            >
              {r.type === "emergency" ? (
                <Shield className="h-4 w-4 text-red-400" />
              ) : (
                <Hash className="h-4 w-4" />
              )}
              <div className="flex-1 truncate">{r.name}</div>
              <span className="text-xs text-slate-500">{r.members}</span>
            </button>
          ))}
        </GlassCard>

        <GlassCard className="lg:col-span-3 flex flex-col !p-0 overflow-hidden" hover={false}>
          <div className="border-b border-white/10 px-4 py-3 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-cyan-400" />
            <span className="font-semibold text-white">{room?.name}</span>
            {room?.type === "emergency" && (
              <span className="rounded bg-red-500/20 px-2 py-0.5 text-xs text-red-400">EMERGENCY</span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.ai ? "bg-purple-500/5 -mx-4 px-4 py-2 rounded-lg" : ""}`}
              >
                {msg.ai ? (
                  <Bot className="h-8 w-8 text-purple-400 shrink-0" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 shrink-0" />
                )}
                <div>
                  <p className="text-sm font-medium text-cyan-400">{msg.user}</p>
                  <p className="text-slate-300">{msg.content}</p>
                  <p className="text-xs text-slate-600 mt-1">{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-white/10 p-4 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Message the coalition..."
              className="input-field flex-1"
            />
            <button type="button" onClick={send} className="btn-primary !p-3">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
