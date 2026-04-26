/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      'sm': '480px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontSize: {
        'display': ['clamp(2rem, 5vw + 1rem, 5rem)', { lineHeight: '1.1' }],
        'h1': ['clamp(1.75rem, 4vw, 3.5rem)', { lineHeight: '1.2' }],
        'h2': ['clamp(1.5rem, 3vw, 2.75rem)', { lineHeight: '1.2' }],
        'h3': ['clamp(1.25rem, 2.5vw, 2rem)', { lineHeight: '1.3' }],
        'h4': ['clamp(1.1rem, 2vw, 1.5rem)', { lineHeight: '1.3' }],
        'body': ['clamp(0.9rem, 1.5vw, 1.125rem)', { lineHeight: '1.6' }],
        'small': ['clamp(0.75rem, 1vw, 0.875rem)', { lineHeight: '1.5' }],
        'button': ['clamp(0.85rem, 1.2vw, 1rem)', { lineHeight: '1.5' }],
      },
      spacing: {
        'xs': 'var(--space-xs)',
        'sm': 'var(--space-sm)',
        'md': 'var(--space-md)',
        'lg': 'var(--space-lg)',
        'xl': 'var(--space-xl)',
        '2xl': 'var(--space-2xl)',
      },
      colors: {
        luxury: {
          black: '#0a0a0a',
          gold: '#f8d77e',
          deepgold: '#b98221',
        },
      },
    },
  },
  plugins: [],
}
