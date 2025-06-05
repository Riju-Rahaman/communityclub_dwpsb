
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
        playfair: ['Playfair Display', 'serif'],
      },
      colors: {
        background: "#0a0a0f",
        foreground: "#f8fafc",
        primary: {
          DEFAULT: "#0f172a",
          foreground: "#f8fafc",
        },
        secondary: {
          DEFAULT: "#a855f7",
          foreground: "#f8fafc",
        },
        card: {
          DEFAULT: "rgba(15, 23, 42, 0.7)",
          foreground: "#f8fafc",
        },
        popover: {
          DEFAULT: "rgba(15, 23, 42, 0.8)",
          foreground: "#f8fafc",
        },
        muted: {
          DEFAULT: "#1e293b",
          foreground: "#94a3b8",
        },
        accent: {
          DEFAULT: "#06b6d4",
          foreground: "#0f172a",
        },
        border: "rgba(148, 163, 184, 0.2)",
        input: "rgba(15, 23, 42, 0.5)",
        ring: "#06b6d4",
      },
      borderRadius: {
        lg: "1rem",
        md: "calc(1rem - 2px)",
        sm: "calc(1rem - 4px)",
        xl: "1.25rem",
        "2xl": "1.5rem",
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
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "text-glow": {
          "0%, 100%": {
            textShadow: "0 0 20px rgba(6, 182, 212, 0.5), 0 0 30px rgba(6, 182, 212, 0.3)",
          },
          "50%": {
            textShadow: "0 0 30px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.5)",
          },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "border-glow": {
          "0%, 100%": { 
            boxShadow: "0 0 0 rgba(6, 182, 212, 0)",
            borderColor: "rgba(148, 163, 184, 0.2)"
          },
          "50%": { 
            boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
            borderColor: "rgba(6, 182, 212, 0.5)"
          }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": {
            textShadow: "0 0 20px rgba(6, 182, 212, 0.5), 0 0 30px rgba(6, 182, 212, 0.3)",
          },
          "100%": {
            textShadow: "0 0 30px rgba(6, 182, 212, 0.8), 0 0 40px rgba(6, 182, 212, 0.5)",
          },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: "gradient 8s ease infinite",
        "text-glow": "text-glow 3s ease-in-out infinite alternate",
        "spin-slow": "spin-slow 8s linear infinite",
        "fade-in": "fade-in 0.6s ease-out",
        "border-glow": "border-glow 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite alternate",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
