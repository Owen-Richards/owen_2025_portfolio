export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  technologies: string[];
  challenge: string;
  solution: string;
  impact: string;
  link: string;
  github: string;
}

export const projects: readonly Project[] = [
  {
    id: 'project-mapping-ai',
    title: 'Project Mapping AI',
    subtitle: 'Enterprise AI Solution',
    description:
      'Advanced machine learning platform for automated project categorization and resource optimization.',
    image: '/project-mapping-ai.jpg',
    technologies: ['Python', 'TensorFlow', 'AWS', 'React', 'PostgreSQL'],
    challenge:
      'Organizations struggled with manual project categorization, leading to inefficient resource allocation and missed opportunities for automation.',
    solution:
      'Developed an AI-powered system using natural language processing and machine learning to automatically categorize projects, predict resource needs, and optimize team assignments.',
    impact:
      'Reduced project categorization time by 85% and improved resource allocation efficiency by 40% across 500+ enterprise projects.',
    link: '#',
    github: '#',
  },
  {
    id: 'heartbeats',
    title: 'Heartbeats',
    subtitle: 'Emotion-Aware Music Recommender',
    description:
      'AI-driven music recommendation system that adapts to user emotional states using biometric data.',
    image: '/heartbeats-app.jpg',
    technologies: ['React Native', 'Python', 'PyTorch', 'Node.js', 'MongoDB'],
    challenge:
      "Traditional music recommendations lack emotional context, often suggesting upbeat music when users need calm or energetic tracks when they're stressed.",
    solution:
      'Built a mobile app that uses heart rate variability and user input to detect emotional states, then recommends music that either matches or improves their mood using collaborative filtering and neural networks.',
    impact:
      'Achieved 92% user satisfaction in mood-matching accuracy with over 10,000 personalized recommendations generated.',
    link: '#',
    github: '#',
  },
  {
    id: 'line-follower-robot',
    title: 'Line-Follower Robot',
    subtitle: 'Autonomous Navigation System',
    description:
      'High-precision autonomous robot with computer vision for complex path navigation and obstacle avoidance.',
    image: '/robot-project.jpg',
    technologies: ['C++', 'OpenCV', 'Arduino', 'Sensors', 'PID Control'],
    challenge:
      'Traditional line-following robots struggle with complex paths, intersections, and dynamic obstacles in real-world environments.',
    solution:
      'Engineered a robust robot using computer vision algorithms, PID control systems, and sensor fusion to navigate complex paths with high precision and adaptive obstacle avoidance.',
    impact:
      'Achieved 98% path accuracy in competition settings and successfully navigated complex multi-path scenarios with sub-centimeter precision.',
    link: '#',
    github: '#',
  },
  {
    id: 'flower-classifier',
    title: 'Flower Classifier',
    subtitle: 'Deep Learning Vision Model',
    description:
      'Convolutional neural network for accurate flower species identification with real-time prediction capabilities.',
    image: '/flower-classifier.jpg',
    technologies: ['Python', 'PyTorch', 'OpenCV', 'Flask', 'Docker'],
    challenge:
      'Botanists and gardening enthusiasts needed an accurate, accessible way to identify flower species from photos, especially for rare or similar-looking varieties.',
    solution:
      'Developed a deep learning model using transfer learning and data augmentation techniques, deployed as a web application with real-time image processing capabilities.',
    impact:
      'Achieved 94% accuracy across 1,000+ flower species with sub-second prediction times, helping over 5,000 users identify plants.',
    link: '#',
    github: '#',
  },
] as const;
