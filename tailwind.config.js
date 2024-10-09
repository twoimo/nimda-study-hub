/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39ff14',
        'neon-blue': '#00ffff',
        'neon-pink': '#ff00ff',
      },
      fontFamily: {
        'code': ['Fira Code', 'monospace'],
      },
    },
  },
  plugins: [],
}