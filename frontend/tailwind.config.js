/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'bt-cyan':      '#3dd6c8',
        'bt-teal':      '#2d7a8a',
        'bt-cyan-light':'#6ee8dd',
        'bt-teal-dark': '#1e5a68',
        'bg-primary':   '#050e12',
        'bg-secondary': '#0a1a20',
        'bg-card':      '#0f2229',
        brand: {
          50: '#eef7ff',
          100: '#d9edff',
          200: '#bcdfff',
          300: '#8ecbff',
          400: '#3dd6c8', // Mapping brand-400 to bt-cyan for compatibility
          500: '#2d7a8a', // Mapping brand-500 to bt-teal for compatibility
          600: '#1e5a68',
          700: '#1458e1',
          800: '#1747b6',
          900: '#193f8f',
          950: '#132660',
        },
        accent: { DEFAULT: '#3dd6c8', dark: '#2d7a8a' },
        surface: { DEFAULT: '#050e12', card: '#0f2229', border: '#1f2937' },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-sans)', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      fontSize: {
        'xs': ['0.875rem', { lineHeight: '1.25rem' }],
        'sm': ['0.9375rem', { lineHeight: '1.5rem' }],
        'base': ['1.0625rem', { lineHeight: '1.75rem' }],
        'lg': ['1.1875rem', { lineHeight: '1.875rem' }],
        'xl': ['1.3125rem', { lineHeight: '1.875rem' }],
        '2xl': ['1.5625rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.375rem', { lineHeight: '2.75rem' }],
        '5xl': ['3rem', { lineHeight: '1.2' }],
        '6xl': ['3.75rem', { lineHeight: '1.15' }],
        '7xl': ['4.5rem', { lineHeight: '1.1' }],
        '8xl': ['5.5rem', { lineHeight: '1.05' }],
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
