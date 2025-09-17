'use client';

import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

type ScrollTimelineOptions = {
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  anticipatePin?: number;
};

type ScrollToOptions = {
  offset?: number;
  duration?: number;
};

type MagneticCleanup = () => void;

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export class ScrollManager {
  private lenis: Lenis | null = null;
  private isInitialized = false;
  private cursor: HTMLElement | null = null;
  private cursorThemeObserver: MutationObserver | null = null;
  private handleMouseMove?: (event: MouseEvent) => void;
  private prefersReducedMotion = false;

  constructor() {
    if (typeof window === 'undefined') return;

    this.prefersReducedMotion = window
      .matchMedia('(prefers-reduced-motion: reduce)')
      .matches;

    this.init();
  }

  private init() {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }

    this.lenis = new Lenis({
      duration: this.prefersReducedMotion ? 0.5 : 1.8,
      easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
      gestureOrientation: 'vertical',
      infinite: false,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    this.lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    gsap.ticker.add((time) => {
      this.lenis?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    if (!this.prefersReducedMotion) {
      this.initMagneticCursor();
    }

    this.isInitialized = true;
  }

  private initMagneticCursor() {
    if (this.cursor) return;

    const cursor = document.createElement('div');
    cursor.className = 'magnetic-cursor';
    cursor.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      backdrop-filter: blur(10px);
      transform: translate(-50%, -50%);
      mix-blend-mode: difference;
    `;

    const applyTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      cursor.style.background = isDark
        ? 'radial-gradient(circle, rgba(244,241,235,0.8) 0%, rgba(244,241,235,0.4) 70%)'
        : 'radial-gradient(circle, rgba(64,61,57,0.8) 0%, rgba(64,61,57,0.4) 70%)';
      cursor.style.border = isDark
        ? '1px solid rgba(244,241,235,0.3)'
        : '1px solid rgba(64,61,57,0.3)';
    };

    applyTheme();
    document.body.appendChild(cursor);

    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    const handleMouseMove = (event: MouseEvent) => {
      gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    this.cursor = cursor;
    this.cursorThemeObserver = observer;
    this.handleMouseMove = handleMouseMove;
  }

  addMagneticElement(element: HTMLElement, strength = 0.3): MagneticCleanup {
    if (!this.cursor || this.prefersReducedMotion) {
      return () => undefined;
    }

    const handleMouseEnter = () => {
      gsap.to(this.cursor, {
        scale: 2,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(this.cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (event.clientX - centerX) * strength;
      const deltaY = (event.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);

    return () => {
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf(element);
      gsap.to(element, { x: 0, y: 0, duration: 0.2, ease: 'power2.out' });
    };
  }

  createSectionTimeline(
    trigger: string | HTMLElement,
    timeline: gsap.core.Timeline,
    options: ScrollTimelineOptions = {},
  ) {
    if (typeof window === 'undefined') {
      return null;
    }

    return ScrollTrigger.create({
      trigger,
      start: options.start ?? 'top bottom',
      end: options.end ?? 'bottom top',
      scrub: this.prefersReducedMotion ? false : options.scrub ?? true,
      pin: this.prefersReducedMotion ? false : options.pin ?? false,
      anticipatePin: options.anticipatePin ?? 1,
      animation: timeline,
    });
  }

  scrollTo(target: string | HTMLElement, options: ScrollToOptions = {}) {
    if (this.lenis) {
      this.lenis.scrollTo(target, {
        offset: options.offset ?? 0,
        duration: options.duration ?? 2,
      });
      return;
    }

    if (typeof window === 'undefined') return;

    if (typeof target === 'string') {
      const element = document.querySelector(target);
      element?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    target.scrollIntoView({ behavior: 'smooth' });
  }

  getScroll() {
    return this.lenis?.scroll ?? 0;
  }

  start() {
    this.lenis?.start();
  }

  stop() {
    this.lenis?.stop();
  }

  destroy() {
    this.lenis?.destroy();
    this.lenis = null;
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    if (this.handleMouseMove) {
      document.removeEventListener('mousemove', this.handleMouseMove);
    }

    this.cursorThemeObserver?.disconnect();
    this.cursorThemeObserver = null;

    if (this.cursor?.parentNode) {
      this.cursor.parentNode.removeChild(this.cursor);
    }

    this.cursor = null;
    this.handleMouseMove = undefined;
    this.isInitialized = false;
  }

  refresh() {
    ScrollTrigger.refresh();
  }
}

export const scrollManager = new ScrollManager();

export const createLiquidTimeline = (element: string | Element) => {
  const timeline = gsap.timeline();
  return timeline.fromTo(
    element,
    {
      clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      opacity: 0,
    },
    {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      opacity: 1,
      duration: 1.5,
      ease: 'power4.out',
    },
  );
};

export const createMagneticReveal = (element: string | Element) => {
  const timeline = gsap.timeline();
  return timeline
    .set(element, { transformOrigin: 'center center' })
    .fromTo(
      element,
      {
        scale: 0,
        rotation: 45,
        filter: 'blur(20px)',
        opacity: 0,
      },
      {
        scale: 1,
        rotation: 0,
        filter: 'blur(0px)',
        opacity: 1,
        duration: 1.2,
        ease: 'back.out(1.7)',
      },
    );
};

export const createScrollVelocityEffect = (element: string | Element) => {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  let lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  let velocityTimer: number | undefined;

  const updateVelocity = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const velocity = Math.abs(scrollTop - lastScrollTop);

    gsap.to(element, {
      scaleX: 1 + velocity * 0.01,
      scaleY: 1 - velocity * 0.005,
      duration: 0.3,
      ease: 'power2.out',
    });

    if (velocityTimer) {
      window.clearTimeout(velocityTimer);
    }

    velocityTimer = window.setTimeout(() => {
      gsap.to(element, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)',
      });
    }, 150);

    lastScrollTop = scrollTop;
  };

  window.addEventListener('scroll', updateVelocity, { passive: true });

  return () => {
    window.removeEventListener('scroll', updateVelocity);
    if (velocityTimer) {
      window.clearTimeout(velocityTimer);
    }
    gsap.killTweensOf(element);
    gsap.to(element, {
      scaleX: 1,
      scaleY: 1,
      duration: 0.2,
      ease: 'power2.out',
    });
  };
};