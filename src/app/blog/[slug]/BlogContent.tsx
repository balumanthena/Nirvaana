"use client";

import React, { useEffect, useState, useRef } from "react";
import { List, Calendar, Clock, Eye, ChevronRight, User, Sparkles } from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { BlogPost } from "@/lib/blog-db";

interface BlogContentProps {
    blog: BlogPost;
    renderedContent: string;
    toc: { text: string; id: string }[];
    relatedBlogs: BlogPost[];
    clusterArticles?: BlogPost[];
    pillarSlug?: string;
    pillarArticle?: BlogPost | null;
}

export default function BlogContent({ blog, renderedContent, toc, relatedBlogs, clusterArticles = [], pillarSlug, pillarArticle }: BlogContentProps) {
    const [activeId, setActiveId] = useState<string>("");
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: "0% 0% -80% 0%" }
        );

        const headings = contentRef.current?.querySelectorAll("h2");
        headings?.forEach((h) => observer.observe(h));

        return () => observer.disconnect();
    }, [renderedContent]);

    return (
        <div className="max-w-[1440px] mx-auto grid lg:grid-cols-12 gap-8 px-4 md:px-6 relative">
            {/* Left Column - Sticky TOC */}
            <aside className="lg:col-span-2 hidden lg:block">
                <div className="sticky top-40 p-0">
                    <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 mb-6 pb-2 border-b-2 border-slate-900 w-fit">
                        On this page
                    </h3>
                    <nav className="flex flex-col gap-4">
                        {toc.map((item, idx) => (
                            <a
                                key={idx}
                                href={`#${item.id}`}
                                className={`text-[13px] leading-snug transition-all duration-300 font-medium ${activeId === item.id
                                    ? "text-blue-900 underline decoration-2 underline-offset-4"
                                    : "text-slate-500 hover:text-slate-900"
                                    }`}
                            >
                                {item.text}
                            </a>
                        ))}
                        {toc.length === 0 && <p className="text-slate-300 text-xs italic text font-sans">No sections found.</p>}
                    </nav>
                </div>
            </aside>

            {/* Center Column - Article Content (720px max) */}
            <div className="lg:col-span-7 flex flex-col items-center">
                {/* Mobile TOC */}
                {toc.length > 0 && (
                    <div className="lg:hidden w-full mb-12 p-8 bg-slate-50 rounded-2xl border border-slate-100">
                        <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-6 flex items-center gap-2">
                            <List className="w-3 h-3" /> Quick Navigation
                        </h3>
                        <div className="grid gap-3">
                            {toc.map((item, idx) => (
                                <a key={idx} href={`#${item.id}`} className="text-sm text-slate-600 hover:text-blue-900 font-medium font-sans">
                                    {item.text}
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {/* Cluster Navigation (Topical Authority Engine) */}
                {clusterArticles.length > 0 && (
                    <div className="w-full max-w-[720px] mb-12 p-8 bg-blue-50/50 rounded-3xl border border-blue-100/50 backdrop-blur-sm">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-600">Expert Series</span>
                        </div>
                        <h4 className="text-lg font-serif font-bold text-slate-900 mb-4">
                            Exploring {blog.category} in Depth
                        </h4>
                        <div className="grid gap-3">
                            {/* Higher Priority pillar link */}
                            {pillarArticle && (
                                <Link
                                    href={`/blog/${pillarArticle.slug}`}
                                    className={`flex items-center gap-4 p-4 rounded-xl transition-all border ${pillarArticle.slug === blog.slug
                                            ? "bg-white shadow-md border-blue-200"
                                            : "bg-slate-50/50 border-slate-100 hover:bg-white hover:shadow-sm hover:text-blue-900"
                                        }`}
                                >
                                    <div className={`w-2.5 h-2.5 rounded-full ${pillarArticle.slug === blog.slug ? "bg-blue-600 ring-4 ring-blue-100" : "bg-blue-400"}`} />
                                    <div className="flex flex-col text-left">
                                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-blue-600 mb-0.5">Pillar Foundation</span>
                                        <span className={`text-[15px] font-serif font-bold ${pillarArticle.slug === blog.slug ? "text-slate-900" : "text-slate-700"}`}>
                                            {pillarArticle.title}
                                        </span>
                                    </div>
                                    {pillarArticle.slug === blog.slug && <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-blue-600">Reading Now</span>}
                                </Link>
                            )}

                            {clusterArticles.filter(a => a.slug !== pillarArticle?.slug).map((article) => (
                                <Link
                                    key={article.id}
                                    href={`/blog/${article.slug}`}
                                    className={`flex items-center gap-3 p-3 rounded-xl transition-all ${article.slug === blog.slug
                                        ? "bg-white shadow-sm border border-slate-100"
                                        : "hover:bg-white/60 text-slate-600 hover:text-blue-900"
                                        }`}
                                >
                                    <div className={`w-1.5 h-1.5 rounded-full ${article.slug === blog.slug ? "bg-blue-600 ring-4 ring-blue-100" : "bg-slate-300"}`} />
                                    <span className={`text-[15px] font-medium font-sans ${article.slug === blog.slug ? "text-slate-900" : ""}`}>
                                        {article.title}
                                    </span>
                                    {article.slug === blog.slug && <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-blue-600">Current</span>}
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                <div
                    ref={contentRef}
                    className="prose prose-slate max-w-[720px] w-full
                    prose-p:text-[#333333] prose-p:text-[18px] prose-p:leading-[1.8] prose-p:mb-8 font-serif
                    prose-headings:font-serif prose-headings:font-bold prose-headings:text-slate-900 prose-headings:tracking-tight
                    prose-h2:text-[32px] prose-h2:mt-16 prose-h2:mb-8 prose-h2:scroll-mt-32 prose-h2:leading-tight
                    prose-h3:text-[24px] prose-h3:mt-12 prose-h3:mb-6 prose-h3:leading-tight
                    prose-li:text-[#333333] prose-li:text-[18px] prose-li:leading-[1.8] prose-li:mb-4
                    prose-strong:text-slate-900 prose-strong:font-bold
                    prose-img:rounded-2xl prose-img:my-16
                    prose-blockquote:border-l-4 prose-blockquote:border-blue-900 prose-blockquote:bg-blue-50/30 prose-blockquote:py-8 prose-blockquote:px-10 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-[22px] prose-blockquote:text-slate-800 prose-blockquote:rounded-r-2xl
                    prose-table:w-full prose-table:border-collapse prose-table:my-10
                    prose-th:bg-slate-100 prose-th:p-4 prose-th:text-left prose-th:text-[14px] prose-th:uppercase prose-th:tracking-wider prose-th:text-slate-700 prose-th:font-bold
                    prose-td:p-4 prose-td:border-b prose-td:border-slate-100 prose-td:text-[16px] prose-td:text-slate-600
                    "
                    dangerouslySetInnerHTML={{ __html: renderedContent }}
                />

                {/* FAQ Section */}
                {blog.faqs && blog.faqs.length > 0 && (
                    <section className="mt-24 w-full max-w-[720px] mx-auto border-t-2 border-slate-900 pt-16">
                        <h2 className="text-[28px] font-serif font-bold text-slate-900 mb-10 text-center">Frequently Asked Questions</h2>
                        <Accordion type="single" collapsible className="w-full space-y-4">
                            {blog.faqs.map((faq, index) => (
                                <AccordionItem key={index} value={`item-${index}`} className="border rounded-xl border-slate-200 bg-white overflow-hidden transition-all duration-300 hover:border-slate-300">
                                    <AccordionTrigger className="text-left font-bold text-slate-900 py-6 px-8 hover:no-underline text-lg font-serif">
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-slate-600 leading-relaxed pb-8 px-8 text-[17px] font-serif">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </section>
                )}

                {/* Author Bio Section */}
                <div className="mt-24 w-full max-w-[720px] bg-slate-50 rounded-[2rem] p-10 border border-slate-100 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-blue-900 flex-shrink-0 border-4 border-white shadow-lg">
                        <User className="w-12 h-12" />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h4 className="text-[11px] font-bold uppercase tracking-widest text-blue-600 mb-1">Article Author</h4>
                            <h3 className="text-2xl font-serif font-bold text-slate-900">{blog.author || "Financial Planning Expert"}</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed font-serif text-[17px]">
                            A seasoned financial advisor specializing in personalized wealth management and retirement planning for Indian investors. Dedicated to simplifying complex financial concepts for everyone.
                        </p>
                    </div>
                </div>

                {/* Call to Action */}
                <section className="mt-24 w-full max-w-[720px] p-10 md:p-16 bg-[#002B5B] rounded-[2rem] text-white text-center shadow-2xl shadow-blue-900/40 border border-blue-800">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 leading-tight">Master Your Financial Future</h2>
                    <p className="text-blue-100 text-lg md:text-xl mb-12 font-sans leading-relaxed opacity-90">
                        Join thousands of families securing their legacy with Nirvaana. Our experts build custom blueprints for your specific goals.
                    </p>
                    <Link href="/schedule">
                        <Button size="lg" className="bg-[#EFA00B] hover:bg-[#D9910A] text-slate-900 text-xl px-12 py-8 rounded-full font-bold shadow-xl group h-auto">
                            Book Free Consultation
                            <ChevronRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </section>
            </div>

            {/* Right Column - Related Section */}
            <aside className="lg:col-span-3 hidden lg:block">
                <div className="sticky top-40 space-y-12">
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-900 mb-8 pb-2 border-b-2 border-slate-900 w-fit">
                            Related Insights
                        </h3>
                        <div className="grid gap-8">
                            {relatedBlogs.map((related) => (
                                <Link key={related.id} href={`/blog/${related.slug}`} className="group block">
                                    <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 mb-4 shadow-sm">
                                        {related.featuredImage ? (
                                            <img src={related.featuredImage} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300 font-serif italic text-xs uppercase tracking-widest">{related.category}</div>
                                        )}
                                    </div>
                                    <h4 className="font-serif font-bold text-slate-900 text-[17px] group-hover:text-blue-900 transition-colors line-clamp-2 leading-snug">
                                        {related.title}
                                    </h4>
                                </Link>
                            ))}
                            {relatedBlogs.length === 0 && (
                                <p className="text-slate-400 text-sm italic py-4">Checking for updates...</p>
                            )}
                        </div>
                    </div>

                    <div className="p-8 bg-slate-900 rounded-2xl text-white">
                        <h4 className="font-serif font-bold text-xl mb-4">Newsletter</h4>
                        <p className="text-slate-400 text-sm mb-6 leading-relaxed">Financial intelligence delivered to your inbox every Sunday.</p>
                        <Button className="w-full bg-blue-600 hover:bg-blue-500 rounded-xl py-6 font-bold">Join 50k+ Readers</Button>
                    </div>
                </div>
            </aside>

            {/* Bottom Grid Section */}
            <div className="lg:col-span-12 mt-32 border-t border-slate-100 pt-24 pb-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <div>
                        <h4 className="text-[11px] font-bold uppercase tracking-[0.3em] text-blue-600 mb-3">Keep Learning</h4>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900">Explore More Financial Wisdom</h2>
                    </div>
                    <Link href="/blog">
                        <Button variant="ghost" className="text-blue-900 font-bold hover:bg-blue-50 group">
                            Full Publication Archive <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </Link>
                </div>
                <div className="grid md:grid-cols-3 gap-10">
                    {relatedBlogs.slice(0, 3).map((related) => (
                        <Link key={related.id} href={`/blog/${related.slug}`} className="group block h-full">
                            <div className="h-full bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/10 hover:-translate-y-2 flex flex-col">
                                <div className="relative h-64 overflow-hidden bg-slate-100">
                                    {related.featuredImage ? (
                                        <img src={related.featuredImage} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-300 font-serif italic">{related.category}</div>
                                    )}
                                </div>
                                <div className="p-10 flex-grow space-y-6">
                                    <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                                        <span className="bg-slate-50 px-3 py-1 rounded-full border border-slate-100 text-slate-900">{related.category}</span>
                                        <span>•</span>
                                        <span>{related.readingTime || 5} min read</span>
                                    </div>
                                    <h3 className="text-2xl font-serif font-bold text-slate-900 group-hover:text-blue-900 transition-colors leading-tight">
                                        {related.title}
                                    </h3>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
