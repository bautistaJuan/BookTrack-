/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2F855A", // Verde oscuro (botones, encabezados)
        secondary: "#68D391", // Verde suave (resaltados, hover)
        accent: "#F6AD55", // Naranja cálido (para botones de acción, progreso)
        danger: "#E53E3E", // Rojo suave (borrar, advertencias)
        background: "#F7FAFC", // Fondo base
        surface: "#FFFFFF", // Tarjetas, modales
        border: "#E2E8F0", // Líneas, contenedores
        textPrimary: "#1A202C", // Texto fuerte
        textSecondary: "#4A5568", // Texto más suave
      },
    },
  },
  plugins: [],
};
