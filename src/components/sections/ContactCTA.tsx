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
      type: "spring" as const,
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
        "bg-gradient-to-br from-primary/20 to-accent/20 relative overflow-hidden"
      )}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-foreground rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent-foreground rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary rounded-full blur-3xl" />
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
          ease: "easeInOut",
        }}
        className="absolute top-16 right-16 w-12 h-12 bg-primary-foreground/20 rounded-full"
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
        className="absolute bottom-32 left-16 w-8 h-8 bg-accent-foreground/30 rounded-full"
      />

      <div className={styles.layout.container}>
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
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8",
              "bg-primary-foreground/20 backdrop-blur-sm border border-primary-foreground/30"
            )}
          >
            <Sparkles size={16} className="text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">
              Let&apos;s Create Something Amazing
            </span>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={itemVariants} className="space-y-8 mb-12">
            <h2 className="text-4xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight">
              Ready to Start
              <span className="block text-accent-foreground">Your Project?</span>
            </h2>
            
            <p className="text-xl lg:text-2xl text-primary-foreground/80 max-w-3xl mx-auto font-serif leading-relaxed">
              I&apos;m always excited to collaborate on new projects and bring innovative ideas to life. 
              Let&apos;s discuss how we can create something extraordinary together.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "group relative px-8 py-4 rounded-full font-semibold text-lg",
                "bg-primary-foreground text-primary overflow-hidden",
                "transition-all duration-300",
                "hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]"
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
                  "group relative px-8 py-4 rounded-full font-semibold text-lg",
                  "bg-transparent text-primary-foreground border-2 border-primary-foreground/30",
                  "hover:border-primary-foreground/50 transition-all duration-300",
                  "backdrop-blur-sm"
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
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {[
              {
                icon: Mail,
                title: "Email",
                description: "Drop me a line anytime",
                action: "hello@owen.dev",
                href: "mailto:hello@owen.dev"
              },
              {
                icon: MessageCircle,
                title: "Chat",
                description: "Let's have a conversation",
                action: "Start chatting",
                href: "/contact"
              },
              {
                icon: ArrowRight,
                title: "Meeting",
                description: "Schedule a call",
                action: "Book a slot",
                href: "/contact"
              }
            ].map((item) => (
              <motion.a
                key={item.title}
                href={item.href}
                whileHover={{ scale: 1.05, y: -5 }}
                className={cn(
                  "group p-6 rounded-xl text-center transition-all duration-300",
                  "bg-primary-foreground/10 backdrop-blur-sm",
                  "border border-primary-foreground/20 hover:border-primary-foreground/40",
                  "hover:bg-primary-foreground/20"
                )}
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block p-3 rounded-full bg-primary-foreground/20 mb-4"
                >
                  <item.icon size={24} className="text-primary-foreground" />
                </motion.div>
                
                <h3 className="text-lg font-semibold text-primary-foreground mb-2">
                  {item.title}
                </h3>
                
                <p className="text-primary-foreground/70 text-sm mb-3">
                  {item.description}
                </p>
                
                <span className="text-accent-foreground font-medium text-sm">
                  {item.action}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* Social Proof */}
          <motion.div
            variants={itemVariants}
            className="mt-16 pt-8 border-t border-primary-foreground/20"
          >
            <p className="text-primary-foreground/60 text-sm mb-4">
              Trusted by developers and companies worldwide
            </p>
            
            <div className="flex justify-center items-center space-x-8 opacity-60">
              {/* Placeholder for company logos or testimonial snippets */}
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg"></div>
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg"></div>
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg"></div>
              <div className="w-12 h-12 bg-primary-foreground/20 rounded-lg"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative gradient overlay */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background/20 to-transparent" />
    </section>
  );
}
