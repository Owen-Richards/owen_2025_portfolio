'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';
import { scrollManager } from '@/lib/scroll/scroll';
import FallbackHero from '@/components/fallback/FallbackHero';

// Scene components (will be dynamically imported)
import HeroScene from './scenes/HeroScene';
import CraftScene from './scenes/CraftScene';
import ProcessScene from './scenes/ProcessScene';
import ImpactScene from './scenes/ImpactScene';
import ContactScene from './scenes/ContactScene';

interface CanvasExperienceProps {
  className?: string;
}

export default function CanvasExperience({ className = '' }: CanvasExperienceProps) {
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentScene, setCurrentScene] = useState<'hero' | 'craft' | 'process' | 'impact' | 'contact'>('hero');

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    setIsWebGLSupported(!!gl);

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleMotionChange);

    return () => {
      mediaQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  useEffect(() => {
    if (!isWebGLSupported) return;

    // Listen to scroll events to switch scenes
    const unsubscribe = scrollManager.onScroll(() => {
      const scrollY = scrollManager.getScroll();
      const windowHeight = window.innerHeight;
      const currentSection = Math.floor(scrollY / windowHeight);

      switch (currentSection) {
        case 0:
          setCurrentScene('hero');
          break;
        case 1:
          setCurrentScene('craft');
          break;
        case 2:
          setCurrentScene('process');
          break;
        case 3:
          setCurrentScene('impact');
          break;
        case 4:
        default:
          setCurrentScene('contact');
          break;
      }
    });

    return unsubscribe;
  }, [isWebGLSupported]);

  // Fallback for unsupported browsers or reduced motion
  if (isWebGLSupported === false || prefersReducedMotion) {
    return <FallbackHero />;
  }

  // Loading state
  if (isWebGLSupported === null) {
    return (
      <div className="fixed inset-0 bg-slate-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      <Canvas
        ref={canvasRef}
        camera={{
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000,
        }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 2]}
        performance={{
          min: 0.5,
          max: 1,
          debounce: 200,
        }}
        onCreated={({ gl }) => {
          // Optimize renderer settings
          gl.toneMapping = THREE.ACESFilmicToneMapping;
          gl.toneMappingExposure = 1;
          gl.outputColorSpace = THREE.SRGBColorSpace;
          
          // Enable shadows
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
          
          // Set clear color
          gl.setClearColor(0x0a0a0f, 1);
          
          // Clamp pixel ratio on mobile
          const isMobile = window.innerWidth < 768;
          if (isMobile) {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
          }
        }}
      >
        <Suspense fallback={null}>
          {/* Adaptive performance */}
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          
          {/* Render current scene */}
          {currentScene === 'hero' && <HeroScene />}
          {currentScene === 'craft' && <CraftScene />}
          {currentScene === 'process' && <ProcessScene />}
          {currentScene === 'impact' && <ImpactScene />}
          {currentScene === 'contact' && <ContactScene />}
        </Suspense>
      </Canvas>
    </div>
  );
}
