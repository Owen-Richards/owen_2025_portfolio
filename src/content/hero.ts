// Hero section content data
// Icons are referenced by string names to avoid serialization issues
// when passing from Server to Client Components

export interface HeroBadge {
  icon: string;
  label: string;
}

export interface HeroStat {
  value: string;
  label: string;
  description: string;
}

export interface HeroSignal {
  icon: string;
  title: string;
  description: string;
}

export interface HeroSpotlight {
  tag: string;
  title: string;
  description: string;
  metric: string;
  icon: string;
}

export const heroBadges: readonly HeroBadge[] = [
  { icon: 'CircleCheck', label: 'Open to Staff & Principal engineering roles' },
  { icon: 'Calendar', label: 'Freelance engagements from Feb 2025' },
] as const;

export const heroStats: readonly HeroStat[] = [
  {
    value: '$4.8M',
    label: 'revenue influenced',
    description:
      'AI commerce + fintech launches delivered in the last 12 months.',
  },
  {
    value: '8 teams',
    label: 'led to ship',
    description: 'Remote squads scaled across US & EU timezones.',
  },
  {
    value: '92 NPS',
    label: 'stakeholder score',
    description: 'Average partner satisfaction across enterprise engagements.',
  },
] as const;

export const heroSignals: readonly HeroSignal[] = [
  {
    icon: 'Zap',
    title: 'AI-driven product acceleration',
    description:
      'Zero-to-one prototypes, scalable ML platforms, and measurable revenue lifts.',
  },
  {
    icon: 'Code',
    title: 'Full-stack system architecture',
    description:
      'Modern web apps, mobile experiences, and cloud infrastructure that scales.',
  },
  {
    icon: 'Rocket',
    title: 'Leadership & strategic execution',
    description:
      'Cross-functional teams, technical roadmaps, and stakeholder alignment.',
  },
  {
    icon: 'Globe',
    title: 'Global enterprise delivery',
    description:
      'Remote team coordination, agile processes, and international partnerships.',
  },
  {
    icon: 'Sparkles',
    title: 'Innovation & competitive advantage',
    description:
      'Emerging technologies, market differentiation, and strategic positioning.',
  },
] as const;

export const heroSpotlights: readonly HeroSpotlight[] = [
  {
    tag: 'Latest win',
    title: 'Cortex Analytics Platform',
    description:
      'Bootstrapped an AI insights platform for a Fortune 100 retailer in 10 weeks.',
    metric: '40% faster decisions',
    icon: 'Sparkles',
  },
  {
    tag: 'Immersive experience',
    title: 'AR Commerce Flagship',
    description:
      'Directed 3D product storytelling that drove 3.2x conversion on launch day.',
    metric: '3.2x conversion lift',
    icon: 'Rocket',
  },
  {
    tag: 'Team impact',
    title: 'Scale-up CTO Partner',
    description:
      'Scaled engineering from 3 → 18 while sustaining 99.9% uptime for payments.',
    metric: '99.9% uptime',
    icon: 'CircleCheck',
  },
] as const;

export const trustedBy: readonly string[] = [
  'Adobe',
  'Lululemon',
  'WPP',
  'Genentech',
] as const;
