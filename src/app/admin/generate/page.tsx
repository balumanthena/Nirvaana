"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { useRouter } from "next/navigation";
import { createBlog } from "@/lib/blog-db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Wand2, ArrowLeft, CheckCircle, AlertCircle, Sparkles } from "lucide-react";
import Link from "next/link";

export default function AIGeneratorPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [topic, setTopic] = useState("");
    const [count, setCount] = useState(3);
    const [generating, setGenerating] = useState(false);
    const [status, setStatus] = useState<string>("");
    const [results, setResults] = useState<{ title: string; success: boolean }[]>([]);

    if (authLoading) return <div className="p-8 text-center text-slate-500 min-h-screen">Authenticating...</div>;
    if (!user) {
        router.push("/admin/login");
        return null;
    }

    const handleGenerate = async () => {
        if (!topic) return;
        setGenerating(true);
        setStatus(`Analyzing topic authority for: ${topic}...`);
        setResults([]);

        const newResults = [];

        // 1. Generate Pillar Article First
        setStatus(`Generating Pillar Article for ${topic}...`);
        const pillarTitle = `The Ultimate Guide to ${topic}`;
        const pillarSlug = `${topic.toLowerCase().replace(/\s+/g, '-')}-pillar`;

        try {
            const pillarDraft = {
                title: pillarTitle,
                slug: pillarSlug,
                excerpt: `The most comprehensive guide to ${topic} for Indian investors, covering everything from basics to advanced strategies.`,
                content: JSON.stringify({
                    time: Date.now(),
                    blocks: [
                        { type: "header", data: { text: `Mastering ${topic}: A Comprehensive Blueprint`, level: 2 } },
                        { type: "paragraph", data: { text: `This pillar article serves as your foundation for understanding ${topic}. We have broken down this complex subject into manageable sections to help you secure your financial future.` } },
                        { type: "header", data: { text: "Why this matters now", level: 3 } },
                        { type: "paragraph", data: { text: `In the current economic climate, ${topic} has become the cornerstone of successful wealth management for salaried professionals.` } }
                    ],
                    version: "2.30.0"
                }),
                featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
                category: "Market Insights",
                tags: [topic.toLowerCase(), "pillar", "authority"],
                author: "Nirvana Wise Wealth Strategic AI",
                readingTime: 0,
                views: 0,
                status: "draft" as const,
                seoTitle: `${pillarTitle} | Nirvana Wise Wealth`,
                metaDescription: `Read our comprehensive pillar guide on ${topic}. Learn how to optimize your financial strategy today.`,
                featured: true,
                faqs: [],
                isPillar: true
            };

            await createBlog(pillarDraft);
            newResults.push({ title: pillarTitle + " (Pillar)", success: true });
        } catch (err) {
            console.error(err);
            newResults.push({ title: "Pillar Article", success: false });
        }

        // 2. Generate Supporting Articles
        for (let i = 1; i <= count; i++) {
            setStatus(`Generating Supporting Insight ${i} of ${count}...`);
            try {
                const subTopics = [
                    `${topic} Benefits`, `${topic} Risks`, `${topic} for Beginners`,
                    `${topic} Implementation`, `${topic} Case Study`, `Advanced ${topic}`,
                    `${topic} Checklist`, `Common ${topic} Mistakes`, `${topic} FAQ`, `${topic} Summary`
                ];

                const subTopic = subTopics[i - 1] || `${topic} Insight ${i}`;
                const title = `Deep Dive: ${subTopic}`;
                const slug = `${subTopic.toLowerCase().replace(/\s+/g, '-')}`;

                const draft = {
                    title,
                    slug,
                    excerpt: `A specialized look into ${subTopic} as part of our ${topic} authority series.`,
                    content: JSON.stringify({
                        time: Date.now(),
                        blocks: [
                            { type: "header", data: { text: `Understanding ${subTopic}`, level: 2 } },
                            { type: "paragraph", data: { text: `In this supporting guide, we explore the specific nuances of ${subTopic} and how it fits into your broader ${topic} strategy.` } }
                        ],
                        version: "2.30.0"
                    }),
                    featuredImage: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop",
                    category: "Financial Planning",
                    tags: [topic.toLowerCase(), subTopic.toLowerCase()],
                    author: "Nirvana Wise Wealth Research AI",
                    readingTime: 0,
                    views: 0,
                    status: "draft" as const,
                    seoTitle: `${title} | Nirvana Wise Wealth`,
                    metaDescription: `Discover the specific role of ${subTopic} in your overall ${topic} planning.`,
                    featured: false,
                    faqs: [],
                    isPillar: false,
                    pillarSlug: pillarSlug // Linking to pillar
                };

                await createBlog(draft);
                newResults.push({ title, success: true });
            } catch (err) {
                console.error(err);
                newResults.push({ title: `Supporting Article ${i}`, success: false });
            }
        }

        setResults(newResults);
        setStatus("Cluster Generation Complete!");
        setGenerating(false);
    };

    return (
        <main className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/admin/dashboard" className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </Link>
                </div>

                <Card className="border-slate-200 overflow-hidden">
                    <div className="h-2 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600"></div>
                    <CardHeader>
                        <div className="flex items-center gap-2 text-blue-600 mb-2">
                            <Sparkles className="w-5 h-5" />
                            <span className="text-xs font-bold uppercase tracking-widest">Powered by Nirvana Wise Wealth AI</span>
                        </div>
                        <CardTitle className="font-serif text-3xl">AI SEO Content Generator</CardTitle>
                        <CardDescription>
                            Generate high-authority blog drafts automatically to build your topical authority faster.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Pillar Topic</label>
                                <Input
                                    placeholder="e.g. Retirement Planning for IT Professionals"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    className="h-12 border-slate-200"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700">Number of Articles</label>
                                <Input
                                    type="number"
                                    min={1}
                                    max={10}
                                    value={count}
                                    onChange={(e) => setCount(parseInt(e.target.value))}
                                    className="h-12 border-slate-200"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handleGenerate}
                            disabled={generating || !topic}
                            className="w-full bg-blue-900 hover:bg-blue-800 h-14 text-lg rounded-2xl shadow-xl shadow-blue-900/10"
                        >
                            {generating ? (
                                <><Loader2 className="w-6 h-6 mr-3 animate-spin" /> {status}</>
                            ) : (
                                <><Wand2 className="w-6 h-6 mr-3" /> Generate Intelligence-Driven Content</>
                            )}
                        </Button>

                        {results.length > 0 && (
                            <div className="p-6 rounded-3xl bg-white border border-slate-100 shadow-inner">
                                <h4 className="font-bold text-slate-900 flex items-center gap-2 mb-4">
                                    <CheckCircle className="text-green-500 w-5 h-5" />
                                    Generation Results
                                </h4>
                                <div className="space-y-3">
                                    {results.map((res, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
                                            <span className="text-sm font-medium text-slate-700">{res.title}</span>
                                            {res.success ? (
                                                <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold uppercase">Saved to Drafts</span>
                                            ) : (
                                                <span className="text-[10px] bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold uppercase">Failed</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-6 flex gap-4">
                                    <Link href="/admin/dashboard" className="flex-grow">
                                        <Button variant="outline" className="w-full rounded-xl">View in Dashboard</Button>
                                    </Link>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
