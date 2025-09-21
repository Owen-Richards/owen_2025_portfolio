# 🤖 ChatGPT Codex Development Prompts

This file contains curated prompts and guidelines for using ChatGPT Codex effectively with this
Owen's 2025 Portfolio project.

## 🎯 Project Context Prompt

```
I'm working on Owen's 2025 Portfolio - a modern Next.js 15 application with the following tech stack:

**Framework & Language:**
- Next.js 15 with App Router
- TypeScript 5+ with strict configuration
- React 19

**Styling & Design:**
- Tailwind CSS 4
- Custom design system with theme support
- Responsive design (mobile-first)

**3D Graphics & Animation:**
- Three.js with React Three Fiber
- Framer Motion for UI animations
- GSAP for complex animations
- Lenis for smooth scrolling

**Development Tools:**
- ESLint with custom rules
- Prettier with Tailwind plugin
- Husky for git hooks
- Jest for testing
- Storybook for component documentation

**Architecture:**
- Component-based architecture in `/src/components/`
- Custom hooks in `/src/lib/hooks/`
- Utility functions in `/src/lib/utils/`
- Type definitions in `/src/lib/types/`

Please follow the established patterns and maintain consistency with the existing codebase.
```

## 🧩 Component Development Prompts

### Creating New Components

```
Create a new React component for [COMPONENT_PURPOSE] with the following requirements:

**Component Specifications:**
- TypeScript with proper interface definitions
- Follow the existing component structure in src/components/
- Use Tailwind CSS for styling with our design system
- Include proper JSDoc comments
- Implement accessibility features (ARIA labels, keyboard navigation)
- Make it responsive across all breakpoints
- Include error boundaries if dealing with complex logic

**Code Style:**
- Use our existing TypeScript interfaces and types
- Follow the naming convention: PascalCase for components
- Export as named export
- Include proper props validation
- Use React.FC type annotation

**Performance:**
- Use React.memo for expensive components
- Implement proper dependency arrays for hooks
- Consider code splitting for heavy components

Please also create a corresponding Storybook story file.
```

### 3D Component Development

```
Create a 3D component using React Three Fiber for [3D_PURPOSE] with these requirements:

**3D Specifications:**
- Use React Three Fiber (@react-three/fiber)
- Implement with Suspense boundaries for loading states
- Use @react-three/drei helpers where appropriate
- Optimize for performance (instancing, LOD, disposal)
- Support both desktop and mobile devices
- Include proper cleanup in useEffect

**Animation:**
- Use useFrame for render-loop animations
- Implement smooth transitions with react-spring/three
- Consider performance impact of animations
- Add controls for enabling/disabling animations

**Integration:**
- Make it theme-aware (light/dark mode)
- Ensure it works with our scroll system (Lenis)
- Include fallback for devices without WebGL support
- Add proper TypeScript types for Three.js objects

**Performance Considerations:**
- Dispose of geometries and materials properly
- Use texture compression where possible
- Implement progressive loading for complex models
- Add performance monitoring hooks
```

## 🎨 Styling & Design Prompts

### Tailwind Implementation

```
Style this component using Tailwind CSS following our design system:

**Design System Guidelines:**
- Use our custom color palette (check tailwind.config.js)
- Follow 4px spacing grid system
- Implement responsive design (mobile-first)
- Use consistent typography scale
- Include hover and focus states
- Support dark mode with theme classes

**Component Styling Pattern:**
- Container classes for layout
- Responsive breakpoints: sm, md, lg, xl, 2xl
- Animation classes for micro-interactions
- Accessibility considerations (focus rings, contrast)

**Performance:**
- Avoid inline styles where possible
- Use Tailwind's utility classes
- Consider using CSS-in-JS for complex dynamic styles
- Optimize for tree-shaking
```

### Animation Implementation

```
Add animations to this component using our animation system:

**Animation Libraries:**
- Framer Motion for UI components
- GSAP for complex timeline animations
- React Spring for physics-based animations (3D)
- CSS animations for simple transitions

**Animation Principles:**
- Follow our animation timing (check /src/lib/animations/)
- Respect user's reduced motion preferences
- Use entrance animations for page sections
- Include loading and error state animations
- Optimize for 60fps performance

**Implementation:**
- Use our existing animation variants
- Consider intersection observer for scroll-triggered animations
- Include proper cleanup and cancellation
- Test on low-end devices
```

## 🔧 Development Workflow Prompts

### Bug Fixing

```
I'm experiencing [ISSUE_DESCRIPTION] in this codebase. Please help me:

**Debugging Approach:**
1. Analyze the error message and stack trace
2. Check component lifecycle and state management
3. Verify TypeScript types and prop passing
4. Review performance implications
5. Test accessibility compliance

**Context Information:**
- Browser: [BROWSER_VERSION]
- Device: [DESKTOP/MOBILE]
- Environment: [DEVELOPMENT/PRODUCTION]
- Specific component: [COMPONENT_PATH]

**Code Review:**
- Check for common React pitfalls
- Verify proper cleanup in useEffect
- Ensure proper key props for lists
- Review dependency arrays
- Check for memory leaks

Please provide a comprehensive solution with explanation.
```

### Performance Optimization

```
Optimize this component/page for better performance:

**Performance Targets:**
- Lighthouse scores: 90+ across all metrics
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3.5s

**Optimization Areas:**
- Bundle size analysis
- Image optimization and lazy loading
- Code splitting and dynamic imports
- 3D performance optimization
- Memory leak prevention
- Efficient re-rendering

**Tools Available:**
- Bundle analyzer (npm run analyze)
- Lighthouse CI
- React DevTools Profiler
- Chrome DevTools Performance tab

Please suggest specific optimizations with before/after metrics.
```

## 🧪 Testing Prompts

### Unit Testing

```
Create comprehensive tests for this component:

**Testing Requirements:**
- Jest with React Testing Library
- Test user interactions, not implementation
- Cover all component states and props
- Mock external dependencies
- Test accessibility features
- Include error boundary testing

**Test Coverage Areas:**
- Component rendering
- User interactions (click, hover, keyboard)
- Props validation
- State changes
- API calls and data fetching
- Error handling

**Testing Pattern:**
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Use proper cleanup
- Mock Three.js components for 3D testing
- Test responsive behavior

Please provide test files with good coverage.
```

### Accessibility Testing

```
Ensure this component meets accessibility standards:

**WCAG 2.1 Compliance:**
- Level AA compliance minimum
- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- Color contrast requirements
- Focus management

**Testing Checklist:**
- Use semantic HTML elements
- Provide alternative text for images
- Ensure proper heading hierarchy
- Test with screen readers
- Verify keyboard-only navigation
- Check color contrast ratios

**Tools:**
- axe-core for automated testing
- WAVE browser extension
- Screen reader testing (NVDA/JAWS)
- Keyboard navigation testing

Please provide accessibility improvements and testing strategies.
```

## 📱 Responsive Design Prompts

### Mobile Optimization

```
Optimize this component for mobile devices:

**Mobile Requirements:**
- Touch-friendly interface (44px minimum touch targets)
- Optimized for thumb navigation
- Reduced 3D complexity for performance
- Gesture support where appropriate
- Progressive enhancement

**Performance Considerations:**
- Lazy load non-critical content
- Optimize images for mobile viewports
- Reduce JavaScript bundle size
- Consider offline functionality
- Minimize network requests

**User Experience:**
- Fast loading times
- Smooth scrolling and animations
- Readable typography on small screens
- Intuitive navigation patterns
- Error handling for poor connections

Please provide mobile-specific optimizations.
```

## 🚀 Deployment & Production Prompts

### Production Optimization

```
Prepare this code for production deployment:

**Build Optimization:**
- Minimize bundle size
- Optimize asset loading
- Configure caching strategies
- Set up error monitoring
- Performance monitoring

**Security Checklist:**
- Sanitize user inputs
- Validate environment variables
- Check for sensitive data exposure
- Implement proper CSP headers
- Audit dependencies for vulnerabilities

**Deployment Requirements:**
- Vercel-specific optimizations
- Environment variable configuration
- Domain and SSL setup
- Analytics integration
- SEO optimization

**Monitoring:**
- Error tracking setup
- Performance monitoring
- User analytics
- Core Web Vitals tracking

Please provide production-ready optimizations.
```

## 💡 Best Practices Summary

### Code Quality

- Always use TypeScript with strict mode
- Follow our ESLint and Prettier configurations
- Write self-documenting code with proper comments
- Use meaningful variable and function names
- Implement proper error handling

### Performance

- Use React.memo and useMemo appropriately
- Implement proper cleanup in useEffect
- Optimize images and assets
- Consider code splitting for large components
- Monitor bundle size impact

### Accessibility

- Use semantic HTML elements
- Provide proper ARIA labels
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast standards

### Testing

- Write tests for critical user paths
- Mock external dependencies
- Test error states and edge cases
- Maintain good test coverage
- Use descriptive test names

---

**Note:** Always refer to the `DEVELOPMENT_SETUP.md` file for detailed architecture and setup
information before starting development tasks.

---

# Legacy Copilot Cleanup Prompts

Use these prompts in Copilot Chat (or inline) to accelerate the cleanup of the portfolio codebase.
Each entry includes the main files to open before asking Copilot so the assistant has all necessary
context.

## Theme & Styling

### 1. Extract Theme Tokens

**Open files**: `src/components/ui/useThemeStyles.ts`, `src/styles/theme/` (new)

Prompt:

```
Refactor `useThemeStyles` to consume static theme tokens from a new `src/styles/theme/tokens.ts` module. Define shared spacing, typography, and button variants there, export a helper `getThemeTokens(themeMode)`, and memoize the hook so we stop rebuilding 100+ strings on every render.
```

### 2. Trim Unused Style Buckets

**Open file**: `src/components/ui/useThemeStyles.ts`

Prompt:

```
Remove unused style groups (nav/form/animation/effects) from `useThemeStyles`, and ensure only the tokens referenced by components remain. Update imports where necessary to use shared Tailwind utility classes instead of the removed tokens.
```

### 3. Simplify Global CSS

**Open files**: `src/app/globals.css`, `tailwind.config.js`

Prompt:

```
Reduce `globals.css` to foundational resets and CSS variables, moving repeated spacing/typography definitions into Tailwind `theme.extend`. Add component classes (glass-card, section-shell, etc.) via `@layer components` rather than ad-hoc selectors.
```

### 4. Clean Tailwind Plugin Loader

**Open file**: `tailwind.config.js`

Prompt:

```
Remove the async `loadPlugins()` pattern and import `@tailwindcss/forms` and `@tailwindcss/typography` directly in the config. Ensure the config still exports synchronously and update any missing plugin registrations.
```

## Architecture & Data

### 5. Modularize Navigation

**Open files**: `src/components/ui/NavigationEnhanced.tsx`

Prompt:

```
Split `NavigationEnhanced` into smaller units: move the navigation item array into `src/constants/navigation.ts`, extract `NavigationButton` and `MobileNavigationItem` to `src/components/navigation/` with their props typed, and introduce a `useActiveSection` hook under `src/hooks/`. Keep the exported top-level component lightweight.
```

### 6. Guard Theme Persistence

**Open files**: `src/components/ui/ThemeProvider.tsx`

Prompt:

```
Wrap all `localStorage` reads/writes in effect hooks that check for `window`. Provide a fallback theme from `matchMedia`, surface an `isReady` flag, and render children only after hydration to eliminate flicker.
```

### 7. Sandboxing Scroll Manager

**Open files**: `src/lib/scroll/scroll.ts`, `src/components/ui/ScrollWrapper.tsx`

Prompt:

```
Refactor `ScrollManager` so GSAP, Lenis, and MutationObserver initialization happens inside an explicit `init()` called from `useEffect`. Ensure `ScrollWrapper` calls `scrollManager.init()` on mount and `destroy()` on unmount to prevent duplicate cursors.
```

### 8. Extract Feature Content

**Open files**: `src/components/sections/ProjectsEnhanced.tsx`,
`src/components/sections/EnhancedHeroSection.tsx`, `src/components/sections/SkillsMatrix.tsx`,
`src/components/sections/HighlightsSection.tsx`

Prompt:

```
Move all static data arrays (projects, hero badges, skills, highlights) into typed modules under `src/content/`. Adjust each section component to import the data and accept it as props to shrink client bundles.
```

### 9. Lazy-load 3D Hero

**Open files**: `src/app/page.tsx`, `src/components/3d/Hero3D.tsx`

Prompt:

```
Convert the Home page to load `Hero3D` with `next/dynamic({ ssr: false })`, render a lightweight placeholder until the component mounts, and gate rendering by IntersectionObserver so the Three.js canvas does not hurt LCP.
```

## Tooling & Quality

### 10. Shared Utility for `cn`

**Open files**: `src/components/ui/useThemeStyles.ts`, `src/utils/cn.ts` (new)

Prompt:

```
Create a reusable `cn` helper in `src/utils/cn.ts` that wraps `clsx` and `tailwind-merge`. Replace local implementations (like the one inside `useThemeStyles`) with this shared import to keep class merging consistent.
```

### 11. Testing Harness Setup

**Open files**: `package.json`, `tsconfig.json`, `src/test/setup.ts` (new)

Prompt:

```
Add Vitest + Testing Library configuration. Create a `src/test/setup.ts` that registers Jest DOM matchers, update `package.json` with `test` and `test:watch` scripts, and ensure React testing environment is ready for hooks and components.
```

### 12. Playwright Smoke Flow

**Open files**: `package.json`, `playwright.config.ts` (new), `tests/e2e/` (new)

Prompt:

```
Introduce Playwright for end-to-end smoke tests that verify navigation, scroll progress, and 3D toggle behaviour. Add scripts to `package.json` and scaffold a `tests/e2e/home.spec.ts` covering the main interactions.
```

### 13. Strengthen TypeScript Config

**Open file**: `tsconfig.json`

Prompt:

```
Disable `allowJs`, remove unused compiler options, and add `noUncheckedIndexedAccess` plus path aliases for new folders: `@/content`, `@/hooks`, `@/config`. Update includes/excludes accordingly.
```

### 14. Centralize SEO Metadata

**Open files**: `src/app/layout.tsx`, `src/app/work/page.tsx`, `src/app/blog/page.tsx`,
`src/app/contact/page.tsx`

Prompt:

```
Create `src/config/seo.ts` exporting canonical metadata objects. Update each route to import from there instead of duplicating the titles/descriptions, and add helper types to ensure keys stay consistent.
```

## Documentation

### 15. Architecture Overview Doc

**Open file**: `PROJECT_SUMMARY.md`

Prompt:

```
Update `PROJECT_SUMMARY.md` with sections for feature modules, shared UI, theming, and motion systems. Reference the new folder structure and testing strategy so future contributors understand the architecture.
```
