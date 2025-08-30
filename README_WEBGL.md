# 🌟 Cinematic WebGL Portfolio

A cutting-edge portfolio website featuring immersive Three.js scenes with storytelling scroll transitions. Built with Next.js 15, TypeScript, and modern WebGL technologies.

## ✨ Features

### 🎨 Visual Excellence
- **Cinematic WebGL Experiences**: Custom Three.js scenes with particle systems, shader effects, and geometric animations
- **2025 Design Trends**: Multi-tonal color palettes, bold typography, and anti-design elements
- **Responsive Excellence**: Optimized for desktop, tablet, and mobile devices
- **Performance First**: 60fps on desktop, 40+ fps on mobile with adaptive quality

### 🚀 Technical Highlights
- **Next.js 15** with App Router and TypeScript
- **Three.js + React Three Fiber** for WebGL rendering
- **GSAP + ScrollTrigger** for scroll-driven animations
- **Lenis** for buttery smooth scrolling
- **Custom GLSL Shaders** for particle effects and morphing geometries
- **Advanced Performance Optimization** with adaptive DPR and lazy loading

### 📱 Accessibility & Performance
- **WCAG AA Compliant** with proper focus management and keyboard navigation
- **Prefers-reduced-motion** support with graceful fallbacks
- **Core Web Vitals Optimized** (LCP ≤2.5s, Performance ≥90)
- **SEO Ready** with proper meta tags and structured data
- **Progressive Enhancement** with SSR fallbacks

## 🏗️ Architecture

### 📁 Project Structure
```
src/
├── app/
│   ├── (site)/
│   │   ├── layout.tsx     # Site-specific layout with fonts and meta
│   │   └── page.tsx       # Main page with all sections
│   └── globals.css        # Global styles and design system
├── components/
│   ├── canvas/
│   │   ├── CanvasExperience.tsx  # Main WebGL canvas wrapper
│   │   └── scenes/               # Individual Three.js scenes
│   │       ├── HeroScene.tsx     # Particle field with volumetric lighting
│   │       ├── CraftScene.tsx    # Orbiting geometric shapes
│   │       ├── ProcessScene.tsx  # Morphing ribbon with shaders
│   │       ├── ImpactScene.tsx   # Constellation connections
│   │       └── ContactScene.tsx  # Calming particle settlement
│   ├── sections/
│   │   ├── Hero.tsx       # "Signal" - Main hero section
│   │   ├── Craft.tsx      # "Geometry in Motion" - Project showcase
│   │   ├── Process.tsx    # "From Chaos to Clarity" - Process steps
│   │   ├── Impact.tsx     # "Constellations of Work" - Portfolio grid
│   │   └── Contact.tsx    # "Landing" - Contact form and CTA
│   └── fallback/
│       └── FallbackHero.tsx  # Non-WebGL fallback component
├── lib/
│   ├── scroll/
│   │   └── scroll.ts      # GSAP + Lenis scroll management
│   └── three/
│       └── loaders.ts     # Three.js utilities and loaders
└── shaders/
    ├── particle.vert     # Particle vertex shader
    ├── particle.frag     # Particle fragment shader
    ├── ribbon.vert       # Ribbon morphing vertex shader
    └── ribbon.frag       # Ribbon color fragment shader
```

### 🎭 Scene Narrative
Each section tells part of a cohesive story through WebGL:

1. **Hero - "Signal"**: Dark space with volumetric lighting and reactive particles
2. **Craft - "Geometry in Motion"**: Orbiting icosahedra with color-depth grading
3. **Process - "From Chaos to Clarity"**: Morphing ribbon untangles through scroll
4. **Impact - "Constellations of Work"**: Connected particles form project network
5. **Contact - "Landing"**: Scene calms with warm colors and settling particles

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager
- Modern browser with WebGL support

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/portfolio-webgl.git
   cd portfolio-webgl
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload

# Production
npm run build        # Build optimized production bundle
npm run start        # Start production server
npm run export       # Export static site

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix auto-fixable ESLint issues
npm run type-check   # Run TypeScript type checking

# Deployment
npm run deploy       # Deploy to Vercel
```

## 🎛️ Configuration & Customization

### 🎨 Visual Customization

#### Colors & Themes
Edit `src/app/globals.css` to modify the color palette:
```css
:root {
  --primary-400: #38bdf8;  /* Main accent color */
  --secondary-400: #f472b6; /* Secondary accent */
  /* Modify other color variables... */
}
```

#### Content & Copy
Edit section content in `src/components/sections/`:
- Modify headlines, descriptions, and CTAs
- Update project data and technology stacks
- Customize form fields and social links

#### WebGL Scenes
Customize Three.js scenes in `src/components/canvas/scenes/`:
- Adjust particle counts for performance
- Modify shader uniforms for different effects
- Change geometry types and materials

### ⚡ Performance Tuning

#### Particle Count Optimization
```typescript
// In HeroScene.tsx
const particleCount = 2000; // Reduce for mobile: 500-1000

// In ImpactScene.tsx  
const particleCount = 500;  // Reduce for mobile: 100-200
```

#### Device Pixel Ratio Clamping
```typescript
// In CanvasExperience.tsx
const isMobile = window.innerWidth < 768;
if (isMobile) {
  gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
}
```

#### Lazy Loading Scenes
Scenes are automatically lazy-loaded based on scroll position. Adjust thresholds in `CanvasExperience.tsx`.

### 🎮 Scroll Animation Customization

#### Adding New Sections
1. Create new scene component in `src/components/canvas/scenes/`
2. Create corresponding section component in `src/components/sections/`
3. Register in `CanvasExperience.tsx` and main page component
4. Add scroll trigger in scroll manager

#### Modifying Timelines
```typescript
// In any section component
const tl = gsap.timeline();
tl.fromTo(element, 
  { opacity: 0, y: 50 },      // From state
  { opacity: 1, y: 0, duration: 1 }  // To state
);

scrollManager.createSectionTimeline(sectionRef.current, tl, {
  start: 'top 80%',     // When animation starts
  end: 'bottom 20%',    // When animation ends
  scrub: true,          // Scrub with scroll
  pin: false            // Pin section during animation
});
```

### 🎨 Shader Customization

#### Particle Effects
Edit `src/shaders/particle.frag` for different particle appearances:
```glsl
// Change particle color
vec3 finalColor = vColor + glow;  // Current
vec3 finalColor = mix(vColor, vec3(1.0), glow);  // White glow

// Modify falloff
float alpha = 1.0 - smoothstep(0.0, 0.5, dist);  // Current
float alpha = 1.0 - smoothstep(0.1, 0.4, dist);  // Sharper edges
```

#### Ribbon Morphing
Edit `src/shaders/ribbon.vert` for different morphing behaviors:
```glsl
// Current chaos to clarity
float ribbonCurve = sin(pos.x * 2.0 + uTime) * (1.0 - uProgress) * 0.5;

// Alternative: spiral effect
float ribbonCurve = sin(pos.x + uTime) * cos(pos.z + uTime) * (1.0 - uProgress);
```

## 🌐 Deployment

### Vercel (Recommended)
```bash
npm run deploy
# or manually:
vercel --prod
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### Custom Server
```bash
npm run build
npm run start
```

## 🔧 Troubleshooting

### Common Issues

#### WebGL Not Loading
- Check browser WebGL support: `chrome://gpu/`
- Verify no extensions blocking WebGL
- Check console for Three.js errors

#### Poor Performance
```typescript
// Reduce particle counts
const particleCount = 500; // Instead of 2000

// Lower pixel ratio
gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.0));

// Disable shadows
gl.shadowMap.enabled = false;
```

#### Scroll Jank
```typescript
// Disable scroll scrubbing on mobile
const isMobile = window.innerWidth < 768;
scrollManager.createSectionTimeline(section, timeline, {
  scrub: isMobile ? false : true
});
```

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

### Performance Monitoring

#### Check Frame Rate
```typescript
// Add to any scene component
useFrame(() => {
  console.log('FPS:', 1 / clock.getDelta());
});
```

#### Memory Usage
```typescript
// Monitor Three.js memory
console.log(renderer.info.memory);
```

## 📈 Performance Benchmarks

### Target Metrics
- **Desktop**: 60fps, LCP <2s, Performance Score >90
- **Mobile**: 40+fps, LCP <2.5s, Performance Score >85
- **Accessibility**: Score >95
- **SEO**: Score >90

### Optimization Checklist
- [ ] Particle counts optimized for target devices
- [ ] Pixel ratio clamped on mobile (≤1.5)
- [ ] Textures compressed and sized appropriately  
- [ ] Unused geometries and materials disposed
- [ ] Scene switching efficient with proper cleanup
- [ ] Reduced motion preferences respected
- [ ] Proper semantic HTML structure
- [ ] Alt text and ARIA labels present

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Three.js** - 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **GSAP** - Animation library
- **Lenis** - Smooth scrolling library
- **Next.js** - React framework
- **Vercel** - Hosting platform

## 📞 Support

For questions or support:
- 📧 Email: owen@owenrichards.dev
- 🐦 Twitter: [@owen_richards](https://twitter.com/owen_richards)
- 💼 LinkedIn: [Owen Richards](https://linkedin.com/in/owen-richards)

---

**Built with ❤️ by Owen Richards**
