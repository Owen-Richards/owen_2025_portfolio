'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { useThemeStyles } from '@/components/ui/useThemeStyles';

interface Skill {
  name: string;
  category: string;
  level: 'expert' | 'advanced' | 'intermediate' | 'learning';
  years: number;
  projects?: number;
  icon?: string;
  description?: string;
}

const SKILLS: Skill[] = [
  // Frontend - Enhanced with icons and descriptions
  {
    name: 'React/Next.js',
    category: 'Frontend',
    level: 'expert',
    years: 6,
    projects: 25,
    icon: '⚛️',
    description:
      'Building scalable web applications with modern React patterns and Next.js optimization',
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    level: 'expert',
    years: 5,
    projects: 30,
    icon: '🔷',
    description:
      'Type-safe development with advanced TypeScript patterns and generics',
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    level: 'expert',
    years: 8,
    projects: 40,
    icon: '⚡',
    description:
      'Deep expertise in modern ES6+ features and asynchronous programming',
  },
  {
    name: 'CSS/Tailwind',
    category: 'Frontend',
    level: 'expert',
    years: 8,
    projects: 35,
    icon: '🎨',
    description:
      'Responsive design mastery with CSS Grid, Flexbox, and Tailwind utility classes',
  },
  {
    name: 'Three.js/WebGL',
    category: 'Frontend',
    level: 'advanced',
    years: 2,
    projects: 8,
    icon: '🌐',
    description:
      'Creating immersive 3D experiences and WebGL-powered visualizations',
  },
  {
    name: 'Vue.js',
    category: 'Frontend',
    level: 'intermediate',
    years: 1,
    projects: 3,
    icon: '💚',
    description: 'Component-based development with Vue 3 Composition API',
  },

  // Backend - Enhanced
  {
    name: 'Node.js',
    category: 'Backend',
    level: 'expert',
    years: 6,
    projects: 20,
    icon: '🟢',
    description:
      'High-performance server-side applications with Express and microservices',
  },
  {
    name: 'Python',
    category: 'Backend',
    level: 'advanced',
    years: 4,
    projects: 15,
    icon: '🐍',
    description:
      'Data processing, ML pipelines, and API development with FastAPI/Django',
  },
  {
    name: 'PostgreSQL',
    category: 'Backend',
    level: 'expert',
    years: 5,
    projects: 18,
    icon: '🐘',
    description: 'Complex query optimization and database architecture design',
  },
  {
    name: 'Redis',
    category: 'Backend',
    level: 'advanced',
    years: 3,
    projects: 12,
    icon: '🔴',
    description: 'Caching strategies and real-time data management',
  },
  {
    name: 'GraphQL',
    category: 'Backend',
    level: 'advanced',
    years: 3,
    projects: 10,
    icon: '🔺',
    description: 'Efficient data fetching with type-safe GraphQL schemas',
  },
  {
    name: 'REST APIs',
    category: 'Backend',
    level: 'expert',
    years: 7,
    projects: 25,
    icon: '🔗',
    description: 'RESTful architecture design and API versioning strategies',
  },

  // Cloud & DevOps - Enhanced
  {
    name: 'AWS',
    category: 'Cloud',
    level: 'expert',
    years: 5,
    projects: 22,
    icon: '☁️',
    description: 'Multi-service cloud architecture with EC2, Lambda, and RDS',
  },
  {
    name: 'Docker',
    category: 'Cloud',
    level: 'expert',
    years: 4,
    projects: 20,
    icon: '🐳',
    description:
      'Containerization and multi-stage builds for production deployment',
  },
  {
    name: 'Kubernetes',
    category: 'Cloud',
    level: 'advanced',
    years: 2,
    projects: 8,
    icon: '⚙️',
    description: 'Container orchestration and cluster management',
  },
  {
    name: 'Terraform',
    category: 'Cloud',
    level: 'advanced',
    years: 2,
    projects: 6,
    icon: '🏗️',
    description: 'Infrastructure as Code and automated provisioning',
  },
  {
    name: 'CI/CD',
    category: 'Cloud',
    level: 'expert',
    years: 5,
    projects: 18,
    icon: '🔄',
    description:
      'Automated deployment pipelines with GitHub Actions and Jenkins',
  },
  {
    name: 'Monitoring',
    category: 'Cloud',
    level: 'advanced',
    years: 3,
    projects: 12,
    icon: '📊',
    description:
      'Performance monitoring with Datadog and custom metrics dashboards',
  },

  // Emerging - Enhanced
  {
    name: 'Rust',
    category: 'Emerging',
    level: 'learning',
    years: 0.5,
    projects: 2,
    icon: '🦀',
    description: 'Systems programming and WebAssembly development',
  },
  {
    name: 'WebAssembly',
    category: 'Emerging',
    level: 'learning',
    years: 0.5,
    projects: 1,
    icon: '🕸️',
    description: 'High-performance web applications with near-native speed',
  },
  {
    name: 'Edge Computing',
    category: 'Emerging',
    level: 'intermediate',
    years: 1,
    projects: 3,
    icon: '🌐',
    description: 'CDN optimization and edge function deployment',
  },
];

const levelConfig = {
  expert: {
    color: 'from-emerald-500 via-teal-500 to-cyan-500',
    glowColor: 'shadow-emerald-500/30',
    bg: 'bg-emerald-500/5 border-emerald-500/20',
    text: 'text-emerald-700 dark:text-emerald-300',
    width: '100%',
    particles: 12,
    scale: 1.05,
  },
  advanced: {
    color: 'from-blue-500 via-indigo-500 to-purple-500',
    glowColor: 'shadow-blue-500/30',
    bg: 'bg-blue-500/5 border-blue-500/20',
    text: 'text-blue-700 dark:text-blue-300',
    width: '85%',
    particles: 8,
    scale: 1.03,
  },
  intermediate: {
    color: 'from-orange-500 via-amber-500 to-yellow-500',
    glowColor: 'shadow-orange-500/30',
    bg: 'bg-orange-500/5 border-orange-500/20',
    text: 'text-orange-700 dark:text-orange-300',
    width: '65%',
    particles: 5,
    scale: 1.02,
  },
  learning: {
    color: 'from-slate-500 via-gray-500 to-zinc-500',
    glowColor: 'shadow-slate-500/20',
    bg: 'bg-slate-500/5 border-slate-500/20',
    text: 'text-slate-600 dark:text-slate-400',
    width: '40%',
    particles: 3,
    scale: 1.01,
  },
};

const categories = ['Frontend', 'Backend', 'Cloud', 'Emerging'];

// Revolutionary 3D-inspired Skill Card with particle effects and advanced interactions
function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { styles } = useThemeStyles();

  const config = levelConfig[skill.level];

  // Advanced motion values for 3D effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]));

  // Intersection observer for sophisticated entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Mouse tracking for 3D effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    mouseX.set((e.clientX - centerX) / (rect.width / 2));
    mouseY.set((e.clientY - centerY) / (rect.height / 2));
  };

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="perspective-1000 group relative"
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.8,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              },
            }
          : {}
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        resetMousePosition();
      }}
      onMouseMove={handleMouseMove}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Main card with 3D transform */}
      <motion.div
        className={`
          relative rounded-2xl p-6 backdrop-blur-xl
          ${config.bg} transform-gpu cursor-pointer
          overflow-hidden border-2
          ${config.glowColor} hover:shadow-current/20 transition-all
          duration-500 will-change-transform
          hover:shadow-2xl
        `}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: config.scale,
          z: 50,
          transition: { duration: 0.3 },
        }}
        role="button"
        tabIndex={0}
        aria-label={`${skill.name} - ${skill.level} level with ${skill.years} years experience`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            setIsHovered(!isHovered);
          }
        }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: config.particles }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-1 w-1 bg-gradient-to-r ${config.color} rounded-full opacity-20`}
              initial={{
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                scale: 0,
              }}
              animate={
                isHovered
                  ? {
                      x: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                      y: [Math.random() * 200 - 100, Math.random() * 200 - 100],
                      scale: [0, 1, 0],
                      transition: {
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                      },
                    }
                  : { scale: 0 }
              }
            />
          ))}
        </div>

        {/* Premium content layer */}
        <div className="relative z-10 space-y-4">
          {/* Header with icon and level indicator */}
          <div className="flex items-center justify-between">
            <motion.div
              className="transform-gpu text-2xl"
              animate={
                isHovered
                  ? {
                      scale: 1.2,
                      rotateY: 15,
                      transition: { duration: 0.3 },
                    }
                  : { scale: 1, rotateY: 0 }
              }
            >
              {skill.icon}
            </motion.div>

            <motion.div
              className={`
                rounded-full bg-gradient-to-r px-3 py-1 text-xs font-bold uppercase
                tracking-wider ${config.color} transform-gpu
                text-white shadow-lg
              `}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: 1,
                      transition: { delay: index * 0.1 + 0.3 },
                    }
                  : {}
              }
              style={{ transform: 'translateZ(20px)' }}
            >
              {skill.level}
            </motion.div>
          </div>

          {/* Skill name with dynamic typography */}
          <motion.h3
            className={`${styles.text.subheading} text-lg font-bold ${config.text}`}
            style={{ transform: 'translateZ(10px)' }}
          >
            {skill.name}
          </motion.h3>

          {/* Interactive progress visualization */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className={`${config.text} font-medium`}>
                {skill.years} years
              </span>
              <span className={`${config.text} opacity-75`}>
                {skill.projects} projects
              </span>
            </div>

            {/* Revolutionary progress bar */}
            <div className="relative h-3 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
              <motion.div
                className={`h-full bg-gradient-to-r ${config.color} relative rounded-full`}
                initial={{ width: 0, x: '-100%' }}
                animate={
                  isInView
                    ? {
                        width: config.width,
                        x: 0,
                        transition: {
                          duration: 1.5,
                          delay: index * 0.1 + 0.5,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      }
                    : {}
                }
              >
                {/* Animated shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={
                    isHovered
                      ? {
                          x: ['-100%', '200%'],
                          transition: {
                            duration: 1.5,
                            repeat: Infinity,
                            ease: 'linear',
                          },
                        }
                      : {}
                  }
                />
              </motion.div>
            </div>
          </div>

          {/* Expandable description */}
          <motion.div
            className="overflow-hidden"
            animate={isHovered ? { height: 'auto' } : { height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.p
              className={`text-sm ${styles.text.muted} pt-2 leading-relaxed`}
              initial={{ opacity: 0, y: 10 }}
              animate={
                isHovered
                  ? {
                      opacity: 1,
                      y: 0,
                      transition: { delay: 0.1 },
                    }
                  : { opacity: 0, y: 10 }
              }
              style={{ transform: 'translateZ(5px)' }}
            >
              {skill.description}
            </motion.p>
          </motion.div>
        </div>

        {/* Premium glow effect */}
        <motion.div
          className={`absolute -inset-1 bg-gradient-to-r ${config.color} rounded-2xl opacity-0 blur-xl`}
          animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ zIndex: -1 }}
        />
      </motion.div>
    </motion.div>
  );
}

export function SkillsMatrix() {
  const { styles } = useThemeStyles();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sectionInView, setSectionInView] = useState(false);

  // Sophisticated section observation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setSectionInView(entry.isIntersecting);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.layout.section} relative overflow-hidden bg-gradient-to-b from-transparent to-slate-50/30 dark:to-slate-900/30`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating geometric shapes */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-5 dark:opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
            }}
            animate={{
              x: [0, 30, -30, 0],
              y: [0, -30, 30, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          >
            <div className="h-full w-full rounded-lg bg-gradient-to-br from-slate-400 to-slate-600" />
          </motion.div>
        ))}
      </div>

      <div className={styles.layout.container}>
        {/* Revolutionary section header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 80 }}
          animate={
            sectionInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, ease: [0.25, 0.46, 0.45, 0.94] },
                }
              : {}
          }
        >
          <motion.h2
            className={`${styles.text.hero} relative mb-8 inline-block`}
            animate={
              sectionInView
                ? {
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }
                : {}
            }
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            style={{
              background:
                'linear-gradient(45deg, #64748b, #1e293b, #475569, #334155)',
              backgroundSize: '300% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Technical Mastery
          </motion.h2>

          <motion.p
            className={`${styles.text.bodyLarge} mx-auto max-w-3xl ${styles.text.muted}`}
            initial={{ opacity: 0, y: 30 }}
            animate={
              sectionInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.3, duration: 0.8 },
                  }
                : {}
            }
          >
            A curated collection of technical expertise, visualized through
            interactive experiences that showcase depth, breadth, and continuous
            evolution in modern software development.
          </motion.p>
        </motion.div>

        {/* Dynamic legend with category filtering */}
        <motion.div
          className="mb-16 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={
            sectionInView
              ? {
                  opacity: 1,
                  scale: 1,
                  transition: { delay: 0.5, duration: 0.6 },
                }
              : {}
          }
        >
          {Object.entries(levelConfig).map(([level, config]) => (
            <motion.button
              key={level}
              className="flex items-center gap-3 rounded-full border px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className={`h-4 w-4 rounded-full bg-gradient-to-r ${config.color}`}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              />
              <span className={`text-sm font-medium capitalize ${config.text}`}>
                {level}
              </span>
            </motion.button>
          ))}
        </motion.div>

        {/* Revolutionary skills grid */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, categoryIndex) => {
            const categorySkills = SKILLS.filter(
              (skill) => skill.category === category
            );

            return (
              <motion.div
                key={category}
                className="space-y-6"
                initial={{ opacity: 0, y: 100 }}
                animate={
                  sectionInView
                    ? {
                        opacity: 1,
                        y: 0,
                        transition: {
                          delay: categoryIndex * 0.2,
                          duration: 0.8,
                          ease: [0.25, 0.46, 0.45, 0.94],
                        },
                      }
                    : {}
                }
                onMouseEnter={() => setActiveCategory(category)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                {/* Category header with premium styling */}
                <motion.div
                  className={`
                    ${styles.card.base} border-2 border-border/30
                    p-6 text-center backdrop-blur-xl
                    transition-all duration-500 hover:border-primary/50
                    ${activeCategory === category ? 'scale-105 shadow-2xl' : ''}
                  `}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <motion.h3
                    className={`${styles.text.subheading} mb-3 font-bold`}
                    animate={
                      activeCategory === category
                        ? {
                            scale: 1.1,
                            transition: { duration: 0.3 },
                          }
                        : { scale: 1 }
                    }
                  >
                    {category}
                  </motion.h3>

                  <motion.div
                    className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary to-accent"
                    animate={
                      activeCategory === category
                        ? {
                            width: '100%',
                            transition: { duration: 0.5 },
                          }
                        : { width: '4rem' }
                    }
                  />
                </motion.div>

                {/* Skills in category */}
                <div className="space-y-4">
                  {categorySkills.map((skill, skillIndex) => (
                    <SkillCard
                      key={skill.name}
                      skill={skill}
                      index={categoryIndex * 10 + skillIndex}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Premium insights section */}
        <motion.div
          className="mt-20 space-y-8 text-center"
          initial={{ opacity: 0, y: 60 }}
          animate={
            sectionInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: { delay: 1.5, duration: 0.8 },
                }
              : {}
          }
        >
          <div className={`${styles.card.base} p-8 backdrop-blur-xl`}>
            <motion.h3
              className={`${styles.text.heading} mb-6`}
              whileHover={{ scale: 1.05 }}
            >
              Expertise Methodology
            </motion.h3>

            <div className="grid gap-6 text-sm md:grid-cols-4">
              {[
                {
                  level: 'Expert',
                  desc: '4+ years, team leadership, architecture decisions',
                  color: 'emerald',
                },
                {
                  level: 'Advanced',
                  desc: '2+ years, production systems, mentoring',
                  color: 'blue',
                },
                {
                  level: 'Intermediate',
                  desc: '1+ year, feature development, best practices',
                  color: 'orange',
                },
                {
                  level: 'Learning',
                  desc: 'Active development, experimental projects',
                  color: 'slate',
                },
              ].map((item, index) => (
                <motion.div
                  key={item.level}
                  className="space-y-2 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    sectionInView
                      ? {
                          opacity: 1,
                          y: 0,
                          transition: { delay: 1.7 + index * 0.1 },
                        }
                      : {}
                  }
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div
                    className={`font-bold text-${item.color}-600 dark:text-${item.color}-400`}
                  >
                    {item.level}
                  </div>
                  <div className={styles.text.muted}>{item.desc}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default SkillsMatrix;
