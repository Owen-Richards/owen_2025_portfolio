'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export class ScrollManager {
  private lenis: Lenis | null = null;
  private isInitialized = false;
  private callbacks: Array<(scroll: number) => void> = [];
  private sections: Array<{ name: string; timeline: gsap.core.Timeline }> = [];

  constructor() {
    if (typeof window === 'undefined') return;
    this.init();
  }

  private init() {
    if (this.isInitialized) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Lenis for smooth scrolling
    this.lenis = new Lenis({
      duration: prefersReducedMotion ? 0.5 : 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: !prefersReducedMotion,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    // Connect Lenis to GSAP ScrollTrigger
    this.lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      this.lenis?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    this.isInitialized = true;
  }

  // Register a section with its timeline
  registerSection(name: string, timeline: gsap.core.Timeline) {
    this.sections.push({ name, timeline });
  }

  // Create scroll-triggered timeline for a section
  createSectionTimeline(
    trigger: string | Element,
    timeline: gsap.core.Timeline,
    options: {
      start?: string;
      end?: string;
      scrub?: boolean | number;
      pin?: boolean;
      anticipatePin?: number;
    } = {}
  ) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    return ScrollTrigger.create({
      trigger,
      start: options.start || 'top bottom',
      end: options.end || 'bottom top',
      scrub: prefersReducedMotion ? false : (options.scrub ?? true),
      pin: prefersReducedMotion ? false : (options.pin ?? false),
      anticipatePin: options.anticipatePin ?? 1,
      animation: timeline,
      onUpdate: (self) => {
        // Notify all callbacks about scroll progress
        this.callbacks.forEach(callback => callback(self.progress));
      },
    });
  }

  // Subscribe to scroll updates
  onScroll(callback: (progress: number) => void) {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) {
        this.callbacks.splice(index, 1);
      }
    };
  }

  // Scroll to a specific element
  scrollTo(target: string | Element, options: { offset?: number; duration?: number } = {}) {
    this.lenis?.scrollTo(target, {
      offset: options.offset ?? 0,
      duration: options.duration ?? 2,
    });
  }

  // Get current scroll position
  getScroll() {
    return this.lenis?.scroll ?? 0;
  }

  // Start/stop smooth scrolling
  start() {
    this.lenis?.start();
  }

  stop() {
    this.lenis?.stop();
  }

  // Destroy the scroll manager
  destroy() {
    this.lenis?.destroy();
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    this.callbacks = [];
    this.sections = [];
    this.isInitialized = false;
  }

  // Refresh ScrollTrigger (useful after DOM changes)
  refresh() {
    ScrollTrigger.refresh();
  }
}

// Create singleton instance
export const scrollManager = new ScrollManager();

// Utility functions for common animations
export const createFadeInTimeline = (element: string | Element) => {
  const tl = gsap.timeline();
  return tl.fromTo(element, 
    { opacity: 0, y: 50 }, 
    { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
  );
};

export const createParallaxTimeline = (element: string | Element, distance = 100) => {
  const tl = gsap.timeline();
  return tl.fromTo(element, 
    { y: -distance }, 
    { y: distance, ease: 'none' }
  );
};

export const createScaleTimeline = (element: string | Element) => {
  const tl = gsap.timeline();
  return tl.fromTo(element, 
    { scale: 0.8, opacity: 0 }, 
    { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' }
  );
};
