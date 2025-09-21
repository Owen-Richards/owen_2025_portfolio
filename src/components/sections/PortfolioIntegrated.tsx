'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState } from 'react';

import { useThemeStyles } from '../ui/useThemeStyles';

// Dynamically import the 3D component
const PortfolioShowcase3D = dynamic(
  () => import('@/components/3d/PortfolioShowcase3D'),
  {
    ssr: false,
    loading: () => (
      <div className="glass flex h-96 items-center justify-center rounded-lg">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
          <p className="font-medium text-primary">Loading 3D Experience...</p>
        </div>
      </div>
    ),
  }
);

// Import existing projects component
import ProjectsEnhanced from './ProjectsEnhanced';

export default function PortfolioIntegrated() {
  const { styles, cn } = useThemeStyles();
  const [viewMode, setViewMode] = useState<'3d' | 'traditional'>('3d');

  return (
    <section className="min-h-screen w-full bg-background">
      {/* Header with view toggle */}
      <div className="relative z-10 px-6 pb-8 pt-24 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center"
          >
            <h1 className="mb-6 font-display text-5xl font-bold text-foreground md:text-7xl">
              Portfolio
            </h1>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-muted-foreground">
              Explore my work through an immersive 3D experience or browse
              traditional project cards. Each project represents a unique
              challenge solved with innovative technology.
            </p>

            {/* View Mode Toggle */}
            <div
              className={cn(
                styles.glass.base,
                'inline-flex rounded-lg border border-border/50 p-1'
              )}
            >
              <button
                onClick={() => setViewMode('3d')}
                className={cn(
                  'rounded-md px-6 py-3 font-medium transition-all duration-200',
                  viewMode === '3d'
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Immersive 3D Experience
              </button>
              <button
                onClick={() => setViewMode('traditional')}
                className={cn(
                  'rounded-md px-6 py-3 font-medium transition-all duration-200',
                  viewMode === 'traditional'
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                Classic Project View
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content based on view mode */}
      <motion.div
        key={viewMode}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        {viewMode === '3d' ? (
          <div className="h-screen">
            <PortfolioShowcase3D />
          </div>
        ) : (
          <div className="bg-background px-6 pb-24 lg:px-8">
            <ProjectsEnhanced />
          </div>
        )}
      </motion.div>

      {/* Features highlight */}
      {viewMode === '3d' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="absolute bottom-8 left-8 z-10"
        >
          <div
            className={cn(
              styles.glass.base,
              'max-w-sm border border-border/50'
            )}
          >
            <h3 className="mb-3 font-bold text-foreground">3D Features</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                Advanced shader effects
              </li>
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                Physics-based animations
              </li>
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                Mouse parallax interactions
              </li>
              <li className="flex items-center">
                <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
                WebGL performance optimization
              </li>
            </ul>
          </div>
        </motion.div>
      )}

      {/* Performance info */}
      {viewMode === '3d' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute bottom-8 right-8 z-10"
        >
          <div className={cn(styles.glass.base, 'border border-border/50')}>
            <div className="mb-2 text-xs text-muted-foreground">
              Performance
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">60</div>
                <div className="text-xs text-muted-foreground">FPS</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">&lt;100</div>
                <div className="text-xs text-muted-foreground">MB</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-accent">WebGL</div>
                <div className="text-xs text-muted-foreground">Ready</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
}
