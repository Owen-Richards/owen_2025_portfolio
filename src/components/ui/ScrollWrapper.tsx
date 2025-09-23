'use client';

import { useEffect } from 'react';

import { scrollManager } from '@/lib/scroll/scroll';

interface ScrollWrapperProps {
  children: React.ReactNode;
}

export default function ScrollWrapper({ children }: ScrollWrapperProps) {
  useEffect(() => {
    // Initialize scroll manager with explicit init()
    scrollManager.init();

    // Cleanup on unmount with explicit destroy()
    return () => {
      scrollManager.destroy();
    };
  }, []);

  return <>{children}</>;
}
