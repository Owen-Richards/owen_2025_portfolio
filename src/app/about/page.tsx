'use client';

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
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-primary-50 to-secondary-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
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
                  className="aspect-square rounded-3xl bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center overflow-hidden"
                >
                  <div className="w-48 h-48 bg-primary-300 rounded-full flex items-center justify-center">
                    <span className="text-8xl font-display font-black text-primary-600">
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
                  className="absolute -top-4 -right-4 px-4 py-2 bg-accent-400 text-white rounded-full text-sm font-medium"
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
                  <span className="text-primary-600 ml-4 slight-skew">Me</span>
                </h1>
                <div className="space-y-6 text-lg text-foreground/70 font-serif leading-relaxed">
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
                <div className="flex items-center gap-3 text-foreground/80">
                  <MapPin size={20} className="text-primary-600" />
                  <span>San Francisco, CA</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/80">
                  <Calendar size={20} className="text-primary-600" />
                  <span>5+ Years Experience</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/80">
                  <Coffee size={20} className="text-primary-600" />
                  <span>Coffee Enthusiast</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/80">
                  <Heart size={20} className="text-primary-600" />
                  <span>Design Lover</span>
                </div>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <Download size={18} />
                Download Resume
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div variants={itemVariants} className="text-center mb-20">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Skills &
                <span className="text-primary-600 ml-4 slight-skew">Expertise</span>
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-serif">
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
                  className="p-8 glass bg-white/60 backdrop-blur-sm rounded-2xl border border-primary-200/30"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 bg-primary-100 rounded-full">
                      <skillCategory.icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-2xl font-display font-bold text-foreground">
                      {skillCategory.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {skillCategory.items.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-2 bg-primary-50 text-primary-700 rounded-full text-sm font-medium"
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
