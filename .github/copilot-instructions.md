
# Owen's 2025 Portfolio – Copilot & AI Agent Instructions

## 🏗️ Project Architecture & Key Patterns
- **Monorepo-style Next.js 15+ app** with `/src/app` for routes and layouts, `/src/components` for UI, 3D, and section components, `/src/lib` for utilities.
- **Design system**: Tailwind CSS tokens in `tailwind.config.js`, global styles in `src/app/globals.css`.
- **3D/Animation**: Three.js/React Three Fiber in `src/components/3d/`, Framer Motion for micro-interactions.
- **Content**: MDX for blog/case studies (see `src/content/` if present), with custom MDX components.
- **Multi-agent workflow**: Four agent roles (Design, Performance, Content, Features) work in parallel on feature branches. See `MULTI_AGENT_WORKFLOW.md` for details.

## 🚦 Critical Developer Workflows
- **Start dev server**: `npm run dev` (see also `setup.sh` for multi-agent setup)
- **Build for production**: `npm run build`
- **Lint & format**: `npm run lint` (autofix: `npm run lint -- --fix`), Prettier via `npx prettier --write ...`
- **Type check**: `npx tsc --noEmit --incremental`
- **Run tests**: `npm test` (if present)
- **Analyze bundle**: `npm run analyze` (requires `@next/bundle-analyzer`)
- **Deploy**: `npx vercel --prod` (auto-deploys from main branch)

## 🧩 Project-Specific Conventions
- **Branch naming**: `{agent-type}/{feature-name}` (e.g., `design/typography-tweaks`)
- **Component structure**: Use TypeScript, props interfaces, and Tailwind classes. Place new UI in `src/components/ui/`, 3D in `src/components/3d/`, sections in `src/components/sections/`.
- **Animation**: Use Framer Motion variants; reference `EnhancedHeroSection` and `Hero3D` for advanced patterns.
- **3D**: Use React Three Fiber; optimize for performance (instancing, suspense, lazy loading). See `DynamicGeometry.tsx`, `Hero3D.tsx`.
- **Content**: Write blog/case studies in MDX with frontmatter. Use SEO meta tags as in `src/app/layout.tsx`.
- **Accessibility**: Use semantic HTML, ARIA labels, and test keyboard navigation. See `NavigationEnhanced.tsx`.
- **Performance**: Progressive loading for 3D, code splitting, image optimization. See `performance.ts` and `next.config.ts`.

## 🔗 Integration & Cross-Component Patterns
- **Theme**: Use `ThemeProvider` and `ThemeToggle` for dark/light mode. Persist user preference.
- **Scroll/Navigation**: Use `ScrollWrapper`, `ScrollProgress`, and experimental navigation in `NavigationEnhanced.tsx`.
- **Contact**: Contact form logic in `src/app/contact/page.tsx` and `Contact.tsx`.
- **External APIs**: Use Next.js API routes for backend logic. Place in `/src/app/api/`.

## 🤖 AI Agent Guidance
- **Specialized prompts**: Use `COPILOT_PROMPTS.md` for task-specific prompts (design, content, features, performance, SEO, mobile, analytics, etc.).
- **Agent roles**: See `MULTI_AGENT_WORKFLOW.md` for agent responsibilities, branch strategy, and communication rules.
- **Best practices**: Add descriptive comments for Copilot, reference existing component patterns, and use context from related files.
- **Documentation**: Reference `README.md`, `PROJECT_SUMMARY.md`, and `DEVELOPMENT_SETUP.md` for architecture and workflow context.

## 📝 Example Prompts for Copilot/Claude
- "Create a 3D hero section with interactive floating geometries using React Three Fiber and Framer Motion."
- "Add a blog post in MDX about advanced CSS animation, with SEO frontmatter and code samples."
- "Refactor NavigationEnhanced to improve accessibility and keyboard navigation."
- "Optimize Hero3D for performance using suspense and lazy loading."

---
For more, see:
- `COPILOT_PROMPTS.md` – curated prompts for all agent roles
- `MULTI_AGENT_WORKFLOW.md` – agent coordination, branch strategy, and success metrics
- `DEVELOPMENT_SETUP.md` – setup, workflow, and Copilot best practices
- `README.md` – project overview and architecture
