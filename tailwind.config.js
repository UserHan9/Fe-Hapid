/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-purple":"#436850",
        'light-white': 'rgba(255,255,255,0.18)'
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui : {
    theme: ["light", "dark"],
  },
}