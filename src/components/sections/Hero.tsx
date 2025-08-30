'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { scrollManager } from '@/lib/scroll/scroll';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Create timeline for hero animations
    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current, 
      { opacity: 0, y: 100 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(subtitleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
      '-=0.8'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    );

    // Register with scroll manager
    scrollManager.createSectionTimeline(sectionRef.current, tl, {
      start: 'top bottom',
      end: 'bottom top',
      scrub: false,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center text-white z-10 pointer-events-auto"
      id="hero"
    >
      <div className="text-center px-6 max-w-4xl mx-auto">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight opacity-0"
        >
          Signal
          <span className="block text-3xl md:text-4xl lg:text-5xl font-light text-cyan-400 mt-2">
            in the noise
          </span>
        </h1>
        
        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed opacity-0"
        >
          Where cutting-edge technology meets award-winning design. 
          Creating digital experiences that transcend the ordinary.
        </p>
        
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-6 justify-center opacity-0"
        >
          <button
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            onClick={() => scrollManager.scrollTo('#craft')}
          >
            Explore My Work
          </button>
          <button
            className="px-8 py-4 border border-white/30 hover:border-cyan-400 text-white font-semibold rounded-lg transition-all duration-300 hover:text-cyan-400"
            onClick={() => scrollManager.scrollTo('#contact')}
          >
            Get In Touch
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-70">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
