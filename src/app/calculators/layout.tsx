import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Financial Calculators | SIP & Retirement Planning",
    description: "Use free SIP and retirement calculators to estimate wealth growth, retirement corpus, and long-term financial goals in India.",
    keywords: ["SIP Calculator", "Retirement Planner", "Financial Calculators India", "Mutual Fund SIP", "Retirement Corpus Estimator"],
    openGraph: {
        title: "Free Financial Calculators | SIP & Retirement",
        description: "Plan your financial future with our free, accurate SIP and Retirement calculators.",
        type: "website",
    }
};

export default function CalculatorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
