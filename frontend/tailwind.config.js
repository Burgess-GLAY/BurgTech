/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#bcdfff',
          300: '#8ecbff',
          400: '#59aeff',
          500: '#338fff',
          600: '#1a6ef5',
          700: '#1458e1',
          800: '#1747b6',
          900: '#193f8f',
          950: '#132660',
        },
        accent: { DEFAULT: '#00d9ff', dark: '#00b8d9' },
        surface: { DEFAULT: '#0a0f1e', card: '#111827', border: '#1f2937' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.72rem', { lineHeight: '1.125rem' }],
        'sm': ['0.8125rem', { lineHeight: '1.375rem' }],
        'base': ['0.9375rem', { lineHeight: '1.625rem' }],
        'lg': ['1.0625rem', { lineHeight: '1.75rem' }],
        'xl': ['1.1875rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.375rem', { lineHeight: '1.875rem' }],
        '3xl': ['1.75rem', { lineHeight: '2.125rem' }],
        '4xl': ['2.125rem', { lineHeight: '2.5rem' }],
        '5xl': ['2.625rem', { lineHeight: '1.15' }],
        '6xl': ['3.25rem', { lineHeight: '1.1' }],
        '7xl': ['4rem', { lineHeight: '1.05' }],
        '8xl': ['5rem', { lineHeight: '1' }],
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        glowPulse: { '0%,100%': { boxShadow: '0 0 20px rgba(0,217,255,0.15)' }, '50%': { boxShadow: '0 0 40px rgba(0,217,255,0.35)' } },
      },
    },
  },
  plugins: [],
}
