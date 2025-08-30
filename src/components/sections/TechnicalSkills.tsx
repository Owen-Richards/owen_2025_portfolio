"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

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

// Enhanced Skill Card with animated proficiency bar
function SkillCard({ skill }: { skill: { name: string; level: number } }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      whileHover={{ scale: 1.05, rotate: 1 }}
      whileTap={{ scale: 0.98 }}
      className="group relative bg-gradient-to-br from-neutral-900/90 to-neutral-800/70 border border-neutral-700/50 rounded-xl shadow-xl p-4 backdrop-blur-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-300 hover:border-accent/30"
      tabIndex={0}
      aria-label={`${skill.name} - ${skill.level}% proficiency`}
    >
      <div className="flex flex-col space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
            {skill.name}
          </span>
          <span className="text-xs text-accent/80 font-medium">
            {skill.level}%
          </span>
        </div>
        
        {/* Animated proficiency bar */}
        <div className="w-full bg-neutral-700/50 rounded-full h-1.5 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-accent to-accent-foreground rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          />
        </div>
      </div>
      
      {/* Subtle hover glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-accent-foreground/5 transition-all duration-300 pointer-events-none" />
    </motion.div>
  );
}

// Main Technical Skills Section
export default function TechnicalSkills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" });

  return (
    <section ref={ref} id="skills" className="py-16 md:py-24 px-4 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-accent drop-shadow-lg">
          Technical Skills
        </h2>
        <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
          A comprehensive toolkit built through years of hands-on experience in full-stack development, 
          machine learning, and cloud architecture.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {skills.map((category, categoryIndex) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, x: categoryIndex % 2 === 0 ? -40 : 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: categoryIndex % 2 === 0 ? -40 : 40 }}
            transition={{ duration: 0.8, delay: categoryIndex * 0.1, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <span className="text-3xl" aria-hidden="true">{category.icon}</span>
              <h3 className="text-2xl font-bold text-accent-foreground drop-shadow-sm">
                {category.category}
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {category.items.map((skill) => (
                <SkillCard key={skill.name} skill={skill} />
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Optional: Skill visualization summary */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        className="mt-16 text-center"
      >
        <div className="inline-flex items-center space-x-6 bg-gradient-to-r from-neutral-900/80 to-neutral-800/60 border border-neutral-700/50 rounded-2xl px-8 py-4 backdrop-blur-sm">
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">{skills.reduce((acc, cat) => acc + cat.items.length, 0)}+</div>
            <div className="text-sm text-neutral-400">Technologies</div>
          </div>
          <div className="w-px h-12 bg-neutral-700"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">{skills.length}</div>
            <div className="text-sm text-neutral-400">Categories</div>
          </div>
          <div className="w-px h-12 bg-neutral-700"></div>
          <div className="text-center">
            <div className="text-3xl font-bold text-accent">5+</div>
            <div className="text-sm text-neutral-400">Years Exp</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
