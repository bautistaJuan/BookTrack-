/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
      },
      colors: {
        primary: {
          DEFAULT: "#22c55e",
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
        secondary: {
          DEFAULT: "#86efac",
          light: "#bbf7d0",
        },
        accent: {
          DEFAULT: "#f97316",
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
        },
        danger: {
          DEFAULT: "#ef4444",
          light: "#fecaca",
        },
        surface: {
          DEFAULT: "#ffffff",
          secondary: "#f8fafc",
        },
        background: "#f8fafc",
        border: {
          DEFAULT: "#e2e8f0",
          light: "#f1f5f9",
        },
        text: {
          primary: "#0f172a",
          secondary: "#475569",
          muted: "#94a3b8",
        },
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      boxShadow: {
        soft: "0 2px 10px 0 rgb(0 0 0 / 0.05)",
        "soft-md": "0 4px 20px 0 rgb(0 0 0 / 0.08)",
        "soft-lg": "0 10px 40px -10px rgb(0 0 0 / 0.1)",
        "soft-xl": "0 20px 50px -15px rgb(0 0 0 / 0.15)",
        glow: "0 0 20px 0 rgb(34 197 94 / 0.3)",
        "glow-accent": "0 0 20px 0 rgb(249 115 22 / 0.3)",
      },
      animation: {
        float: "float 3s ease-in-out infinite",
        "pulse-soft": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "bounce-slow": "bounce 2s infinite",
        "fade-in": "fadeIn 0.5s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
      transitionDuration: {
        250: "250ms",
        400: "400ms",
      },
    },
  },
  plugins: [],
};
