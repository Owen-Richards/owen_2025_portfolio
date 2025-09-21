# Development Setup & AI Agent Guidelines

## 🚀 Quick Start

```bash
# Clone and setup
git clone <repo-url>
cd owen_2025_portfolio
npm install

# Start development
npm run dev
```

## 🏗️ Project Architecture

### Directory Structure

```
src/
├── app/                 # Next.js 15 App Router
│   ├── (pages)/        # Route groups
│   ├── api/            # API routes
│   └── globals.css     # Global styles
├── components/         # React components
│   ├── 3d/            # Three.js/R3F components
│   ├── sections/      # Page sections
│   └── ui/            # Reusable UI components
├── lib/               # Utilities & configurations
│   ├── animations/    # Animation configurations
│   ├── hooks/         # Custom React hooks
│   └── utils/         # Helper functions
└── styles/            # Additional stylesheets
```

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5+
- **Styling**: Tailwind CSS 4
- **3D Graphics**: Three.js + React Three Fiber
- **Animations**: Framer Motion + GSAP
- **Build Tool**: Turbopack
- **Package Manager**: npm

## 🤖 AI Development Guidelines

### ChatGPT Codex Best Practices

1. **Context Awareness**
   - Always read existing component patterns before creating new ones
   - Reference `COPILOT_PROMPTS.md` for task-specific prompts
   - Use existing TypeScript interfaces and types

2. **Component Development**
   - Follow the established component structure in `src/components/`
   - Use TypeScript interfaces for all props
   - Implement proper error boundaries for 3D components
   - Use Tailwind classes with the project's design system

3. **3D Development**
   - All 3D components should use React Three Fiber
   - Implement Suspense boundaries for loading states
   - Use `useFrame` for animations, `useThree` for scene access
   - Optimize with instancing and LOD when possible

4. **Performance Considerations**
   - Code split heavy components with `dynamic` imports
   - Use `memo` for expensive re-renders
   - Implement progressive loading for 3D assets
   - Monitor bundle size with `npm run analyze`

### Code Style & Standards

```typescript
// ✅ Good: Clear interface, proper exports
interface HeroSectionProps {
  title: string;
  subtitle?: string;
  showAnimation?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  showAnimation = true,
}) => {
  // Component logic
};

// ✅ Good: Descriptive variable names
const [isAnimationComplete, setIsAnimationComplete] = useState(false);

// ✅ Good: Proper error handling
try {
  const result = await fetchData();
  setData(result);
} catch (error) {
  console.error('Failed to fetch data:', error);
  setError(error.message);
}
```

### File Naming Conventions

- **Components**: `PascalCase.tsx` (e.g., `HeroSection.tsx`)
- **Hooks**: `use*.ts` (e.g., `useThemeToggle.ts`)
- **Utilities**: `camelCase.ts` (e.g., `formatDate.ts`)
- **Constants**: `UPPER_SNAKE_CASE.ts` (e.g., `API_ENDPOINTS.ts`)
- **Types**: `*.types.ts` (e.g., `portfolio.types.ts`)

## 🛠️ Development Workflow

### Available Scripts

```bash
# Development
npm run dev          # Start dev server with Turbopack
npm run build        # Production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run type-check   # TypeScript type checking

# Testing & Analysis
npm run test         # Run tests (when implemented)
npm run analyze      # Bundle analysis
```

### Git Workflow

```bash
# Feature development
git checkout -b feature/new-component
# ... make changes
git add .
git commit -m "feat: add interactive 3D hero component"
git push origin feature/new-component
```

### Commit Message Format

```
type(scope): description

Examples:
feat(3d): add particle system to hero section
fix(nav): resolve mobile menu accessibility issue
docs(readme): update setup instructions
style(ui): improve button hover animations
```

## 🎨 Design System Integration

### Tailwind Configuration

- Custom color palette defined in `tailwind.config.js`
- Consistent spacing scale (4px grid)
- Typography system with responsive scales
- Animation utilities for micro-interactions

### Component Patterns

```typescript
// Theme-aware component
const { theme, toggleTheme } = useTheme();

// Animation with Framer Motion
const variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// 3D component structure
const Scene = () => (
  <Canvas>
    <Suspense fallback={<Loader />}>
      <ThreeComponent />
    </Suspense>
  </Canvas>
);
```

## 🧪 Testing Strategy

### Unit Testing

- Jest + React Testing Library
- Test user interactions, not implementation details
- Mock external dependencies and APIs

### Visual Testing

- Storybook for component documentation (planned)
- Visual regression testing with Chromatic (planned)

### Performance Testing

- Lighthouse CI integration
- Bundle size monitoring
- 3D performance profiling

## 📱 Responsive Development

### Breakpoint Strategy

```css
/* Mobile First Approach */
.component {
  @apply text-sm; /* Default: mobile */
  @apply md:text-base; /* Tablet */
  @apply lg:text-lg; /* Desktop */
  @apply xl:text-xl; /* Large desktop */
}
```

### 3D Responsive Patterns

- Progressive quality based on device capabilities
- Touch-friendly controls for mobile
- Reduced particle counts on lower-end devices

## 🔧 Troubleshooting

### Common Issues

**TypeScript Errors**

```bash
# Clear TypeScript cache
rm -rf .next
rm tsconfig.tsbuildinfo
npm run dev
```

**3D Performance Issues**

```typescript
// Check device capabilities
const capabilities = useDetectGPU();
const quality = capabilities.tier >= 2 ? 'high' : 'low';
```

**Build Issues**

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

## 📚 Learning Resources

### Project-Specific Documentation

- `COPILOT_PROMPTS.md` - AI development prompts
- `MULTI_AGENT_WORKFLOW.md` - Team collaboration guidelines
- `PROJECT_SUMMARY.md` - High-level project overview

### External Resources

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [Framer Motion](https://www.framer.com/motion/)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🚀 Deployment

### Vercel Deployment

```bash
# Manual deployment
npm run build
npx vercel --prod

# Auto-deployment from main branch configured
```

### Environment Variables

- Copy `.env.example` to `.env.local`
- Set up required API keys and configuration
- Never commit sensitive data to repository

---

## 💡 AI Agent Prompt Examples

### Component Creation

```
Create a 3D interactive portfolio showcase component using React Three Fiber.
The component should:
- Display project thumbnails in a 3D grid
- Animate on scroll using Framer Motion
- Support keyboard navigation for accessibility
- Use the existing theme system for colors
- Follow the project's TypeScript patterns
```

### Performance Optimization

```
Optimize the Hero3D component for better performance:
- Implement progressive loading
- Add level-of-detail (LOD) for distant objects
- Use instancing for repeated geometries
- Add proper cleanup in useEffect
```

### Bug Fixing

```
Fix the navigation menu accessibility issues:
- Add proper ARIA labels
- Implement keyboard navigation
- Ensure focus management
- Test with screen readers
- Follow WCAG 2.1 guidelines
```

This documentation serves as a comprehensive guide for both human developers and AI agents working
on the project.
