'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { memo } from 'react';

import type { NavigationItem } from '@/lib/constants/navigation';

export interface NavigationButtonProps {
  item: NavigationItem;
  index: number;
  isActive: boolean;
  scrollToSection: (href: string) => void;
}

/**
 * NavigationButton component for desktop navigation
 * Handles both anchor links and page navigation with smooth animations
 */
export const NavigationButton = memo<NavigationButtonProps>(
  ({ item, index, isActive, scrollToSection }) => {
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
