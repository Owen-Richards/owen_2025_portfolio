'use client';

import { useThemeStyles } from '@/components/ui/useThemeStyles';
import { motion } from 'framer-motion';
import { BriefcaseIcon, CalendarIcon, GlobeIcon, MapPinIcon, StarIcon } from 'lucide-react';

export function ExecutiveSummary() {
  const { styles } = useThemeStyles();

  const highlights = [
    {
      icon: BriefcaseIcon,
      text: "8+ years architecting scalable systems at high-growth companies"
    },
    {
      icon: StarIcon,
      text: "Proven track record: 67% performance improvements, 4x faster delivery"
    },
    {
      icon: GlobeIcon,
      text: "Full-stack expertise: React/Next.js, Node.js, AWS, TypeScript"
    },
    {
      icon: MapPinIcon,
      text: "Remote-first collaboration with US/EU timezone flexibility"
    },
    {
      icon: CalendarIcon,
      text: "Available for Senior/Staff roles with 30-day notice"
    }
  ];

  const targetRoles = [
    "Senior Full-Stack Engineer",
    "Staff Engineer",
    "Technical Lead", 
    "Principal Engineer",
    "Founding Engineer (Series A-B)"
  ];

  return (
    <section className="relative py-16 bg-gradient-to-r from-primary/2 via-transparent to-accent/2">
      <div className={styles.layout.container}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Executive Value Proposition */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <h2 className={`${styles.text.heading} mb-4`}>
                <span className={styles.text.gradient}>Executive Summary</span>
              </h2>
              <p className={`${styles.text.bodyLarge} ${styles.text.muted} leading-relaxed`}>
                Senior full-stack engineer with demonstrated expertise in scaling engineering teams and 
                systems from startup to enterprise. Passionate about performance, developer experience, 
                and building products that matter.
              </p>
            </div>

            <div className="space-y-4">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div
                    key={index}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10 border border-primary/20">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <p className={`${styles.text.body} leading-relaxed`}>
                      {highlight.text}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Target Roles & Availability */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className={`${styles.card.base} p-8 space-y-6`}>
              <div>
                <h3 className={`${styles.text.subheading} mb-4 flex items-center gap-2`}>
                  <BriefcaseIcon className="w-5 h-5 text-primary" />
                  Target Roles
                </h3>
                <div className="grid gap-2">
                  {targetRoles.map((role, index) => (
                    <motion.div
                      key={role}
                      className="flex items-center gap-2 p-2 rounded-lg hover:bg-primary/5 transition-colors"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + (index * 0.05) }}
                    >
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span className={styles.text.body}>{role}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h4 className={`${styles.text.primary} font-semibold mb-3`}>
                  Availability & Preferences
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                    <span className={styles.text.muted}>30-day notice period</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPinIcon className="w-4 h-4 text-muted-foreground" />
                    <span className={styles.text.muted}>Remote/Hybrid (US/EU timezone overlap)</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <GlobeIcon className="w-4 h-4 text-muted-foreground" />
                    <span className={styles.text.muted}>Open to relocation for exceptional opportunities</span>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <motion.button 
                  className={styles.button.primary}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  View Full Resume (PDF)
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ExecutiveSummary;
