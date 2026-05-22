"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Send,
  Mic,
  Sparkles,
  Bot,
  Loader2,
  Volume2,
} from "lucide-react";
import { useAppStore } from "@/store/useAppStore";

interface Message {
  role: "user" | "assistant";
  content: string;
  suggestions?: string[];
  actionPlan?: string[];
}

export function UnityAIAssistant() {
  const { unityAIOpen, setUnityAIOpen } = useAppStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hello! I'm Unity AI — your global collaboration copilot. Ask me about partnerships, crises, roadmaps, or impact analysis.",
      suggestions: [
        "Find partners for climate project",
        "Generate emergency action plan",
        "Show collaboration matches",
      ],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setMessages((m) => [...m, { role: "user", content: text }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: text }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: data.message,
          suggestions: data.suggestions,
          actionPlan: data.actionPlan,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Connection error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const startVoice = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Voice recognition not supported in this browser.");
      return;
    }
    const SR =
      (window as unknown as { SpeechRecognition?: new () => SpeechRecognition }).SpeechRecognition ||
      (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognition }).webkitSpeechRecognition;
    if (!SR) return;
    const recognition = new SR();
    recognition.lang = "en-US";
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e: SpeechRecognitionEvent) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };
    recognition.start();
  };

  return (
    <AnimatePresence>
      {unityAIOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
            onClick={() => setUnityAIOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-4 right-4 z-[70] flex h-[min(600px,85vh)] w-[min(420px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-cyan-500/30 bg-unity-surface/95 shadow-glow backdrop-blur-xl"
          >
            <div className="relative flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-purple-600">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <span className="absolute -right-0.5 -top-0.5 h-3 w-3 animate-pulse rounded-full bg-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Unity AI</h3>
                  <p className="text-xs text-cyan-400">Global Collaboration Copilot</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setUnityAIOpen(false)}
                className="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="pointer-events-none absolute inset-0 hologram-shine opacity-30" />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[90%] rounded-2xl px-4 py-3 text-sm ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-cyan-600/40 to-purple-600/40 text-white"
                        : "glass-card text-slate-200"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                    {msg.actionPlan && (
                      <ul className="mt-3 space-y-1 border-t border-white/10 pt-3 text-xs text-cyan-300">
                        {msg.actionPlan.map((step, j) => (
                          <li key={j}>→ {step}</li>
                        ))}
                      </ul>
                    )}
                    {msg.suggestions && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {msg.suggestions.map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => sendMessage(s)}
                            className="rounded-lg bg-white/5 px-2 py-1 text-xs text-cyan-400 hover:bg-cyan-500/20"
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex items-center gap-2 text-cyan-400">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="text-sm">Analyzing global data...</span>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="border-t border-white/10 p-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={startVoice}
                  className={`rounded-xl p-3 transition-all ${
                    listening
                      ? "bg-red-500/30 text-red-400 animate-pulse"
                      : "bg-white/5 text-slate-400 hover:text-cyan-400"
                  }`}
                  title="Voice input"
                >
                  <Mic className="h-5 w-5" />
                </button>
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
                  placeholder="Ask Unity AI anything..."
                  className="input-field flex-1 !py-2"
                />
                <button
                  type="button"
                  onClick={() => sendMessage(input)}
                  disabled={loading}
                  className="btn-primary !p-3"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
              <p className="mt-2 flex items-center justify-center gap-1 text-xs text-slate-600">
                <Volume2 className="h-3 w-3" />
                Multilingual • Voice • Real-time insights
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
