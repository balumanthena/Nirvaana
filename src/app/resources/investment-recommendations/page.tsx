import { InvestmentRecommendations } from "@/components/calculators/InvestmentRecommendations";

export default function InvestmentRecommendationsPage() {
    return (
        <main className="pt-24 pb-12 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-8">
                    <span className="text-sm font-bold tracking-wider text-primary uppercase mb-2 block">
                        Smart Investing
                    </span>
                    <h1 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                        Investment Recommendations Engine
                    </h1>
                    <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        Discover the right asset mix and mutual fund categories tailored to your goals and risk profile.
                    </p>
                </div>

                <InvestmentRecommendations />
            </div>
        </main>
    );
}
