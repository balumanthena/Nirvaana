import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Investment Risk Profile Quiz | Free Financial Assessment",
    description: "Discover your investment risk appetite with our free, instant Risk Profile Quiz. Understand if you are a Conservative, Moderate, or Aggressive investor.",
    keywords: ["Risk Profile Quiz", "Investment Risk Assessment", "Financial Planning Tools", "Risk Appetite Calculator", "Portfolio Management"],
    openGraph: {
        title: "Free Investment Risk Profile Assessment",
        description: "Take this 2-minute quiz to understand your investment style and get personalized recommendations.",
        type: "website",
    }
};

export default function RiskProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
