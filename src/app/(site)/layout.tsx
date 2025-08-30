'use client';

import { Inter, Playfair_Display } from 'next/font/google';
import '../globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <title>Owen Richards - Creative Developer</title>
        <meta name="description" content="Award-winning creative developer specializing in interactive 3D experiences, WebGL, and innovative web technologies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0a0a0f" />
        
        {/* Preload critical assets */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* SEO Meta Tags */}
        <meta property="og:title" content="Owen Richards - Creative Developer" />
        <meta property="og:description" content="Award-winning creative developer specializing in interactive 3D experiences, WebGL, and innovative web technologies." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://owenrichards.dev" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@owen_richards" />
        
        {/* Performance optimizations */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Critical CSS inline */}
        <style>{`
          html { 
            scroll-behavior: smooth; 
            overflow-x: hidden;
          }
          body { 
            margin: 0; 
            padding: 0; 
            background: #0a0a0f;
            color: white;
            font-family: var(--font-inter), sans-serif;
            overflow-x: hidden;
          }
          .font-display { 
            font-family: var(--font-playfair), serif; 
          }
          /* Skip link for accessibility */
          .skip-link {
            position: absolute;
            top: -40px;
            left: 6px;
            background: #000;
            color: white;
            padding: 8px;
            text-decoration: none;
            z-index: 100;
          }
          .skip-link:focus {
            top: 6px;
          }
        `}</style>
      </head>
      <body>
        {/* Skip link for accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        
        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  );
}
