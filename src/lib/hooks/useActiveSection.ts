'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { NAVIGATION_ITEMS } from '@/lib/constants/navigation';

export interface UseActiveSectionReturn {
  activeSection: string;
  scrollToSection: (href: string) => void;
}

/**
 * Custom hook for detecting the active section and handling navigation
 * Optimized for performance with throttled scroll detection
 */
export function useActiveSection(): UseActiveSectionReturn {
  const [activeSection, setActiveSection] = useState('#home');
  const pathname = usePathname();
  const router = useRouter();
  const lastActiveSection = useRef('#home');
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Optimized scroll detection that prevents unnecessary re-renders
  const detectActiveSection = useCallback(() => {
    const currentPath = window.location.pathname;

    // If we're on a dedicated page, set active section to page route
    if (currentPath !== '/') {
      const pageItem = NAVIGATION_ITEMS.find(
        (item) => item.type === 'page' && item.href === currentPath
      );
      if (pageItem && lastActiveSection.current !== pageItem.href) {
        lastActiveSection.current = pageItem.href;
        setActiveSection(pageItem.href);
      }
      return;
    }

    // Only detect scroll-based sections on the home page
    const anchorSections = NAVIGATION_ITEMS.filter(
      (item) => item.type === 'anchor'
    ).map((item) => item.href.slice(1));

    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Calculate scroll progress for better section detection
    const scrollProgress = window.scrollY / (documentHeight - windowHeight);

    // Special case for very top of page (first 10% of viewport)
    if (window.scrollY < windowHeight * 0.1) {
      if (lastActiveSection.current !== '#home') {
        lastActiveSection.current = '#home';
        setActiveSection('#home');
      }
      return;
    }

    // Special case for very bottom of page (last 5% of scroll)
    if (scrollProgress >= 0.95) {
      if (lastActiveSection.current !== '#contact') {
        lastActiveSection.current = '#contact';
        setActiveSection('#contact');
      }
      return;
    }

    // Find the section that has the most viewport intersection
    let largestIntersection = 0;
    let newActiveSection = null;

    for (const sectionId of anchorSections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // Calculate how much of the section is visible in the viewport
        const visibleTop = Math.max(0, -rect.top);
        const visibleBottom = Math.min(
          rect.height,
          viewportHeight - Math.max(0, rect.top)
        );
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        // Priority for sections that are prominently visible (more than 30% of section or 50% of viewport)
        const sectionVisibilityRatio = visibleHeight / rect.height;
        const viewportCoverageRatio = visibleHeight / viewportHeight;

        const score = Math.max(sectionVisibilityRatio, viewportCoverageRatio);

        if (score > 0.3 && visibleHeight > largestIntersection) {
          largestIntersection = visibleHeight;
          newActiveSection = '#' + sectionId;
        }
      }
    }

    // Only update state if section actually changed and we found a valid section
    if (newActiveSection && lastActiveSection.current !== newActiveSection) {
      lastActiveSection.current = newActiveSection;
      setActiveSection(newActiveSection);
    }
  }, []);

  // Throttled scroll handler to prevent excessive re-renders
  const handleScroll = useCallback(() => {
    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }

    scrollTimeout.current = setTimeout(() => {
      detectActiveSection();
    }, 16); // ~60fps throttling
  }, [detectActiveSection]);

  // Enhanced scroll-based active section detection
  useEffect(() => {
    // Initial detection
    detectActiveSection();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', detectActiveSection);

    return () => {
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', detectActiveSection);
    };
  }, [handleScroll, detectActiveSection]);

  // Handle hash-based navigation when landing on home page
  useEffect(() => {
    if (pathname === '/') {
      const hash = window.location.hash;
      if (hash) {
        // Small delay to ensure page is fully loaded and sections are rendered
        setTimeout(() => {
          const element = document.getElementById(hash.slice(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500);
      }
    }
  }, [pathname]);

  const scrollToSection = useCallback(
    (href: string) => {
      if (href.startsWith('#')) {
        const currentPath = pathname;

        // If we're not on the home page, navigate to home first then scroll
        if (currentPath !== '/') {
          // Use Next.js router to navigate with hash
          router.push('/' + href);
        } else {
          // We're on the home page, scroll directly
          const element = document.getElementById(href.slice(1));
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      } else {
        // This is a page route
        router.push(href);
      }
    },
    [pathname, router]
  );

  return {
    activeSection,
    scrollToSection,
  };
}
