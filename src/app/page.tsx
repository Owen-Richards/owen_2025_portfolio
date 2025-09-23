import LazyHero3D from '@/components/3d/LazyHero3D';
import AboutEnhanced from '@/components/sections/AboutEnhanced';
import BlogPreview from '@/components/sections/BlogPreview';
import ContactCTA from '@/components/sections/ContactCTA';
import EnhancedHeroSection from '@/components/sections/EnhancedHeroSection';
import ExecutiveSummary from '@/components/sections/ExecutiveSummary';
import HighlightsSection from '@/components/sections/HighlightsSection';
import ProjectsEnhanced from '@/components/sections/ProjectsEnhanced';
import SkillsMatrix from '@/components/sections/SkillsMatrix';
import TechnicalSkills from '@/components/sections/TechnicalSkills';
import {
  heroBadges,
  heroSignals,
  heroSpotlights,
  heroStats,
  trustedBy,
} from '@/content/hero';
import { highlights } from '@/content/highlights';
import { projects } from '@/content/projects';
import { skills } from '@/content/skills';

export default function HomePage() {
  return (
    <>
      {/* Continuous 3D Background throughout the entire page */}
      <LazyHero3D isContinuous={true} />

      <div id="home">
        <EnhancedHeroSection
          heroBadges={heroBadges}
          heroStats={heroStats}
          heroSignals={heroSignals}
          heroSpotlights={heroSpotlights}
          trustedBy={trustedBy}
        />
        <ExecutiveSummary />
        <HighlightsSection highlights={highlights} />
      </div>
      <div id="skills">
        <SkillsMatrix skills={skills} />
        <TechnicalSkills />
      </div>
      <div id="about">
        <AboutEnhanced />
      </div>
      <div id="projects">
        <ProjectsEnhanced projects={projects} />
        <BlogPreview />
      </div>
      <div id="contact">
        <ContactCTA />
      </div>
    </>
  );
}
