# Owen's 2025 Portfolio - Award-Level Creative Portfolio

🚀 **A cutting-edge, immersive portfolio built with Next.js 14+, TypeScript, TailwindCSS, Three.js, and Framer Motion.**

## ✨ Features

- **Narrative Scrollytelling**: Each section flows like a chapter in your professional story
- **Interactive 3D Elements**: Cinematic WebGL backgrounds with particle systems
- **Technical Skills Showcase**: Animated proficiency bars and interactive skill cards
- **Project Galleries**: Horizontal-scrolling cards with detailed modal storytelling
- **Smooth Animations**: GSAP + Framer Motion for award-level motion design
- **Fully Responsive**: Optimized for desktop, tablet, and mobile experiences
- **Accessibility First**: WCAG AA compliant with `prefers-reduced-motion` support
- **Performance Optimized**: Lazy loading, optimized images, and efficient renders

## 🎯 Sections

1. **Hero** - Immersive introduction with WebGL background
2. **Technical Skills** - Interactive skill grid with proficiency visualization
3. **About** - Personal narrative with parallax effects
4. **Projects** - Showcase with Challenge → Solution → Impact storytelling
5. **Blog** - Featured articles and insights
6. **Contact** - Engaging contact form with social links

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: TailwindCSS with custom design system
- **Animations**: Framer Motion + GSAP
- **3D Graphics**: Three.js with @react-three/fiber + @react-three/drei
- **Smooth Scrolling**: Lenis
- **Typography**: Inter, Playfair Display, JetBrains Mono
- **Content**: MDX for blog posts

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Owen-Richards/owen_2025_portfolio.git
cd owen_2025_portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the portfolio.

## 📝 Content Management

### Adding Technical Skills

Edit `src/components/sections/TechnicalSkills.tsx` to add new skills:

```typescript
const skills = [
  {
    category: "Your Category",
    icon: "💻", // Emoji or icon
    items: [
      { name: "Skill Name", level: 85 }, // level = 0-100
      // Add more skills...
    ],
  },
  // Add more categories...
];
```

**Skill Level Guidelines:**
- 90-100: Expert/Advanced
- 75-89: Proficient 
- 60-74: Intermediate
- 40-59: Beginner
- 0-39: Learning

### Adding Projects

Edit `src/components/sections/ProjectsEnhanced.tsx` to showcase new projects:

```typescript
const projects = [
  {
    id: "unique-project-id",
    title: "Project Name",
    subtitle: "Project Type",
    description: "Brief project description for the card",
    image: "/project-image.jpg", // Add image to public folder
    technologies: ["React", "Node.js", "AWS"], // Tech stack array
    challenge: "What problem did this solve?",
    solution: "How did you approach the solution?", 
    impact: "What was the measurable impact?",
    link: "https://project-url.com",
    github: "https://github.com/username/repo"
  },
  // Add more projects...
];
```

### Adding Blog Posts

1. Create a new MDX file in `src/content/blog/`:

```bash
touch src/content/blog/your-post-slug.mdx
```

2. Add frontmatter and content:

```mdx
---
title: "Your Post Title"
description: "Brief description for SEO and previews"
date: "2025-01-15"
author: "Owen Richards"
tags: ["tag1", "tag2", "tag3"]
featured: true # Set to true for featured posts
image: "/blog/post-image.jpg" # Optional hero image
---

# Your Post Title

Your blog content here in Markdown...

## Subheading

- Bullet points
- **Bold text**
- `code snippets`

```javascript
// Code blocks with syntax highlighting
function example() {
  return "Hello, World!";
}
```

3. The blog system will automatically:
   - Generate the post route
   - Add it to the blog index
   - Apply syntax highlighting
   - Handle metadata and SEO

### Customizing Colors & Theme

Edit `src/app/globals.css` to modify the color scheme:

```css
:root {
  /* Update primary colors */
  --primary-500: #your-color;
  --accent: #your-accent;
  
  /* Or modify Tailwind config */
}
```

Or update `tailwind.config.js` for theme changes:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        accent: "#your-color",
        // Add custom colors...
      }
    }
  }
}
```

## 🎨 Design System

### UI Components

Located in `src/components/ui/`:

- **Button**: `<Button variant="primary|secondary|ghost" size="sm|md|lg" />`
- **Card**: `<Card>Content</Card>`
- **Heading**: `<Heading level={1-6}>Title</Heading>`
- **Section**: `<Section title="Title" id="section-id">Content</Section>`

### Section Components

Located in `src/components/sections/`:

- `HeroSection.tsx` - Landing section
- `TechnicalSkills.tsx` - Skills showcase
- `AboutEnhanced.tsx` - Personal story
- `ProjectsEnhanced.tsx` - Project gallery
- `BlogPreview.tsx` - Blog highlights
- `ContactCTA.tsx` - Contact section

## 📱 Responsive Design

The portfolio uses a mobile-first approach:

- **Mobile**: Stack content, simplified animations
- **Tablet**: Responsive grids, touch-friendly interactions  
- **Desktop**: Full animations, hover effects, parallax

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation support
- Color contrast compliance (WCAG AA)
- `prefers-reduced-motion` support
- Screen reader optimization

## 🔧 Performance Optimization

- **Images**: Next.js Image optimization
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Intersection Observer for sections
- **Bundle Analysis**: Use `npm run analyze` to check bundle size
- **WebGL**: DPR clamping on mobile for performance

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy automatically on push

### Manual Deployment

```bash
# Build for production
npm run build

# Start production server
npm start
```

## 📊 Analytics & SEO

- Built-in SEO optimization with Next.js metadata
- Open Graph and Twitter Cards
- Sitemap generation
- Performance monitoring ready

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For questions or support:
- Create an issue on GitHub
- Contact: [your-email@domain.com]
- Portfolio: [https://owen.dev](https://owen.dev)

---

Built with ❤️ by [Owen Richards](https://github.com/Owen-Richards)
