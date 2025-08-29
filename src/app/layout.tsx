import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/ui/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Owen Lewis - Creative Developer & Digital Artist",
  description: "Award-winning creative developer specializing in cutting-edge web experiences, interactive design, and digital innovation. Building the future of the web.",
  keywords: ["creative developer", "web development", "interactive design", "digital artist", "portfolio", "Next.js", "React", "TypeScript"],
  authors: [{ name: "Owen Lewis" }],
  creator: "Owen Lewis",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://owen.dev",
    title: "Owen Lewis - Creative Developer & Digital Artist",
    description: "Award-winning creative developer specializing in cutting-edge web experiences and digital innovation.",
    siteName: "Owen Lewis Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Owen Lewis - Creative Developer & Digital Artist",
    description: "Award-winning creative developer specializing in cutting-edge web experiences and digital innovation.",
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
        className={`${inter.variable} ${playfair.variable} ${jetbrains.variable} antialiased`}
      >
        <Navigation />
        <main className="relative">
          {children}
        </main>
      </body>
    </html>
  );
}
