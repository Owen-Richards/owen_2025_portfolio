'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';

const projects = [
  {
    id: 1,
    title: "Interactive 3D Portfolio",
    description: "Award-winning portfolio website featuring immersive WebGL experiences and experimental navigation patterns.",
    image: "/placeholder-project-1.jpg",
    tags: ["React", "Three.js", "GSAP", "WebGL"],
    href: "/portfolio/interactive-3d-portfolio",
    github: "https://github.com",
    live: "https://demo.com",
    featured: true,
  },
  {
    id: 2,
    title: "AI-Powered Design System",
    description: "Revolutionary design system that adapts to user preferences using machine learning algorithms.",
    image: "/placeholder-project-2.jpg",
    tags: ["Next.js", "AI/ML", "Design Systems", "TypeScript"],
    href: "/portfolio/ai-design-system",
    github: "https://github.com",
    live: "https://demo.com",
    featured: true,
  },
  {
    id: 3,
    title: "Immersive E-commerce Platform",
    description: "Next-generation shopping experience with AR product visualization and voice commerce integration.",
    image: "/placeholder-project-3.jpg",
    tags: ["Vue.js", "AR/VR", "Voice UI", "E-commerce"],
    href: "/portfolio/immersive-ecommerce",
    github: "https://github.com",
    live: "https://demo.com",
    featured: true,
  },
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

export default function FeaturedWork() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-display font-bold text-foreground mb-6">
              Featured
              <span className="text-primary-600 ml-4 slight-skew">Work</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-serif">
              A curated selection of projects that showcase innovative design,
              cutting-edge technology, and meaningful impact.
            </p>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Featured Project (Large) */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2"
            >
              <ProjectCard 
                project={projects[0]} 
                size="large"
                className="featured-project"
              />
            </motion.div>

            {/* Secondary Projects */}
            {projects.slice(1).map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
              >
                <ProjectCard project={project} size="medium" />
              </motion.div>
            ))}
          </div>

          {/* View All CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-20"
          >
            <Link href="/portfolio">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                View All Projects
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowUpRight 
                    size={18} 
                    className="group-hover:rotate-45 transition-transform duration-300" 
                  />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: typeof projects[0];
  size: 'large' | 'medium';
  className?: string;
}

function ProjectCard({ project, size, className = '' }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm border border-primary-200/30 shadow-lg hover:shadow-xl transition-all duration-500 ${className}`}
    >
      {/* Project Image */}
      <div className={`relative overflow-hidden ${size === 'large' ? 'h-96 lg:h-[500px]' : 'h-64 lg:h-80'}`}>
        <Link href={project.href} className="absolute inset-0 z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <span className="text-6xl font-display font-black text-primary-200">
              {project.title.charAt(0)}
            </span>
          </div>
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
        
        {/* Project Links */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
          <motion.a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <Github size={16} />
          </motion.a>
          <motion.a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink size={16} />
          </motion.a>
        </div>
      </div>

      {/* Project Info */}
      <Link href={project.href}>
        <div className="p-6 lg:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <h3 className={`font-display font-bold text-foreground mb-3 group-hover:text-primary-600 transition-colors ${size === 'large' ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'}`}>
            {project.title}
          </h3>
          
          <p className={`text-foreground/70 font-serif leading-relaxed ${size === 'large' ? 'text-lg' : 'text-base'}`}>
            {project.description}
          </p>

          <div className="flex items-center gap-2 mt-6 text-primary-600 font-medium">
            <span>View Case Study</span>
            <ArrowUpRight 
              size={16} 
              className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" 
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
