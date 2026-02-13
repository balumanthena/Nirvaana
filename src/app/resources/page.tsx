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

                <div className="mb-20">
                    <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8 border-b pb-4">
                        Financial Tools
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <Link href="/resources/investment-recommendations" className="group">
                            <Card className="h-full border-slate-200 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-900/5 transition-all bg-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <svg className="w-32 h-32 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39h-2.05c-.15-.86-.82-1.77-2.66-1.77-1.59 0-2.31.79-2.31 1.58 0 .89.79 1.53 2.87 2.09 2.15.61 3.99 1.74 3.99 3.61 0 1.6-1.14 2.76-2.9 3.24z" />
                                    </svg>
                                </div>
                                <CardHeader>
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-md">New Tool</span>
                                    </div>
                                    <CardTitle className="text-2xl font-serif text-slate-900 group-hover:text-blue-600 transition-colors">
                                        Investment Recommendations Engine
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-slate-600 mb-6 w-3/4">
                                        Get a personalized asset allocation and fund category suggestions based on your age, risk profile, and goals.
                                    </p>
                                    <div className="flex items-center text-sm font-semibold text-blue-600">
                                        Try Now <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>
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
