/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#007A33',      // Dark Green
        'secondary': '#A4DE7C',    // Light Green
        'accent': '#D2F4C3',       // Lighter Green
        'highlight': '#BFFF00',    // Lime Green
        'warning': '#FFA500',      // Orange
        'muted': '#F0F0F0',        // Muted Gray
        'border': '#E5E5E5',       // Light Gray
        'text': '#000000',         // Black
        'text-secondary': '#1A1A1A' // Dark Gray
      },
      boxShadow: {
        'primary': '0 0 15px rgba(0, 122, 51, 0.3)',
        'secondary': '0 0 15px rgba(164, 222, 124, 0.4)',
      },
      backgroundImage: {
        'gradient-green': 'linear-gradient(135deg, #A4DE7C 0%, #D2F4C3 100%)',
      }
    },
  },
  plugins: [],
}

