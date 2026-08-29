import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#07060B",
        surface: {
          1: "#121019",
          2: "#1A1724",
          3: "#252136",
        },
        ink: {
          DEFAULT: "#F6F4FA",
          dim: "#847E96",
          muted: "#555067",
        },
        accent: {
          DEFAULT: "#FF2D95",
          light: "#FF74B8",
          dark: "#B80D5F",
        },
        critical: {
          DEFAULT: "#FF4D3D",
          light: "#FF7A5C",
          dark: "#B02010",
        },
        neon: {
          cyan: "#00F0FF",
          purple: "#9D4EDD",
          green: "#38EF7D",
          yellow: "#FFD600",
        },
      },
      fontFamily: {
        kr: ["Pretendard", "Apple SD Gothic Neo", "system-ui", "sans-serif"],
        en: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "lift-1": "0 1px 0 rgba(255,255,255,0.055) inset, 0 10px 20px -10px rgba(0,0,0,0.9)",
        "lift-2": "0 1px 0 rgba(255,255,255,0.09) inset, 0 -1px 0 rgba(0,0,0,0.4) inset, 0 18px 30px -14px rgba(0,0,0,0.95), 0 3px 8px -4px rgba(0,0,0,0.6)",
        "glow-accent": "0 0 24px rgba(255, 45, 149, 0.45)",
        "glow-critical": "0 0 24px rgba(255, 77, 61, 0.5)",
        "glow-cyan": "0 0 24px rgba(0, 240, 255, 0.45)",
      },
      keyframes: {
        floatUp: {
          "0%": { transform: "translateY(0) scale(0.8)", opacity: "0" },
          "15%": { opacity: "1" },
          "80%": { opacity: "0.9" },
          "100%": { transform: "translateY(-280px) scale(1.1)", opacity: "0" },
        },
        pulseGlow: {
          "0%, 100%": { transform: "scale(1)", filter: "drop-shadow(0 0 15px rgba(255, 45, 149, 0.4))" },
          "50%": { transform: "scale(1.03)", filter: "drop-shadow(0 0 28px rgba(255, 45, 149, 0.75))" },
        },
        ctaPulse: {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 0 0 rgba(255, 45, 149, 0.7)" },
          "70%": { transform: "scale(1.02)", boxShadow: "0 0 0 14px rgba(255, 45, 149, 0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.45" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "float-up": "floatUp 2.8s cubic-bezier(0.2, 0.8, 0.3, 1) forwards",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        "cta-pulse": "ctaPulse 1.8s infinite",
        blink: "blink 0.7s infinite",
        marquee: "marquee 18s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
