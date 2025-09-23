'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { memo, useState } from 'react';

import {
  MobileNavigationItem,
  NavigationButton,
} from '@/components/navigation';
import { NAVIGATION_ITEMS } from '@/lib/constants/navigation';
import { useActiveSection } from '@/lib/hooks/useActiveSection';
import { cn } from '@/lib/utils/cn';

import { useTheme } from './ThemeProvider';

// Memoized theme toggle button component
const ThemeToggleButton = memo(() => {
  const { theme, toggleTheme, isReady } = useTheme();

  if (!isReady) {
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

export default function NavigationEnhanced() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { activeSection, scrollToSection } = useActiveSection();

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
                {NAVIGATION_ITEMS.map((item, index) => {
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
        className={cn(
          'fixed inset-x-0 top-20 z-40 md:hidden',
          isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'
        )}
      >
        <div className="border-b border-white/10 bg-black/95 shadow-2xl backdrop-blur-xl">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="flex flex-col space-y-2">
              {NAVIGATION_ITEMS.map((item, index) => {
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
