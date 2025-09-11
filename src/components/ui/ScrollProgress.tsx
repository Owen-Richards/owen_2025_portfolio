'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTheme } from './ThemeProvider';

interface ScrollProgressProps {
  sections?: string[];
}

export default function ScrollProgress({ sections = ['Home', 'Skills', 'About', 'Projects', 'Contact'] }: ScrollProgressProps) {
  const { theme } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [progressPercent, setProgressPercent] = useState(0);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 1
  });

  const circumference = 2 * Math.PI * 24; // radius of 24
  const strokeDashoffset = useTransform(
    smoothProgress, 
    [0, 1], 
    [circumference, 0]
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    const updateScrollProgress = () => {
      if (typeof window === 'undefined') return;
      
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const scrollableHeight = documentHeight - windowHeight;
      const currentScrollY = window.scrollY;
      
      // Check if contact section is in view
      const contactSection = document.getElementById('contact');
      const isContactInView = contactSection ? 
        contactSection.getBoundingClientRect().top <= windowHeight * 0.5 : false;
      
      // Calculate progress percentage
      let percentage = 0;
      if (scrollableHeight > 0) {
        const scrollProgress = currentScrollY / scrollableHeight;
        const isAtBottom = (currentScrollY + windowHeight + 5) >= documentHeight;
        
        // Force 100% if contact section is in view OR at bottom OR high scroll progress
        if (isContactInView || isAtBottom || scrollProgress >= 0.85) {
          percentage = 100;
        } else {
          percentage = Math.round(Math.min(scrollProgress * 100, 100));
        }
      } else {
        percentage = 100;
      }
      
      setProgressPercent(percentage);
      
      // Set visibility
      const scrollYProgress = scrollableHeight > 0 ? currentScrollY / scrollableHeight : 1;
      setIsVisible(scrollYProgress > 0.05);
      
      // Calculate current section
      if (scrollableHeight <= 0) {
        setCurrentSection(sections.length - 1);
        return;
      }
      
      const scrollProgress = currentScrollY / scrollableHeight;
      const isAtBottom = (currentScrollY + windowHeight + 5) >= documentHeight;
      
      // Force contact section if contact is in view
      if (isContactInView || isAtBottom || scrollProgress >= 0.85) {
        setCurrentSection(sections.length - 1);
        return;
      }
      
      const sectionIndex = Math.floor(scrollProgress * sections.length);
      setCurrentSection(Math.min(sectionIndex, sections.length - 1));
    };
    
    // Initial calculation
    updateScrollProgress();
    
    // Listen for scroll events
    const handleScroll = () => {
      updateScrollProgress();
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Also listen to framer motion scroll progress for smoothness
    const unsubscribe = scrollYProgress.on('change', () => {
      updateScrollProgress();
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, [scrollYProgress, sections.length, mounted]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const themeColors = {
    light: {
      bg: 'hsl(var(--card) / 0.95)',
      border: 'hsl(var(--border))',
      text: 'hsl(var(--foreground))',
      progress: 'hsl(var(--primary))',
      progressBg: 'hsl(var(--primary) / 0.2)',
      shadow: 'hsl(var(--foreground) / 0.1)',
    },
    dark: {
      bg: 'hsl(var(--card) / 0.95)',
      border: 'hsl(var(--border))',
      text: 'hsl(var(--foreground))',
      progress: 'hsl(var(--primary))',
      progressBg: 'hsl(var(--primary) / 0.2)',
      shadow: 'hsl(var(--foreground) / 0.3)',
    }
  };

  const colors = themeColors[theme];

  return (
    <motion.div
      className="fixed bottom-8 right-8 z-50"
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.8,
        y: isVisible ? 0 : 20
      }}
      transition={{ 
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1]
      }}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      {/* Main Progress Circle */}
      <motion.div
        className="relative cursor-pointer group"
        onClick={scrollToTop}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Background Circle */}
        <div 
          className="w-16 h-16 rounded-full backdrop-blur-md border shadow-lg
                     transition-all duration-300 group-hover:shadow-xl"
          style={{
            backgroundColor: colors.bg,
            borderColor: colors.border,
            boxShadow: `0 4px 20px ${colors.shadow}`
          }}
        />
        
        {/* Progress SVG */}
        <svg 
          className="absolute inset-0 w-16 h-16 -rotate-90"
          viewBox="0 0 56 56"
        >
          {/* Background circle */}
          <circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke={colors.progressBg}
            strokeWidth="2"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx="28"
            cy="28"
            r="24"
            fill="none"
            stroke={colors.progress}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
            className="transition-all duration-300 group-hover:stroke-[3]"
          />
        </svg>

        {/* Center Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-center"
            style={{ color: colors.text }}
          >
            <motion.div 
              className="text-xs font-bold"
              key={progressPercent}
            >
              {progressPercent}%
            </motion.div>
            <ChevronUp 
              size={12} 
              className="mx-auto opacity-60 group-hover:opacity-100 transition-opacity" 
            />
          </motion.div>
        </div>

        {/* Hover Glow Effect */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / 0.2) 0%, transparent 70%)`,
          }}
        />
      </motion.div>

      {/* Section Indicator */}
      <motion.div
        className="mt-3 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div
          className="px-3 py-1 rounded-full text-xs font-medium backdrop-blur-md border"
          style={{
            backgroundColor: colors.bg,
            borderColor: colors.border,
            color: colors.text,
            boxShadow: `0 2px 10px ${colors.shadow}`
          }}
          key={currentSection}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {sections[currentSection]}
        </motion.div>
      </motion.div>

      {/* Mini Progress Dots */}
      <div className="flex justify-center mt-2 gap-1">
        {sections.map((_, index) => (
          <motion.div
            key={index}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{
              backgroundColor: index <= currentSection ? colors.progress : colors.progressBg,
            }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 }}
          />
        ))}
      </div>
    </motion.div>
  );
}
