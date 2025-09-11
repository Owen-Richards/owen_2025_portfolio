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
      <div className="flex items-center justify-center h-96 glass rounded-lg">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-primary font-medium">Loading 3D Experience...</p>
        </div>
      </div>
    )
  }
);

// Import existing projects component
import ProjectsEnhanced from './ProjectsEnhanced';

export default function PortfolioIntegrated() {
  const { styles, cn } = useThemeStyles();
  const [viewMode, setViewMode] = useState<'3d' | 'traditional'>('3d');

  return (
    <section className="w-full min-h-screen bg-background">
      {/* Header with view toggle */}
      <div className="relative z-10 pt-24 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6">
              Portfolio
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore my work through an immersive 3D experience or browse traditional project cards. 
              Each project represents a unique challenge solved with innovative technology.
            </p>
            
            {/* View Mode Toggle */}
            <div className={cn(styles.glass.base, "inline-flex rounded-lg border border-border/50 p-1")}>
              <button
                onClick={() => setViewMode('3d')}
                className={cn(
                  "px-6 py-3 rounded-md font-medium transition-all duration-200",
                  viewMode === '3d'
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                🎮 3D Experience
              </button>
              <button
                onClick={() => setViewMode('traditional')}
                className={cn(
                  "px-6 py-3 rounded-md font-medium transition-all duration-200",
                  viewMode === 'traditional'
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                📋 Traditional View
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
          <div className="px-6 lg:px-8 pb-24 bg-background">
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
          <div className={cn(styles.glass.base, "border border-border/50 max-w-sm")}>
            <h3 className="font-bold text-foreground mb-3">3D Features</h3>
            <ul className="text-sm text-muted-foreground space-y-2">
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Advanced shader effects
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Physics-based animations
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                Mouse parallax interactions
              </li>
              <li className="flex items-center">
                <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
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
          <div className={cn(styles.glass.base, "border border-border/50")}>
            <div className="text-xs text-muted-foreground mb-2">Performance</div>
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
