'use client';

import { scrollManager } from '@/lib/scroll/scroll';
import { useEffect } from 'react';

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
