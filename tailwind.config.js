/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["var(--font-jakarta)", "sans-serif"],
        playfair: ["var(--font-playfair)", "serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#235347",
          50: "#EDF8EF",
          100: "#DAF1DE",
          200: "#B5D4BF",
          300: "#8EB69B",
          400: "#5A9A80",
          500: "#235347",
          600: "#1D4A3F",
          700: "#173E33",
          800: "#0D3028",
          900: "#051F20",
        },
        secondary: {
          DEFAULT: "#8EB69B",
          light: "#DAF1DE",
        },
        accent: {
          DEFAULT: "#8EB69B",
          50: "#F2F9F4",
          100: "#DAF1DE",
          200: "#B5D4BF",
          300: "#8EB69B",
          400: "#6A9E7E",
          500: "#4A8565",
          600: "#235347",
        },
        danger: {
          DEFAULT: "#ef4444",
          light: "#fecaca",
        },
        warning: {
          DEFAULT: "#f59e0b",
          light: "#fef3c7",
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
          primary: "#051F20",
          secondary: "#235347",
          muted: "#8EB69B",
        },
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      boxShadow: {
        soft: "0 2px 10px 0 rgb(5 31 32 / 0.05)",
        "soft-md": "0 4px 20px 0 rgb(5 31 32 / 0.08)",
        "soft-lg": "0 10px 40px -10px rgb(5 31 32 / 0.1)",
        "soft-xl": "0 20px 50px -15px rgb(5 31 32 / 0.15)",
        glow: "0 0 20px 0 rgb(35 83 71 / 0.3)",
        "glow-accent": "0 0 20px 0 rgb(142 182 155 / 0.3)",
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
