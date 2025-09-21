/**
 * Theme Tokens - Static Design System
 * Professional design tokens for Owen's 2025 Portfolio
 */

export type ThemeMode = 'light' | 'dark';

// Base design tokens
export const SPACING = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '2.5rem',
  '3xl': '3rem',
  '4xl': '4rem',
  '5xl': '5rem',
  '6xl': '6rem',
} as const;

export const TYPOGRAPHY = {
  // Font sizes
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
  },
  // Line heights
  lineHeight: {
    tight: '1.1',
    snug: '1.3',
    normal: '1.5',
    relaxed: '1.6',
    loose: '1.65',
  },
  // Letter spacing
  letterSpacing: {
    tighter: '-0.02em',
    tight: '-0.01em',
    normal: '-0.008em',
    wide: '-0.005em',
  },
  // Font weights
  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
} as const;

export const SHADOWS = {
  soft: '0 2px 16px rgba(30, 41, 59, 0.03)',
  medium: '0 4px 32px rgba(30, 41, 59, 0.05)',
  strong: '0 8px 48px rgba(30, 41, 59, 0.08)',
  glass: '0 20px 40px rgba(30, 41, 59, 0.04)',
} as const;

export const BORDER_RADIUS = {
  sm: '0.375rem',
  md: '0.5rem',
  lg: '0.75rem',
  xl: '1rem',
  '2xl': '1.25rem',
  full: '9999px',
} as const;

// Component style definitions
export const BUTTON_VARIANTS = {
  primary: {
    base: 'px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 shadow-[var(--shadow-soft)]',
    light: 'bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-800',
    dark: 'bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-200',
  },
  secondary: {
    base: 'px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 shadow-[var(--shadow-soft)]',
    light:
      'bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-200',
    dark: 'bg-slate-700 text-slate-200 hover:bg-slate-600 focus:ring-slate-700',
  },
  outline: {
    base: 'px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 border-2',
    light:
      'border-slate-300 text-slate-700 hover:bg-slate-50 focus:ring-slate-300',
    dark: 'border-slate-600 text-slate-300 hover:bg-slate-800 focus:ring-slate-600',
  },
  ghost: {
    base: 'px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 bg-transparent border border-transparent hover:scale-105',
    light: 'text-slate-700 hover:border-slate-300 hover:text-slate-900',
    dark: 'text-slate-300 hover:border-slate-600 hover:text-slate-100',
  },
  cta: {
    base: 'px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-medium)]',
    light: 'bg-slate-800 text-white hover:bg-slate-700 focus:ring-slate-800',
    dark: 'bg-slate-200 text-slate-900 hover:bg-slate-300 focus:ring-slate-200',
  },
} as const;

export const CARD_VARIANTS = {
  base: {
    base: 'backdrop-blur-md transition-all duration-300 hover:shadow-[var(--shadow-medium)]',
    light: 'bg-white/95 border border-slate-200/50',
    dark: 'bg-slate-800/95 border border-slate-700/50',
  },
  feature: {
    base: 'p-6 text-center space-y-3 hover:scale-[1.02] transition-all duration-300',
    light: 'bg-white/95 border border-slate-200/50 shadow-[var(--shadow-soft)]',
    dark: 'bg-slate-800/95 border border-slate-700/50 shadow-[var(--shadow-medium)]',
  },
  project: {
    base: 'overflow-hidden hover:scale-[1.01] transition-all duration-300 group',
    light: 'bg-white/95 border border-slate-200/50 shadow-[var(--shadow-soft)]',
    dark: 'bg-slate-800/95 border border-slate-700/50 shadow-[var(--shadow-medium)]',
  },
  glass: {
    base: 'backdrop-blur-sm p-6 hover:shadow-[var(--shadow-medium)] transition-all duration-300',
    light: 'bg-white/80 border border-slate-200/30',
    dark: 'bg-slate-800/80 border border-slate-700/30',
  },
} as const;

export const TEXT_VARIANTS = {
  hero: {
    base: 'font-bold leading-[0.95] tracking-[-0.02em] font-display',
    light: 'text-slate-900',
    dark: 'text-slate-100',
    size: 'text-5xl md:text-7xl',
  },
  heading: {
    base: 'font-bold leading-[1.1] tracking-[-0.01em] font-display',
    light: 'text-slate-900',
    dark: 'text-slate-100',
    size: 'text-3xl md:text-4xl',
  },
  subheading: {
    base: 'font-semibold leading-[1.3] tracking-[-0.005em] font-sans',
    light: 'text-slate-800',
    dark: 'text-slate-200',
    size: 'text-xl md:text-2xl',
  },
  body: {
    base: 'leading-[1.65] tracking-[-0.008em] font-sans',
    light: 'text-slate-700',
    dark: 'text-slate-300',
    size: 'text-base',
  },
  bodyLarge: {
    base: 'leading-[1.6] tracking-[-0.01em] font-sans',
    light: 'text-slate-700',
    dark: 'text-slate-300',
    size: 'text-lg',
  },
  muted: {
    base: 'font-sans tracking-[-0.008em]',
    light: 'text-slate-500',
    dark: 'text-slate-400',
    size: 'text-sm',
  },
  accent: {
    base: 'font-semibold font-sans tracking-[-0.008em]',
    light: 'text-slate-600',
    dark: 'text-slate-400',
    size: 'text-base',
  },
} as const;

export const LAYOUT_VARIANTS = {
  section: {
    base: 'relative py-20 md:py-24 overflow-hidden',
  },
  container: {
    base: 'relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12',
  },
  grid: {
    base: 'grid gap-8 md:gap-12',
  },
  centeredContent: {
    base: 'text-center max-w-4xl mx-auto',
  },
  hero: {
    base: 'min-h-screen flex items-center justify-center relative overflow-hidden',
  },
} as const;

export const FORM_VARIANTS = {
  input: {
    base: 'w-full px-6 py-4 rounded-2xl border-2 backdrop-blur-sm transition-all duration-400 hover:scale-[1.02] focus:scale-[1.02]',
    light:
      'border-slate-200 bg-white/50 text-slate-900 placeholder:text-slate-500 hover:border-slate-400 focus:border-slate-600',
    dark: 'border-slate-700 bg-slate-800/50 text-slate-100 placeholder:text-slate-400 hover:border-slate-500 focus:border-slate-400',
  },
  textarea: {
    base: 'w-full px-6 py-4 rounded-2xl border-2 backdrop-blur-sm resize-none transition-all duration-400 hover:scale-[1.02] focus:scale-[1.02]',
    light:
      'border-slate-200 bg-white/50 text-slate-900 placeholder:text-slate-500 hover:border-slate-400 focus:border-slate-600',
    dark: 'border-slate-700 bg-slate-800/50 text-slate-100 placeholder:text-slate-400 hover:border-slate-500 focus:border-slate-400',
  },
  label: {
    base: 'block font-semibold mb-3',
    light: 'text-slate-800',
    dark: 'text-slate-200',
    size: 'text-lg',
  },
} as const;

export const THEME_BACKGROUNDS = {
  light: {
    hero: 'bg-gradient-to-br from-slate-50 via-slate-100/30 to-slate-200/20',
    section: 'bg-gradient-to-b from-background to-slate-50/50',
    card: 'shadow-[var(--shadow-medium)]',
    accent: 'from-slate-600 to-slate-700',
    textShadow: 'drop-shadow-sm',
  },
  dark: {
    hero: 'bg-gradient-to-br from-slate-900 via-slate-800/30 to-slate-700/20',
    section: 'bg-gradient-to-b from-background to-slate-800/20',
    card: 'shadow-[var(--shadow-strong)]',
    accent: 'from-slate-300 to-slate-400',
    textShadow: 'drop-shadow-lg',
  },
} as const;

/**
 * Get theme-specific tokens
 */
export function getThemeTokens(themeMode: ThemeMode) {
  return {
    spacing: SPACING,
    typography: TYPOGRAPHY,
    shadows: SHADOWS,
    borderRadius: BORDER_RADIUS,
    buttons: BUTTON_VARIANTS,
    cards: CARD_VARIANTS,
    text: TEXT_VARIANTS,
    layout: LAYOUT_VARIANTS,
    backgrounds: THEME_BACKGROUNDS[themeMode],
    mode: themeMode,
  };
}

/**
 * Build component classes from tokens
 */
export function buildComponentClass(
  variant: Record<string, unknown>,
  themeMode: ThemeMode,
  additionalClasses?: string
): string {
  const classes = [
    variant.base,
    variant[themeMode],
    variant.size,
    additionalClasses,
  ].filter(Boolean);

  return classes.join(' ');
}

export type ThemeTokens = ReturnType<typeof getThemeTokens>;
