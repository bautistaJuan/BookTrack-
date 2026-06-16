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
          DEFAULT: "#ffffff",
          50: "#ffffff",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },

        secondary: {
          DEFAULT: "#2f2f2f",
          light: "#373737",
        },

        accent: {
          DEFAULT: "#2383e2",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2383e2",
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
          DEFAULT: "#191919",
          secondary: "#202020",
        },

        background: "#191919",

        border: {
          DEFAULT: "#2f2f2f",
          light: "#373737",
        },

        text: {
          primary: "#ffffff",
          secondary: "#a3a3a3",
          muted: "#737373",
        },
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "24px",
      },
      boxShadow: {
        soft: "0 2px 10px rgb(0 0 0 / 0.25)",
        "soft-md": "0 8px 20px rgb(0 0 0 / 0.35)",
        "soft-lg": "0 12px 40px rgb(0 0 0 / 0.45)",
        "soft-xl": "0 20px 60px rgb(0 0 0 / 0.55)",

        glow: "0 0 25px rgb(124 58 237 / 0.35)",
        "glow-accent": "0 0 25px rgb(245 158 11 / 0.35)",
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
