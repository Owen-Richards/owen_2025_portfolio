'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { memo } from 'react';

import type { NavigationItem } from '@/lib/constants/navigation';

export interface MobileNavigationItemProps {
  item: NavigationItem;
  index: number;
  isActive: boolean;
  scrollToSection: (href: string) => void;
  setIsMobileMenuOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
}

/**
 * MobileNavigationItem component for mobile navigation menu
 * Handles both anchor links and page navigation with mobile-optimized layout
 */
export const MobileNavigationItem = memo<MobileNavigationItemProps>(
  ({
    item,
    index,
    isActive,
    scrollToSection,
    setIsMobileMenuOpen,
    isMobileMenuOpen,
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
