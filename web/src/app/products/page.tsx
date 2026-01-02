import { ProductCards } from "@/components/shared/ProductCards";
import { CTASection } from "@/components/shared/CTASection";

export default function ProductsPage() {
    return (
        <main className="min-h-screen pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6 mb-16">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-bold tracking-wider text-primary uppercase mb-2 block">Our Offerings</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                        Financial Products Tailored for You
                    </h1>
                    <p className="text-lg text-slate-600">
                        We curate the best financial instruments to help you build, protect, and grow your wealth.
                    </p>
                </div>

                <ProductCards />
            </div>

            <CTASection />
        </main>
    );
}
