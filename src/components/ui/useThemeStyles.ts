import { useMemo } from 'react';

import { buildComponentClass, getThemeTokens } from '@/styles/theme';

import { useTheme } from './ThemeProvider';

export function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Optimized theme styles hook using static tokens
 * Memoized to prevent rebuilding styles on every render
 */
export function useThemeStyles() {
  const { theme } = useTheme();

  // Memoize theme tokens to prevent rebuilding
  const tokens = useMemo(() => getThemeTokens(theme), [theme]);

  // Memoize component styles
  const styles = useMemo(
    () => ({
      // Card styles using tokens
      card: {
        base: buildComponentClass(tokens.cards.base, theme),
        hover: 'hover:scale-[1.01] hover:-translate-y-0.5',
        interactive:
          'cursor-pointer group focus:outline-none focus:ring-2 focus:ring-offset-2',
        feature: buildComponentClass(tokens.cards.feature, theme),
        project: buildComponentClass(tokens.cards.project, theme),
        glass: buildComponentClass(tokens.cards.glass, theme),
      },

      // Button styles using tokens
      button: {
        primary: buildComponentClass(
          tokens.buttons.primary,
          theme,
          'focus:outline-none focus:ring-2 focus:ring-offset-2'
        ),
        secondary: buildComponentClass(
          tokens.buttons.secondary,
          theme,
          'focus:outline-none focus:ring-2 focus:ring-offset-2'
        ),
        outline: buildComponentClass(
          tokens.buttons.outline,
          theme,
          'focus:outline-none focus:ring-2 focus:ring-offset-2'
        ),
        ghost: buildComponentClass(
          tokens.buttons.ghost,
          theme,
          'focus:outline-none focus:ring-2 focus:ring-offset-2'
        ),
        cta: buildComponentClass(
          tokens.buttons.cta,
          theme,
          'focus:outline-none focus:ring-2 focus:ring-offset-2'
        ),
      },

      // Text styles using tokens
      text: {
        hero: buildComponentClass(tokens.text.hero, theme),
        heading: buildComponentClass(tokens.text.heading, theme),
        subheading: buildComponentClass(tokens.text.subheading, theme),
        body: buildComponentClass(tokens.text.body, theme),
        bodyLarge: buildComponentClass(tokens.text.bodyLarge, theme),
        muted: buildComponentClass(tokens.text.muted, theme),
        accent: buildComponentClass(tokens.text.accent, theme),
        primary: buildComponentClass(tokens.text.accent, theme), // Add missing primary
        secondary: buildComponentClass(tokens.text.muted, theme), // Add missing secondary
        gradient: `bg-gradient-to-r ${tokens.backgrounds.accent} bg-clip-text text-transparent font-bold font-display tracking-[-0.01em]`,
        code: 'font-mono text-sm bg-muted/30 px-2 py-1 rounded font-medium',
      },

      // Layout styles using tokens
      layout: {
        section: tokens.layout.section.base,
        container: tokens.layout.container.base,
        grid: tokens.layout.grid.base,
        centeredContent: tokens.layout.centeredContent.base,
        hero: tokens.layout.hero.base,
      },

      // Glass styles (for backward compatibility)
      glass: {
        base: buildComponentClass(tokens.cards.glass, theme),
        card: buildComponentClass(tokens.cards.glass, theme),
        nav: `${buildComponentClass(tokens.cards.glass, theme)} border-b border-border/20 backdrop-blur-md`,
        overlay: `${buildComponentClass(tokens.cards.glass, theme)} p-8 text-center space-y-4`,
      },

      // Theme-specific styles (for backward compatibility)
      theme: {
        heroBackground: tokens.backgrounds.hero,
        sectionBackground: tokens.backgrounds.section,
        cardShadow: tokens.backgrounds.card,
        accent: tokens.backgrounds.accent,
        textShadow: tokens.backgrounds.textShadow,
      },
    }),
    [theme, tokens]
  );

  // Memoize theme-specific values
  const themeValues = useMemo(
    () => ({
      heroBackground: tokens.backgrounds.hero,
      sectionBackground: tokens.backgrounds.section,
      cardShadow: tokens.backgrounds.card,
      textShadow: tokens.backgrounds.textShadow,
    }),
    [tokens.backgrounds]
  );

  // Memoize utility functions
  const utilities = useMemo(
    () => ({
      cn,
      getThemeClass: (lightClass: string, darkClass: string) =>
        theme === 'light' ? lightClass : darkClass,
      gradientText: () =>
        `bg-gradient-to-r ${tokens.backgrounds.accent} bg-clip-text text-transparent`,
      glow: (intensity: 'sm' | 'md' | 'lg' = 'md') => {
        const intensities = {
          sm: 'drop-shadow-[0_0_10px_rgba(55,65,81,0.2)]',
          md: 'drop-shadow-[0_0_20px_rgba(55,65,81,0.3)]',
          lg: 'drop-shadow-[0_0_30px_rgba(55,65,81,0.4)]',
        };
        return intensities[intensity];
      },
    }),
    [theme, tokens.backgrounds.accent]
  );

  return {
    styles,
    theme: themeValues,
    tokens,
    ...utilities,
  };
}

/**
 * Simple hook to get theme-specific values
 * @deprecated Use tokens.mode or getThemeClass instead for better performance
 */
export function useThemeValue<T>(lightValue: T, darkValue: T): T {
  const { theme } = useTheme();
  return theme === 'light' ? lightValue : darkValue;
}
