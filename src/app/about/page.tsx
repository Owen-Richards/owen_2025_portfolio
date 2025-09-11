'use client';

import { useThemeStyles } from '@/components/ui/useThemeStyles';
import { motion } from 'framer-motion';
import { Calendar, Code, Coffee, Download, Heart, MapPin, Palette, Zap } from 'lucide-react';

const skills = [
  { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"], icon: Code },
  { category: "3D & Animation", items: ["Three.js", "GSAP", "WebGL", "Blender", "After Effects"], icon: Zap },
  { category: "Design", items: ["Figma", "Adobe Creative Suite", "UI/UX Design", "Prototyping"], icon: Palette },
  { category: "Backend", items: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"], icon: Code },
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
      type: "spring" as const,
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
      <section className={cn(styles.layout.section, "bg-gradient-to-br from-background via-muted/30 to-background")}>
        <div className={styles.layout.container}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Profile Image */}
            <motion.div variants={itemVariants} className="order-2 lg:order-1">
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  className={cn(styles.card.base, "aspect-square rounded-3xl bg-gradient-to-br from-card via-muted/20 to-card flex items-center justify-center overflow-hidden")}
                >
                  <div className="w-48 h-48 bg-primary/20 rounded-full flex items-center justify-center">
                    <span className="text-8xl font-display font-black text-primary">
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
                    ease: "easeInOut",
                  }}
                  className="absolute -top-4 -right-4 px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium"
                >
                  Available for work
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants} className="order-1 lg:order-2 space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
                  About
                  <span className="text-primary ml-4 slight-skew">Me</span>
                </h1>
                <div className="space-y-6 text-lg text-muted-foreground font-serif leading-relaxed">
                  <p>
                    I&apos;m Owen, a creative developer who thrives at the intersection of 
                    technology and design. With over 5 years of experience crafting digital 
                    experiences, I&apos;ve had the privilege of working with innovative companies 
                    and bringing ambitious ideas to life.
                  </p>
                  <p>
                    My journey began with a fascination for how code could create beauty. 
                    Today, I specialize in building immersive web experiences that combine 
                    cutting-edge technology with thoughtful design.
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
                className={cn(styles.button.primary, "flex items-center gap-2 shadow-lg hover:shadow-xl")}
              >
                <Download size={18} />
                Download Resume
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={cn(styles.layout.section, "bg-background")}>
        <div className={styles.layout.container}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Skills &
                <span className="text-primary ml-4 slight-skew">Expertise</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-serif">
                A diverse toolkit that enables me to bring creative visions to life
                through code, design, and innovative technology.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8">
              {skills.map((skillCategory) => (
                <motion.div
                  key={skillCategory.category}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className={cn(styles.card.base, styles.glass.card)}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary/20 rounded-full">
                      <skillCategory.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground">
                      {skillCategory.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {skillCategory.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
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
