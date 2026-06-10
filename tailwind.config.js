/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        night:   '#040d08',
        void:    '#07110c',
        deep:    '#0c1d14',
        forest:  '#12301e',
        emerald: '#1a5c38',
        gem:     '#287a4f',
        gold:    '#c49a3c',
        'gold-hi':'#e0b85a',
        'gold-lo':'#7a5c20',
        ivory:   '#f4efe4',
        sand:    '#ece3d0',
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        body:    ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        arabic:  ['var(--font-noto-arabic)', 'serif'],
      },
    },
  },
  plugins: [],
}
