'use client';

import dynamic from 'next/dynamic';

import { useInViewAnimation } from '@/lib/hooks/useInView';

import Hero3DPlaceholder from './Hero3DPlaceholder';

// Lazy load Hero3D with SSR disabled to improve LCP
const Hero3D = dynamic(() => import('./Hero3D'), {
  ssr: false,
});

interface LazyHero3DProps {
  isContinuous?: boolean;
}

/**
 * Container component that handles lazy loading of Hero3D based on viewport intersection
 *
 * Performance Benefits:
 * - Improves LCP (Largest Contentful Paint) by avoiding Three.js initialization on page load
 * - Uses IntersectionObserver to only load 3D content when near viewport
 * - Renders lightweight placeholder until 3D component is needed
 * - Uses next/dynamic with SSR disabled to prevent server-side rendering of 3D content
 *
 * The component loads when:
 * - User scrolls within 100px of the hero section (rootMargin: '100px')
 * - Only loads once per session (triggerOnce: true)
 */
export default function LazyHero3D({ isContinuous = false }: LazyHero3DProps) {
  const { ref, inView } = useInViewAnimation({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '100px', // Start loading before component is visible
  });

  return (
    <div ref={ref}>
      {inView ? (
        <Hero3D isContinuous={isContinuous} />
      ) : (
        <Hero3DPlaceholder isContinuous={isContinuous} />
      )}
    </div>
  );
}
