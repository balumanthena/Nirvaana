import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

// Placeholder posts
const POSTS = [
    {
        title: "Strategic Asset Allocation: The Key to Long-Term Wealth",
        excerpt: "Why picking the right mix of assets matters more than picking individual stocks. A guide to balanced portfolio construction.",
        date: "October 15, 2024",
        slug: "strategic-asset-allocation",
        category: "Investing"
    },
    {
        title: "Comprehensive Tax Planning Guide for FY 2024-25",
        excerpt: "Maximize your post-tax returns with smart planning. Covers old vs. new regime, tax-harvesting, and efficient investment vehicles.",
        date: "October 1, 2024",
        slug: "tax-planning-guide-2024",
        category: "Taxation"
    },
    {
        title: "The Psychology of Money: Behavior Over Intelligence",
        excerpt: "Financial success is less about what you know and more about how you behave. Learn to master your financial emotions.",
        date: "September 20, 2024",
        slug: "psychology-of-money",
        category: "Behavioral Finance"
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
