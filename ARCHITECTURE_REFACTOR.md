# 🏗️ Clean Architecture Folder Structure

## 📁 Proposed New Structure

```
src/
├── app/                          # Next.js App Router
│   ├── (pages)/                  # Route groups for better organization
│   │   ├── about/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── portfolio-3d/
│   │   ├── recruiter/
│   │   └── work/
│   ├── api/                      # API routes
│   │   ├── contact/
│   │   └── newsletter/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── features/                 # Feature-specific components
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── Hero3D.tsx
│   │   │   └── index.ts
│   │   ├── portfolio/
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectsGrid.tsx
│   │   │   ├── ProjectShowcase3D.tsx
│   │   │   └── index.ts
│   │   ├── about/
│   │   │   ├── AboutSection.tsx
│   │   │   ├── SkillsMatrix.tsx
│   │   │   ├── TechnicalSkills.tsx
│   │   │   └── index.ts
│   │   ├── blog/
│   │   │   ├── BlogPreview.tsx
│   │   │   ├── BlogCard.tsx
│   │   │   └── index.ts
│   │   └── contact/
│   │       ├── ContactForm.tsx
│   │       ├── ContactCTA.tsx
│   │       └── index.ts
│   ├── ui/                       # Reusable UI components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.test.tsx
│   │   │   ├── Button.stories.tsx
│   │   │   └── index.ts
│   │   ├── Card/
│   │   ├── Navigation/
│   │   ├── ThemeProvider/
│   │   ├── ScrollProgress/
│   │   └── index.ts              # Barrel exports
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── index.ts
│   └── three/                    # 3D/Three.js components
│       ├── geometries/
│       │   ├── DynamicGeometry.tsx
│       │   ├── FloatingElements.tsx
│       │   └── index.ts
│       ├── effects/
│       │   ├── ParticleSystem.tsx
│       │   ├── PostProcessing.tsx
│       │   └── index.ts
│       ├── scenes/
│       │   ├── HeroScene.tsx
│       │   ├── PortfolioScene.tsx
│       │   └── index.ts
│       └── index.ts
├── lib/
│   ├── animations/               # Animation definitions
│   │   ├── framer-variants.ts
│   │   ├── gsap-timelines.ts
│   │   ├── scroll-animations.ts
│   │   └── index.ts
│   ├── constants/                # Application constants
│   │   ├── navigation.ts
│   │   ├── skills.ts
│   │   ├── projects.ts
│   │   ├── blog-posts.ts
│   │   ├── theme.ts
│   │   └── index.ts
│   ├── hooks/                    # Custom React hooks
│   │   ├── useTheme.ts
│   │   ├── useScroll.ts
│   │   ├── useInView.ts
│   │   ├── useLocalStorage.ts
│   │   └── index.ts
│   ├── services/                 # External API services
│   │   ├── email.ts
│   │   ├── analytics.ts
│   │   ├── contentful.ts
│   │   └── index.ts
│   ├── types/                    # TypeScript definitions
│   │   ├── common.ts
│   │   ├── components.ts
│   │   ├── api.ts
│   │   └── index.ts
│   ├── utils/                    # Utility functions
│   │   ├── cn.ts                 # Class name utility
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   ├── performance.ts
│   │   └── index.ts
│   ├── contexts/                 # React contexts
│   │   ├── ThemeContext.ts
│   │   ├── ScrollContext.ts
│   │   └── index.ts
│   └── config/                   # Configuration files
│       ├── site.ts
│       ├── env.ts
│       └── index.ts
├── styles/
│   ├── components/               # Component-specific styles
│   │   ├── button.css
│   │   ├── card.css
│   │   └── navigation.css
│   ├── themes/                   # Theme definitions
│   │   ├── dark.css
│   │   ├── light.css
│   │   └── corporate.css
│   ├── base/                     # Base styles
│   │   ├── reset.css
│   │   ├── typography.css
│   │   └── animations.css
│   └── utilities/                # Utility classes
│       ├── spacing.css
│       ├── colors.css
│       └── effects.css
├── data/                         # Static data
│   ├── projects.json
│   ├── skills.json
│   ├── blog-posts.json
│   └── navigation.json
└── __tests__/                    # Test files
    ├── components/
    ├── hooks/
    ├── utils/
    └── setup.ts
```

## 🎯 Benefits of This Structure

### 1. **Feature-Based Organization**

- Groups related components by business domain
- Makes code discovery intuitive
- Supports team scaling

### 2. **Proper Separation of Concerns**

- UI components are pure and reusable
- Business logic isolated in features
- Utilities and configurations centralized

### 3. **Scalability**

- Easy to add new features
- Clear boundaries between modules
- Supports micro-frontend patterns

### 4. **Developer Experience**

- Consistent import patterns
- Barrel exports for cleaner imports
- Co-located tests and stories

### 5. **Maintainability**

- Single responsibility principle
- Clear dependency flow
- Easy to refactor and extend
