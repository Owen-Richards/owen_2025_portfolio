import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Owen Richards',
  description: 'Read my thoughts on web development, design trends, and digital innovation.',
};

export default function Blog() {
  return (
    <div className="min-h-screen pt-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display font-bold mb-8">Blog</h1>
        <p className="text-lg text-foreground/70">
          Coming soon... This page will feature my latest articles and insights.
        </p>
      </div>
    </div>
  );
}
