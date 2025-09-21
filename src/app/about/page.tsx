'use client';

import { motion } from 'framer-motion';
import {
  Calendar,
  Code,
  Coffee,
  Download,
  Heart,
  MapPin,
  Palette,
  Zap,
} from 'lucide-react';

import { useThemeStyles } from '@/components/ui/useThemeStyles';

const skills = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    icon: Code,
  },
  {
    category: '3D & Animation',
    items: ['Three.js', 'GSAP', 'WebGL', 'Blender', 'After Effects'],
    icon: Zap,
  },
  {
    category: 'Design',
    items: ['Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Prototyping'],
    icon: Palette,
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL'],
    icon: Code,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function About() {
  const { styles, cn } = useThemeStyles();

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section
        className={cn(
          styles.layout.section,
          'bg-gradient-to-br from-background via-muted/30 to-background'
        )}
      >
        <div className={styles.layout.container}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid items-center gap-16 lg:grid-cols-2"
          >
            {/* Profile Image */}
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  className={cn(
                    styles.card.base,
                    'flex aspect-square items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-card via-muted/20 to-card'
                  )}
                >
                  <div className="flex h-48 w-48 items-center justify-center rounded-full bg-primary/20">
                    <span className="font-display text-8xl font-black text-primary">
                      O
                    </span>
                  </div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 5, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -right-4 -top-4 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground"
                >
                  Available for work
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div
              variants={itemVariants}
              className="order-1 space-y-8 lg:order-2"
            >
              <div>
                <h1 className="mb-6 font-display text-5xl font-bold text-foreground lg:text-6xl">
                  About
                  <span className="slight-skew ml-4 text-primary">Me</span>
                </h1>
                <div className="space-y-6 font-serif text-lg leading-relaxed text-muted-foreground">
                  <p>
                    I&apos;m Owen, a creative developer who thrives at the
                    intersection of technology and design. With over 5 years of
                    experience crafting digital experiences, I&apos;ve had the
                    privilege of working with innovative companies and bringing
                    ambitious ideas to life.
                  </p>
                  <p>
                    My journey began with a fascination for how code could
                    create beauty. Today, I specialize in building immersive web
                    experiences that combine cutting-edge technology with
                    thoughtful design.
                  </p>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin size={20} className="text-primary" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar size={20} className="text-primary" />
                  <span>5+ Years Experience</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Coffee size={20} className="text-primary" />
                  <span>Coffee Enthusiast</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Heart size={20} className="text-primary" />
                  <span>Design Lover</span>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  styles.button.primary,
                  'flex items-center gap-2 shadow-lg hover:shadow-xl'
                )}
              >
                <Download size={18} />
                Download Resume
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={cn(styles.layout.section, 'bg-background')}>
        <div className={styles.layout.container}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={itemVariants} className="mb-20 text-center">
              <h2 className="mb-6 font-display text-4xl font-bold text-foreground lg:text-5xl">
                Skills &
                <span className="slight-skew ml-4 text-primary">Expertise</span>
              </h2>
              <p className="mx-auto max-w-3xl font-serif text-xl text-muted-foreground">
                A diverse toolkit that enables me to bring creative visions to
                life through code, design, and innovative technology.
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2">
              {skills.map((skillCategory) => (
                <motion.div
                  key={skillCategory.category}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className={cn(styles.card.base, styles.glass.card)}
                >
                  <div className="mb-6 flex items-center gap-4">
                    <div className="rounded-full bg-primary/20 p-3">
                      <skillCategory.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground">
                      {skillCategory.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {skillCategory.items.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
