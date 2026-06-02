/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#FBF8F2",
        sand: "#F1EADD",
        clay: "#E6D9C5",
        espresso: "#241B12",
        bark: "#3D2F20",
        umber: "#5C4A33",
        gold: "#B07B3C",
        ember: "#C2622C",
        sage: "#6E7A5E",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
      keyframes: {
        floatUp: {
          "0%": { opacity: "0", transform: "translateY(28px)", filter: "blur(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)", filter: "blur(0)" },
        },
      },
      animation: {
        floatUp: "floatUp 0.9s cubic-bezier(0.32,0.72,0,1) both",
      },
    },
  },
  plugins: [],
};
