'use client';

import { motion } from 'framer-motion';
import {
  ArrowUpIcon,
  ClockIcon,
  ServerIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  ZapIcon,
} from 'lucide-react';

import { useThemeStyles } from '@/components/ui/useThemeStyles';

interface Highlight {
  id: string;
  label: string;
  metric: string;
  context: string;
  impact: string;
  icon: React.ComponentType<{ className?: string }>;
  color: 'slate' | 'gray' | 'stone';
}

const HIGHLIGHTS: Highlight[] = [
  {
    id: 'performance',
    label: 'Performance',
    metric: '−67% p95 latency',
    context: 'API optimization & caching layer',
    impact: 'Improved user experience & reduced infrastructure costs',
    icon: ZapIcon,
    color: 'slate',
  },
  {
    id: 'delivery',
    label: 'Delivery Speed',
    metric: '4x faster releases',
    context: 'CI/CD pipeline & automated testing',
    impact: 'Reduced lead time & fewer production issues',
    icon: ClockIcon,
    color: 'gray',
  },
  {
    id: 'scalability',
    label: 'Build Efficiency',
    metric: '18min → 4min builds',
    context: 'Incremental compilation & caching',
    impact: 'Higher developer productivity & faster iteration',
    icon: TrendingUpIcon,
    color: 'slate',
  },
  {
    id: 'reliability',
    label: 'System Reliability',
    metric: '99.9% uptime',
    context: 'Monitoring, alerting & fault tolerance',
    impact: 'Improved customer trust & reduced support burden',
    icon: ServerIcon,
    color: 'stone',
  },
  {
    id: 'cost',
    label: 'Cost Optimization',
    metric: '−31% AWS spend',
    context: 'Resource optimization & auto-scaling',
    impact: 'Significant operational cost savings',
    icon: ArrowUpIcon,
    color: 'gray',
  },
  {
    id: 'security',
    label: 'Security Enhancement',
    metric: '0 critical vulnerabilities',
    context: 'Automated security scanning & compliance',
    impact: 'Protected user data & met compliance requirements',
    icon: ShieldCheckIcon,
    color: 'stone',
  },
];

const colorClasses = {
  slate: {
    bg: 'from-slate-600/10 to-slate-700/5',
    border: 'border-slate-600/20',
    icon: 'text-slate-600',
    accent: 'text-slate-700',
  },
  gray: {
    bg: 'from-gray-600/10 to-gray-700/5',
    border: 'border-gray-600/20',
    icon: 'text-gray-600',
    accent: 'text-gray-700',
  },
  stone: {
    bg: 'from-stone-600/10 to-stone-700/5',
    border: 'border-stone-600/20',
    icon: 'text-stone-600',
    accent: 'text-stone-700',
  },
};

export function HighlightsSection() {
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
          {HIGHLIGHTS.map((highlight, index) => {
            const Icon = highlight.icon;
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
