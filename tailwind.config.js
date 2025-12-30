/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./**/*.{html,js}"],
  theme: {
    extend: {

      fontFamily: {

        'display': ['Playfair Display', 'serif'],
        'cormorant': ['Cormorant Garamond', 'serif'],
        'lato': ['Lato', 'system-ui', 'sans-serif'],

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

