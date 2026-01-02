import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    await params;
    return (
        <main className="pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6 max-w-3xl">
                <Link href="/resources" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Resources
                </Link>

                <article className="prose prose-lg prose-slate max-w-none">
                    <h1 className="font-serif font-bold text-slate-900 leading-tight">
                        Why &apos;Fee-Only&apos; is the Future of Financial Advice
                    </h1>
                    <div className="flex items-center text-sm text-slate-500 mb-8">
                        <span>October 10, 2024</span>
                        <span className="mx-2">•</span>
                        <span>5 min read</span>
                    </div>

                    <div className="w-full h-64 bg-slate-200 rounded-2xl mb-8"></div>

                    <p>
                        In the world of finance, incentives take supreme precedence. The person selling you a product is often incentivized to sell you the one that earns *them* the most money, not the one that makes *you* the most money. This is the fundamental conflict of interest in the distribution model.
                    </p>
                    <p>
                        A <strong>Fee-Only Advisor</strong>, on the other hand, is compensated solely by the client. This means:
                    </p>
                    <ul>
                        <li>Zero commissions from product manufacturers.</li>
                        <li>Unbiased advice tailored to your needs.</li>
                        <li>Fiduciary duty to put your interest first.</li>
                    </ul>
                    <p>
                        When you pay a flat fee, you know exactly what you are getting. There are no hidden costs eating into your compounding. Over a period of 20 years, saving 1% in commissions annually can increase your corpus by over 20-30%. That is the power of direct plans and fee-only advice.
                    </p>
                </article>

                <div className="mt-12 pt-12 border-t border-slate-200">
                    <h3 className="text-2xl font-serif font-bold text-slate-900 mb-4">Want to discuss this further?</h3>
                    <Button size="lg" asChild>
                        <Link href="/contact">Get in Touch</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
