import AboutEnhanced from '@/components/sections/AboutEnhanced';
import BlogPreview from '@/components/sections/BlogPreview';
import ContactCTA from '@/components/sections/ContactCTA';
import HeroSection from '@/components/sections/HeroSection';
import ProjectsEnhanced from '@/components/sections/ProjectsEnhanced';
import TechnicalSkills from '@/components/sections/TechnicalSkills';

export default function HomePage() {
  return (
    <>
      <div id="home">
        <HeroSection />
      </div>
      <TechnicalSkills />
      <AboutEnhanced />
      <ProjectsEnhanced />
      <BlogPreview />
      <div id="contact">
        <ContactCTA />
      </div>
    </>
  );
}
