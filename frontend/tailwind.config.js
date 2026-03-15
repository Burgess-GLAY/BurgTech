/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#eef7ff',
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
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'fade-up':    'fadeUp 0.5s ease-out forwards',
        'fade-in':    'fadeIn 0.4s ease-out forwards',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp:    { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        glowPulse: { '0%,100%': { boxShadow: '0 0 20px rgba(0,217,255,0.15)' }, '50%': { boxShadow: '0 0 40px rgba(0,217,255,0.35)' } },
      },
    },
  },
  plugins: [],
}
