'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { scrollManager } from '@/lib/scroll/scroll';

const craftData = {
  title: "Geometry in Motion",
  subtitle: "Where form meets function in perfect harmony",
  projects: [
    {
      title: "Interactive 3D Experience",
      description: "Immersive WebGL environment with real-time physics",
      tech: ["Three.js", "WebGL", "GLSL"],
    },
    {
      title: "Award-Winning Portfolio",
      description: "Recognition for innovative design and development",
      tech: ["Next.js", "React", "TypeScript"],
    },
    {
      title: "Real-time Visualization",
      description: "Complex data transformed into beautiful visuals",
      tech: ["D3.js", "Canvas", "WebWorkers"],
    },
  ],
};

export default function Craft() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { opacity: 0, x: -100 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }
    );

    projectRefs.current.forEach((ref, index) => {
      if (ref) {
        tl.fromTo(ref,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          `-=${0.6 - index * 0.2}`
        );
      }
    });

    scrollManager.createSectionTimeline(sectionRef.current, tl, {
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: true,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center text-white z-10 pointer-events-auto py-20"
      id="craft"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              ref={titleRef}
              className="text-4xl md:text-6xl font-bold mb-6 opacity-0"
            >
              {craftData.title}
            </h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              {craftData.subtitle}
            </p>
          </div>
          
          <div className="space-y-8">
            {craftData.projects.map((project, index) => (
              <div
                key={index}
                ref={(el) => { projectRefs.current[index] = el; }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 opacity-0 hover:bg-white/15 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-2 text-cyan-400">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium bg-cyan-500/20 text-cyan-400 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
