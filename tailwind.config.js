/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./ui-src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        glow: [
          "0 0px 5px rgba(255,255, 255, 0.75)",
          "0 0px 5px rgba(255, 255,255, 0.2)",
        ],
        glowMedium: [
          "0 0px 1px rgba(255,255, 255, 0.75)",
          "0 0px 1px rgba(255, 255,255, 0.75)",
        ],
        glowSmall: [
          "0 0px 1px rgba(255,255, 255, 0.05)",
          "0 0px 1px rgba(255, 255,255, 0.2)",
        ],
      },
      colors: {
        strokeBlue: "#002DFF",
        buttonBlue1: "#2246EE",
        buttonBlue2: "#2B7FFF",
      },
    },
  },
  plugins: [],
};
