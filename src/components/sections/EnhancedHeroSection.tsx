'use client';

import { createLiquidTimeline, createMagneticReveal, createScrollVelocityEffect, scrollManager } from '@/lib/scroll/scroll';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Calendar, CircleCheck, Code, Download, Globe, Rocket, Sparkles, Zap } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import { useThemeStyles } from '../ui/useThemeStyles';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { y: 42, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 120,
      damping: 22,
      mass: 1,
    },
  },
};

const chipVariants = {
  hidden: { y: 18, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 140,
      damping: 18,
    },
  },
};

const heroBadges = [
  { icon: CircleCheck, label: 'Open to Staff & Principal engineering roles' },
  { icon: Calendar, label: 'Freelance engagements from Feb 2025' },
];

const heroStats = [
  { value: '$4.8M', label: 'revenue influenced', description: 'AI commerce + fintech launches delivered in the last 12 months.' },
  { value: '8 teams', label: 'led to ship', description: 'Remote squads scaled across US & EU timezones.' },
  { value: '92 NPS', label: 'stakeholder score', description: 'Average partner satisfaction across enterprise engagements.' },
];

const heroSignals = [
  { icon: Zap, title: 'AI-driven product acceleration', description: 'Zero-to-one prototypes, scalable ML platforms, and measurable revenue lifts.' },
  { icon: Code, title: 'Experiential web craftsmanship', description: 'Award-ready WebGL, editorial polish, and rock-solid TypeScript foundations.' },
  { icon: Globe, title: 'Technical leadership worldwide', description: 'Mentored distributed teams, set rituals, and shipped predictably at scale.' },
];

const heroSpotlights = [
  {
    tag: 'Latest win',
    title: 'Cortex Analytics Platform',
    description: 'Bootstrapped an AI insights platform for a Fortune 100 retailer in 10 weeks.',
    metric: '40% faster decisions',
    icon: Sparkles,
  },
  {
    tag: 'Immersive experience',
    title: 'AR Commerce Flagship',
    description: 'Directed 3D product storytelling that drove 3.2x conversion on launch day.',
    metric: '3.2x conversion lift',
    icon: Rocket,
  },
  {
    tag: 'Team impact',
    title: 'Scale-up CTO Partner',
    description: 'Scaled engineering from 3 â†’ 18 while sustaining 99.9% uptime for payments.',
    metric: '99.9% uptime',
    icon: CircleCheck,
  },
];

const trustedBy = ['Adobe', 'Lululemon', 'WPP', 'Genentech'];

export default function EnhancedHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { styles, cn } = useThemeStyles();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.9,
  });

  const y = useTransform(smoothProgress, [0, 1], [0, -96]);
  const opacity = useTransform(smoothProgress, [0, 0.85], [1, 0]);

  useEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const cta = ctaRef.current;

    if (!container || !title || !subtitle || !cta || prefersReducedMotion) {
      return;
    }

    const titleTimeline = createLiquidTimeline(title);
    const subtitleTimeline = createMagneticReveal(subtitle);
    const sectionTrigger = scrollManager.createSectionTimeline(container, titleTimeline, {
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: false,
    });

    const magneticCleanups = Array.from(cta.querySelectorAll<HTMLElement>('button, a')).map((target) =>
      scrollManager.addMagneticElement(target, 0.16),
    );

    const cleanupVelocity = createScrollVelocityEffect(title);

    return () => {
      cleanupVelocity();
      magneticCleanups.forEach((cleanup) => cleanup());
      sectionTrigger?.kill();
      titleTimeline.kill();
      subtitleTimeline.kill();
    };
  }, [prefersReducedMotion]);

  const spotlightCards = useMemo(() => heroSpotlights.slice(0, 3), []);

  return (
    <section id="home" ref={containerRef} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 right-[8%] h-72 w-72 rounded-full bg-primary/25 blur-3xl" aria-hidden />
        <div className="absolute bottom-[-30%] left-1/3 h-96 w-96 rounded-full bg-secondary/15 blur-[180px]" aria-hidden />
        <div className="absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-accent/20 blur-2xl" aria-hidden />
      </div>

      <motion.div
        style={{ y }}
        className={cn(
          styles.layout.container,
          'relative z-10 flex flex-col justify-center gap-8 py-12 lg:py-16 xl:py-20 min-h-[min(700px,100vh-72px)]'
        )}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-start"
        >
          <div className="flex flex-col gap-6">
            <motion.div variants={itemVariants} className="flex flex-col gap-6">
              <div className="flex flex-wrap gap-3 text-sm text-foreground/85">
                {heroBadges.map((badge) => {
                  const Icon = badge.icon;
                  return (
                    <span
                      key={badge.label}
                      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/80 px-4 py-2 backdrop-blur"
                    >
                      <Icon className="h-4 w-4 text-primary" />
                      {badge.label}
                    </span>
                  );
                })}
              </div>

              <div className="space-y-4">
                                <h1 ref={titleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-[0.92] max-w-3xl text-foreground">
                  Owen Richards crafts
                  <span className="block bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                    award-level digital products that turn ambition into results.
                  </span>
                </h1>
              </div>
            </motion.div>

            <motion.p
              ref={subtitleRef}
              variants={itemVariants}
              className="max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Principal full-stack engineer and technical lead specialised in immersive web, AI-assisted platforms, and
              high-performing product teams. I partner with founders, design leaders, and enterprise innovators to launch
              experiences that recruit customers, talent, and belief.
            </motion.p>

            <motion.div variants={itemVariants} className="grid gap-3 sm:gap-4 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={chipVariants}
                  className="rounded-2xl border border-border/50 bg-background/80 p-4 sm:p-5 backdrop-blur transition duration-300 hover:border-primary/40"
                >
                  <div className="text-xl sm:text-2xl font-semibold text-foreground md:text-3xl">{stat.value}</div>
                  <div className="mt-1 text-xs font-semibold uppercase tracking-[0.28em] text-slate-600 dark:text-slate-400">
                    {stat.label}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="grid gap-3 sm:gap-4 sm:grid-cols-2">
              {heroSignals.map((signal) => {
                const Icon = signal.icon;
                return (
                  <motion.div
                    key={signal.title}
                    variants={chipVariants}
                    className="rounded-2xl border border-border/40 bg-card/85 p-4 sm:p-5 shadow-[var(--shadow-soft)] backdrop-blur transition duration-300 hover:border-primary/40 hover:shadow-[var(--shadow-medium)]"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="text-base font-semibold text-foreground">{signal.title}</span>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {signal.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div ref={ctaRef} variants={itemVariants} className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-3 sm:gap-4">
              <motion.button
                onClick={() => scrollManager.scrollTo('#projects')}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto inline-flex items-center gap-2 rounded-xl bg-primary px-6 sm:px-7 py-3 font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition duration-300 hover:shadow-[var(--shadow-medium)] text-center justify-center"
              >
                View signature projects
              </motion.button>

              <motion.a
                href="/Owen-L-Richards-Resume-2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="w-full sm:w-auto inline-flex items-center gap-2 rounded-xl border border-border/70 bg-background/85 px-6 sm:px-7 py-3 font-semibold text-foreground transition duration-300 hover:border-primary/50 text-center justify-center"
              >
                <Download className="h-4 w-4" />
                Download resume
              </motion.a>

              <motion.a
                href="mailto:owen@example.com?subject=Let%27s%20build%20something%20remarkable"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2 rounded-xl border border-transparent bg-card/85 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 transition duration-300 hover:border-slate-300 dark:hover:border-slate-600"
              >
                Book intro call
                <ArrowUpRight className="h-4 w-4" />
              </motion.a>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground">
                Trusted by teams at
              </span>
              <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm uppercase tracking-[0.18em] text-foreground/60">
                {trustedBy.map((brand) => (
                  <span key={brand}>{brand}</span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="relative flex flex-col gap-4 sm:gap-6">
            <div className="pointer-events-none absolute -top-16 right-8 h-36 w-36 rounded-full bg-primary/15 blur-2xl" aria-hidden />
            <div className="pointer-events-none absolute bottom-[-12%] left-2 h-48 w-48 rounded-full bg-secondary/20 blur-3xl" aria-hidden />

            {spotlightCards.map((spotlight) => {
              const Icon = spotlight.icon;
              return (
                <motion.article
                  key={spotlight.title}
                  variants={chipVariants}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="group relative overflow-hidden rounded-3xl border border-border/50 bg-card/90 p-5 sm:p-6 shadow-[var(--shadow-soft)] backdrop-blur transition duration-300 hover:border-primary/50 hover:shadow-[var(--shadow-medium)]"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100"
                    style={{ background: 'linear-gradient(135deg, rgba(59,130,246,0.18) 0%, rgba(14,116,144,0.12) 100%)' }}
                  />
                  <div className="relative flex items-start justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-600 dark:text-slate-400">
                        {spotlight.tag}
                      </span>
                      <h3 className="mt-2 text-xl sm:text-2xl font-semibold text-foreground">{spotlight.title}</h3>
                    </div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
                    {spotlight.description}
                  </p>
                  <div className="relative mt-6 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{spotlight.metric}</span>
                    <span className="flex items-center gap-1">
                      Case study
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="mt-12 flex justify-center">
          <motion.button
            className="flex items-center gap-3 rounded-full border border-border/60 bg-background/80 px-6 py-4 text-xs font-semibold uppercase tracking-[0.32em] text-muted-foreground backdrop-blur"
            whileHover={{ scale: 1.03 }}
            onClick={() => scrollManager.scrollTo('#skills')}
          >
            Explore the portfolio
            <ArrowUpRight className="h-4 w-4" />
          </motion.button>
        </motion.div>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-0 left-0 h-28 w-full bg-gradient-to-t from-background via-background/85 to-transparent"
        style={{ opacity }}
      />
    </section>
  );
}
