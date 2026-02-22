import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CONFIG } from "@/content/config";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                        About {CONFIG.BRAND_NAME}
                    </h1>
                    <p className="text-xl text-muted-foreground mb-16 leading-relaxed max-w-2xl mx-auto">
                        We are a team of SEBI Registered Investment Advisors dedicated to providing
                        unbiased, data-driven.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 text-left">
                        <Link href="/about/why-us" className="group block h-full">
                            <div className="bg-card border border-border/50 p-8 rounded-2xl h-full shadow-sm hover:shadow-md transition-all hover:border-primary/20">
                                <h2 className="text-2xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors">Why Choose Us?</h2>
                                <p className="text-muted-foreground mb-6">Discover our fee-only philosophy and mission to democratize financial advice.</p>
                                <span className="text-primary font-bold text-sm inline-flex items-center">Learn More <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                            </div>
                        </Link>

                        <Link href="/process" className="group block h-full">
                            <div className="bg-card border border-border/50 p-8 rounded-2xl h-full shadow-sm hover:shadow-md transition-all hover:border-primary/20">
                                <h2 className="text-2xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors">Our Process</h2>
                                <p className="text-muted-foreground mb-6">See how we use a scientific, data-driven approach to secure your financial future.</p>
                                <span className="text-primary font-bold text-sm inline-flex items-center">Explore Method <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                            </div>
                        </Link>

                        <Link href="/about/team" className="group block h-full">
                            <div className="bg-card border border-border/50 p-8 rounded-2xl h-full shadow-sm hover:shadow-md transition-all hover:border-primary/20">
                                <h2 className="text-2xl font-serif font-bold text-foreground mb-4 group-hover:text-primary transition-colors">Meet the Team</h2>
                                <p className="text-muted-foreground mb-6">Get to know the experts dedicated to your financial well-being.</p>
                                <span className="text-primary font-bold text-sm inline-flex items-center">Our Team <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" /></span>
                            </div>
                        </Link>
                    </div>

                    <div className="mt-20">
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
                </div>
            </div>
        </main>
    );
}
