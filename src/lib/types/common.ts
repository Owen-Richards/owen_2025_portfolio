import { LucideIcon } from 'lucide-react';
import { ReactNode } from 'react';

// Base component props
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

// Navigation types
export interface NavigationItem {
  name: string;
  href: string;
  type: 'anchor' | 'page';
}

// Skill types
export interface Skill {
  category: string;
  items: string[];
  icon: LucideIcon;
}

export interface SkillLevel {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  years?: number;
}

// Project types
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image: string;
  imageAlt: string;
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  category: string;
  year: number;
  status: 'completed' | 'in-progress' | 'planned';
}

// Blog post types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  readTime: string;
  category: string;
  slug: string;
  featured: boolean;
  tags: string[];
  author: {
    name: string;
    avatar?: string;
  };
}

// Animation types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  easing?: string;
  stagger?: number;
}

// Theme types
export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
}

export interface ThemeStyles {
  colors: ThemeColors;
  spacing: Record<string, string>;
  typography: Record<string, string>;
  shadows: Record<string, string>;
  borders: Record<string, string>;
}

// Form types
export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
  subject?: string;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

// API types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Performance types
export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
}

// SEO types
export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}
