'use client';

import CanvasExperience from '@/components/canvas/CanvasExperience';
import { Suspense, lazy } from 'react';

// Lazy load sections for better performance
const Hero = lazy(() => import('@/components/sections/Hero'));
const Craft = lazy(() => import('@/components/sections/Craft'));
const Process = lazy(() => import('@/components/sections/Process'));
const Impact = lazy(() => import('@/components/sections/Impact'));
const Contact = lazy(() => import('@/components/sections/Contact'));

// Content data for SSR
const siteContent = {
  hero: {
    title: "Signal in the noise",
    subtitle: "Where cutting-edge technology meets award-winning design. Creating digital experiences that transcend the ordinary.",
    cta: {
      primary: "Explore My Work",
      secondary: "Get In Touch"
    }
  },
  craft: {
    title: "Geometry in Motion",
    subtitle: "Where form meets function in perfect harmony"
  },
  process: {
    title: "From Chaos to Clarity",
    steps: ["Chaos", "Exploration", "Clarity"]
  },
  impact: {
    title: "Constellations of Work",
    subtitle: "Projects that push boundaries and create impact"
  },
  contact: {
    title: "Landing",
    subtitle: "Ready to create something extraordinary together?"
  }
};

export default function SitePage() {
  return (
    <>
      {/* WebGL Canvas Background */}
      <Suspense fallback={
        <div className="fixed inset-0 bg-slate-900 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">{siteContent.hero.title}</h1>
            <p className="text-lg text-gray-300">Loading experience...</p>
          </div>
        </div>
      }>
        <CanvasExperience />
      </Suspense>

      {/* Content Sections */}
      <div className="relative z-10">
        <Suspense fallback={
          <section className="min-h-screen flex items-center justify-center text-white">
            <div className="text-center">
              <h1 className="text-6xl font-bold mb-4">{siteContent.hero.title}</h1>
              <p className="text-xl text-gray-300">{siteContent.hero.subtitle}</p>
            </div>
          </section>
        }>
          <Hero />
        </Suspense>

        <Suspense fallback={
          <section className="min-h-screen flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-4xl font-bold">{siteContent.craft.title}</h2>
            </div>
          </section>
        }>
          <Craft />
        </Suspense>

        <Suspense fallback={
          <section className="min-h-screen flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-4xl font-bold">{siteContent.process.title}</h2>
            </div>
          </section>
        }>
          <Process />
        </Suspense>

        <Suspense fallback={
          <section className="min-h-screen flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-4xl font-bold">{siteContent.impact.title}</h2>
            </div>
          </section>
        }>
          <Impact />
        </Suspense>

        <Suspense fallback={
          <section className="min-h-screen flex items-center justify-center text-white">
            <div className="text-center">
              <h2 className="text-4xl font-bold">{siteContent.contact.title}</h2>
            </div>
          </section>
        }>
          <Contact />
        </Suspense>
      </div>
    </>
  );
}
