/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // 2025 Multi-tonal, soothing color palette
        primary: {
          50: '#f8f7f6',
          100: '#f0eeed',
          200: '#e1ddd9',
          300: '#ccc5bf',
          400: '#b3a99f',
          500: '#9c8f82',
          600: '#8a7a6b',
          700: '#726659',
          800: '#5f544a',
          900: '#4f463e',
        },
        secondary: {
          50: '#faf9f7',
          100: '#f4f2ef',
          200: '#e7e3de',
          300: '#d6cfc6',
          400: '#c1b6a8',
          500: '#ab9c8a',
          600: '#978570',
          700: '#7d6d5c',
          800: '#67594d',
          900: '#554a41',
        },
        accent: {
          50: '#f7f6f3',
          100: '#efeee7',
          200: '#dddacf',
          300: '#c5c0b0',
          400: '#aaa189',
          500: '#95856b',
          600: '#837153',
          700: '#6b5d45',
          800: '#594e3b',
          900: '#4a4233',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        // Bold expressive typography
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia'],
        display: ['Bebas Neue', 'ui-sans-serif', 'system-ui'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
      },
      fontSize: {
        'display-lg': ['6rem', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display-md': ['4.5rem', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'display-sm': ['3.5rem', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(156, 143, 130, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(156, 143, 130, 0.6)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
};
