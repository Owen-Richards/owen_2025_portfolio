'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { scrollManager } from '@/lib/scroll/scroll';

const projects = [
  {
    id: 1,
    title: "Neural Network Visualizer",
    description: "Real-time 3D visualization of machine learning algorithms",
    tech: ["Three.js", "TensorFlow.js", "WebGL"],
    status: "live",
  },
  {
    id: 2,
    title: "Immersive Portfolio",
    description: "Award-winning interactive experience with WebGL",
    tech: ["React", "Three.js", "GSAP"],
    status: "featured",
  },
  {
    id: 3,
    title: "Data Constellation",
    description: "Interactive data visualization for enterprise clients",
    tech: ["D3.js", "Node.js", "PostgreSQL"],
    status: "enterprise",
  },
];

export default function Impact() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline();
    
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
    )
    .fromTo(gridRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: 'power2.out' },
      '-=0.5'
    );

    scrollManager.createSectionTimeline(sectionRef.current, tl, {
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: false,
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center text-white z-10 pointer-events-auto py-20"
      id="impact"
    >
      <div className="max-w-6xl mx-auto px-6">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold text-center mb-16 opacity-0"
        >
          Constellations of Work
        </h2>
        
        <div
          ref={gridRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-0"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className="group relative bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Status indicator */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    project.status === 'live'
                      ? 'bg-green-500/20 text-green-400'
                      : project.status === 'featured'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}
                >
                  {project.status.toUpperCase()}
                </span>
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    hoveredProject === project.id
                      ? 'bg-cyan-400 scale-125'
                      : 'bg-white/30'
                  }`}
                />
              </div>

              <h3 className="text-xl font-semibold mb-3 text-cyan-400 group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>
              
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-xs font-medium bg-white/10 text-white/70 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Hover effect */}
              <div
                className={`absolute inset-0 border-2 border-cyan-400/50 rounded-lg transition-opacity duration-300 ${
                  hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            className="px-8 py-4 border border-cyan-400 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300"
            onClick={() => scrollManager.scrollTo('#contact')}
          >
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
