import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfolio - Owen Richards',
  description: 'Explore my portfolio of creative web development projects and digital experiences.',
};

export default function Portfolio() {
  return (
    <div className="min-h-screen pt-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-display font-bold mb-8">Portfolio</h1>
        <p className="text-lg text-foreground/70">
          Coming soon... This page will showcase my best work and case studies.
        </p>
      </div>
    </div>
  );
}
