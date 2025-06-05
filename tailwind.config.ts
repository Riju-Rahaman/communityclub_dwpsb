
import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        background: "#0f172a",
        foreground: "#f8fafc",
        primary: {
          DEFAULT: "#0f172a",
          foreground: "#f8fafc",
        },
        secondary: {
          DEFAULT: "#a78bfa",
          foreground: "#f8fafc",
        },
        card: {
          DEFAULT: "rgba(30, 41, 59, 0.7)",
          foreground: "#f8fafc",
        },
        popover: {
          DEFAULT: "rgba(30, 41, 59, 0.8)",
          foreground: "#f8fafc",
        },
        muted: {
          DEFAULT: "#1e293b",
          foreground: "#94a3b8",
        },
        accent: {
          DEFAULT: "#38bdf8",
          foreground: "#0f172a",
        },
        border: "rgba(148, 163, 184, 0.2)",
        input: "rgba(30, 41, 59, 0.5)",
        ring: "#38bdf8",
      },
      borderRadius: {
        lg: "0.75rem",
        md: "calc(0.75rem - 2px)",
        sm: "calc(0.75rem - 4px)",
        xl: "1rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        "text-glow": {
          "0%, 100%": {
            textShadow: "0 0 8px rgba(56, 189, 248, 0.3), 0 0 4px rgba(255, 255, 255, 0.2)",
          },
          "50%": {
            textShadow: "0 0 16px rgba(56, 189, 248, 0.4), 0 0 8px rgba(255, 255, 255, 0.3)",
          },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" }
        },
        "border-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 0 rgba(56, 189, 248, 0)",
            borderColor: "rgba(148, 163, 184, 0.2)"
          },
          "50%": { 
            boxShadow: "0 0 10px rgba(56, 189, 248, 0.5)",
            borderColor: "rgba(56, 189, 248, 0.5)"
          }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: "gradient 15s ease infinite",
        "text-glow": "text-glow 2s ease-in-out infinite",
        "spin-slow": "spin-slow 3s linear infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "border-glow": "border-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
