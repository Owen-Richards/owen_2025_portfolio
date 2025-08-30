'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { scrollManager } from '@/lib/scroll/scroll';

const processSteps = [
  {
    title: "Chaos",
    description: "Every great project begins with questions, constraints, and scattered ideas. This is where possibilities are infinite.",
    icon: "🌪️",
  },
  {
    title: "Exploration", 
    description: "Through iteration and experimentation, patterns emerge. Ideas crystallize into concepts worth pursuing.",
    icon: "🔍",
  },
  {
    title: "Clarity",
    description: "The path becomes clear. Execution follows vision, and the impossible becomes inevitable.",
    icon: "✨",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    );

    // Animate steps based on scroll progress
    const scrollTrigger = scrollManager.createSectionTimeline(sectionRef.current, tl, {
      start: 'top center',
      end: 'bottom center',
      pin: true,
      scrub: true,
    });

    // Listen to scroll updates separately
    const unsubscribe = scrollManager.onScroll((progress) => {
      const stepIndex = Math.floor(progress * 3);
      setActiveStep(Math.min(stepIndex, 2));
    });

    return () => {
      tl.kill();
      unsubscribe();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center text-white z-10 pointer-events-auto"
      id="process"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-16 opacity-0"
        >
          From Chaos to Clarity
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {processSteps.map((step, index) => (
            <div
              key={index}
              ref={(el) => { stepRefs.current[index] = el; }}
              className={`transition-all duration-500 ${
                activeStep >= index 
                  ? 'opacity-100 scale-100' 
                  : 'opacity-50 scale-95'
              }`}
            >
              <div className="text-6xl mb-6">{step.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">
                {step.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Progress indicator */}
        <div className="flex justify-center mt-12 space-x-4">
          {processSteps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeStep >= index ? 'bg-cyan-400' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
