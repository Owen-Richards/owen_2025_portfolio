import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import NavigationEnhanced from '@/components/ui/NavigationEnhanced';
import ScrollProgress from '@/components/ui/ScrollProgress';
import ScrollWrapper from '@/components/ui/ScrollWrapper';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: 'Owen Richards - Senior Full-Stack Developer & Technical Lead',
  description:
    'Experienced full-stack developer and technical leader specializing in modern web technologies, scalable architecture, and team leadership. Available for senior engineering roles.',
  keywords: [
    'senior developer',
    'full-stack developer',
    'technical lead',
    'web development',
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'AWS',
    'portfolio',
  ],
  authors: [{ name: 'Owen Richards' }],
  creator: 'Owen Richards',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://owen.dev',
    title: 'Owen Richards - Senior Full-Stack Developer & Technical Lead',
    description:
      'Experienced full-stack developer and technical leader with proven expertise in modern web technologies and scalable solutions.',
    siteName: 'Owen Richards - Professional Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Owen Richards - Senior Full-Stack Developer',
    description:
      'Experienced full-stack developer and technical leader available for senior engineering roles.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} bg-background font-sans text-foreground antialiased`}
      >
        <ThemeProvider>
          <ScrollWrapper>
            <NavigationEnhanced />
            <ScrollProgress />
            <main className="relative min-h-screen" style={{ zIndex: 10 }}>
              {children}
            </main>
          </ScrollWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
