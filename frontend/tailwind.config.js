/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      keyframes: {
        "approach-right": {
          "0%": { width: '0' },
          "100%": { width: '100%' }
        },
        "approach-left": {
          "0%": { width: '100%' },
          "100%": { width: '0' }
        },
        "show-out": {
          '0%': { opacity: "0" },
          '100%': { opacity: "100%" }
        },
      },
      animation: {
        "approach-right": "approach-right 0.6s ease-in-out",
        "approach-left": "approach-left 5s linear",
        "show-out": "show-out 0.8s ease-in-out",
      }
    },
  },
  plugins: [],
}
