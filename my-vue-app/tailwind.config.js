/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-navy': 'var(--primary-navy)',
        'accent-blue': 'var(--accent-blue)',
        'accent-gold': 'var(--accent-gold)',
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'border-light': 'var(--border-light)',
      },
      spacing: {
        'space-xs': 'var(--space-xs)',
        'space-sm': 'var(--space-sm)',
        'space-md': 'var(--space-md)',
        'space-lg': 'var(--space-lg)',
        'space-xl': 'var(--space-xl)',
      },
      fontSize: {
        'fs-small': 'var(--fs-small)',
        'fs-body': 'var(--fs-body)',
        'fs-h3': 'var(--fs-h3)',
        'fs-h2': 'var(--fs-h2)',
        'fs-h1': 'var(--fs-h1)',
      },
      fontFamily: {
        'heading': 'var(--font-heading)',
        'mono': 'var(--font-mono)',
      },
      transitionDuration: {
        'fast': 'var(--transition-fast)',
      },
      borderRadius: {
        'custom': '12px',
      },
      boxShadow: {
        'soft': '0 4px 16px rgba(0, 0, 0, 0.1)',
        'medium': '0 8px 25px rgba(0, 0, 0, 0.15)',
        'strong': '0 12px 35px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
}