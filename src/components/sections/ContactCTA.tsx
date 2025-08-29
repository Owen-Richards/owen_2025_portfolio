'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

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

export default function ContactCTA() {
  return (
    <section className="py-24 lg:py-32 bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-600 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent-300 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary-300 rounded-full blur-3xl" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-16 right-16 w-12 h-12 bg-white/20 rounded-full"
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-32 left-16 w-8 h-8 bg-accent-300/30 rounded-full"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8"
          >
            <Sparkles size={16} className="text-white" />
            <span className="text-sm font-medium text-white">
              Let&apos;s Create Something Amazing
            </span>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="space-y-8 mb-12">
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-white leading-tight">
              Ready to Start
              <span className="block text-accent-200 slight-skew">Your Project?</span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto font-serif leading-relaxed">
              I&apos;m always excited to collaborate on new projects and bring innovative ideas to life. 
              Let&apos;s discuss how we can create something extraordinary together.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 bg-white hover:bg-white/90 text-primary-700 font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
              >
                <MessageCircle size={18} />
                Start a Conversation
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

            <motion.a
              href="mailto:hello@owen.dev"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group px-8 py-4 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-full transition-all duration-300 border border-white/30 backdrop-blur-sm flex items-center gap-2"
            >
              <Mail size={18} />
              hello@owen.dev
            </motion.a>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-16 border-t border-white/20"
          >
            <p className="text-white/60 text-sm mb-6 font-medium">
              Trusted by innovative companies and startups worldwide
            </p>
            
            {/* Client Logos Placeholder */}
            <div className="flex items-center justify-center gap-8 opacity-40">
              {Array.from({ length: 4 }, (_, i) => (
                <div
                  key={i}
                  className="w-24 h-12 bg-white/20 rounded-lg flex items-center justify-center"
                >
                  <span className="text-white/60 font-bold text-xs">
                    LOGO {i + 1}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
