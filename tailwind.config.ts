
import type { Config } from "tailwindcss";

export default {
  darkMode: "class", // make sure dark mode uses class
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
      colors: {
        border: "#292c36",
        input: "#232635",
        ring: "#1A1F2C",
        background: "#10131A", // Very dark background
        foreground: "#FFFFFF", // White text
        primary: {
          DEFAULT: "#181728",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#35346c",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#D6BCFA",
          foreground: "#1A1F2C",
        },
        destructive: {
          DEFAULT: "#e3342f",
          foreground: "#FFF",
        },
        muted: {
          DEFAULT: "#22223b",
          foreground: "#8E9196",
        },
        popover: {
          DEFAULT: "#232635",
          foreground: "#FFFFFF"
        },
        card: {
          DEFAULT: "#16182b",
          foreground: "#FFFFFF"
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
            textShadow: "0 0 8px #D6BCFA,0 0 4px #FFF",
          },
          "50%": {
            textShadow: "0 0 24px #D6BCFA,0 0 16px #FFF",
          },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: "gradient 15s ease infinite",
        "text-glow": "text-glow 2s ease-in-out infinite",
        "spin-slow": "spin-slow 3s linear infinite",
        "fade-in": "fade-in 0.5s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

