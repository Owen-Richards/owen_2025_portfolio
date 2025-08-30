"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function AboutEnhanced() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -200px 0px" });
  
  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section ref={containerRef} id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Parallax background */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 opacity-50"
      />
      
      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl font-extrabold tracking-tight text-accent mb-6 drop-shadow-lg"
              >
                About Me
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-xl md:text-2xl text-neutral-300 leading-relaxed mb-8"
              >
                I&apos;m a <span className="text-accent font-semibold">full-stack engineer</span> and
                <span className="text-accent font-semibold"> AI enthusiast</span> who thrives at the 
                intersection of creativity and technology.
              </motion.p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: "Problem Solver",
                  description: "I approach complex challenges with systematic thinking and innovative solutions, whether it's building scalable web applications or developing ML models."
                },
                {
                  title: "Continuous Learner", 
                  description: "From mastering new frameworks to exploring cutting-edge AI research, I'm always pushing the boundaries of what's possible."
                },
                {
                  title: "Team Collaborator",
                  description: "I believe the best solutions emerge from diverse perspectives and collaborative effort, fostering environments where everyone can contribute their best work."
                }
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                  className="border-l-4 border-accent/30 pl-6 py-2"
                >
                  <h3 className="text-lg font-bold text-accent-foreground mb-2">{item.title}</h3>
                  <p className="text-neutral-400 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-wrap gap-4"
            >
              <a 
                href="/Owen-L-Richards-Resume-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-accent text-white font-semibold rounded-full hover:bg-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Download Resume
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </a>
              
              <a 
                href="#contact"
                className="inline-flex items-center px-6 py-3 border border-accent text-accent font-semibold rounded-full hover:bg-accent hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
              >
                Let&apos;s Connect
              </a>
            </motion.div>
          </motion.div>

          {/* Image/Visual Content */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image 
                src="/IMG-3605.jpg"
                alt="Owen Richards"
                width={500}
                height={500}
                className="w-full h-96 lg:h-[500px] object-cover"
                priority
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/50 to-transparent" />
              
              {/* Floating elements for visual interest */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-8 right-8 w-16 h-16 bg-accent/20 rounded-full backdrop-blur-sm flex items-center justify-center"
              >
                <span className="text-2xl">🚀</span>
              </motion.div>
              
              <motion.div
                animate={{ 
                  y: [0, 10, 0],
                  rotate: [0, -5, 5, 0]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-8 left-8 w-12 h-12 bg-accent-foreground/20 rounded-full backdrop-blur-sm flex items-center justify-center"
              >
                <span className="text-lg">💡</span>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
