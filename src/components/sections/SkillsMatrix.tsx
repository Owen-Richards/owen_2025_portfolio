'use client';

import { useThemeStyles } from '@/components/ui/useThemeStyles';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  category: string;
  level: 'expert' | 'advanced' | 'intermediate' | 'learning';
  years: number;
  projects?: number;
}

const SKILLS: Skill[] = [
  // Frontend
  { name: 'React/Next.js', category: 'Frontend', level: 'expert', years: 6, projects: 25 },
  { name: 'TypeScript', category: 'Frontend', level: 'expert', years: 5, projects: 30 },
  { name: 'JavaScript', category: 'Frontend', level: 'expert', years: 8, projects: 40 },
  { name: 'CSS/Tailwind', category: 'Frontend', level: 'expert', years: 8, projects: 35 },
  { name: 'Three.js/WebGL', category: 'Frontend', level: 'advanced', years: 2, projects: 8 },
  { name: 'Vue.js', category: 'Frontend', level: 'intermediate', years: 1, projects: 3 },
  
  // Backend
  { name: 'Node.js', category: 'Backend', level: 'expert', years: 6, projects: 20 },
  { name: 'Python', category: 'Backend', level: 'advanced', years: 4, projects: 15 },
  { name: 'PostgreSQL', category: 'Backend', level: 'expert', years: 5, projects: 18 },
  { name: 'Redis', category: 'Backend', level: 'advanced', years: 3, projects: 12 },
  { name: 'GraphQL', category: 'Backend', level: 'advanced', years: 3, projects: 10 },
  { name: 'REST APIs', category: 'Backend', level: 'expert', years: 7, projects: 25 },
  
  // Cloud & DevOps
  { name: 'AWS', category: 'Cloud', level: 'expert', years: 5, projects: 22 },
  { name: 'Docker', category: 'Cloud', level: 'expert', years: 4, projects: 20 },
  { name: 'Kubernetes', category: 'Cloud', level: 'advanced', years: 2, projects: 8 },
  { name: 'Terraform', category: 'Cloud', level: 'advanced', years: 2, projects: 6 },
  { name: 'CI/CD', category: 'Cloud', level: 'expert', years: 5, projects: 18 },
  { name: 'Monitoring', category: 'Cloud', level: 'advanced', years: 3, projects: 12 },
  
  // Emerging
  { name: 'Rust', category: 'Emerging', level: 'learning', years: 0.5, projects: 2 },
  { name: 'WebAssembly', category: 'Emerging', level: 'learning', years: 0.5, projects: 1 },
  { name: 'Edge Computing', category: 'Emerging', level: 'intermediate', years: 1, projects: 3 },
];

const levelConfig = {
  expert: { 
    color: 'from-slate-700 to-slate-800', 
    bg: 'bg-slate-700/10 border-slate-700/30',
    text: 'text-slate-800 dark:text-slate-200',
    width: 'w-full',
    opacity: 'opacity-100'
  },
  advanced: { 
    color: 'from-slate-600 to-slate-700', 
    bg: 'bg-slate-600/10 border-slate-600/30',
    text: 'text-slate-700 dark:text-slate-300',
    width: 'w-4/5',
    opacity: 'opacity-90'
  },
  intermediate: { 
    color: 'from-slate-600 to-slate-700', 
    bg: 'bg-slate-600/10 border-slate-600/30',
    text: 'text-slate-700 dark:text-slate-300',
    width: 'w-3/5',
    opacity: 'opacity-75'
  },
  learning: { 
    color: 'from-slate-500 to-slate-600', 
    bg: 'bg-slate-500/10 border-slate-500/30',
    text: 'text-slate-600 dark:text-slate-400',
    width: 'w-2/5',
    opacity: 'opacity-60'
  }
};

const categories = ['Frontend', 'Backend', 'Cloud', 'Emerging'];

export function SkillsMatrix() {
  const { styles } = useThemeStyles();

  return (
    <section className={styles.layout.section}>
      <div className={styles.layout.container}>
        <div className="text-center mb-16">
          <motion.h2 
            className={styles.text.heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.text.gradient}>Technical Expertise</span>
          </motion.h2>
          <motion.p 
            className={`${styles.text.muted} mt-4 max-w-2xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Skill depth visualization based on years of experience, project complexity, and production impact.
          </motion.p>
        </div>

        {/* Legend */}
        <motion.div 
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {Object.entries(levelConfig).map(([level, config]) => (
            <div key={level} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${config.color}`} />
              <span className={`text-sm ${config.text} capitalize font-medium`}>
                {level}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, categoryIndex) => {
            const categorySkills = SKILLS.filter(skill => skill.category === category);
            
            return (
              <motion.div
                key={category}
                className={`${styles.card.base} p-6 space-y-4`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIndex * 0.1 }}
              >
                <h3 className={`${styles.text.subheading} text-lg font-bold text-center`}>
                  {category}
                </h3>
                
                <div className="space-y-3">
                  {categorySkills.map((skill, skillIndex) => {
                    const config = levelConfig[skill.level];
                    
                    return (
                      <motion.div
                        key={skill.name}
                        className="group"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: (categoryIndex * 0.1) + (skillIndex * 0.05) }}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-sm font-medium ${styles.text.body}`}>
                            {skill.name}
                          </span>
                          <span className={`text-xs ${styles.text.muted}`}>
                            {skill.years}y
                          </span>
                        </div>
                        
                        <div className="relative">
                          <div className="w-full h-2 bg-border/20 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full bg-gradient-to-r ${config.color} rounded-full`}
                              initial={{ width: 0 }}
                              whileInView={{ width: config.width.replace('w-', '') === 'full' ? '100%' : 
                                config.width.replace('w-', '').replace('/', '') + '%' }}
                              viewport={{ once: true }}
                              transition={{ delay: (categoryIndex * 0.2) + (skillIndex * 0.1), duration: 0.8 }}
                            />
                          </div>
                          
                          {/* Tooltip on hover */}
                          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 
                                        bg-popover border border-border rounded-lg px-3 py-2 text-xs
                                        opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none
                                        shadow-lg z-10">
                            <div className="text-center">
                              <div className={`font-semibold ${config.text}`}>
                                {skill.level.charAt(0).toUpperCase() + skill.level.slice(1)}
                              </div>
                              <div className={styles.text.muted}>
                                {skill.projects} projects
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div 
          className="text-center mt-12 space-y-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p className={`${styles.text.muted} text-sm`}>
            Skills assessment based on production experience, project complexity, and measurable impact.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className={styles.text.body}>
              <span className="font-semibold text-slate-800 dark:text-slate-200">Expert:</span> 4+ years, led teams
            </div>
            <div className={styles.text.body}>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Advanced:</span> 2+ years, production experience
            </div>
            <div className={styles.text.body}>
              <span className="font-semibold text-slate-700 dark:text-slate-300">Intermediate:</span> 1+ year, working knowledge
            </div>
            <div className={styles.text.body}>
              <span className="font-semibold text-slate-600 dark:text-slate-400">Learning:</span> Actively developing
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SkillsMatrix;
