/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'aeonik': ['Aeonik', 'sans-serif'],
      'aeonik-bold': ['Aeonik-Bold', 'sans-serif'],
      'sans':['Instrument Sans', 'ui-sans-serif', 'system-ui'],
    },
    extend: {},
  },
  plugins: [],
}

