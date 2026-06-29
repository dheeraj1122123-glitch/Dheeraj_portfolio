import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      colors: {
        neon: {
          cyan: "#00F5FF",
          violet: "#7B2FFF",
          magenta: "#FF2CF0",
        },
      },
      animation: {
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        starfield: "starfield 60s linear infinite",
        "grid-move": "grid-move 10s linear infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
        orbit: "orbit 15s linear infinite",
        scanline: "scanline 8s linear infinite",
        glitch: "glitch 0.3s ease-in-out infinite",
      },
      keyframes: {
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 5px #00F5FF, 0 0 10px #00F5FF, 0 0 20px #00F5FF",
            opacity: "1",
          },
          "50%": {
            boxShadow: "0 0 10px #00F5FF, 0 0 20px #00F5FF, 0 0 40px #00F5FF",
            opacity: "0.8",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(5deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        starfield: {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(-100%)" },
        },
        "grid-move": {
          from: { transform: "perspective(500px) rotateX(60deg) translateY(0)" },
          to: { transform: "perspective(500px) rotateX(60deg) translateY(50px)" },
        },
        "rotate-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        orbit: {
          from: { transform: "rotate(0deg) translateX(80px) rotate(0deg)" },
          to: { transform: "rotate(360deg) translateX(80px) rotate(-360deg)" },
        },
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
