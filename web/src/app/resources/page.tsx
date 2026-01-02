import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

// Placeholder posts
const POSTS = [
    {
        title: "Why 'Fee-Only' is the Future of Financial Advice",
        excerpt: "Understand the difference between a distributor and an advisor, and why it matters for your wealth.",
        date: "October 10, 2024",
        slug: "why-fee-only-matters",
        category: "Education"
    },
    {
        title: "5 Common Mistakes High Net Worth Individuals Make",
        excerpt: "Even smart people make money mistakes. Here are the top 5 pitfalls to avoid.",
        date: "September 28, 2024",
        slug: "top-5-hni-mistakes",
        category: "Investing"
    },
    {
        title: "The Magic of Compounding: Start Early, Finish Rich",
        excerpt: "Time is your biggest asset. See how starting just 5 years early can double your corpus.",
        date: "September 15, 2024",
        slug: "magic-of-compounding",
        category: "Basics"
    }
];

export default function ResourcesPage() {
    return (
        <main className="pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                        Financial Insights
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Latest articles, guides, and updates to help you become financially smarter.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {POSTS.map((post) => (
                        <Link key={post.slug} href={`/resources/${post.slug}`} className="group">
                            <Card className="h-full border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all">
                                <div className="h-48 bg-slate-100 rounded-t-xl"></div>
                                <CardHeader>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-primary uppercase tracking-wider">{post.category}</span>
                                        <span className="text-xs text-slate-400">{post.date}</span>
                                    </div>
                                    <CardTitle className="text-xl font-serif text-slate-900 group-hover:text-primary transition-colors">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600 mb-4 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center text-sm font-semibold text-slate-900">
                                        Read Article <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
