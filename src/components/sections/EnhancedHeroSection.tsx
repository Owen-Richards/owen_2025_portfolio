'use client';

import { createLiquidTimeline, createMagneticReveal, createScrollVelocityEffect, scrollManager } from '@/lib/scroll/scroll';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Award, ChevronDown, Code, Download, Zap } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { useThemeStyles } from '../ui/useThemeStyles';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 20,
      mass: 0.8,
    },
  },
};

const chipVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 120,
      damping: 15,
    },
  },
};

export default function EnhancedHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const { styles, cn } = useThemeStyles();
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth spring physics for scroll transforms
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1
  });

  const y = useTransform(smoothProgress, [0, 1], [0, -100]);
  const opacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    if (!titleRef.current || !subtitleRef.current || !ctaRef.current || prefersReducedMotion) return;

    // Initialize advanced scroll animations
    const titleTimeline = createLiquidTimeline(titleRef.current);
    createMagneticReveal(subtitleRef.current);
    
    scrollManager.createSectionTimeline(
      containerRef.current!,
      titleTimeline,
      {
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: false
      }
    );

    // Add magnetic effects to interactive elements
    const buttons = ctaRef.current.querySelectorAll('button, a');
    buttons.forEach(button => {
      scrollManager.addMagneticElement(button as HTMLElement, 0.15);
    });

    // Add velocity-based effects
    const cleanupVelocity = createScrollVelocityEffect(titleRef.current);

    return () => {
      cleanupVelocity();
    };
  }, [prefersReducedMotion]);

  // Professional impact highlights with attention-grabbing numbers
  const impactChips = [
    {
      icon: <Zap size={16} />,
      text: "99.9% Uptime • $2M+ Revenue Impact",
      color: "from-emerald-500 to-teal-500",
      metric: "$2M+"
    },
    {
      icon: <Award size={16} />,
      text: "ML Systems • 40% Performance Boost", 
      color: "from-blue-500 to-cyan-500",
      metric: "40%"
    },
    {
      icon: <Code size={16} />,
      text: "AWS Architect • 5 Years Enterprise",
      color: "from-purple-500 to-pink-500",
      metric: "5+ Years"
    }
  ];

  return (
    <section 
      id="home"
      ref={containerRef}
      className={cn(
        "relative min-h-screen flex items-center justify-center overflow-hidden",
        styles.layout.section,
        styles.theme.heroBackground
      )}
    >
      {/* Clean, professional background that works in both themes */}
      <div className="absolute inset-0 bg-background/95 dark:bg-background/90" />
      
      {/* Subtle gradient for depth without overwhelming */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/80 to-muted/20 dark:from-background dark:via-background/80 dark:to-primary/5" />
      
      <motion.div
        style={{ y, opacity }}
        className={cn(styles.layout.container, "relative z-20")}
      >
        {/* Clean content container with subtle glass effect */}
        <div className="absolute inset-0 rounded-3xl bg-card/30 backdrop-blur-sm border border-border/30 shadow-lg" />
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-12 max-w-5xl mx-auto relative z-10"
        >
          {/* Professional Availability Status */}
          <motion.div
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-100 border border-green-300 text-green-800 dark:bg-green-950/60 dark:border-green-700 dark:text-green-200 text-sm font-medium"
          >
            <div className="relative">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <motion.div 
                className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span>Available for new opportunities</span>
          </motion.div>

          {/* Clean and Readable Main Heading */}
          <motion.div 
            ref={titleRef}
            variants={itemVariants} 
            className="space-y-6 relative"
          >
            
            <motion.h1 
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-balance"
            >
              <motion.span 
                className="block text-white"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                Owen Richards
              </motion.span>
              
              <motion.span 
                className="block mt-2 font-semibold text-blue-400"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                Senior Software Engineer
              </motion.span>
              
              <motion.span 
                className="block mt-1 text-lg md:text-xl lg:text-2xl font-medium text-gray-300"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                AI/ML Solutions Architect • Tech Lead
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Clean Professional Metrics */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-6 px-4"
          >
            {impactChips.map((chip, index) => (
              <motion.div
                key={index}
                variants={chipVariants}
                whileHover={{ y: -2 }}
                className="group relative px-6 py-4 rounded-xl bg-card border border-gray-600 hover:border-blue-400 transition-all duration-300 shadow-sm hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="text-blue-400">{chip.icon}</span>
                  <div>
                    <div className="text-lg font-semibold text-white">{chip.metric}</div>
                    <div className="text-sm text-gray-300">{chip.text}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Clean Professional Summary */}
          <motion.p
            ref={subtitleRef}
            variants={itemVariants}
            className="text-lg md:text-xl leading-relaxed text-balance max-w-3xl mx-auto text-gray-200"
          >
            Built enterprise platforms generating{' '}
            <span className="font-semibold text-white">
              $2M+ revenue impact
            </span>
            {' '}• MS CS (ML) from Georgia Tech • Leading teams that deliver AI solutions for Fortune 500 clients
          </motion.p>

          {/* Clean Professional CTAs */}
          <motion.div
            ref={ctaRef}
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <motion.button
              onClick={() => scrollManager.scrollTo('#projects')}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium shadow-sm hover:shadow-md transition-all duration-300"
            >
              View Projects
            </motion.button>

            <motion.a
              href="/Owen-L-Richards-Resume-2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-lg border border-border bg-background text-foreground font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary"
            >
              <span className="flex items-center gap-2">
                <Download size={18} />
                Download Resume
              </span>
            </motion.a>
          </motion.div>

          {/* Clean Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="pt-16 pb-8"
          >
            <motion.div
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => scrollManager.scrollTo('#skills')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                position: 'absolute',
                bottom: '5vh',
                left: '50%',
                transform: 'translateX(-50%)'
              }}
            >
              <motion.span 
                className="text-xs font-medium mb-4 tracking-wider uppercase text-muted-foreground transition-colors duration-300 group-hover:text-foreground"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Explore
              </motion.span>
              
              <motion.div
                className="flex items-center justify-center w-12 h-12 rounded-full border border-border bg-background/80 backdrop-blur-sm shadow-sm transition-all duration-300 group-hover:border-primary group-hover:shadow-md"
                animate={{ y: [0, 6, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ChevronDown 
                  size={20} 
                  className="text-muted-foreground transition-colors duration-300 group-hover:text-primary"
                  strokeWidth={2}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background via-background/80 to-transparent"
        style={{ opacity }}
      />
    </section>
  );
}
