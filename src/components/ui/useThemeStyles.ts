import { useTheme } from './ThemeProvider';

/**
 * Professional theme utilities hook - Executive Portfolio Design
 * Provides consistent, sophisticated styling patterns for professional showcase
 */
export function useThemeStyles() {
  const { theme } = useTheme();

  // Professional styling patterns
  const styles = {
    // Card styles with executive appeal
    card: {
      base: "theme-card backdrop-blur-md transition-all duration-300 hover:shadow-[var(--shadow-medium)]",
      hover: "hover:scale-[1.01] hover:-translate-y-0.5",
      interactive: "cursor-pointer theme-focus group",
      feature: "theme-card p-6 text-center space-y-3 hover:scale-[1.02] transition-all duration-300",
      project: "theme-card overflow-hidden hover:scale-[1.01] transition-all duration-300 group",
    },
    
    // Professional button styles
    button: {
      primary: "theme-button-primary px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 theme-focus shadow-[var(--shadow-soft)]",
      secondary: "theme-button-secondary px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 theme-focus shadow-[var(--shadow-soft)]",
      outline: "theme-button-outline px-6 py-3 rounded-lg font-semibold text-base transition-all duration-300 hover:scale-105 theme-focus",
      ghost: "bg-transparent border border-transparent text-foreground hover:border-primary hover:text-primary px-6 py-3 rounded-lg font-semibold transition-all duration-300 theme-focus",
      cta: "theme-button-primary px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-[var(--shadow-medium)] theme-focus",
    },
    
    // Executive text styles
    text: {
      hero: "text-5xl md:text-7xl font-bold leading-[0.95] tracking-[-0.02em] text-foreground font-display",
      heading: "text-foreground font-bold text-3xl md:text-4xl leading-[1.1] tracking-[-0.01em] font-display",
      subheading: "text-foreground font-semibold text-xl md:text-2xl leading-[1.3] tracking-[-0.005em] font-sans",
      body: "text-foreground text-base leading-[1.65] tracking-[-0.008em] font-sans",
      bodyLarge: "text-foreground text-lg leading-[1.6] tracking-[-0.01em] font-sans",
      muted: "text-muted-foreground font-sans tracking-[-0.008em]",
      primary: "text-primary font-semibold font-sans tracking-[-0.008em]",
      secondary: "text-secondary font-sans tracking-[-0.008em]", 
      accent: "text-accent font-semibold font-sans tracking-[-0.008em]",
      gradient: "bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-300 dark:to-slate-100 bg-clip-text text-transparent font-bold font-display tracking-[-0.01em]",
      code: "font-mono text-sm bg-muted/30 px-2 py-1 rounded font-medium",
    },
    
    // Professional layout styles
    layout: {
      section: "relative py-20 md:py-24 overflow-hidden",
      container: "relative max-w-6xl mx-auto px-6 sm:px-8 lg:px-12",
      grid: "grid gap-8 md:gap-12",
      centeredContent: "text-center max-w-4xl mx-auto",
      hero: "min-h-screen flex items-center justify-center relative overflow-hidden",
    },
    
    // Refined glass morphism
    glass: {
      base: "glass backdrop-blur-sm",
      card: "glass p-6 hover:shadow-[var(--shadow-medium)] transition-all duration-300",
      nav: "glass border-b border-border/20 backdrop-blur-md",
      overlay: "glass p-8 text-center space-y-4",
    },
    
    // Professional navigation styles
    nav: {
      item: "px-4 py-2 rounded-lg text-foreground hover:text-primary transition-all duration-300 hover:scale-105 theme-focus font-medium",
      active: "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]",
      mobile: "block w-full text-left px-4 py-3 text-foreground hover:bg-muted/30 transition-all duration-300 rounded-lg font-medium",
      logo: "text-primary font-bold text-xl tracking-tight",
    },
    
    
    // Premium form styles
    form: {
      input: "w-full px-6 py-4 rounded-2xl border-2 border-border bg-card/50 text-foreground theme-focus placeholder:text-muted-foreground backdrop-blur-sm transition-all duration-400 hover:border-primary focus:border-primary focus:scale-[1.02]",
      textarea: "w-full px-6 py-4 rounded-2xl border-2 border-border bg-card/50 text-foreground theme-focus placeholder:text-muted-foreground resize-none backdrop-blur-sm transition-all duration-400 hover:border-primary focus:border-primary focus:scale-[1.02]",
      label: "block text-lg font-semibold text-foreground mb-3",
      group: "space-y-3",
    },
    
    // Premium animation classes
    animation: {
      fadeInUp: "animate-fade-in-up",
      float: "animate-float",
      shimmer: "animate-shimmer",
      pulse: "animate-pulse",
      bounce: "animate-bounce",
      gradient: "bg-gradient-to-r from-primary via-accent to-secondary bg-[length:200%_100%] animate-gradient-x",
    },
    
    // Professional effects - corporate appeal
    effects: {
      glow: "drop-shadow-[0_0_20px_rgba(55,65,81,0.3)]",
      glowAccent: "drop-shadow-[0_0_20px_rgba(75,85,99,0.3)]",
      parallax: "transform-gpu transition-transform duration-700 ease-out",
      floating: "animate-float",
      rotating: "animate-spin-slow",
    },
  };

  // Premium theme-specific overrides
  const themeOverrides = {
    light: {
      // Light theme specific styles - Professional grey/slate only
      heroBackground: "bg-gradient-to-br from-slate-50 via-slate-100/30 to-slate-200/20",
      sectionBackground: "bg-gradient-to-b from-background to-slate-50/50",
      cardShadow: "shadow-[var(--shadow-medium)]",
      accent: "from-slate-600 to-slate-700",
      textShadow: "drop-shadow-sm",
    },
    dark: {
      // Dark theme specific styles - Professional slate only
      heroBackground: "bg-gradient-to-br from-slate-900 via-slate-800/30 to-slate-700/20",
      sectionBackground: "bg-gradient-to-b from-background to-slate-800/20",
      cardShadow: "shadow-[var(--shadow-strong)]",
      accent: "from-slate-300 to-slate-400",
      textShadow: "drop-shadow-lg",
    },
  };

  // Combine base styles with theme overrides
  const combinedStyles = {
    ...styles,
    theme: themeOverrides[theme],
  };

  return {
    styles: combinedStyles,
    theme,
    // Enhanced utility functions
    cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' '),
    getThemeClass: (lightClass: string, darkClass: string) => 
      theme === 'light' ? lightClass : darkClass,
    // Gradient text utility
    gradientText: () => `bg-gradient-to-r ${themeOverrides[theme].accent} bg-clip-text text-transparent`,
    // Theme-aware glow effect
    glow: (intensity: 'sm' | 'md' | 'lg' = 'md') => {
      const intensities = {
        sm: 'drop-shadow-[0_0_10px_rgba(55,65,81,0.2)]',
        md: 'drop-shadow-[0_0_20px_rgba(55,65,81,0.3)]', 
        lg: 'drop-shadow-[0_0_30px_rgba(55,65,81,0.4)]'
      };
      return intensities[intensity];
    },
  };
}

/**
 * Utility for combining class names with theme awareness
 */
export function cn(...classes: (string | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Get theme-specific values
 */
export function useThemeValue<T>(lightValue: T, darkValue: T): T {
  const { theme } = useTheme();
  return theme === 'light' ? lightValue : darkValue;
}
