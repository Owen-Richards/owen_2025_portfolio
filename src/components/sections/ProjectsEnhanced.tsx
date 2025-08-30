"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

// Project data with storytelling structure
const projects = [
  {
    id: "project-mapping-ai",
    title: "Project Mapping AI",
    subtitle: "Enterprise AI Solution",
    description: "Advanced machine learning platform for automated project categorization and resource optimization.",
    image: "/project-mapping-ai.jpg", // You'll need to add these images
    technologies: ["Python", "TensorFlow", "AWS", "React", "PostgreSQL"],
    challenge: "Organizations struggled with manual project categorization, leading to inefficient resource allocation and missed opportunities for automation.",
    solution: "Developed an AI-powered system using natural language processing and machine learning to automatically categorize projects, predict resource needs, and optimize team assignments.",
    impact: "Reduced project categorization time by 85% and improved resource allocation efficiency by 40% across 500+ enterprise projects.",
    link: "#",
    github: "#"
  },
  {
    id: "heartbeats",
    title: "Heartbeats",
    subtitle: "Emotion-Aware Music Recommender",
    description: "AI-driven music recommendation system that adapts to user emotional states using biometric data.",
    image: "/heartbeats-app.jpg",
    technologies: ["React Native", "Python", "PyTorch", "Node.js", "MongoDB"],
    challenge: "Traditional music recommendations lack emotional context, often suggesting upbeat music when users need calm or energetic tracks when they're stressed.",
    solution: "Built a mobile app that uses heart rate variability and user input to detect emotional states, then recommends music that either matches or improves their mood using collaborative filtering and neural networks.",
    impact: "Achieved 92% user satisfaction in mood-matching accuracy with over 10,000 personalized recommendations generated.",
    link: "#",
    github: "#"
  },
  {
    id: "line-follower-robot",
    title: "Line-Follower Robot",
    subtitle: "Autonomous Navigation System",
    description: "High-precision autonomous robot with computer vision for complex path navigation and obstacle avoidance.",
    image: "/robot-project.jpg",
    technologies: ["C++", "OpenCV", "Arduino", "Sensors", "PID Control"],
    challenge: "Traditional line-following robots struggle with complex paths, intersections, and dynamic obstacles in real-world environments.",
    solution: "Engineered a robust robot using computer vision algorithms, PID control systems, and sensor fusion to navigate complex paths with high precision and adaptive obstacle avoidance.",
    impact: "Achieved 98% path accuracy in competition settings and successfully navigated complex multi-path scenarios with sub-centimeter precision.",
    link: "#",
    github: "#"
  },
  {
    id: "flower-classifier",
    title: "Flower Classifier",
    subtitle: "Deep Learning Vision Model",
    description: "Convolutional neural network for accurate flower species identification with real-time prediction capabilities.",
    image: "/flower-classifier.jpg",
    technologies: ["Python", "PyTorch", "OpenCV", "Flask", "Docker"],
    challenge: "Botanists and gardening enthusiasts needed an accurate, accessible way to identify flower species from photos, especially for rare or similar-looking varieties.",
    solution: "Developed a deep learning model using transfer learning and data augmentation techniques, deployed as a web application with real-time image processing capabilities.",
    impact: "Achieved 94% accuracy across 1,000+ flower species with sub-second prediction times, helping over 5,000 users identify plants.",
    link: "#",
    github: "#"
  }
];

// Project Card Component
function ProjectCard({ project, onClick }: { project: typeof projects[0], onClick: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex-shrink-0 w-80 md:w-96 cursor-pointer group"
      onClick={onClick}
    >
      <div className="bg-gradient-to-br from-neutral-900/90 to-neutral-800/70 border border-neutral-700/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm hover:border-accent/30 transition-all duration-300">
        <div className="relative h-48 overflow-hidden">
          <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-700 flex items-center justify-center">
            <span className="text-6xl opacity-20">🚀</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 to-transparent" />
          <div className="absolute top-4 right-4">
            <span className="bg-accent/90 text-white text-xs px-3 py-1 rounded-full font-medium">
              {project.subtitle}
            </span>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors">
              {project.title}
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3">
              {project.description}
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span key={tech} className="text-xs bg-neutral-800/80 text-neutral-300 px-2 py-1 rounded-full">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-xs bg-accent/20 text-accent px-2 py-1 rounded-full">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Project Modal Component
function ProjectModal({ project, isOpen, onClose }: { 
  project: typeof projects[0] | null, 
  isOpen: boolean, 
  onClose: () => void 
}) {
  if (!project || !isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-gradient-to-br from-neutral-900 to-neutral-800 border border-neutral-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold text-accent mb-2">{project.title}</h2>
              <p className="text-neutral-300 text-lg">{project.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white transition-colors p-2"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Storytelling Structure */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-red-400 mb-2">Challenge</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{project.challenge}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-bold text-blue-400 mb-2">Solution</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{project.solution}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-xl font-bold text-green-400 mb-2">Impact</h3>
                <p className="text-neutral-400 text-sm leading-relaxed">{project.impact}</p>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-bold text-accent-foreground mb-4">Technologies Used</h3>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span key={tech} className="bg-neutral-800/80 text-neutral-300 px-4 py-2 rounded-full text-sm font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-4">
            <a
              href={project.link}
              className="flex-1 bg-accent text-white text-center py-3 rounded-full font-semibold hover:bg-accent-foreground transition-colors"
            >
              View Project
            </a>
            <a
              href={project.github}
              className="flex-1 border border-accent text-accent text-center py-3 rounded-full font-semibold hover:bg-accent hover:text-white transition-colors"
            >
              View Code
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Main Projects Section
export default function ProjectsEnhanced() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -200px 0px" });
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedProject(null), 300);
  };

  return (
    <>
      <section ref={ref} id="projects" className="py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-accent drop-shadow-lg">
              Featured Projects
            </h2>
            <p className="text-lg md:text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
              Discover the stories behind my most impactful projects, from AI-powered solutions 
              to cutting-edge web applications.
            </p>
          </motion.div>

          {/* Horizontal Scrolling Gallery */}
          <div className="relative">
            <div className="flex space-x-8 overflow-x-auto scrollbar-hide pb-8 px-4">
              {projects.map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project} 
                  onClick={() => openModal(project)}
                />
              ))}
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex justify-center mt-8">
              <div className="flex items-center space-x-2 text-neutral-400 text-sm">
                <span>Scroll to explore</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
