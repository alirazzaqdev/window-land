import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0a0a0a',
          'black-alt': '#080808',
          'black-card': '#0f0f0f',
          gold: '#c9a84c',
          'gold-dim': 'rgba(201,168,76,0.15)',
          'gold-border': 'rgba(201,168,76,0.2)',
          'text-primary': '#ffffff',
          'text-secondary': '#e8e0d0',
          'text-muted': '#7a7060',
          'text-faint': '#4a4030',
        },
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display-xl': ['64px', { lineHeight: '1.0', letterSpacing: '-2px', fontWeight: '300' }],
        'display-lg': ['48px', { lineHeight: '1.05', letterSpacing: '-1px', fontWeight: '300' }],
        'display-md': ['38px', { lineHeight: '1.1', letterSpacing: '-0.5px', fontWeight: '300' }],
        heading: ['22px', { lineHeight: '1.3', fontWeight: '500' }],
        label: ['10px', { lineHeight: '1', letterSpacing: '4px', fontWeight: '400' }],
        body: ['14px', { lineHeight: '1.75', fontWeight: '300' }],
        'body-sm': ['13px', { lineHeight: '1.65', fontWeight: '300' }],
        caption: ['11px', { lineHeight: '1.5', fontWeight: '400' }],
      },
      spacing: {
        section: '80px',
        'section-sm': '60px',
      },
      animation: {
        ticker: 'ticker 25s linear infinite',
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'gold-pulse': 'goldPulse 2s ease-in-out infinite',
        bounce: 'bounce 1s infinite',
      },
      keyframes: {
        ticker: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        goldPulse: {
          '0%,100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
      },
    },
  },
  plugins: [],
}

export default config
