import AboutPreview from '@/components/sections/AboutPreview';
import BlogPreview from '@/components/sections/BlogPreview';
import ContactCTA from '@/components/sections/ContactCTA';
import FeaturedWork from '@/components/sections/FeaturedWork';
import HeroSection from '@/components/sections/HeroSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedWork />
      <AboutPreview />
      <BlogPreview />
      <ContactCTA />
    </>
  );
}
