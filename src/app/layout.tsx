import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { WhatsAppButton } from "@/components/shared/WhatsAppButton";
import { ComplianceFooter } from "@/components/shared/ComplianceFooter";
import { JsonLd } from "@/components/shared/JsonLd";
import { CONFIG } from "@/content/config";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: {
    default: "Nirvana Wealth Planner | Financial Planning Advisor",
    template: `%s | Nirvana Wealth Planner`,
  },
  description: "Nirvana Wealth Planner offers personalized financial planning and investment advice. Secure your future with our expert guidance.",
  metadataBase: new URL(CONFIG.SITE_URL),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.png',
  },
  openGraph: {
    title: `${CONFIG.BRAND_NAME} | Financial Planning & Wealth Management`,
    description: CONFIG.TAGLINE,
    url: CONFIG.SITE_URL,
    siteName: CONFIG.BRAND_NAME,
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/images/logologo.png', // Fallback or main OG image
        width: 1200,
        height: 630,
        alt: CONFIG.BRAND_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${CONFIG.BRAND_NAME} | Financial Advisor`,
    description: CONFIG.TAGLINE,
    images: ['/images/logologo.png'],
  },
  keywords: [
    "Financial Planner Karimnagar",
    "Investment Advisor Bangalore",
    "Retirement Planning India",
    "Wealth Management Services",
    "Insurance Analysis",
    "Mutual Funds Distributor",
    "Goal Based Investing",
    "Tax Planning India",
    "Risk Profiling",
    "Family Office Services"
  ],
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
  verification: {
    google: 'Add_Your_Google_Verification_Code_Here', // Placeholder
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "v14nt8wm51");
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-slate-50 text-slate-900 overflow-x-hidden`}>
        <JsonLd />
        {/* Google Analytics - Placeholder for ID */}
        {/* <Script src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script> */}
        <Navbar />
        {children}
        <WhatsAppButton />
        <ComplianceFooter />
      </body>
    </html>
  );
}
