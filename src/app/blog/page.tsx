"use client";

import React, { useEffect, useState } from "react";
import { subscribeToBlogs, BlogPost } from "@/lib/blog-db";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, Sparkles, Eye } from "lucide-react";
import Link from "next/link";

export default function BlogListPage() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 6;

    useEffect(() => {
        const unsubscribe = subscribeToBlogs((data) => {
            setBlogs(data);
            setLoading(false);
            setError(null);
        }, true, (err: any) => {
            console.error("Blog fetch error:", err);
            setError(err.message || "Failed to load blogs.");
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // Pagination logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(blogs.length / blogsPerPage);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 300, behavior: 'smooth' });
    };

    if (loading) {
        return (
            <main className="pt-40 pb-20 bg-slate-50 min-h-screen">
                <div className="container mx-auto px-4">
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
                        <div className="h-16 w-3/4 bg-slate-200 rounded-2xl mx-auto animate-pulse" />
                        <div className="h-6 w-1/2 bg-slate-200 rounded-full mx-auto animate-pulse" />
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm animate-pulse h-full flex flex-col">
                                <div className="h-64 bg-slate-200" />
                                <div className="p-8 space-y-6 flex-grow">
                                    <div className="flex gap-4">
                                        <div className="h-3 w-20 bg-slate-100 rounded-full" />
                                        <div className="h-3 w-20 bg-slate-100 rounded-full" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-6 w-full bg-slate-200 rounded-lg" />
                                        <div className="h-6 w-2/3 bg-slate-200 rounded-lg" />
                                    </div>
                                    <div className="space-y-2 pt-4">
                                        <div className="h-4 w-full bg-slate-100 rounded-md" />
                                        <div className="h-4 w-full bg-slate-100 rounded-md" />
                                        <div className="h-4 w-4/5 bg-slate-100 rounded-md" />
                                    </div>
                                    <div className="pt-6">
                                        <div className="h-4 w-32 bg-slate-200 rounded-full" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="pt-40 pb-20 bg-slate-50 min-h-screen">
                <div className="container mx-auto px-4 text-center">
                    <div className="max-w-2xl mx-auto bg-white p-12 rounded-[2.5rem] border border-slate-200 shadow-2xl shadow-blue-900/5 text-left">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-8 text-red-600 font-bold text-2xl">!</div>
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-6">Experience Interruption</h2>
                        <p className="text-slate-600 mb-8 text-lg leading-relaxed">
                            We're currently fine-tuning our insights engine. This status usually requires a quick database index update.
                        </p>

                        <div className="space-y-6 mb-10 bg-slate-50 p-8 rounded-3xl border border-slate-100">
                            <div className="flex gap-5">
                                <span className="bg-blue-900 text-white w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-lg shadow-blue-900/20">1</span>
                                <p className="text-slate-700 font-medium">Open <a href="https://console.firebase.google.com/" target="_blank" className="underline font-bold text-blue-900">Firebase Console</a></p>
                            </div>
                            <div className="flex gap-5">
                                <span className="bg-blue-900 text-white w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-lg shadow-blue-900/20">2</span>
                                <p className="text-slate-700 font-medium leading-relaxed">
                                    Navigate to <b>Cloud Firestore</b> &gt; <b>Indexes</b> and click <b>"Add Index"</b>.
                                </p>
                            </div>
                            <div className="flex gap-5">
                                <span className="bg-blue-900 text-white w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold shadow-lg shadow-blue-900/20">3</span>
                                <p className="text-slate-700 font-medium leading-relaxed">
                                    <b>Collection ID:</b> <code className="bg-white px-2 py-0.5 rounded border">blogs</code><br />
                                    <b>Query Scope:</b> Collection<br />
                                    <b>Fields:</b> <code className="bg-white px-2 py-0.5 rounded border">status</code> (Asc) & <code className="bg-white px-2 py-0.5 rounded border">publishedAt</code> (Desc).
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <Button onClick={() => window.location.reload()} className="bg-blue-900 hover:bg-blue-800 rounded-full px-10 h-14 w-full sm:w-auto text-lg font-bold shadow-xl shadow-blue-900/10">
                                Refresh Content
                            </Button>
                            <p className="text-xs text-slate-400 font-medium">Status: Awaiting Index (~5 min duration)</p>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    return (
        <main className="pt-40 pb-20 bg-slate-50 min-h-screen">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-20">
                    <h1 className="text-5xl md:text-6xl font-serif font-bold text-slate-900 mb-8 leading-tight">
                        Nirvaana Insights
                    </h1>
                    <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-medium">
                        Expert financial wisdom for building sustainable wealth and cross-generational legacy in India.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {blogs.length === 0 ? (
                        <div className="col-span-full text-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
                            <Sparkles className="w-16 h-16 text-slate-200 mx-auto mb-6" />
                            <h3 className="text-2xl font-serif font-bold text-slate-800 mb-2">Wisdom in Progress</h3>
                            <p className="text-slate-500 text-lg">Our experts are currently drafting new perspectives.</p>
                        </div>
                    ) : (
                        currentBlogs.map((blog) => (
                            <Link key={blog.id} href={`/blog/${blog.slug}`} className="group h-full">
                                <Card className="h-full border-0 shadow-2xl shadow-blue-900/5 hover:shadow-blue-900/10 transition-all duration-500 bg-white overflow-hidden flex flex-col rounded-[2rem]">
                                    <div className="h-64 overflow-hidden bg-slate-100 relative">
                                        {blog.featuredImage ? (
                                            <img
                                                src={blog.featuredImage}
                                                alt={blog.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300 gap-2">
                                                <Calendar className="w-8 h-8 opacity-20" />
                                                <span className="font-serif italic text-xs tracking-widest uppercase opacity-40">Nirvaana Wealth</span>
                                            </div>
                                        )}
                                        {blog.featured && (
                                            <div className="absolute top-4 left-4 bg-blue-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1.5 backdrop-blur-sm bg-blue-900/90 tracking-widest uppercase">
                                                <Sparkles className="w-3 h-3" /> Featured Insight
                                            </div>
                                        )}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="text-[10px] font-bold text-white uppercase tracking-wider bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                                                {blog.category}
                                            </span>
                                        </div>
                                    </div>
                                    <CardHeader className="p-8 pb-4">
                                        <div className="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                                            <span className="flex items-center gap-1.5">
                                                <Calendar className="w-3 h-3" />
                                                {blog.publishedAt?.toDate()?.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) || 'Latest'}
                                            </span>
                                            <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                                            <span className="flex items-center gap-1.5">
                                                <Clock className="w-3 h-3" />
                                                {blog.readingTime || 5} min read
                                            </span>
                                            <span className="h-1 w-1 bg-slate-300 rounded-full"></span>
                                            <span className="flex items-center gap-1.5 text-blue-600 font-bold">
                                                <Eye className="w-3 h-3" />
                                                {blog.views || 0}
                                            </span>
                                        </div>
                                        <CardTitle className="text-2xl font-serif text-slate-900 group-hover:text-blue-900 transition-colors line-clamp-2 leading-tight">
                                            {blog.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-8 pt-0 flex flex-col flex-grow">
                                        <p className="text-slate-500 mb-8 line-clamp-3 text-base leading-relaxed font-medium">
                                            {blog.excerpt}
                                        </p>
                                        <div className="mt-auto flex items-center text-sm font-bold text-blue-900 tracking-wider uppercase group-hover:gap-3 transition-all">
                                            Explore Perspective <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))
                    )}
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-3 mt-20">
                        <Button
                            variant="outline"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="rounded-full w-12 h-12 p-0 border-slate-200 hover:bg-white hover:text-blue-900 disabled:opacity-30"
                        >
                            <ArrowRight className="w-5 h-5 rotate-180" />
                        </Button>
                        {[...Array(totalPages)].map((_, i) => (
                            <Button
                                key={i + 1}
                                variant={currentPage === i + 1 ? "default" : "outline"}
                                onClick={() => paginate(i + 1)}
                                className={`rounded-full w-12 h-12 p-0 text-lg font-bold transition-all duration-300 ${currentPage === i + 1
                                    ? "bg-blue-900 hover:bg-blue-800 shadow-xl shadow-blue-900/20 scale-110"
                                    : "border-slate-200 text-slate-600 hover:bg-white hover:border-blue-900 hover:text-blue-900"
                                    }`}
                            >
                                {i + 1}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="rounded-full w-12 h-12 p-0 border-slate-200 hover:bg-white hover:text-blue-900 disabled:opacity-30"
                        >
                            <ArrowRight className="w-5 h-5" />
                        </Button>
                    </div>
                )}
            </div>
        </main>
    );
}
