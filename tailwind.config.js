/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        raleway: "'Raleway', sans-serif",
        montserrat: "'Montserrat', sans-serif",
        source: " 'Source Sans 3', sans-serif",
        open: "'Open Sans', sans-serif",
      }
    },
  },
  plugins: [require("daisyui", "tw-elements/dist/plugin.cjs")],
}

