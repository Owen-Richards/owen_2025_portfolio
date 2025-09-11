'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';
import { useThemeStyles } from '../ui/useThemeStyles';

const blogPosts = [
  {
    id: 1,
    title: "Building Award-Winning Portfolios in 2025",
    excerpt: "Discover the latest design trends and development techniques that make portfolios stand out in today's competitive landscape.",
    date: "March 15, 2025",
    readTime: "8 min read",
    category: "Design",
    slug: "building-award-winning-portfolios-2025",
    featured: true,
  },
  {
    id: 2,
    title: "The Future of WebGL in Interactive Design",
    excerpt: "Exploring how Three.js and WebGL are revolutionizing user experiences on the web.",
    date: "March 10, 2025",
    readTime: "6 min read",
    category: "Development",
    slug: "future-of-webgl-interactive-design",
    featured: false,
  },
  {
    id: 3,
    title: "Mastering Framer Motion for Web Animations",
    excerpt: "A comprehensive guide to creating smooth, performant animations that enhance user experience.",
    date: "March 5, 2025",
    readTime: "12 min read",
    category: "Tutorial",
    slug: "mastering-framer-motion-animations",
    featured: false,
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

// Blog Card Component
function BlogCard({ post, size = "normal" }: { 
  post: typeof blogPosts[0], 
  size?: "normal" | "large" 
}) {
  const { styles, cn } = useThemeStyles();
  
  return (
    <motion.article
      whileHover={{ y: -8, scale: 1.02 }}
      className={cn(
        "group cursor-pointer transition-all duration-300",
        styles.glass.base,
        "border border-border hover:border-primary/50",
        styles.theme.cardShadow,
        "hover:shadow-[var(--shadow-strong)]",
        "rounded-2xl overflow-hidden",
        size === "large" ? "h-96" : "h-80"
      )}
    >
      <Link href={`/blog/${post.slug}`}>
        <div className="relative h-full flex flex-col">
          {/* Image Placeholder */}
          <div className={cn(
            "relative overflow-hidden",
            size === "large" ? "h-48" : "h-40",
            "bg-gradient-to-br from-primary/20 to-accent/20"
          )}>
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            
            {/* Category Badge */}
            <div className="absolute top-4 left-4">
              <span className={cn(
                "inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium",
                "bg-primary text-primary-foreground"
              )}>
                <Tag size={12} />
                {post.category}
              </span>
            </div>

            {/* Featured Badge */}
            {post.featured && (
              <div className="absolute top-4 right-4">
                <span className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium",
                  "bg-accent text-accent-foreground"
                )}>
                  Featured
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 flex flex-col">
            <div className="flex-1">
              <h3 className={cn(
                "font-bold mb-3 line-clamp-2 transition-colors",
                styles.text.heading,
                "group-hover:text-primary",
                size === "large" ? "text-xl md:text-2xl" : "text-lg"
              )}>
                {post.title}
              </h3>
              
              <p className={cn(
                "leading-relaxed line-clamp-3 mb-4",
                styles.text.muted,
                size === "large" ? "text-base" : "text-sm"
              )}>
                {post.excerpt}
              </p>
            </div>

            {/* Meta Information */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-4 text-sm">
                <div className={cn(
                  "flex items-center gap-1",
                  styles.text.muted
                )}>
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                
                <div className={cn(
                  "flex items-center gap-1",
                  styles.text.muted
                )}>
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <motion.div
                className={cn(
                  "flex items-center gap-1 text-sm font-medium",
                  styles.text.primary,
                  "group-hover:gap-2 transition-all duration-300"
                )}
              >
                Read More
                <ArrowRight size={14} />
              </motion.div>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export default function BlogPreview() {
  const { styles, cn } = useThemeStyles();
  
  return (
    <section className={cn(styles.layout.section, styles.theme.sectionBackground)}>
      <div className={styles.layout.container}>
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
            <motion.h2 
              className={cn(
                "text-4xl lg:text-5xl font-display font-bold mb-6",
                styles.text.heading
              )}
              whileHover={{ scale: 1.05 }}
            >
              Latest
              <span className={cn("ml-4", styles.text.primary)}>Insights</span>
            </motion.h2>
            
            <motion.p 
              className={cn(
                "text-xl max-w-3xl mx-auto font-serif leading-relaxed",
                styles.text.muted
              )}
            >
              Thoughts on design, development, and the future of digital experiences. 
              Sharing knowledge and insights from the trenches of creative development.
            </motion.p>
          </motion.div>

          {/* Blog Posts Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Featured Post */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2"
            >
              <BlogCard post={blogPosts[0]} size="large" />
            </motion.div>

            {/* Secondary Posts */}
            <div className="space-y-8">
              {blogPosts.slice(1).map((post) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                >
                  <BlogCard post={post} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* View All Button */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-16"
          >
            <Link href="/blog">
              <motion.button
                className={cn(styles.button.primary, "inline-flex items-center gap-3")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View All Posts</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
