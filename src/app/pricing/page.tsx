import { PricingCards } from "@/components/shared/PricingCards";
import { FAQAccordion } from "@/components/shared/FAQAccordion";

export default function PricingPage() {
    return (
        <main className="pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                        Transparent, Flat-Fee Pricing
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed mb-4">
                        We believe in complete transparency. Our fees are disclosed upfront and are based on the complexity of your financial life, not your net worth.
                    </p>
                    <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                        No Commissions • No Hidden Charges • No Surprises
                    </p>
                </div>

                <PricingCards />

                <div className="mt-24">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Pricing FAQs</h2>
                    </div>
                    <FAQAccordion />
                </div>
            </div>
        </main>
    );
}
