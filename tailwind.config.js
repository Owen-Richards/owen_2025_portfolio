/** @type {import('tailwindcss').Config} */
const formsPlugin = require('@tailwindcss/forms');
const typographyPlugin = require('@tailwindcss/typography');

module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      spacing: {
        4.5: '1.125rem',
        18: '4.5rem',
        72: '18rem',
        84: '21rem',
        96: '24rem',
        128: '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
        content: 'var(--max-width)',
      },
      zIndex: {
        canvas: 'var(--z-canvas)',
        content: 'var(--z-content)',
        navigation: 'var(--z-navigation)',
        modal: 'var(--z-modal)',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        mono: [
          'Fira Code',
          'SF Mono',
          'Monaco',
          'Inconsolata',
          'Roboto Mono',
          'source-code-pro',
          'Menlo',
          'Consolas',
          'Liberation Mono',
          'monospace',
        ],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': [
          'clamp(2.5rem, 5vw, 4.5rem)',
          { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' },
        ],
        'display-md': [
          'clamp(2rem, 4vw, 3.25rem)',
          { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '600' },
        ],
        'display-sm': [
          'clamp(1.75rem, 3.5vw, 2.5rem)',
          { lineHeight: '1.2', letterSpacing: '-0.015em', fontWeight: '600' },
        ],
        'heading-lg': [
          'clamp(1.375rem, 3vw, 1.875rem)',
          { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' },
        ],
        'heading-md': [
          'clamp(1.25rem, 2.5vw, 1.5rem)',
          { lineHeight: '1.4', letterSpacing: '-0.005em', fontWeight: '500' },
        ],
        'heading-sm': [
          'clamp(1.125rem, 2vw, 1.25rem)',
          { lineHeight: '1.45', letterSpacing: '0em', fontWeight: '500' },
        ],
        'body-lg': [
          '1.125rem',
          { lineHeight: '1.65', letterSpacing: '-0.005em', fontWeight: '400' },
        ],
        'body-md': [
          '1rem',
          { lineHeight: '1.65', letterSpacing: '-0.005em', fontWeight: '400' },
        ],
        'body-sm': [
          '0.875rem',
          { lineHeight: '1.6', letterSpacing: '0em', fontWeight: '400' },
        ],
      },
      letterSpacing: {
        'tight-2': '-0.025em',
        'tight-1': '-0.02em',
        'normal-1': '-0.015em',
        'normal-2': '-0.01em',
        'normal-3': '-0.005em',
      },
      lineHeight: {
        'tight-1': '1.1',
        'tight-2': '1.15',
        'snug-1': '1.2',
        'snug-2': '1.25',
        'normal-1': '1.3',
        'normal-2': '1.35',
        'normal-3': '1.4',
        'normal-4': '1.45',
        'relaxed-1': '1.6',
        'relaxed-2': '1.65',
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        medium: 'var(--shadow-medium)',
        strong: 'var(--shadow-strong)',
        glass: 'var(--glass-shadow)',
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        float: 'float 4s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        shimmer: 'shimmer 2.5s infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        bounce: 'bounce 1s infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(40px) scale(0.95)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-8px) rotate(1deg)' },
          '50%': { transform: 'translateY(-12px) rotate(0deg)' },
          '75%': { transform: 'translateY(-8px) rotate(-1deg)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px hsl(var(--primary) / 0.3)' },
          '100%': { boxShadow: '0 0 40px hsl(var(--primary) / 0.6)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(100%)', opacity: '0' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        pulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        bounce: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '40%, 43%': { transform: 'translate3d(0, -15px, 0)' },
          '70%': { transform: 'translate3d(0, -8px, 0)' },
          '90%': { transform: 'translate3d(0, -3px, 0)' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
      },
    },
  },
  plugins: [
    formsPlugin({
      strategy: 'class', // Use class-based strategy for better compatibility
    }),
    typographyPlugin({
      className: 'prose', // Custom class name for typography
    }),
  ],
};
