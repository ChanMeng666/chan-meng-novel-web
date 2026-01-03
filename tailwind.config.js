/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Source Han Serif SC"', '"Songti SC"', 'serif'],
        sans: ['"Noto Sans SC"', '"Source Han Sans SC"', '"PingFang SC"', 'sans-serif'],
      },
      colors: {
        book: {
          cover: '#8B4513',
          spine: '#654321',
          paper: '#FDF5E6',
          text: '#2C1810',
          accent: '#D4A574',
        },
      },
    },
  },
  plugins: [],
}
