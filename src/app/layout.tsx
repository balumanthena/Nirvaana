import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { ComplianceFooter } from "@/components/shared/ComplianceFooter";
import { JsonLd } from "@/components/shared/JsonLd";
import { CONFIG } from "@/content/config";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  title: {
    default: `${CONFIG.BRAND_NAME} | Investment Advisor`,
    template: `%s | ${CONFIG.BRAND_NAME}`,
  },
  description: CONFIG.TAGLINE,
  metadataBase: new URL(CONFIG.SITE_URL),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: CONFIG.BRAND_NAME,
    description: CONFIG.TAGLINE,
    url: CONFIG.SITE_URL,
    siteName: CONFIG.BRAND_NAME,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/logologo.png', // Fallback or main OG image
        width: 800,
        height: 600,
        alt: CONFIG.BRAND_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: CONFIG.BRAND_NAME,
    description: CONFIG.TAGLINE,
    images: ['/images/logologo.png'],
  },
  keywords: ["Investment Advisor", "Retirement Planning", "Wealth Management", "Financial Planning", "Karimnagar", "Bangalore", "Mutual Funds", "Goal Based Investing"],
  authors: [{ name: CONFIG.BRAND_NAME }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-slate-50 text-slate-900 overflow-x-hidden`}>
        <JsonLd />
        <Navbar />
        {children}
        <ComplianceFooter />
      </body>
    </html>
  );
}
