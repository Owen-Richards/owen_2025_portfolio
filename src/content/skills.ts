export interface Skill {
  name: string;
  category: string;
  level: 'expert' | 'advanced' | 'intermediate' | 'learning';
  years: number;
  projects?: number;
  icon?: string;
  description?: string;
}

export const skills: readonly Skill[] = [
  // Frontend - Enhanced with icons and descriptions
  {
    name: 'React/Next.js',
    category: 'Frontend',
    level: 'expert',
    years: 6,
    projects: 25,
    icon: '⚛️',
    description:
      'Building scalable web applications with modern React patterns and Next.js optimization',
  },
  {
    name: 'TypeScript',
    category: 'Frontend',
    level: 'expert',
    years: 5,
    projects: 30,
    icon: '🔷',
    description:
      'Type-safe development with advanced TypeScript patterns and generics',
  },
  {
    name: 'JavaScript',
    category: 'Frontend',
    level: 'expert',
    years: 8,
    projects: 40,
    icon: '⚡',
    description:
      'Deep expertise in modern ES6+ features and asynchronous programming',
  },
  {
    name: 'CSS/Tailwind',
    category: 'Frontend',
    level: 'expert',
    years: 8,
    projects: 35,
    icon: '🎨',
    description:
      'Responsive design mastery with CSS Grid, Flexbox, and Tailwind utility classes',
  },
  {
    name: 'Three.js/WebGL',
    category: 'Frontend',
    level: 'advanced',
    years: 2,
    projects: 8,
    icon: '🌐',
    description:
      'Creating immersive 3D experiences and WebGL-powered visualizations',
  },
  {
    name: 'Vue.js',
    category: 'Frontend',
    level: 'intermediate',
    years: 1,
    projects: 3,
    icon: '💚',
    description: 'Component-based development with Vue 3 Composition API',
  },

  // Backend - Enhanced
  {
    name: 'Node.js',
    category: 'Backend',
    level: 'expert',
    years: 6,
    projects: 20,
    icon: '🟢',
    description:
      'High-performance server-side applications with Express and microservices',
  },
  {
    name: 'Python',
    category: 'Backend',
    level: 'advanced',
    years: 4,
    projects: 15,
    icon: '🐍',
    description:
      'Data processing, ML pipelines, and API development with FastAPI/Django',
  },
  {
    name: 'Java',
    category: 'Backend',
    level: 'intermediate',
    years: 3,
    projects: 8,
    icon: '☕',
    description:
      'Enterprise applications and Spring Boot microservices architecture',
  },
  {
    name: 'Go',
    category: 'Backend',
    level: 'intermediate',
    years: 1,
    projects: 4,
    icon: '🔵',
    description: 'High-performance APIs and concurrent programming patterns',
  },
  {
    name: 'PHP',
    category: 'Backend',
    level: 'intermediate',
    years: 2,
    projects: 6,
    icon: '🐘',
    description: 'Laravel and Symfony framework development',
  },

  // Database - Enhanced
  {
    name: 'PostgreSQL',
    category: 'Database',
    level: 'advanced',
    years: 5,
    projects: 18,
    icon: '🐘',
    description:
      'Complex queries, performance optimization, and database design',
  },
  {
    name: 'MongoDB',
    category: 'Database',
    level: 'advanced',
    years: 4,
    projects: 12,
    icon: '🍃',
    description: 'Document modeling, aggregation pipelines, and scaling',
  },
  {
    name: 'Redis',
    category: 'Database',
    level: 'intermediate',
    years: 3,
    projects: 10,
    icon: '🔴',
    description: 'Caching strategies, session management, and pub/sub patterns',
  },
  {
    name: 'MySQL',
    category: 'Database',
    level: 'intermediate',
    years: 4,
    projects: 14,
    icon: '🐬',
    description: 'Relational database design and query optimization',
  },

  // Cloud & DevOps - Enhanced
  {
    name: 'AWS',
    category: 'Cloud',
    level: 'advanced',
    years: 4,
    projects: 16,
    icon: '☁️',
    description: 'EC2, Lambda, S3, RDS, and serverless architecture deployment',
  },
  {
    name: 'Docker',
    category: 'DevOps',
    level: 'advanced',
    years: 5,
    projects: 22,
    icon: '🐳',
    description: 'Containerization, multi-stage builds, and orchestration',
  },
  {
    name: 'Kubernetes',
    category: 'DevOps',
    level: 'intermediate',
    years: 2,
    projects: 6,
    icon: '⚓',
    description: 'Container orchestration and microservices deployment',
  },
  {
    name: 'CI/CD',
    category: 'DevOps',
    level: 'advanced',
    years: 5,
    projects: 20,
    icon: '🔄',
    description: 'GitHub Actions, Jenkins, and automated deployment pipelines',
  },
  {
    name: 'Terraform',
    category: 'DevOps',
    level: 'intermediate',
    years: 2,
    projects: 5,
    icon: '🌍',
    description: 'Infrastructure as code and cloud resource management',
  },

  // AI/ML - Enhanced
  {
    name: 'TensorFlow',
    category: 'AI/ML',
    level: 'advanced',
    years: 3,
    projects: 8,
    icon: '🧠',
    description: 'Deep learning models, neural networks, and model deployment',
  },
  {
    name: 'PyTorch',
    category: 'AI/ML',
    level: 'intermediate',
    years: 2,
    projects: 5,
    icon: '🔥',
    description: 'Research-oriented deep learning and computer vision',
  },
  {
    name: 'Scikit-learn',
    category: 'AI/ML',
    level: 'advanced',
    years: 3,
    projects: 10,
    icon: '📊',
    description: 'Classical machine learning and data preprocessing',
  },
  {
    name: 'OpenAI APIs',
    category: 'AI/ML',
    level: 'intermediate',
    years: 1,
    projects: 6,
    icon: '🤖',
    description: 'GPT integration, embeddings, and AI-powered applications',
  },

  // Tools & Others - Enhanced
  {
    name: 'Git',
    category: 'Tools',
    level: 'expert',
    years: 8,
    projects: 45,
    icon: '📝',
    description: 'Version control, branching strategies, and collaboration',
  },
  {
    name: 'VS Code',
    category: 'Tools',
    level: 'expert',
    years: 6,
    projects: 40,
    icon: '💻',
    description: 'Advanced debugging, extensions, and productivity workflows',
  },
  {
    name: 'Figma',
    category: 'Design',
    level: 'intermediate',
    years: 3,
    projects: 12,
    icon: '🎨',
    description: 'UI/UX design, prototyping, and design system creation',
  },
  {
    name: 'Agile/Scrum',
    category: 'Methodology',
    level: 'expert',
    years: 6,
    projects: 25,
    icon: '🔄',
    description:
      'Sprint planning, retrospectives, and cross-functional team leadership',
  },
] as const;
