/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        aura: {
          olive: "#6d7254",
          deep: "#3f4631",
          cream: "#efe6dc",
          blush: "#ddc7ba",
          clay: "#aa7258",
          mist: "#f7f1eb"
        }
      },
      fontFamily: {
        primary: ["Cairo", "Inter", "system-ui", "sans-serif"],
        display: ["'Cormorant Garamond'", "Georgia", "Cambria", "serif"],
        script: ["Trebuchet MS", "Cairo", "sans-serif"]
      },
      boxShadow: {
        glow: "0 20px 70px rgba(239, 230, 220, 0.13)",
        soft: "0 22px 50px rgba(39, 44, 32, 0.18)"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        }
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        fadeUp: "fadeUp 650ms ease both"
      }
    }
  },
  plugins: []
};
