'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils/cn';

import { useThemeStyles } from '../ui/useThemeStyles';

// Enhanced skill categories with premium visual data
const skills = [
  {
    category: 'Languages',
    icon: '💻',
    gradient: 'from-blue-500 via-purple-500 to-indigo-600',
    description: 'Core programming languages with deep expertise',
    items: [
      {
        name: 'TypeScript',
        level: 95,
        icon: '🔷',
        specialty: 'Type-safe development',
      },
      { name: 'JavaScript', level: 95, icon: '⚡', specialty: 'ES6+ mastery' },
      {
        name: 'Python',
        level: 90,
        icon: '🐍',
        specialty: 'Data & ML pipelines',
      },
      { name: 'Java', level: 85, icon: '☕', specialty: 'Enterprise systems' },
      { name: 'C#', level: 80, icon: '🔷', specialty: '.NET development' },
      {
        name: 'C++',
        level: 75,
        icon: '⚙️',
        specialty: 'Performance optimization',
      },
      { name: 'SQL', level: 85, icon: '🗄️', specialty: 'Complex queries' },
      { name: 'HTML', level: 95, icon: '🌐', specialty: 'Semantic markup' },
      { name: 'CSS', level: 90, icon: '🎨', specialty: 'Advanced layouts' },
      { name: 'R', level: 70, icon: '📊', specialty: 'Statistical analysis' },
      { name: 'C', level: 70, icon: '⚡', specialty: 'Systems programming' },
      { name: 'Ajax', level: 80, icon: '🔄', specialty: 'Async communication' },
    ],
  },
  {
    category: 'Frameworks & Libraries',
    icon: '⚛️',
    gradient: 'from-emerald-500 via-teal-500 to-cyan-600',
    description: 'Modern frameworks and libraries for scalable applications',
    items: [
      {
        name: 'React',
        level: 95,
        icon: '⚛️',
        specialty: 'Component architecture',
      },
      { name: 'Next.js', level: 90, icon: '▲', specialty: 'Full-stack React' },
      {
        name: 'Node.js',
        level: 85,
        icon: '🟢',
        specialty: 'Server-side JavaScript',
      },
      { name: 'Express', level: 80, icon: '🚀', specialty: 'API development' },
      {
        name: 'Three.js',
        level: 85,
        icon: '🌐',
        specialty: '3D web experiences',
      },
      {
        name: 'TensorFlow',
        level: 75,
        icon: '🧠',
        specialty: 'Machine learning',
      },
      { name: 'Angular', level: 70, icon: '🅰️', specialty: 'Enterprise apps' },
      {
        name: 'Vue',
        level: 65,
        icon: '💚',
        specialty: 'Progressive framework',
      },
      {
        name: 'Django',
        level: 75,
        icon: '🐍',
        specialty: 'Python web framework',
      },
      { name: 'Flask', level: 70, icon: '🌶️', specialty: 'Microservices' },
      { name: 'PyTorch', level: 70, icon: '🔥', specialty: 'Deep learning' },
      { name: 'Pandas', level: 80, icon: '🐼', specialty: 'Data manipulation' },
      {
        name: 'NumPy',
        level: 75,
        icon: '🔢',
        specialty: 'Numerical computing',
      },
      { name: 'D3', level: 75, icon: '📈', specialty: 'Data visualization' },
      {
        name: 'scikit-learn',
        level: 70,
        icon: '🤖',
        specialty: 'ML algorithms',
      },
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: '☁️',
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    description: 'Cloud infrastructure and deployment automation',
    items: [
      { name: 'AWS', level: 85, icon: '☁️', specialty: 'Cloud architecture' },
      { name: 'Docker', level: 80, icon: '🐳', specialty: 'Containerization' },
      { name: 'Kubernetes', level: 75, icon: '⚙️', specialty: 'Orchestration' },
      {
        name: 'GitHub Actions',
        level: 85,
        icon: '🔄',
        specialty: 'CI/CD pipelines',
      },
      {
        name: 'Terraform',
        level: 70,
        icon: '🏗️',
        specialty: 'Infrastructure as Code',
      },
      { name: 'Azure', level: 70, icon: '🔵', specialty: 'Microsoft cloud' },
      { name: 'GCP', level: 65, icon: '🌥️', specialty: 'Google cloud' },
      { name: 'Jenkins', level: 65, icon: '👷', specialty: 'Build automation' },
      { name: 'Datadog', level: 60, icon: '📊', specialty: 'Monitoring' },
      { name: 'Kafka', level: 60, icon: '🔄', specialty: 'Event streaming' },
      { name: 'Redis', level: 70, icon: '🔴', specialty: 'Caching layer' },
    ],
  },
  {
    category: 'Database & Analytics',
    icon: '🗄️',
    gradient: 'from-violet-500 via-purple-500 to-fuchsia-600',
    description: 'Data storage, processing, and analytics solutions',
    items: [
      {
        name: 'PostgreSQL',
        level: 85,
        icon: '🐘',
        specialty: 'Relational databases',
      },
      { name: 'MongoDB', level: 80, icon: '🍃', specialty: 'Document storage' },
      {
        name: 'Snowflake',
        level: 75,
        icon: '❄️',
        specialty: 'Data warehousing',
      },
      {
        name: 'ElasticSearch',
        level: 70,
        icon: '🔍',
        specialty: 'Search & analytics',
      },
      {
        name: 'Spark',
        level: 65,
        icon: '⚡',
        specialty: 'Big data processing',
      },
      {
        name: 'Hadoop',
        level: 60,
        icon: '🐘',
        specialty: 'Distributed computing',
      },
    ],
  },
];

// Revolutionary Skill Card with 3D transforms and particle physics
function SkillCard({
  skill,
  index,
}: {
  skill: (typeof skills)[0]['items'][0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { styles } = useThemeStyles();

  // Advanced 3D motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]));
  const z = useSpring(0);

  // Intersection observer for performance
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // Advanced mouse tracking with momentum
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);

    mouseX.set(x);
    mouseY.set(y);
    z.set(isHovered ? 30 : 0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    z.set(30);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    z.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="perspective-1000 group relative"
      initial={{ opacity: 0, y: 80, rotateX: -20 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              rotateX: 0,
              transition: {
                duration: 0.8,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              },
            }
          : {}
      }
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Main card with advanced 3D effects */}
      <motion.div
        className={`
          hover:shadow-current/10 relative transform-gpu cursor-pointer
          overflow-hidden rounded-xl border border-white/10 bg-white/5
          p-5 backdrop-blur-xl transition-all
          duration-500 will-change-transform
          hover:shadow-2xl dark:border-white/5 dark:bg-black/10
        `}
        style={{
          rotateX,
          rotateY,
          z,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
        }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Floating particles background */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute h-1 w-1 rounded-full bg-gradient-to-r from-blue-400 to-purple-500"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={
                isHovered
                  ? {
                      scale: [0, 1.5, 0],
                      opacity: [0, 0.8, 0],
                      x: [0, (Math.random() - 0.5) * 40],
                      y: [0, (Math.random() - 0.5) * 40],
                    }
                  : { scale: 0, opacity: 0 }
              }
              transition={{
                duration: 2 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Premium content layer */}
        <div className="relative z-10 space-y-3">
          {/* Icon and level display */}
          <div className="flex items-center justify-between">
            <motion.div
              className="text-xl"
              animate={
                isHovered
                  ? {
                      scale: 1.3,
                      rotateY: 15,
                      transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                    }
                  : { scale: 1, rotateY: 0 }
              }
              style={{ transform: 'translateZ(20px)' }}
            >
              {skill.icon}
            </motion.div>

            <motion.div
              className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-2 py-1 text-xs font-bold text-white"
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView
                  ? {
                      opacity: 1,
                      scale: 1,
                      transition: { delay: index * 0.05 + 0.2, duration: 0.4 },
                    }
                  : {}
              }
              style={{ transform: 'translateZ(15px)' }}
            >
              {skill.level}%
            </motion.div>
          </div>

          {/* Skill name with premium typography */}
          <motion.h4
            className={cn('text-sm font-bold leading-tight', styles.text.body)}
            style={{ transform: 'translateZ(10px)' }}
          >
            {skill.name}
          </motion.h4>

          {/* Interactive progress visualization */}
          <div className="space-y-2">
            {/* Circular progress indicator */}
            <div className="relative h-2 w-full">
              <div className="absolute inset-0 rounded-full bg-black/10 dark:bg-white/10">
                <motion.div
                  className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600"
                  initial={{ width: 0 }}
                  animate={
                    isInView
                      ? {
                          width: `${skill.level}%`,
                          transition: {
                            duration: 1.5,
                            delay: index * 0.05 + 0.4,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        }
                      : {}
                  }
                >
                  {/* Animated glow effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
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

            {/* Specialty tag */}
            <motion.div
              className="overflow-hidden"
              animate={
                isHovered
                  ? { height: 'auto', opacity: 1 }
                  : { height: 0, opacity: 0 }
              }
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.p
                className={cn(
                  'pt-1 text-xs font-medium leading-relaxed',
                  styles.text.muted
                )}
                initial={{ y: 10 }}
                animate={isHovered ? { y: 0 } : { y: 10 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                style={{ transform: 'translateZ(5px)' }}
              >
                {skill.specialty}
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Premium glow effect */}
        <motion.div
          className="absolute -inset-1 rounded-xl bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30 opacity-0 blur-lg"
          animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          style={{ zIndex: -1 }}
        />

        {/* Depth shadow */}
        <motion.div
          className="absolute inset-0 rounded-xl bg-black/5 dark:bg-white/5"
          style={{
            transform: 'translateZ(-10px)',
            rotateX: 0,
            rotateY: 0,
          }}
          animate={isHovered ? { opacity: 0.5 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}

// Revolutionary Category Section with immersive 3D presentation
function CategorySection({
  category,
  index,
}: {
  category: (typeof skills)[0];
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const { styles } = useThemeStyles();

  // Intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      ref={sectionRef}
      className="space-y-8"
      initial={{ opacity: 0, y: 120 }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              transition: {
                duration: 1,
                delay: index * 0.2,
                ease: [0.22, 1, 0.36, 1],
              },
            }
          : {}
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium category header with floating elements */}
      <motion.div
        className={`
          to-white/1 group relative cursor-pointer
          overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br
          from-white/5 p-8 backdrop-blur-xl
          dark:border-white/5 dark:from-black/10 dark:to-black/5
        `}
        whileHover={{
          scale: 1.02,
          y: -8,
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {/* Animated background gradient */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10`}
          animate={isHovered ? { opacity: 0.1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        />

        {/* Floating geometric decorations */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              className={`absolute h-20 w-20 bg-gradient-to-br ${category.gradient} rounded-lg opacity-5`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
              animate={
                isHovered
                  ? {
                      rotate: [0, 180, 360],
                      scale: [1, 1.2, 1],
                      opacity: [0.05, 0.15, 0.05],
                      transition: {
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: i * 0.5,
                      },
                    }
                  : {}
              }
            />
          ))}
        </div>

        {/* Content layer */}
        <div className="relative z-10 space-y-4 text-center">
          {/* Animated icon */}
          <motion.div
            className="mb-4 inline-block text-5xl"
            animate={
              isHovered
                ? {
                    scale: 1.2,
                    rotateY: 15,
                    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
                  }
                : { scale: 1, rotateY: 0 }
            }
          >
            {category.icon}
          </motion.div>

          {/* Category title with premium typography */}
          <motion.h3
            className={`text-2xl font-bold tracking-tight ${styles.text.heading}`}
            animate={
              isHovered
                ? {
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  }
                : { scale: 1 }
            }
          >
            {category.category}
          </motion.h3>

          {/* Description with fade-in */}
          <motion.p
            className={`text-sm ${styles.text.muted} mx-auto max-w-xs leading-relaxed`}
            initial={{ opacity: 0, y: 10 }}
            animate={
              isInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: { delay: index * 0.2 + 0.3 },
                  }
                : {}
            }
          >
            {category.description}
          </motion.p>

          {/* Animated progress line */}
          <motion.div
            className="relative mx-auto overflow-hidden rounded-full"
            animate={isHovered ? { width: '100%' } : { width: '3rem' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="h-1 rounded-full bg-gradient-to-r from-white/20 to-white/5">
              <motion.div
                className={`h-full bg-gradient-to-r ${category.gradient} rounded-full`}
                animate={isHovered ? { width: '100%' } : { width: '50%' }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </div>
          </motion.div>
        </div>

        {/* Premium border glow */}
        <motion.div
          className={`absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r ${category.gradient} opacity-0`}
          style={{
            mask: 'linear-gradient(white 0 0) content-box, linear-gradient(white 0 0)',
            maskComposite: 'xor',
          }}
          animate={isHovered ? { opacity: 0.3 } : { opacity: 0 }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>

      {/* Skills grid with advanced layout */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.items.map((skill, skillIndex) => (
          <SkillCard
            key={skill.name}
            skill={skill}
            index={index * 20 + skillIndex}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default function TechnicalSkills() {
  const containerRef = useRef<HTMLElement>(null);
  const [sectionInView, setSectionInView] = useState(false);
  const { styles } = useThemeStyles();

  // Sophisticated section observation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) {
          setSectionInView(entry.isIntersecting);
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={containerRef}
      className={`${styles.layout.section} relative overflow-hidden bg-gradient-to-b from-slate-50/30 to-transparent dark:from-slate-900/30`}
    >
      {/* Revolutionary background with animated elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating mesh gradient */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-teal-500/5"
            animate={{
              background: [
                'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 40% 60%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)',
                'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
              ],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        {/* Floating geometric elements */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20 dark:opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${15 + Math.random() * 30}px`,
              height: `${15 + Math.random() * 30}px`,
            }}
            animate={{
              x: [0, 50, -30, 20, 0],
              y: [0, -40, 30, -20, 0],
              rotate: [0, 120, 240, 360],
              scale: [1, 1.3, 0.7, 1.1, 1],
              opacity: [0.1, 0.3, 0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear',
              delay: Math.random() * 5,
            }}
          >
            <div
              className="h-full w-full rounded-lg"
              style={{
                background: `linear-gradient(45deg, 
                  ${['#3b82f6', '#8b5cf6', '#14b8a6', '#f59e0b'][Math.floor(Math.random() * 4)]}, 
                  ${['#1e40af', '#7c3aed', '#0d9488', '#d97706'][Math.floor(Math.random() * 4)]})`,
              }}
            />
          </motion.div>
        ))}
      </div>

      <div className={styles.layout.container}>
        {/* Premium section header with advanced typography */}
        <motion.div
          className="relative mb-24 text-center"
          initial={{ opacity: 0, y: 100 }}
          animate={
            sectionInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                }
              : {}
          }
        >
          {/* Main title with animated gradient */}
          <motion.h2
            className="relative mb-8 inline-block text-6xl font-black tracking-tighter md:text-8xl"
            animate={
              sectionInView
                ? {
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }
                : {}
            }
            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
            style={{
              background:
                'linear-gradient(45deg, #1e293b, #3b82f6, #8b5cf6, #1e293b, #14b8a6)',
              backgroundSize: '400% 100%',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Technical Arsenal
          </motion.h2>

          {/* Subtitle with sophisticated animation */}
          <motion.p
            className={`mx-auto max-w-4xl text-xl leading-relaxed md:text-2xl ${styles.text.muted} mb-8`}
            initial={{ opacity: 0, y: 40 }}
            animate={
              sectionInView
                ? {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.4,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }
                : {}
            }
          >
            A comprehensive ecosystem of modern technologies, frameworks, and
            tools engineered for{' '}
            <span className="font-bold text-blue-600 dark:text-blue-400">
              scalable excellence
            </span>{' '}
            and
            <span className="font-bold text-purple-600 dark:text-purple-400">
              {' '}
              innovation-driven development
            </span>
            .
          </motion.p>

          {/* Premium decorative elements */}
          <motion.div
            className="mt-12 flex items-center justify-center space-x-8"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={
              sectionInView
                ? {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: 0.8,
                      duration: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  }
                : {}
            }
          >
            <motion.div
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent"
              animate={{
                scaleX: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="h-6 w-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg"
              animate={{
                scale: [1, 1.4, 1],
                rotate: [0, 180, 360],
                boxShadow: [
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                  '0 0 40px rgba(168, 85, 247, 0.5)',
                  '0 0 20px rgba(59, 130, 246, 0.5)',
                ],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />

            <motion.div
              className="h-0.5 w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
              animate={{
                scaleX: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.5,
              }}
            />
          </motion.div>
        </motion.div>

        {/* Revolutionary skills categories */}
        <div className="space-y-20">
          {skills.map((category, index) => (
            <CategorySection
              key={category.category}
              category={category}
              index={index}
            />
          ))}
        </div>

        {/* Premium call-to-action section */}
        <motion.div
          className="relative mt-32 text-center"
          initial={{ opacity: 0, y: 80 }}
          animate={
            sectionInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    delay: 2,
                    duration: 1,
                    ease: [0.22, 1, 0.36, 1],
                  },
                }
              : {}
          }
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-12 backdrop-blur-xl dark:border-white/10 dark:from-black/20 dark:to-black/10">
            {/* Animated background pattern */}
            <div className="absolute inset-0">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 100%' }}
              />
            </div>

            <div className="relative z-10">
              <motion.h3
                className={`mb-6 text-3xl font-bold md:text-4xl ${styles.text.heading}`}
                whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
              >
                Ready to Build Something Extraordinary?
              </motion.h3>

              <motion.p
                className={`mx-auto mb-8 max-w-2xl text-lg leading-relaxed md:text-xl ${styles.text.muted}`}
              >
                Let&apos;s leverage this technical expertise to transform your
                vision into high-performance, scalable solutions that drive real
                business impact.
              </motion.p>

              <motion.button
                className={`
                  transform-gpu rounded-xl border border-white/20 bg-gradient-to-r
                  from-blue-600 via-purple-600 to-blue-600 px-10
                  py-4 text-lg font-bold text-white
                  shadow-2xl backdrop-blur-sm transition-all
                  duration-500 hover:shadow-blue-500/25
                `}
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)',
                  transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                }}
                style={{ backgroundSize: '200% 100%' }}
              >
                Start Your Project
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
