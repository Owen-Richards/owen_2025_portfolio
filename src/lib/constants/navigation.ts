// Navigation configuration
export const NAVIGATION_ITEMS = [
  { name: 'Home', href: '#home', type: 'anchor' as const },
  { name: 'Skills', href: '#skills', type: 'anchor' as const },
  { name: 'About', href: '#about', type: 'anchor' as const },
  { name: 'Projects', href: '#projects', type: 'anchor' as const },
  { name: 'Work', href: '/work', type: 'page' as const },
  { name: 'Blog', href: '/blog', type: 'page' as const },
  { name: 'Contact', href: '#contact', type: 'anchor' as const },
] as const;

export type NavigationItem = (typeof NAVIGATION_ITEMS)[number];

// Route configuration
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  WORK: '/work',
  BLOG: '/blog',
  CONTACT: '/contact',
  PORTFOLIO_3D: '/portfolio-3d',
  RECRUITER: '/recruiter',
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];
