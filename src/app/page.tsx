import Hero3D from '@/components/3d/Hero3D';
import AboutEnhanced from '@/components/sections/AboutEnhanced';
import BlogPreview from '@/components/sections/BlogPreview';
import ContactCTA from '@/components/sections/ContactCTA';
import EnhancedHeroSection from '@/components/sections/EnhancedHeroSection';
import ExecutiveSummary from '@/components/sections/ExecutiveSummary';
import HighlightsSection from '@/components/sections/HighlightsSection';
import ProjectsEnhanced from '@/components/sections/ProjectsEnhanced';
import SkillsMatrix from '@/components/sections/SkillsMatrix';
import TechnicalSkills from '@/components/sections/TechnicalSkills';

export default function HomePage() {
  return (
    <>
      {/* Continuous 3D Background throughout the entire page */}
      <Hero3D isContinuous={true} />

      <div id="home">
        <EnhancedHeroSection />
        <ExecutiveSummary />
        <HighlightsSection />
      </div>
      <div id="skills">
        <SkillsMatrix />
        <TechnicalSkills />
      </div>
      <div id="about">
        <AboutEnhanced />
      </div>
      <div id="projects">
        <ProjectsEnhanced />
        <BlogPreview />
      </div>
      <div id="contact">
        <ContactCTA />
      </div>
    </>
  );
}
