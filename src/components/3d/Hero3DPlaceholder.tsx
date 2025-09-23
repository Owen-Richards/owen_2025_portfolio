'use client';

import { useInViewAnimation } from '@/lib/hooks/useInView';

/**
 * Lightweight placeholder for Hero3D that renders while the 3D component loads
 * Maintains the same visual space and provides smooth transition
 */
export default function Hero3DPlaceholder({
  isContinuous = false,
}: {
  isContinuous?: boolean;
}) {
  const { ref, inView } = useInViewAnimation({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '100px', // Start loading before component is visible
  });

  return (
    <div
      ref={ref}
      className={
        isContinuous ? 'fixed inset-0 -z-10' : 'absolute inset-0 -z-10'
      }
      data-in-view={inView}
    >
      {/* Gradient background that matches the 3D scene */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 
                   transition-colors duration-500 dark:from-slate-900 
                   dark:via-blue-950/30 dark:to-purple-950/20"
      />

      {/* Subtle animated elements to hint at 3D content loading */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating orbs placeholder */}
        <div
          className="absolute left-1/4 top-1/4 h-4 w-4 animate-pulse rounded-full 
                     bg-blue-200/40 dark:bg-blue-400/20"
          style={{ animationDelay: '0s', animationDuration: '3s' }}
        />
        <div
          className="absolute right-1/3 top-3/4 h-6 w-6 animate-pulse rounded-full 
                     bg-purple-200/40 dark:bg-purple-400/20"
          style={{ animationDelay: '1s', animationDuration: '4s' }}
        />
        <div
          className="absolute right-1/4 top-1/2 h-3 w-3 animate-pulse rounded-full 
                     bg-indigo-200/40 dark:bg-indigo-400/20"
          style={{ animationDelay: '2s', animationDuration: '5s' }}
        />
      </div>

      {/* Loading indicator - only show if component is in view */}
      {inView && (
        <div className="absolute bottom-8 right-8 flex items-center space-x-2 text-slate-400/60 dark:text-slate-500/60">
          <div
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-current"
            style={{ animationDelay: '0ms' }}
          />
          <div
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-current"
            style={{ animationDelay: '150ms' }}
          />
          <div
            className="h-1.5 w-1.5 animate-bounce rounded-full bg-current"
            style={{ animationDelay: '300ms' }}
          />
          <span className="ml-2 text-xs font-medium opacity-75">
            Loading 3D
          </span>
        </div>
      )}
    </div>
  );
}
