"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useThemeStyles } from "../ui/useThemeStyles";

// Skill categories and data with proficiency levels for visual impact
const skills = [
  {
    category: "Languages",
    icon: "💻",
    items: [
      { name: "TypeScript", level: 95 },
      { name: "JavaScript", level: 95 },
      { name: "Python", level: 90 },
      { name: "Java", level: 85 },
      { name: "C#", level: 80 },
      { name: "C++", level: 75 },
      { name: "SQL", level: 85 },
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "R", level: 70 },
      { name: "C", level: 70 },
      { name: "Ajax", level: 80 }
    ],
  },
  {
    category: "Frameworks & Libraries",
    icon: "⚛️",
    items: [
      { name: "React", level: 95 },
      { name: "Next.js", level: 90 },
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "Three.js", level: 85 },
      { name: "TensorFlow", level: 75 },
      { name: "Angular", level: 70 },
      { name: "Vue", level: 65 },
      { name: "Django", level: 75 },
      { name: "Flask", level: 70 },
      { name: "PyTorch", level: 70 },
      { name: "Pandas", level: 80 },
      { name: "NumPy", level: 75 },
      { name: "D3", level: 75 },
      { name: "scikit-learn", level: 70 }
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: "☁️",
    items: [
      { name: "AWS", level: 85 },
      { name: "Docker", level: 80 },
      { name: "Kubernetes", level: 75 },
      { name: "GitHub Actions", level: 85 },
      { name: "Terraform", level: 70 },
      { name: "Azure", level: 70 },
      { name: "GCP", level: 65 },
      { name: "Jenkins", level: 65 },
      { name: "Datadog", level: 60 },
      { name: "Kafka", level: 60 },
      { name: "Redis", level: 70 }
    ],
  },
  {
    category: "Database & Analytics",
    icon: "🗄️",
    items: [
      { name: "PostgreSQL", level: 85 },
      { name: "MongoDB", level: 80 },
      { name: "Snowflake", level: 75 },
      { name: "ElasticSearch", level: 70 },
      { name: "Spark", level: 65 },
      { name: "Hadoop", level: 60 }
    ],
  },
];

// Premium Skill Card with stunning animations
function SkillCard({ skill }: { skill: { name: string; level: number } }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const { styles, cn } = useThemeStyles();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
      whileHover={{ scale: 1.08, y: -5, rotateY: 5 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "group relative cursor-pointer",
        styles.card.base,
        "border-2 border-border/30 hover:border-primary/50",
        "hover:shadow-[var(--shadow-strong)]",
        "transition-all duration-500",
        "backdrop-blur-xl",
        styles.effects.glow,
        "theme-focus"
      )}
      tabIndex={0}
      aria-label={`${skill.name} - ${skill.level}% proficiency`}
    >
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <span className={cn(
            "text-sm font-semibold transition-colors",
            styles.text.body,
            "group-hover:text-primary"
          )}>
            {skill.name}
          </span>
          <span className={cn(
            "text-xs font-medium",
            styles.text.primary
          )}>
            {skill.level}%
          </span>
        </div>
        
        {/* Animated Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ 
              duration: 1.2, 
              delay: Math.random() * 0.5,
              ease: "easeOut" 
            }}
          />
        </div>
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 -z-10"
        whileHover={{ opacity: 0.2 }}
      />
    </motion.div>
  );
}

// Category Section Component
function CategorySection({ category }: { category: typeof skills[0] }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });
  const { styles, cn } = useThemeStyles();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="space-y-6"
    >
      {/* Category Header */}
      <motion.div
        className={cn(
          "text-center p-6 rounded-xl",
          styles.glass.base,
          "border-2 border-border",
          styles.theme.cardShadow
        )}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="text-4xl mb-3"
          animate={{ 
            rotate: [0, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          {category.icon}
        </motion.div>
        <h3 className={cn(
          "text-2xl font-bold tracking-tight",
          styles.text.heading
        )}>
          {category.category}
        </h3>
        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mt-4" />
      </motion.div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {category.items.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: "easeOut" 
            }}
          >
            <SkillCard skill={skill} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function TechnicalSkills() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "0px 0px -200px 0px" });
  const { styles, cn } = useThemeStyles();

  return (
    <section 
      id="skills"
      ref={containerRef} 
      className={cn(styles.layout.section, "overflow-hidden")}
    >
      <div className={styles.layout.container}>
        {/* Premium Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 60, scale: 0.9 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={cn(styles.layout.centeredContent, "mb-24")}
        >
          <motion.h2 
            className={cn(
              styles.text.hero,
              "mb-8 leading-none"
            )}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            transition={{ duration: 0.5 }}
          >
            Technical Skills
          </motion.h2>
          
          <motion.p 
            className={cn(
              styles.text.bodyLarge,
              "max-w-4xl mx-auto text-balance",
              styles.glass.overlay,
              styles.effects.glow
            )}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            A comprehensive toolkit built through years of{' '}
            <span className={cn("font-bold", styles.text.gradient)}>
              hands-on experience
            </span>
            {' '}and continuous learning in the ever-evolving world of{' '}
            <span className={cn("font-bold", styles.text.gradient)}>
              technology
            </span>.
          </motion.p>

          {/* Premium Decorative Elements */}
          <motion.div
            className="flex justify-center items-center mt-12 space-x-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div 
              className="w-20 h-2 bg-gradient-to-r from-primary via-accent to-secondary rounded-full"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "linear"
              }}
              style={{ backgroundSize: '200% 100%' }}
            />
            <motion.div 
              className={cn(
                "w-4 h-4 rounded-full",
                styles.effects.glow
              )}
              style={{ 
                background: 'radial-gradient(circle, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%)'
              }}
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity 
              }}
            />
            <motion.div 
              className="w-20 h-2 bg-gradient-to-l from-primary via-accent to-secondary rounded-full"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "linear",
                delay: 1.5
              }}
              style={{ backgroundSize: '200% 100%' }}
            />
          </motion.div>
        </motion.div>

        {/* Skills Categories */}
        <div className="space-y-16">
          {skills.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2,
                ease: "easeOut" 
              }}
            >
              <CategorySection category={category} />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center mt-20"
        >
          <div className={cn(
            "inline-block p-8 rounded-2xl",
            styles.glass.base,
            "border-2 border-border",
            styles.theme.cardShadow
          )}>
            <motion.h3 
              className={cn(
                "text-2xl font-bold mb-4",
                styles.text.heading
              )}
              whileHover={{ scale: 1.05 }}
            >
              Ready to collaborate?
            </motion.h3>
            
            <motion.p 
              className={cn(
                "text-lg mb-6 max-w-md mx-auto",
                styles.text.muted
              )}
            >
              Let&apos;s discuss how these skills can help bring your project to life.
            </motion.p>
            
            <motion.button
              className={cn(styles.button.primary)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
