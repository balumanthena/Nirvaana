"use client";

import React, { useState } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { useRouter } from "next/navigation";
import { createBlog } from "@/lib/blog-db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Upload, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function BulkImportPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [jsonInput, setJsonInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState("");
    const [results, setResults] = useState<{ success: number; failed: number; errors: string[] }>({ success: 0, failed: 0, errors: [] });
    const [completed, setCompleted] = useState(false);

    if (authLoading) return <div className="p-8 text-center text-slate-500 min-h-screen">Authenticating...</div>;
    if (!user) {
        router.push("/admin/login");
        return null;
    }

    const handleImport = async () => {
        try {
            const articles = JSON.parse(jsonInput);
            if (!Array.isArray(articles)) {
                alert("Please provide an array of articles.");
                return;
            }

            setLoading(true);
            setCompleted(false);
            let success = 0;
            let failed = 0;
            const errors: string[] = [];

            for (const [index, article] of articles.entries()) {
                try {
                    setStatus(`Importing ${index + 1}/${articles.length}: ${article.title}`);

                    // Validate required fields
                    if (!article.title || !article.slug || !article.content) {
                        throw new Error("Missing required fields (title, slug, or content)");
                    }

                    // Check for duplicate slug
                    const { getBlogBySlug } = await import("@/lib/blog-db");
                    const existing = await getBlogBySlug(article.slug);
                    if (existing) {
                        errors.push(`Skipped "${article.title}": URL slug already exists.`);
                        continue; // Intentional skip, doesn't count as 'failed' in terms of crash
                    }

                    // Inject a high-quality placeholder image if missing
                    const finalArticle = {
                        ...article,
                        readingTime: article.readingTime || 0,
                        views: article.views || 0,
                        featuredImage: article.featuredImage || `https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2071&auto=format&fit=crop`
                    };
                    await createBlog(finalArticle);
                    success++;
                } catch (err: any) {
                    console.error("Failed to import:", article.title, err);
                    failed++;
                    errors.push(`Error in "${article.title}": ${err.message}`);
                }
            }

            setResults({ success, failed, errors });
            setCompleted(true);
        } catch (err: any) {
            alert("Invalid JSON format: " + err.message);
        } finally {
            setLoading(false);
            setStatus("");
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href="/admin/dashboard" className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </Link>
                </div>

                <Card className="border-slate-200">
                    <CardHeader>
                        <CardTitle className="font-serif text-2xl">SEO Content Bulk Import</CardTitle>
                        <CardDescription>
                            Paste the generated JSON payload here to automatically populate your blog with high-authority content.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700">JSON Payload</label>
                            <Textarea
                                value={jsonInput}
                                onChange={(e) => setJsonInput(e.target.value)}
                                placeholder="Paste [ { ... }, { ... } ] here..."
                                className="min-h-[400px] font-mono text-xs"
                            />
                        </div>

                        <Button
                            onClick={handleImport}
                            disabled={loading || !jsonInput}
                            className="w-full bg-blue-900 hover:bg-blue-800 h-12 text-lg"
                        >
                            {loading ? (
                                <><Loader2 className="w-5 h-5 mr-2 animate-spin" /> Importing Articles...</>
                            ) : (
                                <><Upload className="w-5 h-5 mr-2" /> Start Bulk Import</>
                            )}
                        </Button>

                        {completed && (
                            <div className={`p-6 rounded-2xl border ${results.failed === 0 ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'}`}>
                                <h4 className="font-bold flex items-center gap-2 mb-2">
                                    {results.failed === 0 ? (
                                        <CheckCircle className="text-green-600 w-5 h-5" />
                                    ) : (
                                        <AlertCircle className="text-orange-600 w-5 h-5" />
                                    )}
                                    Import Summary
                                </h4>
                                <ul className="text-sm space-y-1 text-slate-600">
                                    <li>✅ Successfully Imported: <strong>{results.success}</strong></li>
                                    {results.failed > 0 && <li>❌ Failed to Import: <strong>{results.failed}</strong></li>}
                                </ul>
                                {results.errors.length > 0 && (
                                    <div className="mt-4 p-4 bg-white/50 rounded-lg text-xs font-mono text-red-600">
                                        {results.errors.map((err, i) => <div key={i}>{err}</div>)}
                                    </div>
                                )}
                                <div className="mt-6">
                                    <Link href="/admin/dashboard">
                                        <Button variant="outline" className="w-full">Return to Dashboard</Button>
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
