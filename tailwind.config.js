/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f9f4da",
      },
      fontFamily: {
        principal: ["Outfit", "sans-serif"],
        secundario: ["Racing Sans One", "cursive"],
      },
      animation: {
        ["pulse-slow"]: "pulse 6s infinite cubic-bezier(0.4, 0, 0.6, 1)",
        ["infinite-slider"]: "infiniteSlider 30s linear infinite",
        slide: "slide 3.5s linear infinite",
      },
      keyframes: {
        infiniteSlider: {
          "0%": { transform: "translateX(0)" },
          "100%": {
            transform: "translateX(calc(-100px * 5))",
          },
        },
        slide: {
          "0%": { transform: "translateY(100%)", opacity: 0.1 },
          "15%": { transform: "translateY(0)", opacity: 1 },
          "30%": { transform: "translateY(0)", opacity: 1 },
          "45%": { transform: "translateY(-100%)", opacity: 1 },
          "100%": { transform: "translateY(-100%)", opacity: 0.1 },
        },
      },
    },
    plugins: [],
  },
};
