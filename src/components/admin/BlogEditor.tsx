"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { useRouter, useParams } from "next/navigation";
import { createBlog, updateBlog, getBlogById, BlogPost, BlogFAQ } from "@/lib/blog-db";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Save, Send, Image as ImageIcon, Plus, Trash, Loader2, Type } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const EditorBlock = dynamic(() => import("./EditorBlock"), { ssr: false });

export default function BlogEditor() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const { id } = useParams();
    const isEditing = !!id;

    const [form, setForm] = useState<Omit<BlogPost, 'id' | 'createdAt' | 'publishedAt'>>({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featuredImage: "",
        category: "",
        tags: [],
        author: "Nirvana Wise Wealth",
        readingTime: 0,
        views: 0,
        status: "draft",
        seoTitle: "",
        metaDescription: "",
        featured: false,
        faqs: [],
        isPillar: false,
        pillarSlug: ""
    });

    const [tagInput, setTagInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [editorLoading, setEditorLoading] = useState(isEditing);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/admin/login");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (isEditing) {
            fetchBlog();
        }
    }, [id]);

    const fetchBlog = async () => {
        setEditorLoading(true);
        const data = await getBlogById(id as string);
        if (data) {
            const { id: _, createdAt: __, publishedAt: ___, ...rest } = data;
            setForm(rest);
        }
        setEditorLoading(false);
    };

    // Auto-generate slug from title
    useEffect(() => {
        if (!isEditing && form.title) {
            const generatedSlug = form.title
                .toLowerCase()
                .trim()
                .replace(/[^\w\s-]/g, '')
                .replace(/[\s_-]+/g, '-')
                .replace(/^-+|-+$/g, '');
            setForm(prev => ({ ...prev, slug: generatedSlug }));
        }
    }, [form.title, isEditing]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;
        const file = e.target.files[0];
        setUploading(true);
        try {
            const storageRef = ref(storage, `blogs/${Date.now()}_${file.name}`);
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setForm({ ...form, featuredImage: url });
        } catch (error) {
            alert("Upload failed!");
        } finally {
            setUploading(false);
        }
    };

    const handleAddTag = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!form.tags.includes(tagInput.trim())) {
                setForm({ ...form, tags: [...form.tags, tagInput.trim()] });
            }
            setTagInput("");
        }
    };

    const removeTag = (index: number) => {
        setForm({ ...form, tags: form.tags.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (status: 'draft' | 'published') => {
        if (!form.title || !form.slug || !form.content) {
            alert("Please fill in the title, slug, and content.");
            return;
        }

        setLoading(true);
        try {
            const data = { ...form, status };
            if (isEditing) {
                await updateBlog(id as string, data);
            } else {
                await createBlog(data);
            }
            router.push("/admin/dashboard");
        } catch (error: any) {
            console.error("Error saving blog:", error);
            alert(`Error saving blog: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    const addFAQ = () => {
        setForm({ ...form, faqs: [...form.faqs, { question: "", answer: "" }] });
    };

    const updateFAQ = (index: number, field: keyof BlogFAQ, value: string) => {
        const updatedFaqs = [...form.faqs];
        updatedFaqs[index] = { ...updatedFaqs[index], [field]: value };
        setForm({ ...form, faqs: updatedFaqs });
    };

    const removeFAQ = (index: number) => {
        const updatedFaqs = form.faqs.filter((_, i) => i !== index);
        setForm({ ...form, faqs: updatedFaqs });
    };

    if (authLoading) return <div className="p-8 text-center text-slate-500 min-h-screen">Authenticating...</div>;

    const categories = [
        "Retirement Planning",
        "Goal-Based Investing",
        "Mutual Funds",
        "Tax Planning",
        "Insurance Analysis",
        "Portfolio Review",
        "Market Insights"
    ];

    return (
        <main className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6 flex items-center justify-between">
                    <Link href="/admin/dashboard" className="flex items-center text-slate-600 hover:text-slate-900 transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </Link>
                    <div className="flex gap-4">
                        <Button variant="outline" onClick={() => handleSubmit('draft')} disabled={loading}>
                            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
                            Save Draft
                        </Button>
                        <Button onClick={() => handleSubmit('published')} disabled={loading} className="bg-blue-900 hover:bg-blue-800">
                            {loading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
                            {isEditing ? "Update & Publish" : "Publish Now"}
                        </Button>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <Card className="border-slate-200">
                            <CardHeader><CardTitle className="font-serif">Article content</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Headline</label>
                                    <Input
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        placeholder="Enter a compelling title..."
                                        className="text-lg font-semibold h-12"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Excerpt (Summary)</label>
                                    <Textarea
                                        value={form.excerpt}
                                        onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                                        placeholder="Hook your readers with a brief summary..."
                                        className="h-24 resize-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 flex items-center justify-between">
                                        <span>Article Content (Block Editor)</span>
                                        <span className="text-[10px] bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest flex items-center">
                                            <Type className="w-3 h-3 mr-1" /> Editor.js Active
                                        </span>
                                    </label>
                                    {!editorLoading ? (
                                        <EditorBlock
                                            holder="editorjs-container"
                                            data={form.content}
                                            onChange={(val) => setForm(prev => ({ ...prev, content: val }))}
                                        />
                                    ) : (
                                        <div className="min-h-[400px] border border-slate-100 rounded-xl bg-slate-50 flex items-center justify-center">
                                            <Loader2 className="w-6 h-6 animate-spin text-slate-300" />
                                        </div>
                                    )}
                                    <p className="text-xs text-slate-400 italic mt-2">
                                        Use blocks for a professional layout. Your content is automatically saved as JSON.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="font-serif">FAQ Section</CardTitle>
                                <Button variant="outline" size="sm" onClick={addFAQ} className="text-blue-900 border-blue-900 hover:bg-blue-50">
                                    <Plus className="w-4 h-4 mr-2" /> Add Question
                                </Button>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {form.faqs.length === 0 ? (
                                    <p className="text-center text-slate-400 py-8 text-sm italic">No FAQs added yet.</p>
                                ) : (
                                    form.faqs.map((faq, index) => (
                                        <div key={index} className="space-y-2 p-4 border border-slate-100 bg-slate-50/50 rounded-xl relative group">
                                            <Button variant="ghost" size="icon" className="absolute top-2 right-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => removeFAQ(index)}>
                                                <Trash className="w-4 h-4" />
                                            </Button>
                                            <div className="space-y-1">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Question {index + 1}</label>
                                                <Input value={faq.question} onChange={(e) => updateFAQ(index, 'question', e.target.value)} placeholder="What is SIP?" className="bg-white" />
                                            </div>
                                            <div className="space-y-1 mt-3">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Answer</label>
                                                <Textarea value={faq.answer} onChange={(e) => updateFAQ(index, 'answer', e.target.value)} placeholder="SIP stands for..." className="bg-white min-h-[100px]" />
                                            </div>
                                        </div>
                                    ))
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <div className="space-y-8">
                        <Card className="border-slate-200">
                            <CardHeader><CardTitle className="text-lg font-serif">Publishing Settings</CardTitle></CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">URL Slug</label>
                                    <Input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="url-slug" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Category</label>
                                    <select
                                        className="w-full h-10 px-3 rounded-md border border-slate-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                    >
                                        <option value="">Select Category</option>
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Tags (Press Enter)</label>
                                    <Input
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleAddTag}
                                        placeholder="Add tags..."
                                    />
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {form.tags.map((tag, i) => (
                                            <span key={i} className="inline-flex items-center bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full">
                                                {tag}
                                                <button onClick={() => removeTag(i)} className="ml-1 hover:text-red-500">&times;</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">Author</label>
                                    <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        id="featured"
                                        checked={form.featured}
                                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                                        className="rounded border-slate-300 text-blue-900 focus:ring-blue-900"
                                    />
                                    <label htmlFor="featured" className="text-sm font-medium text-slate-700">Featured Article</label>
                                </div>

                                <div className="space-y-4 pt-4 border-t border-slate-100">
                                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Topical Authority</h4>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="isPillar"
                                            checked={form.isPillar}
                                            onChange={(e) => setForm({ ...form, isPillar: e.target.checked })}
                                            className="rounded border-slate-300 text-blue-900 focus:ring-blue-900"
                                        />
                                        <label htmlFor="isPillar" className="text-sm font-medium text-slate-700 font-sans">Set as Pillar Article</label>
                                    </div>
                                    {!form.isPillar && (
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-slate-700">Pillar Article Slug</label>
                                            <Input
                                                value={form.pillarSlug}
                                                onChange={(e) => setForm({ ...form, pillarSlug: e.target.value })}
                                                placeholder="e.g. guide-to-sip"
                                                className="bg-slate-50 border-slate-100"
                                            />
                                            <p className="text-[10px] text-slate-400 font-medium">Links this article to a main pillar topic cluster.</p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200">
                            <CardHeader><CardTitle className="text-lg font-serif">Featured Image</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                {form.featuredImage && (
                                    <div className="aspect-video rounded-xl overflow-hidden bg-slate-100 mb-4">
                                        <img src={form.featuredImage} alt="Preview" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="flex gap-2">
                                    <Input value={form.featuredImage} onChange={(e) => setForm({ ...form, featuredImage: e.target.value })} placeholder="URL or Upload" className="flex-grow" />
                                    <div className="relative">
                                        <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={handleImageUpload} disabled={uploading} />
                                        <Button variant="outline" size="icon" type="button" disabled={uploading}>
                                            <ImageIcon className="w-4 h-4 text-slate-600" />
                                        </Button>
                                    </div>
                                </div>
                                {uploading && <p className="text-xs text-blue-600 font-medium animate-pulse">Uploading image...</p>}
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200">
                            <CardHeader><CardTitle className="text-lg font-serif">SEO & Metadata</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">SEO Meta Title</label>
                                    <Input value={form.seoTitle} onChange={(e) => setForm({ ...form, seoTitle: e.target.value })} placeholder="Max 60 characters" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700">SEO Meta Description</label>
                                    <Textarea value={form.metaDescription} onChange={(e) => setForm({ ...form, metaDescription: e.target.value })} placeholder="Max 160 characters" className="h-24 resize-none" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
