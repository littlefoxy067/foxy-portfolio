import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00e5ff',
        'neon-magenta': '#ff00ff',
        'neon-yellow': '#ffff00',
        'dark-bg': '#050508',
        'dark-surface': '#0d0d18',
        'dark-elevated': '#131325',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'scan': 'scan 4s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
      boxShadow: {
        'neon-cyan': '0 0 20px rgba(0,229,255,0.4), 0 0 40px rgba(0,229,255,0.2)',
        'neon-magenta': '0 0 20px rgba(255,0,255,0.4), 0 0 40px rgba(255,0,255,0.2)',
      },
    },
  },
  plugins: [],
} satisfies Config;
