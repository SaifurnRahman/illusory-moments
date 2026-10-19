export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#d4af37', light: '#e6c280', dark: '#a8841f' },
        ink: { 900: '#080808', 800: '#111111', 700: '#1a1a1a' },
      },
      fontFamily: {
        display: ['Cinzel', '"Hind Siliguri"', 'system-ui', 'sans-serif'],
        body: ['"Hind Siliguri"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
