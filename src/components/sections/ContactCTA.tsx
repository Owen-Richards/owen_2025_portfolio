'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Mail, MessageCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

import { useThemeStyles } from '../ui/useThemeStyles';

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
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

export default function ContactCTA() {
  const { styles, cn } = useThemeStyles();

  return (
    <section
      id="contact"
      className={cn(
        styles.layout.section,
        'relative overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20'
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute left-20 top-20 h-32 w-32 rounded-full bg-primary-foreground blur-3xl" />
        <div className="absolute bottom-20 right-20 h-48 w-48 rounded-full bg-accent-foreground blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-secondary blur-3xl" />
      </div>

      {/* Readability overlay for 3D background */}
      <div className="absolute inset-0 bg-background/10 backdrop-blur-[1px]" />

      {/* Floating Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute right-16 top-16 h-12 w-12 rounded-full bg-primary-foreground/20"
      />
      <motion.div
        animate={{
          y: [0, 15, 0],
          rotate: [0, -15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        className="absolute bottom-32 left-16 h-8 w-8 rounded-full bg-accent-foreground/30"
      />

      <div className={styles.layout.container}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className={cn(
              'mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2',
              'border border-primary-foreground/30 bg-primary-foreground/20 backdrop-blur-sm'
            )}
          >
            <Sparkles size={16} className="text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">
              Let&apos;s Create Something Amazing
            </span>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="mb-12 space-y-8">
            <h2 className="font-display text-4xl font-bold leading-tight text-primary-foreground lg:text-6xl">
              Ready to Start
              <span className="block text-accent-foreground">
                Your Project?
              </span>
            </h2>

            <p className="mx-auto max-w-3xl font-serif text-xl leading-relaxed text-primary-foreground/80 lg:text-2xl">
              I&apos;m always excited to collaborate on new projects and bring
              innovative ideas to life. Let&apos;s discuss how we can create
              something extraordinary together.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                'group relative rounded-full px-8 py-4 text-lg font-semibold',
                'overflow-hidden bg-primary-foreground text-primary',
                'transition-all duration-300',
                'hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]'
              )}
            >
              <motion.div
                className="absolute inset-0 bg-accent"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center gap-3">
                <Mail size={20} />
                Get In Touch
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowRight size={20} />
                </motion.div>
              </span>
            </motion.button>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  'group relative rounded-full px-8 py-4 text-lg font-semibold',
                  'border-2 border-primary-foreground/30 bg-transparent text-primary-foreground',
                  'transition-all duration-300 hover:border-primary-foreground/50',
                  'backdrop-blur-sm'
                )}
              >
                <span className="flex items-center gap-3">
                  <MessageCircle size={20} />
                  Send Message
                </span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            variants={itemVariants}
            className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-3"
          >
            {[
              {
                icon: Mail,
                title: 'Email',
                description: 'Drop me a line anytime',
                action: 'hello@owen.dev',
                href: 'mailto:hello@owen.dev',
              },
              {
                icon: MessageCircle,
                title: 'Chat',
                description: "Let's have a conversation",
                action: 'Start chatting',
                href: '/contact',
              },
              {
                icon: ArrowRight,
                title: 'Meeting',
                description: 'Schedule a call',
                action: 'Book a slot',
                href: '/contact',
              },
            ].map((item) => (
              <motion.a
                key={item.title}
                href={item.href}
                whileHover={{ scale: 1.05, y: -5 }}
                className={cn(
                  'group rounded-xl p-6 text-center transition-all duration-300',
                  'bg-primary-foreground/10 backdrop-blur-sm',
                  'border border-primary-foreground/20 hover:border-primary-foreground/40',
                  'hover:bg-primary-foreground/20'
                )}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 inline-block rounded-full bg-primary-foreground/20 p-3"
                >
                  <item.icon size={24} className="text-primary-foreground" />
                </motion.div>

                <h3 className="mb-2 text-lg font-semibold text-primary-foreground">
                  {item.title}
                </h3>

                <p className="mb-3 text-sm text-primary-foreground/70">
                  {item.description}
                </p>

                <span className="text-sm font-medium text-accent-foreground">
                  {item.action}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="mt-16 border-t border-primary-foreground/20 pt-8"
          >
            <p className="mb-4 text-sm text-primary-foreground/60">
              Trusted by developers and companies worldwide
            </p>

            <div className="flex items-center justify-center space-x-8 opacity-60">
              {/* Placeholder for company logos or testimonial snippets */}
              <div className="h-12 w-12 rounded-lg bg-primary-foreground/20"></div>
              <div className="h-12 w-12 rounded-lg bg-primary-foreground/20"></div>
              <div className="h-12 w-12 rounded-lg bg-primary-foreground/20"></div>
              <div className="h-12 w-12 rounded-lg bg-primary-foreground/20"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 h-32 w-full bg-gradient-to-t from-background/20 to-transparent" />
    </section>
  );
}
