import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Owen Richards',
  description:
    'Get in touch with Owen Richards for collaboration opportunities and project inquiries.',
};

export default function Contact() {
  return (
    <div className="min-h-screen px-6 pt-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 font-display text-4xl font-bold">Contact</h1>
        <p className="text-lg text-foreground/70">
          Coming soon... This page will feature a contact form and ways to get
          in touch.
        </p>
      </div>
    </div>
  );
}
