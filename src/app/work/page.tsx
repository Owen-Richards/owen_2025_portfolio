import PortfolioIntegrated from '@/components/sections/PortfolioIntegrated';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Work - Owen Richards',
  description: 'Explore my complete portfolio of creative web development projects, case studies, and digital experiences in an immersive 3D environment.',
};

export default function Work() {
  return (
    <div className="min-h-screen">
      <PortfolioIntegrated />
    </div>
  );
}
