/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Noto Sans', 'Ubuntu', 'Cantarell', 'Helvetica Neue', 'Arial', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'],
      },
      letterSpacing: {
        'tight-0.3': '-0.01em',
      },
      colors: {
        ink: {
          1: '#0b0b0c',
        }
      }
    },
  },
  plugins: [],
}
