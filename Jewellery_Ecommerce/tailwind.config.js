/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        luxury: {
          black: '#0a0a0a',
          gold: '#f8d77e',
          deepgold: '#b98221',
        },
      },
    },
  },
  plugins: [],
}
