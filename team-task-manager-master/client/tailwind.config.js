/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        void: {
          50: '#f8fafc',
          100: '#eef2f7',
          200: '#d9e2ef',
          300: '#b6c5d8',
          400: '#8093ad',
          500: '#536278',
          600: '#354154',
          700: '#1f2937',
          800: '#111827',
          900: '#070a12',
          950: '#03040a',
        },
        primary: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        neon: {
          violet: '#8b5cf6',
          cyan: '#22d3ee',
          pink: '#ec4899',
          emerald: '#34d399',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px rgba(139, 92, 246, 0.28)',
        'glow-cyan': '0 0 36px rgba(34, 211, 238, 0.2)',
        'panel': '0 24px 80px rgba(0, 0, 0, 0.32)',
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)',
        'aurora':
          'radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.24), transparent 28%), radial-gradient(circle at 82% 18%, rgba(34, 211, 238, 0.16), transparent 26%), linear-gradient(135deg, rgba(3, 4, 10, 1), rgba(17, 24, 39, 1))',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-700px 0' },
          '100%': { backgroundPosition: '700px 0' },
        },
        gridMove: {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '64px 64px' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.8s linear infinite',
        'grid-move': 'gridMove 22s linear infinite',
        'gradient-shift': 'gradientShift 12s ease infinite',
      },
    },
  },
  plugins: [],
};
