/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./ui-src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        strokeBlue: "#002DFF",
      },
    },
  },
  plugins: [],
};
