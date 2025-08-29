'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Download, Sparkles } from 'lucide-react';
import Hero3D from '../3d/Hero3D';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 3D Background */}
      <Hero3D />
      
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-background to-secondary-50 opacity-90" />
      
      {/* Floating Elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-20 right-10 w-4 h-4 bg-accent-400 rounded-full opacity-60"
      />
      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 1 }
        }}
        className="absolute top-40 left-20 w-6 h-6 bg-primary-300 rounded-full opacity-40"
      />
      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 2 }
        }}
        className="absolute bottom-40 right-32 w-8 h-8 bg-secondary-400 rounded-full opacity-30"
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center space-y-8"
        >
          {/* Subtle Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass bg-white/60 backdrop-blur-sm border border-primary-200/30"
          >
            <Sparkles size={16} className="text-accent-600" />
            <span className="text-sm font-medium text-foreground/80">
              Available for new opportunities
            </span>
          </motion.div>

          {/* Main Heading - Anti-design with intentional asymmetry */}
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="asymmetric-layout">
              <h1 className="text-display-lg md:text-display-lg font-display font-black text-foreground leading-none tracking-tight">
                <span className="block text-balance">Creative</span>
                <span className="inline-block text-primary-600 slight-skew">
                  Developer
                </span>
              </h1>
            </div>
            
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl font-serif text-foreground/70 max-w-3xl mx-auto text-balance leading-relaxed"
            >
              Crafting digital experiences that blend{' '}
              <span className="text-accent-600 font-semibold">cutting-edge technology</span>{' '}
              with{' '}
              <span className="text-primary-600 font-semibold">human-centered design</span>.
              Building the future, one pixel at a time.
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              View My Work
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown 
                  size={18} 
                  className="group-hover:rotate-90 transition-transform duration-300" 
                />
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 glass bg-white/80 hover:bg-white/90 text-foreground font-semibold rounded-full transition-all duration-300 border border-primary-200/30 flex items-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </motion.button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="pt-16"
          >
            <motion.div
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex flex-col items-center text-foreground/50"
            >
              <span className="text-sm font-medium mb-2">Discover More</span>
              <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
                <motion.div
                  animate={{
                    y: [2, 16, 2],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="w-1 h-3 bg-foreground/30 rounded-full mt-2"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
