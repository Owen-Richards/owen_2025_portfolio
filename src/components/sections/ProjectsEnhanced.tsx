'use client';

import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { useRef, useState } from 'react';

import { useThemeStyles } from '../ui/useThemeStyles';

// Project data with storytelling structure
const projects = [
  {
    id: 'project-mapping-ai',
    title: 'Project Mapping AI',
    subtitle: 'Enterprise AI Solution',
    description:
      'Advanced machine learning platform for automated project categorization and resource optimization.',
    image: '/project-mapping-ai.jpg',
    technologies: ['Python', 'TensorFlow', 'AWS', 'React', 'PostgreSQL'],
    challenge:
      'Organizations struggled with manual project categorization, leading to inefficient resource allocation and missed opportunities for automation.',
    solution:
      'Developed an AI-powered system using natural language processing and machine learning to automatically categorize projects, predict resource needs, and optimize team assignments.',
    impact:
      'Reduced project categorization time by 85% and improved resource allocation efficiency by 40% across 500+ enterprise projects.',
    link: '#',
    github: '#',
  },
  {
    id: 'heartbeats',
    title: 'Heartbeats',
    subtitle: 'Emotion-Aware Music Recommender',
    description:
      'AI-driven music recommendation system that adapts to user emotional states using biometric data.',
    image: '/heartbeats-app.jpg',
    technologies: ['React Native', 'Python', 'PyTorch', 'Node.js', 'MongoDB'],
    challenge:
      "Traditional music recommendations lack emotional context, often suggesting upbeat music when users need calm or energetic tracks when they're stressed.",
    solution:
      'Built a mobile app that uses heart rate variability and user input to detect emotional states, then recommends music that either matches or improves their mood using collaborative filtering and neural networks.',
    impact:
      'Achieved 92% user satisfaction in mood-matching accuracy with over 10,000 personalized recommendations generated.',
    link: '#',
    github: '#',
  },
  {
    id: 'line-follower-robot',
    title: 'Line-Follower Robot',
    subtitle: 'Autonomous Navigation System',
    description:
      'High-precision autonomous robot with computer vision for complex path navigation and obstacle avoidance.',
    image: '/robot-project.jpg',
    technologies: ['C++', 'OpenCV', 'Arduino', 'Sensors', 'PID Control'],
    challenge:
      'Traditional line-following robots struggle with complex paths, intersections, and dynamic obstacles in real-world environments.',
    solution:
      'Engineered a robust robot using computer vision algorithms, PID control systems, and sensor fusion to navigate complex paths with high precision and adaptive obstacle avoidance.',
    impact:
      'Achieved 98% path accuracy in competition settings and successfully navigated complex multi-path scenarios with sub-centimeter precision.',
    link: '#',
    github: '#',
  },
  {
    id: 'flower-classifier',
    title: 'Flower Classifier',
    subtitle: 'Deep Learning Vision Model',
    description:
      'Convolutional neural network for accurate flower species identification with real-time prediction capabilities.',
    image: '/flower-classifier.jpg',
    technologies: ['Python', 'PyTorch', 'OpenCV', 'Flask', 'Docker'],
    challenge:
      'Botanists and gardening enthusiasts needed an accurate, accessible way to identify flower species from photos, especially for rare or similar-looking varieties.',
    solution:
      'Developed a deep learning model using transfer learning and data augmentation techniques, deployed as a web application with real-time image processing capabilities.',
    impact:
      'Achieved 94% accuracy across 1,000+ flower species with sub-second prediction times, helping over 5,000 users identify plants.',
    link: '#',
    github: '#',
  },
];

// Project Card Component
function ProjectCard({
  project,
  onClick,
}: {
  project: (typeof projects)[0];
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '0px 0px -100px 0px' });
  const { styles, cn } = useThemeStyles();

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="group w-80 flex-shrink-0 cursor-pointer md:w-96"
      onClick={onClick}
    >
      <div
        className={cn(
          'overflow-hidden rounded-2xl transition-all duration-300',
          styles.glass.base,
          'border border-border hover:border-accent/30',
          styles.theme.cardShadow,
          'hover:shadow-[var(--shadow-strong)]'
        )}
      >
        <div className="relative h-48 overflow-hidden">
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted/80">
            <span className="text-6xl opacity-20">🚀</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          <div className="absolute right-4 top-4">
            <span
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium',
                'bg-accent text-accent-foreground'
              )}
            >
              {project.subtitle}
            </span>
          </div>
        </div>

        <div className="space-y-4 p-6">
          <div>
            <h3
              className={cn(
                'mb-2 text-xl font-bold transition-colors',
                styles.text.heading,
                'group-hover:text-accent'
              )}
            >
              {project.title}
            </h3>
            <p
              className={cn(
                'line-clamp-3 text-sm leading-relaxed',
                styles.text.muted
              )}
            >
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className={cn(
                  'rounded-md px-2 py-1 text-xs',
                  'bg-muted text-muted-foreground',
                  'border border-border'
                )}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span
                className={cn(
                  'rounded-md px-2 py-1 text-xs',
                  styles.text.muted
                )}
              >
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex space-x-3">
              <motion.a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'rounded-lg p-2 transition-colors',
                  'bg-muted hover:bg-primary hover:text-primary-foreground'
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={16} />
              </motion.a>

              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'rounded-lg p-2 transition-colors',
                  'bg-muted hover:bg-secondary hover:text-secondary-foreground'
                )}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={16} />
              </motion.a>
            </div>

            <motion.span
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium',
                'border border-primary/20 bg-primary/10 text-primary'
              )}
              whileHover={{ scale: 1.05 }}
            >
              View Details
            </motion.span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Project Detail Modal Component
function ProjectDetailModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0] | null;
  onClose: () => void;
}) {
  const { styles, cn } = useThemeStyles();

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className={cn(
          'max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl',
          styles.glass.base,
          'border-2 border-border',
          styles.theme.cardShadow
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8">
          {/* Header */}
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2
                className={cn('mb-2 text-3xl font-bold', styles.text.heading)}
              >
                {project.title}
              </h2>
              <p className={cn('text-lg', styles.text.accent)}>
                {project.subtitle}
              </p>
            </div>
            <button
              onClick={onClose}
              className={cn(
                'rounded-lg p-2 transition-colors',
                'bg-muted hover:bg-destructive hover:text-destructive-foreground'
              )}
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <p className={cn('text-lg leading-relaxed', styles.text.body)}>
              {project.description}
            </p>

            {/* Challenge, Solution, Impact */}
            <div className="grid gap-6 md:grid-cols-3">
              <div
                className={cn(
                  'rounded-xl p-6',
                  styles.glass.base,
                  'border border-border'
                )}
              >
                <h4
                  className={cn(
                    'mb-3 font-semibold text-destructive',
                    styles.text.heading
                  )}
                >
                  Challenge
                </h4>
                <p className={cn('text-sm', styles.text.muted)}>
                  {project.challenge}
                </p>
              </div>

              <div
                className={cn(
                  'rounded-xl p-6',
                  styles.glass.base,
                  'border border-border'
                )}
              >
                <h4 className={cn('mb-3 font-semibold', styles.text.primary)}>
                  Solution
                </h4>
                <p className={cn('text-sm', styles.text.muted)}>
                  {project.solution}
                </p>
              </div>

              <div
                className={cn(
                  'rounded-xl p-6',
                  styles.glass.base,
                  'border border-border'
                )}
              >
                <h4 className={cn('mb-3 font-semibold', styles.text.accent)}>
                  Impact
                </h4>
                <p className={cn('text-sm', styles.text.muted)}>
                  {project.impact}
                </p>
              </div>
            </div>

            {/* Technologies */}
            <div>
              <h4 className={cn('mb-4 font-semibold', styles.text.heading)}>
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={cn(
                      'rounded-lg px-4 py-2 font-medium',
                      'border border-primary/20 bg-primary/10 text-primary'
                    )}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-4">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  styles.button.primary,
                  'inline-flex items-center gap-2'
                )}
              >
                <ExternalLink size={16} />
                View Live Project
              </a>

              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  styles.button.secondary,
                  'inline-flex items-center gap-2'
                )}
              >
                <Github size={16} />
                View Source Code
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ProjectsEnhanced() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, {
    once: true,
    margin: '0px 0px -200px 0px',
  });
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);
  const { styles, cn } = useThemeStyles();

  return (
    <section
      id="projects"
      ref={containerRef}
      className={cn(styles.layout.section, 'overflow-hidden')}
    >
      <div className={styles.layout.container}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mb-20 text-center"
        >
          <motion.h2
            className={cn(
              'mb-6 text-4xl font-extrabold tracking-tight md:text-6xl',
              styles.text.heading
            )}
            whileHover={{ scale: 1.05 }}
          >
            Featured Projects
          </motion.h2>

          <motion.p
            className={cn(
              'mx-auto max-w-3xl text-xl leading-relaxed md:text-2xl',
              styles.text.muted
            )}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            A showcase of innovative solutions that blend creativity with
            cutting-edge technology, each telling a unique story of
            problem-solving and impact.
          </motion.p>
        </motion.div>

        {/* Projects Horizontal Scroll */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -100 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative"
        >
          <div className="theme-scrollbar flex space-x-8 overflow-x-auto pb-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
                }
                transition={{
                  duration: 0.6,
                  delay: 0.7 + index * 0.1,
                  ease: 'easeOut',
                }}
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedProject(project)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-20 text-center"
        >
          <div
            className={cn(
              'inline-block rounded-2xl p-8',
              styles.glass.base,
              'border-2 border-border',
              styles.theme.cardShadow
            )}
          >
            <motion.h3
              className={cn('mb-4 text-2xl font-bold', styles.text.heading)}
              whileHover={{ scale: 1.05 }}
            >
              Interested in working together?
            </motion.h3>

            <motion.p
              className={cn('mx-auto mb-6 max-w-md text-lg', styles.text.muted)}
            >
              I&apos;m always excited to take on new challenges and create
              innovative solutions.
            </motion.p>

            <motion.button
              className={cn(styles.button.primary)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start a Project
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
