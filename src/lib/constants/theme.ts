// Animation configurations
export const SCROLL_CONFIG = {
  SMOOTH_SCROLL: {
    duration: 1000,
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  },
  VIEWPORT_THRESHOLD: 0.1,
  STAGGER_DELAY: 0.1,
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 0.2,
  NORMAL: 0.3,
  SLOW: 0.5,
  VERY_SLOW: 1.0,
} as const;

export const SPRING_CONFIGS = {
  GENTLE: {
    type: 'spring' as const,
    stiffness: 120,
    damping: 22,
    mass: 1,
  },
  BOUNCY: {
    type: 'spring' as const,
    stiffness: 200,
    damping: 15,
    mass: 0.8,
  },
  SOFT: {
    type: 'spring' as const,
    stiffness: 80,
    damping: 25,
    mass: 1.2,
  },
} as const;

// Z-index layers
export const Z_INDEX = {
  CANVAS: 1,
  CONTENT: 10,
  NAVIGATION: 50,
  MODAL: 100,
  TOOLTIP: 200,
} as const;

// Breakpoints
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const;
