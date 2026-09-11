export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      fontSize: {
        'clamp-h1': 'clamp(1.5rem, 5vw, 3.75rem)',
        'clamp-h2': 'clamp(1.25rem, 4vw, 2.25rem)',
      },
    },
  },
  plugins: [],
}