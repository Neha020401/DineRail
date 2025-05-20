/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        train: '#1e3a8a', // Indigo-800
        'train-dark': '#1e293b', // Slate-800
      },
      animation: {
        'train-move': 'moveTrain 10s linear infinite',
      },
      keyframes: {
        moveTrain: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
