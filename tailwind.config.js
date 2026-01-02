/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./**/*.{html,js}"],
  theme: {
    extend: {

      fontFamily: {

        'display': ['Cormorant Garamond', 'serif'],
        'montserrat': ['Montserrat', 'system-ui', 'sans-serif'],

      },

      colors:{

        'headerbg': '#FDFBF7',
        'headerbgalt': '#F2EFE9',
        'maintext': '#4A4A4A',
        'cta-gold': '#A68A64',
        'cta-gold-hover': '#8C9387',
        'borders-shadow': '#E7E2D6'
      },

      backgroundImage: {
        'hero':'url("../img/hero-bg.webp")',
      }
    },
    plugins: [],
  }
}

