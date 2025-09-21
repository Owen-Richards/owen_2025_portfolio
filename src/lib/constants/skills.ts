import {
  BriefcaseIcon,
  CalendarIcon,
  Code,
  GlobeIcon,
  MapPinIcon,
  Palette,
  StarIcon,
  Zap,
} from 'lucide-react';

// Skills data
export const SKILLS = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    icon: Code,
  },
  {
    category: '3D & Animation',
    items: ['Three.js', 'GSAP', 'WebGL', 'Blender', 'After Effects'],
    icon: Zap,
  },
  {
    category: 'Design',
    items: ['Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Prototyping'],
    icon: Palette,
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'GraphQL'],
    icon: Code,
  },
] as const;

// Executive summary highlights
export const EXECUTIVE_HIGHLIGHTS = [
  {
    icon: BriefcaseIcon,
    text: '8+ years architecting scalable systems at high-growth companies',
  },
  {
    icon: StarIcon,
    text: 'Proven track record: 67% performance improvements, 4x faster delivery',
  },
  {
    icon: GlobeIcon,
    text: 'Full-stack expertise: React/Next.js, Node.js, AWS, TypeScript',
  },
  {
    icon: MapPinIcon,
    text: 'Remote-first collaboration with US/EU timezone flexibility',
  },
  {
    icon: CalendarIcon,
    text: 'Available for Senior/Staff roles with 30-day notice',
  },
] as const;

// Target roles
export const TARGET_ROLES = [
  'Senior Full-Stack Engineer',
  'Staff Engineer',
  'Technical Lead',
  'Principal Engineer',
  'Founding Engineer (Series A-B)',
] as const;

export type Skill = (typeof SKILLS)[number];
export type ExecutiveHighlight = (typeof EXECUTIVE_HIGHLIGHTS)[number];
export type TargetRole = (typeof TARGET_ROLES)[number];
