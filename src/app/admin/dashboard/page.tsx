"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { useRouter } from "next/navigation";
import { subscribeToBlogs, BlogPost, deleteBlog } from "@/lib/blog-db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, ExternalLink, LogOut, Loader2, RefreshCw, Search, Eye, Clock, Sparkles } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export default function AdminDashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [blogs, setBlogs] = useState<BlogPost[]>([]);
    const [fetching, setFetching] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const blogsPerPage = 5;

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/admin/login");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            setFetching(true);
            const unsubscribe = subscribeToBlogs((data) => {
                setBlogs(data);
                setFetching(false);
                setError(null);
            }, false, (err: any) => {
                console.error("Dashboard subscription error:", err);
                setError(err.message || "Failed to load blogs.");
                setFetching(false);
            });
            return () => unsubscribe();
        }
    }, [user]);

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Pagination logic
    const indexOfLastBlog = currentPage * blogsPerPage;
    const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
    const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            await deleteBlog(id);
        }
    };

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/admin/login");
    };

    if (authLoading) {
        return (
            <div className="min-h-screen bg-slate-50 p-8 flex items-center justify-center">
                <div className="max-w-md w-full space-y-4 text-center animate-pulse">
                    <div className="w-16 h-16 bg-blue-100 rounded-full mx-auto" />
                    <div className="h-4 w-32 bg-slate-200 rounded-full mx-auto" />
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
                    <div>
                        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">Command Center</h1>
                        <p className="text-slate-500">Manage your financial insights and blog content.</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/admin/generate">
                            <Button variant="outline" className="rounded-full px-6 border-slate-300 text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                                <Sparkles className="w-4 h-4 mr-2" /> AI Generator
                            </Button>
                        </Link>
                        <Link href="/admin/import">
                            <Button variant="outline" className="rounded-full px-6 border-slate-300">
                                <RefreshCw className="w-4 h-4 mr-2" /> Bulk Import
                            </Button>
                        </Link>
                        <Link href="/admin/blog/new">
                            <Button className="bg-blue-900 hover:bg-blue-800 rounded-full px-6 shadow-lg shadow-blue-900/10">
                                <Plus className="w-4 h-4 mr-2" /> New Publication
                            </Button>
                        </Link>
                        <Button variant="outline" onClick={handleLogout} className="rounded-full border-slate-300 hover:bg-slate-100 transition-all font-medium">
                            <LogOut className="w-4 h-4 mr-2" />
                        </Button>
                    </div>
                </header>

                <div className="space-y-6">
                    {error && (
                        <div className="mb-8 p-6 bg-red-50 border border-red-100 rounded-3xl text-red-900">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">!</div>
                                <div>
                                    <h3 className="text-xl font-bold mb-2">Firestore Error Detected</h3>
                                    <p className="mb-4 opacity-90">{error}</p>
                                    {error.includes("index") && (
                                        <div className="bg-white/50 p-4 rounded-xl border border-red-200 text-slate-800 text-sm">
                                            <p className="font-bold mb-2">Manual Fix for Access error (403):</p>
                                            <ol className="list-decimal list-inside space-y-1">
                                                <li>Open <a href="https://console.firebase.google.com/" target="_blank" className="underline font-bold text-blue-900">Firebase Console</a></li>
                                                <li>Select project: <b>nirvanawealthplanner</b></li>
                                                <li>Go to: <b>Firestore</b> &gt; <b>Indexes</b> &gt; <b>"Add Index"</b></li>
                                                <li><b>Collection:</b> <code className="bg-slate-100 px-1 rounded">blogs</code></li>
                                                <li><b>Fields:</b> <code className="bg-slate-100 px-1 rounded">status</code> (Asc) AND <code className="bg-slate-100 px-1 rounded">publishedAt</code> (Desc)</li>
                                            </ol>
                                            <Button onClick={() => window.location.reload()} size="sm" className="mt-4 bg-red-600 hover:bg-red-700 text-white">I've added it (Reload)</Button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6">
                        <div className="relative flex-grow max-w-lg">
                            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                <Search className="w-4 h-4 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search by title or category..."
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page on search
                                }}
                                className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white transition-all shadow-sm"
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                                {filteredBlogs.length} Publications
                                {fetching && <Loader2 className="w-4 h-4 animate-spin text-slate-400" />}
                            </h2>
                        </div>
                    </div>

                    {fetching && blogs.length === 0 ? (
                        <div className="grid gap-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="h-32 bg-white rounded-[2rem] border border-slate-100 shadow-sm animate-pulse flex items-center p-6 gap-6">
                                    <div className="w-32 h-20 bg-slate-100 rounded-2xl" />
                                    <div className="flex-grow space-y-4">
                                        <div className="h-6 w-3/4 bg-slate-200 rounded-lg" />
                                        <div className="h-4 w-1/2 bg-slate-100 rounded-full" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : filteredBlogs.length === 0 ? (
                        <div className="text-center py-24 bg-white rounded-[2rem] border border-dashed border-slate-200 shadow-sm">
                            <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
                                <Search className="w-12 h-12" />
                            </div>
                            <h3 className="text-2xl font-serif font-bold text-slate-900 mb-3">No results found</h3>
                            <p className="text-slate-500 mb-8 max-w-sm mx-auto text-lg leading-relaxed">We couldn't find any publications matching your search criteria.</p>
                            <Button variant="ghost" onClick={() => setSearchTerm("")} className="text-blue-900 font-bold hover:bg-blue-50 rounded-full px-8">Clear Search</Button>
                        </div>
                    ) : (
                        <>
                            <div className="grid gap-6">
                                {currentBlogs.map((blog) => (
                                    <Card key={blog.id} className="overflow-hidden border-slate-200 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500 group rounded-[2rem] bg-white">
                                        <CardContent className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex items-center gap-6 flex-grow">
                                                <div className="relative w-32 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 shadow-inner">
                                                    {blog.featuredImage ? (
                                                        <img src={blog.featuredImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-300 font-serif italic text-xs p-2 text-center">{blog.category}</div>
                                                    )}
                                                    {blog.featured && (
                                                        <div className="absolute top-1 left-1 bg-blue-900 text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-lg">STAR</div>
                                                    )}
                                                </div>
                                                <div className="space-y-2">
                                                    <h3 className="font-serif font-bold text-slate-900 text-xl group-hover:text-blue-900 transition-colors line-clamp-1">{blog.title}</h3>
                                                    <div className="flex flex-wrap items-center gap-4 text-xs">
                                                        <span className={`px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] ${blog.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                                            }`}>
                                                            {blog.status}
                                                        </span>
                                                        <div className="flex items-center gap-1.5 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                                                            {blog.category}
                                                        </div>
                                                        <span className="text-slate-300">•</span>
                                                        <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                                                            <Eye className="w-3 h-3" /> {blog.views || 0} views
                                                        </div>
                                                        <span className="text-slate-300">•</span>
                                                        <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                                                            <Clock className="w-3 h-3" /> {blog.readingTime || 5} min read
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-3 md:pl-6 md:border-l border-slate-100">
                                                <Link href={`/blog/${blog.slug}`} target="_blank">
                                                    <Button variant="ghost" size="icon" className="hover:bg-blue-50 hover:text-blue-900 rounded-full w-12 h-12">
                                                        <ExternalLink className="w-5 h-5" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/blog/edit/${blog.id}`}>
                                                    <Button variant="ghost" size="icon" className="hover:bg-slate-100 text-slate-600 rounded-full w-12 h-12">
                                                        <Edit className="w-5 h-5" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="hover:bg-red-50 text-slate-300 hover:text-red-500 rounded-full w-12 h-12 transition-colors"
                                                    onClick={() => handleDelete(blog.id!)}
                                                >
                                                    <Trash className="w-5 h-5" />
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>

                            {/* Pagination Controls */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-12 pb-12">
                                    <Button
                                        variant="outline"
                                        onClick={() => paginate(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="rounded-full w-10 h-10 p-0 border-slate-200"
                                    >
                                        &larr;
                                    </Button>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <Button
                                            key={i + 1}
                                            variant={currentPage === i + 1 ? "default" : "outline"}
                                            onClick={() => paginate(i + 1)}
                                            className={`rounded-full w-10 h-10 p-0 ${currentPage === i + 1 ? "bg-blue-900 hover:bg-blue-800" : "border-slate-200 text-slate-600 hover:bg-slate-50"
                                                }`}
                                        >
                                            {i + 1}
                                        </Button>
                                    ))}
                                    <Button
                                        variant="outline"
                                        onClick={() => paginate(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="rounded-full w-10 h-10 p-0 border-slate-200"
                                    >
                                        &rarr;
                                    </Button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </main>
    );
}
