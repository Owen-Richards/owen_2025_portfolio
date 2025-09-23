// Performance highlights content data
// Icons are referenced by string names to avoid serialization issues
// when passing from Server to Client Components

export interface Highlight {
  id: string;
  label: string;
  metric: string;
  context: string;
  impact: string;
  icon: string;
  color: 'slate' | 'gray' | 'stone';
}

export const highlights: readonly Highlight[] = [
  {
    id: 'performance',
    label: 'Performance',
    metric: '−67% p95 latency',
    context: 'API optimization & caching layer',
    impact: 'Improved user experience & reduced infrastructure costs',
    icon: 'Zap',
    color: 'slate',
  },
  {
    id: 'delivery',
    label: 'Delivery Speed',
    metric: '4x faster releases',
    context: 'CI/CD pipeline & automated testing',
    impact: 'Reduced lead time & fewer production issues',
    icon: 'Clock',
    color: 'gray',
  },
  {
    id: 'scalability',
    label: 'Build Efficiency',
    metric: '18min → 4min builds',
    context: 'Incremental compilation & caching',
    impact: 'Higher developer productivity & faster iteration',
    icon: 'TrendingUp',
    color: 'slate',
  },
  {
    id: 'reliability',
    label: 'System Reliability',
    metric: '99.9% uptime',
    context: 'Monitoring, alerting & fault tolerance',
    impact: 'Improved customer trust & reduced support burden',
    icon: 'Server',
    color: 'stone',
  },
  {
    id: 'cost',
    label: 'Cost Optimization',
    metric: '−31% AWS spend',
    context: 'Resource optimization & auto-scaling',
    impact: 'Significant operational cost savings',
    icon: 'ArrowUp',
    color: 'gray',
  },
  {
    id: 'security',
    label: 'Security Enhancement',
    metric: '0 critical vulnerabilities',
    context: 'Automated security scanning & compliance',
    impact: 'Protected user data & met compliance requirements',
    icon: 'ShieldCheck',
    color: 'stone',
  },
] as const;

export const colorClasses = {
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
} as const;
