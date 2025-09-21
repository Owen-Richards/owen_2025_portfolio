'use client';

import { useEffect } from 'react';

import { scrollManager } from '@/lib/scroll/scroll';

interface ScrollWrapperProps {
  children: React.ReactNode;
}

export default function ScrollWrapper({ children }: ScrollWrapperProps) {
  useEffect(() => {
    // Initialize scroll manager
    scrollManager.start();

    // Cleanup on unmount
    return () => {
      scrollManager.stop();
    };
  }, []);

  return <>{children}</>;
}
