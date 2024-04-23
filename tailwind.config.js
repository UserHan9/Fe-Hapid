/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '376px',
      // => @media (min-width: 576px) { ... }

      md: '960px',
      // => @media (min-width: 960px) { ... }

      lg: '1240px',
      // => @media (min-width: 1440px) { ... }
    },
    extend: {
      colors: {
        'dark-purple': '#436850',
        'light-white': 'rgba(255,255,255,0.18)',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    theme: ['light', 'dark'],
  },
};
