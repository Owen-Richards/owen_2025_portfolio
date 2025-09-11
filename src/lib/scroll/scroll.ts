'use client';

import { gsap } from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);
}

export class ScrollManager {
  private lenis: Lenis | null = null;
  private isInitialized = false;
  private callbacks: Array<(scroll: number) => void> = [];
  private sections: Array<{ name: string; timeline: gsap.core.Timeline }> = [];
  private magneticElements: Set<HTMLElement> = new Set();
  private cursor: HTMLElement | null = null;
  private scrollIndicator: HTMLElement | null = null;

  constructor() {
    if (typeof window === 'undefined') return;
    this.init();
  }

  private init() {
    if (this.isInitialized) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Lenis for smooth scrolling with enhanced easing
    this.lenis = new Lenis({
      duration: prefersReducedMotion ? 0.5 : 1.8,
      easing: (t: number) => {
        // Custom easing for award-level feel
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      gestureOrientation: 'vertical',
      infinite: false,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Connect Lenis to GSAP ScrollTrigger
    this.lenis.on('scroll', (e) => {
      ScrollTrigger.update();
      this.updateScrollIndicator(e.scroll, e.limit);
    });

    gsap.ticker.add((time) => {
      this.lenis?.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Initialize magnetic cursor and enhanced features
    if (!prefersReducedMotion) {
      this.initMagneticCursor();
      // Note: Scroll indicator is now handled by ScrollProgress component
    }

    this.isInitialized = true;
  }

  // Register a section with its timeline
  registerSection(name: string, timeline: gsap.core.Timeline) {
    this.sections.push({ name, timeline });
  }

  // Initialize magnetic cursor effect
  private initMagneticCursor() {
    // Create custom cursor
    this.cursor = document.createElement('div');
    this.cursor.className = 'magnetic-cursor';
    this.cursor.style.cssText = `
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
    
    // Set theme-aware styles
    const updateCursorTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      if (this.cursor) {
        this.cursor.style.background = isDark 
          ? 'radial-gradient(circle, rgba(244,241,235,0.8) 0%, rgba(244,241,235,0.4) 70%)'
          : 'radial-gradient(circle, rgba(64,61,57,0.8) 0%, rgba(64,61,57,0.4) 70%)';
        this.cursor.style.border = isDark 
          ? '1px solid rgba(244,241,235,0.3)' 
          : '1px solid rgba(64,61,57,0.3)';
      }
    };

    updateCursorTheme();
    document.body.appendChild(this.cursor);

    // Watch for theme changes
    const observer = new MutationObserver(updateCursorTheme);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['class'] 
    });

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(this.cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    // Add magnetic effect to elements
    document.addEventListener('mousemove', handleMouseMove);
  }

  // Initialize morphing scroll indicator
  private initScrollIndicator() {
    this.scrollIndicator = document.createElement('div');
    this.scrollIndicator.className = 'scroll-indicator';
    this.scrollIndicator.innerHTML = `
      <svg width="60" height="60" viewBox="0 0 60 60">
        <circle 
          cx="30" 
          cy="30" 
          r="25" 
          fill="none" 
          stroke="rgba(156,143,130,0.3)" 
          stroke-width="2"
        />
        <circle 
          class="progress-ring"
          cx="30" 
          cy="30" 
          r="25" 
          fill="none" 
          stroke="rgba(156,143,130,1)" 
          stroke-width="2"
          stroke-linecap="round"
          stroke-dasharray="157"
          stroke-dashoffset="157"
          transform="rotate(-90 30 30)"
        />
      </svg>
      <div class="scroll-percentage">0%</div>
    `;
    
    this.scrollIndicator.style.cssText = `
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
      cursor: pointer;
      backdrop-filter: blur(10px);
      background: rgba(255,255,255,0.1);
      border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.2);
      transition: all 0.3s ease;
    `;

    const percentageEl = this.scrollIndicator.querySelector('.scroll-percentage') as HTMLElement;
    if (percentageEl) {
      percentageEl.style.cssText = `
        position: absolute;
        font-size: 10px;
        font-weight: 600;
        color: rgba(156,143,130,1);
        pointer-events: none;
      `;
    }

    document.body.appendChild(this.scrollIndicator);

    // Click to scroll to top
    this.scrollIndicator.addEventListener('click', () => {
      this.lenis?.scrollTo(0, { duration: 2 });
    });
  }

  // Update scroll indicator progress
  private updateScrollIndicator(scroll: number, limit: number) {
    if (!this.scrollIndicator) return;

    const progress = Math.min(scroll / limit, 1);
    const circumference = 157; // 2 * π * 25
    const offset = circumference - (progress * circumference);

    const progressRing = this.scrollIndicator.querySelector('.progress-ring') as SVGElement;
    const percentageEl = this.scrollIndicator.querySelector('.scroll-percentage') as HTMLElement;

    if (progressRing) {
      progressRing.style.strokeDashoffset = offset.toString();
    }

    if (percentageEl) {
      percentageEl.textContent = `${Math.round(progress * 100)}%`;
    }

    // Hide/show indicator based on scroll position
    const opacity = scroll > 100 ? 1 : 0;
    gsap.to(this.scrollIndicator, {
      opacity,
      scale: scroll > 100 ? 1 : 0.8,
      duration: 0.3
    });
  }

  // Add magnetic effect to an element
  addMagneticElement(element: HTMLElement, strength = 0.3) {
    this.magneticElements.add(element);

    const handleMouseEnter = () => {
      gsap.to(this.cursor, {
        scale: 2,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(this.cursor, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      gsap.to(element, {
        x: deltaX,
        y: deltaY,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
  }

  // Create scroll-triggered timeline for a section
  createSectionTimeline(
    trigger: string | HTMLElement,
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
  scrollTo(target: string | HTMLElement, options: { offset?: number; duration?: number } = {}) {
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

// Used timeline creators for award-level animations
export const createLiquidTimeline = (element: string | Element) => {
  const tl = gsap.timeline();
  return tl
    .fromTo(element, 
      { 
        clipPath: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
        opacity: 0 
      }, 
      { 
        clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
        opacity: 1,
        duration: 1.5, 
        ease: 'power4.out' 
      }
    );
};

export const createMagneticReveal = (element: string | Element) => {
  const tl = gsap.timeline();
  return tl
    .set(element, { transformOrigin: 'center center' })
    .fromTo(element, 
      { 
        scale: 0,
        rotation: 45,
        filter: 'blur(20px)',
        opacity: 0
      }, 
      { 
        scale: 1,
        rotation: 0,
        filter: 'blur(0px)',
        opacity: 1,
        duration: 1.2, 
        ease: 'back.out(1.7)' 
      }
    );
};

export const createScrollVelocityEffect = (element: string | Element) => {
  let lastScrollTop = 0;
  let velocityTimer: number;

  const updateVelocity = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const velocity = Math.abs(scrollTop - lastScrollTop);
    
    gsap.to(element, {
      scaleX: 1 + velocity * 0.01,
      scaleY: 1 - velocity * 0.005,
      duration: 0.3,
      ease: 'power2.out'
    });

    clearTimeout(velocityTimer);
    velocityTimer = setTimeout(() => {
      gsap.to(element, {
        scaleX: 1,
        scaleY: 1,
        duration: 0.5,
        ease: 'elastic.out(1, 0.3)'
      });
    }, 150);

    lastScrollTop = scrollTop;
  };

  window.addEventListener('scroll', updateVelocity);
  return () => window.removeEventListener('scroll', updateVelocity);
};
