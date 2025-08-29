import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Owen Richards',
  description: 'Get in touch with Owen Richards for collaboration opportunities and project inquiries.',
};

export default function Contact() {
  return (
    <div className="min-h-screen pt-24 px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-display font-bold mb-8">Contact</h1>
        <p className="text-lg text-foreground/70">
          Coming soon... This page will feature a contact form and ways to get in touch.
        </p>
      </div>
    </div>
  );
}
