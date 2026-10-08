/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'media',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '320px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      fontSize: {
        'clamp-h1': ['clamp(2.25rem, 6vw, 6rem)', { lineHeight: '1.04' }],
        'clamp-h2': ['clamp(1.875rem, 4vw, 2.25rem)', { lineHeight: '1.2' }],
      },
      colors: {
        canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ink: 'rgb(var(--color-ink) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        subtle: 'rgb(var(--color-subtle) / <alpha-value>)',
        panel: 'rgb(var(--color-panel) / <alpha-value>)',
        soft: 'rgb(var(--color-soft) / <alpha-value>)',
      },
    },
  },
  plugins: [],
}
