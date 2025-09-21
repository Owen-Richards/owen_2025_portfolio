import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Owen Richards',
  description:
    'Read my thoughts on web development, design trends, and digital innovation.',
};

export default function Blog() {
  return (
    <div className="min-h-screen px-6 pt-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-display text-4xl font-bold">Blog</h1>
        <p className="text-lg text-foreground/70">
          Coming soon... This page will feature my latest articles and insights.
        </p>
      </div>
    </div>
  );
}
