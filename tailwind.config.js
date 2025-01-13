/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14005C",
        secondary: "#01E8E8",
        greenCategory: "#28A745",
        yellowCategory: "#FFC107",
        redCategory: "#DC3545",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"],
      },
    },
  },
  plugins: [import("@tailwindcss/typography")],
};
