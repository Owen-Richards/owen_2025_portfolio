import { Variants } from 'framer-motion';

import { ANIMATION_DURATIONS, SPRING_CONFIGS } from '@/constants/theme';

// Container animations
export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

// Item animations
export const itemVariants: Variants = {
  hidden: { y: 42, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: SPRING_CONFIGS.GENTLE,
  },
};

// Fade animations
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
    },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
    },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
    },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
    },
  },
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: SPRING_CONFIGS.BOUNCY,
  },
};

// Hover animations
export const hoverScale = {
  scale: 1.05,
  transition: { duration: ANIMATION_DURATIONS.FAST },
};

export const hoverLift = {
  y: -4,
  transition: { duration: ANIMATION_DURATIONS.FAST },
};

// Complex animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const slideInFromBottom: Variants = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 15,
    },
  },
};

export const rotateIn: Variants = {
  hidden: { rotate: -90, opacity: 0, scale: 0.8 },
  visible: {
    rotate: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: ANIMATION_DURATIONS.NORMAL,
      type: 'spring',
      stiffness: 200,
    },
  },
};
