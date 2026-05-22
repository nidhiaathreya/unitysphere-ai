import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        unity: {
          bg: "#030712",
          surface: "#0a0f1e",
          card: "rgba(15, 23, 42, 0.6)",
          cyan: "#22d3ee",
          purple: "#a855f7",
          pink: "#ec4899",
          blue: "#3b82f6",
          green: "#10b981",
        },
      },
      fontFamily: {
        display: ["var(--font-space)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "unity-gradient":
          "radial-gradient(ellipse at 20% 20%, rgba(34,211,238,0.15) 0%, transparent 50%), radial-gradient(ellipse at 80% 80%, rgba(168,85,247,0.15) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(59,130,246,0.08) 0%, transparent 70%)",
        "neon-glow":
          "linear-gradient(135deg, #22d3ee 0%, #a855f7 50%, #ec4899 100%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(34, 211, 238, 0.3)",
        "glow-purple": "0 0 40px rgba(168, 85, 247, 0.3)",
        card: "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulse-glow: "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
