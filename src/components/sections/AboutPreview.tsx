'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Award, Coffee, Download, Users } from 'lucide-react';
import Link from 'next/link';

const stats = [
  { label: "Projects Completed", value: "50+", icon: Award },
  { label: "Happy Clients", value: "30+", icon: Users },
  { label: "Cups of Coffee", value: "1,247", icon: Coffee },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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

export default function AboutPreview() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
                Crafting Digital
                <span className="text-primary-600 ml-4 slight-skew">Experiences</span>
              </h2>
              <div className="space-y-6 text-lg text-foreground/70 font-serif leading-relaxed">
                <p>
                  Hi, I&apos;m Owen – a creative developer passionate about pushing the boundaries 
                  of what&apos;s possible on the web. With over 5 years of experience, I specialize 
                  in creating immersive digital experiences that combine cutting-edge technology 
                  with thoughtful design.
                </p>
                <p>
                  My work spans interactive web applications, 3D visualizations, and 
                  award-winning portfolio sites. I believe in the power of technology 
                  to tell stories, solve problems, and create meaningful connections.
                </p>
              </div>
            </div>

            {/* Skills Preview */}
            <div>
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                Core Expertise
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "React & Next.js",
                  "Three.js & WebGL",
                  "TypeScript",
                  "GSAP Animations",
                  "UI/UX Design",
                  "Node.js"
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full text-sm font-medium text-foreground border border-primary-200/50"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/about">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2 justify-center"
                >
                  Learn More About Me
                  <ArrowRight 
                    size={18} 
                    className="group-hover:translate-x-1 transition-transform duration-300" 
                  />
                </motion.button>
              </Link>
              
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 glass bg-white/80 hover:bg-white/90 text-foreground font-semibold rounded-full transition-all duration-300 border border-primary-200/50 flex items-center gap-2 justify-center"
              >
                <Download size={18} />
                Download Resume
              </motion.button>
            </div>
          </motion.div>

          {/* Stats & Visual */}
          <motion.div variants={itemVariants} className="space-y-8">
            {/* Profile Image Placeholder */}
            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.02, rotate: 1 }}
                className="aspect-square rounded-2xl bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center overflow-hidden"
              >
                <div className="w-32 h-32 bg-primary-300 rounded-full flex items-center justify-center">
                  <span className="text-6xl font-display font-black text-primary-600">
                    O
                  </span>
                </div>
              </motion.div>
              
              {/* Floating Elements */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-accent-400 rounded-full opacity-60"
              />
              <motion.div
                animate={{
                  y: [0, 10, 0],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-secondary-400 rounded-full opacity-40"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                  className="text-center p-6 glass bg-white/70 backdrop-blur-sm rounded-xl border border-primary-200/30"
                >
                  <stat.icon className="w-8 h-8 text-primary-600 mx-auto mb-3" />
                  <div className="text-2xl font-display font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/70 font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
