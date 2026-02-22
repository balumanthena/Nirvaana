import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CONFIG } from "@/content/config";

export default function WhyUsPage() {
    return (
        <main className="pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                        Why Choose {CONFIG.BRAND_NAME}?
                    </h1>
                    <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
                        We are a team of Investment Advisors dedicated to providing
                        unbiased, data-driven, and  financial advice.
                    </p>

                    <div className="prose prose-lg prose-slate max-w-none">
                        <section className="mb-16">
                            <h2 className="text-3xl font-serif font-bold text-foreground mb-6">Our Mission</h2>
                            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                                To democratize high-quality financial advice. We believe that everyone deserves
                                a financial plan. Our mission is to
                                help 10,000 families achieve true financial freedom by 2030.
                            </p>
                        </section>



                        <div className="my-20">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-foreground mb-12">
                                WHY HAVE A FINANCIAL PLAN?
                            </h2>
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
                                    <img
                                        src="/images/confusion-to-clarity.png"
                                        alt="Confusion to Clarity: Your Personal Finance Journey"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
                                    <img
                                        src="/images/organize-finances.png"
                                        alt="Organize Your Finances for a Clear Path to Your Goals"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-16 text-center">
                        <Button size="lg" asChild>
                            <Link href="/schedule">Schedule a Chat with Us</Link>
                        </Button>
                    </div>

                </div>
            </div>
        </main>
    );
}
