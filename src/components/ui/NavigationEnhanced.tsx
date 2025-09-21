'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { useTheme } from './ThemeProvider';

const navigationItems = [
  { name: 'Home', href: '#home', type: 'anchor' as const },
  { name: 'Skills', href: '#skills', type: 'anchor' as const },
  { name: 'About', href: '#about', type: 'anchor' as const },
  { name: 'Projects', href: '#projects', type: 'anchor' as const },
  { name: 'Work', href: '/work', type: 'page' as const },
  { name: 'Blog', href: '/blog', type: 'page' as const },
  { name: 'Contact', href: '#contact', type: 'anchor' as const },
];

// Memoized navigation button component to prevent unnecessary re-renders
const NavigationButton = memo(
  ({
    item,
    index,
    isActive,
    scrollToSection,
  }: {
    item: (typeof navigationItems)[0];
    index: number;
    isActive: boolean;
    scrollToSection: (href: string) => void;
  }) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative"
      >
        {item.type === 'page' ? (
          <Link
            href={item.href}
            className={`relative z-10 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white shadow-lg shadow-blue-500/25'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {item.name}
          </Link>
        ) : (
          <button
            onClick={() => scrollToSection(item.href)}
            className={`relative z-10 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white shadow-lg shadow-blue-500/25'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {item.name}
          </button>
        )}
        {isActive && (
          <motion.div
            layoutId="activeIndicator"
            className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20"
            transition={{ type: 'spring', duration: 0.5 }}
          />
        )}
      </motion.div>
    );
  }
);

NavigationButton.displayName = 'NavigationButton';

// Memoized theme toggle button component
const ThemeToggleButton = memo(() => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10 rounded-xl border border-white/20 bg-white/10 p-2.5" />
    );
  }

  return (
    <motion.button
      onClick={toggleTheme}
      className="rounded-xl border border-white/20 bg-white/10 p-2.5 transition-all duration-300 hover:border-white/30 hover:bg-white/20"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, type: 'spring', stiffness: 200 }}
        className="flex items-center justify-center"
      >
        {theme === 'light' ? (
          <Moon size={16} className="text-white/70" />
        ) : (
          <Sun size={16} className="text-white/70" />
        )}
      </motion.div>
    </motion.button>
  );
});

ThemeToggleButton.displayName = 'ThemeToggleButton';

// Memoized mobile navigation item component
const MobileNavigationItem = memo(
  ({
    item,
    index,
    isActive,
    scrollToSection,
    setIsMobileMenuOpen,
    isMobileMenuOpen,
  }: {
    item: (typeof navigationItems)[0];
    index: number;
    isActive: boolean;
    scrollToSection: (href: string) => void;
    setIsMobileMenuOpen: (open: boolean) => void;
    isMobileMenuOpen: boolean;
  }) => {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={
          isMobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
        }
        transition={{ delay: index * 0.1 }}
      >
        {item.type === 'page' ? (
          <Link
            href={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`block rounded-xl px-6 py-4 text-left font-medium transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white shadow-lg'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {item.name}
          </Link>
        ) : (
          <button
            onClick={() => scrollToSection(item.href)}
            className={`w-full rounded-xl px-6 py-4 text-left font-medium transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-blue-500/80 to-purple-500/80 text-white shadow-lg'
                : 'text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            {item.name}
          </button>
        )}
      </motion.div>
    );
  }
);

MobileNavigationItem.displayName = 'MobileNavigationItem';

export default function NavigationEnhanced() {
  const [activeSection, setActiveSection] = useState('#home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { scrollY } = useScroll();
  const lastActiveSection = useRef('#home');
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Transform background opacity based on scroll
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.9)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(8px)', 'blur(16px)']
  );

  // Optimized scroll detection that prevents unnecessary re-renders
  const detectActiveSection = useCallback(() => {
    const currentPath = window.location.pathname;

    // If we're on a dedicated page, set active section to page route
    if (currentPath !== '/') {
      const pageItem = navigationItems.find(
        (item) => item.type === 'page' && item.href === currentPath
      );
      if (pageItem && lastActiveSection.current !== pageItem.href) {
        lastActiveSection.current = pageItem.href;
        setActiveSection(pageItem.href);
      }
      return;
    }

    // Only detect scroll-based sections on the home page
    const anchorSections = navigationItems
      .filter((item) => item.type === 'anchor')
      .map((item) => item.href.slice(1));

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

  const scrollToSection = (href: string) => {
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
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        style={{
          backgroundColor,
          backdropFilter: backdropBlur,
        }}
        className="fixed left-0 right-0 top-0 z-50 border-b border-white/10"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-20 items-center justify-between">
            {/* Enhanced Logo */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="group relative">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-2xl font-bold text-transparent">
                  Owen Richards
                </span>
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 origin-left bg-gradient-to-r from-blue-400 to-purple-400"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>

            {/* Desktop Navigation - Premium Glass Design */}
            <div className="hidden items-center space-x-4 md:flex">
              <div className="flex items-center space-x-1 rounded-2xl border border-white/10 bg-white/5 px-2 py-2 shadow-lg backdrop-blur-xl">
                {navigationItems.map((item, index) => {
                  const isActive =
                    item.type === 'anchor'
                      ? activeSection === item.href
                      : pathname === item.href;

                  return (
                    <NavigationButton
                      key={item.name}
                      item={item}
                      index={index}
                      isActive={isActive}
                      scrollToSection={scrollToSection}
                    />
                  );
                })}
              </div>

              {/* Theme Toggle */}
              <ThemeToggleButton />
            </div>

            {/* Enhanced Mobile Menu Button */}
            <div className="flex items-center space-x-3 md:hidden">
              <ThemeToggleButton />
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative flex h-8 w-8 flex-col items-center justify-center rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm"
                aria-label="Toggle mobile menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.span
                  animate={
                    isMobileMenuOpen
                      ? { rotate: 45, y: 0 }
                      : { rotate: 0, y: -4 }
                  }
                  className="absolute block h-0.5 w-5 bg-white transition-all"
                />
                <motion.span
                  animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="absolute block h-0.5 w-5 bg-white transition-all"
                />
                <motion.span
                  animate={
                    isMobileMenuOpen
                      ? { rotate: -45, y: 0 }
                      : { rotate: 0, y: 4 }
                  }
                  className="absolute block h-0.5 w-5 bg-white transition-all"
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Enhanced Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={
          isMobileMenuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }
        }
        className={`fixed inset-x-0 top-20 z-40 md:hidden ${
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="border-b border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="flex flex-col space-y-2">
              {navigationItems.map((item, index) => {
                const isActive =
                  item.type === 'anchor'
                    ? activeSection === item.href
                    : pathname === item.href;

                return (
                  <MobileNavigationItem
                    key={item.name}
                    item={item}
                    index={index}
                    isActive={isActive}
                    scrollToSection={scrollToSection}
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    isMobileMenuOpen={isMobileMenuOpen}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
