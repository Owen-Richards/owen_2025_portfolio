'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Clock, Tag } from 'lucide-react';
import Link from 'next/link';

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

export default function BlogPreview() {
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
              Latest
              <span className="text-primary-600 ml-4 slight-skew">Insights</span>
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto font-serif">
              Thoughts on design, development, and the future of digital experiences. 
              Sharing knowledge and insights from the trenches of creative development.
            </p>
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
                  <BlogCard post={post} size="small" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* View All CTA */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-20"
          >
            <Link href="/blog">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl inline-flex items-center gap-2"
              >
                Read All Posts
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight 
                    size={18} 
                    className="group-hover:translate-x-1 transition-transform duration-300" 
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

interface BlogCardProps {
  post: typeof blogPosts[0];
  size: 'large' | 'small';
}

function BlogCard({ post, size }: BlogCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <Link href={`/blog/${post.slug}`} className="block h-full">
        <div className={`h-full overflow-hidden rounded-2xl bg-white/60 backdrop-blur-sm border border-primary-200/30 shadow-lg hover:shadow-xl transition-all duration-500 ${size === 'large' ? 'p-8' : 'p-6'}`}>
          
          {/* Category Badge */}
          <div className="flex items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1 px-3 py-1 text-xs font-medium bg-primary-100 text-primary-700 rounded-full">
              <Tag size={12} />
              {post.category}
            </span>
            {post.featured && (
              <span className="px-3 py-1 text-xs font-medium bg-accent-100 text-accent-700 rounded-full">
                Featured
              </span>
            )}
          </div>

          {/* Content */}
          <div className={`space-y-4 ${size === 'large' ? 'mb-6' : 'mb-4'}`}>
            <h3 className={`font-display font-bold text-foreground group-hover:text-primary-600 transition-colors ${size === 'large' ? 'text-2xl lg:text-3xl leading-tight' : 'text-lg leading-tight'}`}>
              {post.title}
            </h3>
            
            <p className={`text-foreground/70 font-serif leading-relaxed ${size === 'large' ? 'text-lg' : 'text-sm'}`}>
              {post.excerpt}
            </p>
          </div>

          {/* Meta Information */}
          <div className={`flex items-center gap-4 text-foreground/60 ${size === 'large' ? 'text-sm' : 'text-xs'}`}>
            <div className="flex items-center gap-1">
              <Calendar size={size === 'large' ? 16 : 14} />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={size === 'large' ? 16 : 14} />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Read More */}
          <div className={`flex items-center gap-2 text-primary-600 font-medium ${size === 'large' ? 'mt-6 text-base' : 'mt-4 text-sm'}`}>
            <span>Read Article</span>
            <ArrowRight 
              size={size === 'large' ? 16 : 14} 
              className="group-hover:translate-x-1 transition-transform duration-300" 
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
