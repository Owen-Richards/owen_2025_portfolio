'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

import { useThemeStyles } from '../ui/useThemeStyles';

export default function AboutEnhanced() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '0px 0px -200px 0px',
  });
  const { styles, cn } = useThemeStyles();

  // Parallax scroll effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const imageY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section
      ref={containerRef}
      id="about"
      className={cn(styles.layout.section, 'overflow-hidden')}
    >
      {/* Parallax background */}
      <motion.div
        style={{ y: backgroundY }}
        className={cn(
          'absolute inset-0 opacity-50',
          styles.theme.sectionBackground
        )}
      />

      <div className={styles.layout.container}>
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Text Content */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="space-y-8"
          >
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.2 }}
                className={cn(
                  'mb-6 text-4xl font-extrabold tracking-tight md:text-6xl',
                  styles.text.heading
                )}
              >
                About Me
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ duration: 0.8, delay: 0.4 }}
                className={cn(
                  'mb-8 text-xl leading-relaxed md:text-2xl',
                  styles.text.muted
                )}
              >
                I&apos;m a{' '}
                <span className={cn('font-semibold', styles.text.primary)}>
                  full-stack engineer
                </span>{' '}
                and
                <span className={cn('font-semibold', styles.text.primary)}>
                  {' '}
                  AI enthusiast
                </span>{' '}
                who thrives at the intersection of creativity and technology.
              </motion.p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'Problem Solver',
                  description:
                    "I approach complex challenges with systematic thinking and innovative solutions, whether it's building scalable web applications or developing ML models.",
                },
                {
                  title: 'Continuous Learner',
                  description:
                    "From mastering new frameworks to exploring cutting-edge AI research, I'm always pushing the boundaries of what's possible.",
                },
                {
                  title: 'Team Collaborator',
                  description:
                    'I believe the best solutions emerge from diverse perspectives and collaborative effort, fostering environments where everyone can contribute their best work.',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.8, delay: 0.6 + index * 0.2 }}
                  className="border-l-4 border-primary/30 py-2 pl-6"
                >
                  <h3
                    className={cn(
                      'mb-2 text-lg font-bold',
                      styles.text.heading
                    )}
                  >
                    {item.title}
                  </h3>
                  <p className={cn('leading-relaxed', styles.text.muted)}>
                    {item.description}
                  </p>
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
                className={cn(
                  styles.button.primary,
                  'inline-flex items-center'
                )}
              >
                View Resume
              </a>

              <button className={cn(styles.button.secondary)}>
                Let&apos;s Connect
              </button>
            </motion.div>
          </motion.div>

          {/* Image Content */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
            className="relative"
          >
            <div
              className={cn(
                'relative overflow-hidden rounded-2xl',
                styles.glass.base,
                'border-2 border-border',
                styles.theme.cardShadow
              )}
            >
              <Image
                src="/IMG-3605.jpg"
                alt="Owen Richards"
                width={600}
                height={600}
                className="h-auto w-full object-cover"
                priority
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
            </div>

            {/* Floating decorative elements */}
            <motion.div
              animate={{
                y: [0, -20, 0],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="absolute -right-6 -top-6 h-12 w-12 rounded-full border border-primary/20 bg-accent/20 backdrop-blur-sm"
            />

            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, -3, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 2,
              }}
              className="absolute -bottom-4 -left-4 h-8 w-8 rounded-full border border-accent/20 bg-primary/20 backdrop-blur-sm"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
