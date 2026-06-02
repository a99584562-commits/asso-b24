/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        // Аврора · стекло — grotesk headings
        display: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
        sans: ['"Plus Jakarta Sans"', "system-ui", "sans-serif"],
      },
      colors: {
        // remapped to the Aurora-glass palette (names kept for zero-churn)
        cream: "#F3F6FD", // light glass base / dark-panel text
        sand: "#E6ECF8",
        clay: "#D8E1F2",
        espresso: "#0F1729", // primary dark text / solid CTA
        bark: "#241F47", // deep indigo glass panels
        umber: "#51607A", // secondary text (slate-600)
        gold: "#7C3AED",
        ember: "#7C3AED", // primary accent (violet)
        sage: "#10B981", // success (emerald)
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
