'use client';

import { motion } from 'framer-motion';
import {
  ArrowUp,
  Clock,
  Server,
  ShieldCheck,
  TrendingUp,
  Zap,
} from 'lucide-react';

import { useThemeStyles } from '@/components/ui/useThemeStyles';
import type { Highlight } from '@/content/highlights';
import { colorClasses } from '@/content/highlights';

// Icon resolver for converting string names to icon components
const iconMap = {
  ArrowUp,
  Clock,
  Server,
  ShieldCheck,
  TrendingUp,
  Zap,
} as const;

function getIcon(iconName: string) {
  return iconMap[iconName as keyof typeof iconMap] || Zap;
}

export function HighlightsSection({
  highlights,
}: {
  highlights: readonly Highlight[];
}) {
  const { styles } = useThemeStyles();

  return (
    <section className={styles.layout.section}>
      <div className={styles.layout.container}>
        <div className="mb-16 text-center">
          <motion.h2
            className={styles.text.heading}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className={styles.text.gradient}>Impact Highlights</span>
          </motion.h2>
          <motion.p
            className={`${styles.text.muted} mx-auto mt-4 max-w-2xl`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Quantified results demonstrating technical leadership and
            engineering excellence in production environments.
          </motion.p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {highlights.map((highlight, index) => {
            const Icon = getIcon(highlight.icon);
            const colors = colorClasses[highlight.color];

            return (
              <motion.div
                key={highlight.id}
                className={`
                  group relative overflow-hidden rounded-xl border bg-gradient-to-br p-6
                  backdrop-blur-sm ${colors.bg} ${colors.border}
                  transition-all duration-300 hover:scale-[1.02]
                  hover:shadow-lg dark:hover:shadow-xl
                `}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                  damping: 20,
                }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`
                    flex-shrink-0 rounded-lg bg-gradient-to-br
                    p-2 ${colors.bg}
                    border ${colors.border}
                  `}
                  >
                    <Icon className={`h-5 w-5 ${colors.icon}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                      {highlight.label}
                    </span>
                    <div className={`mt-1 text-xl font-bold ${colors.accent}`}>
                      {highlight.metric}
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <p className="text-sm font-medium text-foreground">
                    {highlight.context}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {highlight.impact}
                  </p>
                </div>

                {/* Subtle hover effect */}
                <div
                  className={`
                  absolute inset-0 bg-gradient-to-tr opacity-0 transition-opacity
                  group-hover:opacity-100 ${colors.bg}
                  pointer-events-none
                `}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <p className={`${styles.text.muted} text-sm`}>
            Want to see detailed breakdowns?{' '}
            <span className={styles.text.primary}>
              Check out my case studies →
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default HighlightsSection;
