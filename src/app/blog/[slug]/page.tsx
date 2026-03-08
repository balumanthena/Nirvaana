import { Metadata, ResolvingMetadata } from "next";
import { getBlogBySlug, getRelatedBlogs, incrementViews, getClusterBlogs } from "@/lib/blog-db";
import { CONFIG } from "@/content/config";
import { Calendar, ChevronRight, Clock, Eye, List, User } from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Script from "next/script";
import { Card, CardContent } from "@/components/ui/card";
import BlogContent from "./BlogContent";

interface Props {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) return { title: "Blog Not Found" };

    return {
        title: blog.seoTitle || blog.title,
        description: blog.metaDescription || blog.excerpt,
        openGraph: {
            title: blog.seoTitle || blog.title,
            description: blog.metaDescription || blog.excerpt,
            images: [blog.featuredImage],
            type: "article",
            publishedTime: blog.publishedAt?.toDate().toISOString(),
        },
        twitter: {
            card: "summary_large_image",
            title: blog.seoTitle || blog.title,
            description: blog.metaDescription || blog.excerpt,
            images: [blog.featuredImage],
        },
    };
}

export default async function BlogDetailPage({ params }: Props) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) return <div className="pt-32 pb-20 text-center">Article not found. <Link href="/blog" className="text-blue-600 underline">Back to Blog</Link></div>;

    // Increment views (Server-side fire-and-forget)
    if (blog.id) {
        incrementViews(blog.id).catch(console.error);
    }

    const relatedBlogs = await getRelatedBlogs(blog.category, blog.id!, blog.tags);

    // Fetch Cluster Articles for Topical Authority
    const clusterPillarSlug = blog.isPillar ? blog.slug : blog.pillarSlug;
    const clusterArticles = clusterPillarSlug ? await getClusterBlogs(clusterPillarSlug) : [];
    const pillarArticle = (blog.isPillar) ? blog : (blog.pillarSlug ? await getBlogBySlug(blog.pillarSlug) : null);

    // Universal Rendering & TOC Logic
    let renderedContent = blog.content;
    const toc: { text: string; id: string }[] = [];

    const generateId = (text: string) => text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');

    try {
        const parsed = JSON.parse(blog.content);
        if (parsed.blocks && Array.isArray(parsed.blocks)) {
            // Render Editor.js JSON to HTML
            renderedContent = parsed.blocks.map((block: any) => {
                switch (block.type) {
                    case 'header':
                        const hId = generateId(block.data.text);
                        if (block.data.level === 2) toc.push({ text: block.data.text, id: hId });
                        const Tag = `h${block.data.level}`;
                        return `<${Tag} id="${hId}">${block.data.text}</${Tag}>`;
                    case 'paragraph':
                        return `<p>${block.data.text}</p>`;
                    case 'list':
                        const listTag = block.data.style === 'ordered' ? 'ol' : 'ul';
                        const items = block.data.items.map((item: string) => `<li>${item}</li>`).join('');
                        return `<${listTag}>${items}</${listTag}>`;
                    case 'image':
                        return `<figure><img src="${block.data.file.url}" alt="${block.data.caption || ''}" />${block.data.caption ? `<figcaption>${block.data.caption}</figcaption>` : ''}</figure>`;
                    case 'quote':
                        return `<blockquote>${block.data.text}${block.data.caption ? `<cite>${block.data.caption}</cite>` : ''}</blockquote>`;
                    case 'table':
                        const rows = block.data.content.map((row: string[]) => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');
                        return `<table><tbody>${rows}</tbody></table>`;
                    case 'code':
                        return `<pre><code>${block.data.code}</code></pre>`;
                    case 'delimiter':
                        return `<hr />`;
                    case 'checklist':
                        const checks = block.data.items.map((item: any) => `<li><input type="checkbox" disabled checked="${item.checked}" /> ${item.text}</li>`).join('');
                        return `<ul class="checklist">${checks}</ul>`;
                    default:
                        return '';
                }
            }).join('');
        }
    } catch (e) {
        // Fallback to HTML parsing
        const h2Regex = /<h2[^>]*>(.*?)<\/h2>/g;
        let match;
        while ((match = h2Regex.exec(blog.content)) !== null) {
            const text = match[1].replace(/<[^>]*>?/gm, '');
            const id = generateId(text);
            toc.push({ text, id });
            renderedContent = renderedContent.replace(match[0], `<h2 id="${id}">${match[1]}</h2>`);
        }
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": blog.seoTitle || blog.title,
        "description": blog.metaDescription || blog.excerpt,
        "image": blog.featuredImage,
        "datePublished": blog.publishedAt?.toDate().toISOString(),
        "dateModified": blog.publishedAt?.toDate().toISOString(),
        "author": {
            "@type": "Person",
            "name": blog.author || "Nirvaana Wealth"
        },
        "publisher": {
            "@type": "Organization",
            "name": "Nirvaana Wealth Planner",
            "logo": {
                "@type": "ImageObject",
                "url": "https://nirvaanawealth.com/logo.png" // Update with real URL if available
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://nirvaanawealth.com/blog/${blog.slug}`
        }
    };

    const faqSchema = blog.faqs && blog.faqs.length > 0 ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": blog.faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    } : null;

    return (
        <main className="pt-40 pb-20 bg-white min-h-screen selection:bg-blue-100">
            {/* Schema Script */}
            <Script
                id="blog-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {faqSchema && (
                <Script
                    id="faq-schema"
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}

            <article className="max-w-[1440px] mx-auto">
                {/* Visual Header - Focused & Professional */}
                <header className="px-4 md:px-6 text-center mb-16 pt-8">
                    <div className="flex justify-center mb-8">
                        <span className="text-blue-600 text-[11px] font-bold uppercase tracking-[0.3em] px-4 py-1.5 bg-blue-50 rounded-full border border-blue-100">
                            {blog.category}
                        </span>
                    </div>

                    <div className="max-w-[850px] mx-auto space-y-6">
                        <h1 className="text-[32px] md:text-[40px] lg:text-[52px] font-serif font-bold text-slate-900 leading-[1.15] tracking-tight line-clamp-2">
                            {blog.title}
                        </h1>

                        {blog.excerpt && (
                            <p className="text-xl md:text-2xl text-slate-500 font-sans leading-relaxed font-light">
                                {blog.excerpt}
                            </p>
                        )}
                    </div>

                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4 text-slate-500 font-sans text-sm md:text-base mb-16">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{blog.author || "Nirvaana Expert"}</span>
                        </div>
                        <span className="text-slate-300">•</span>
                        <span>{blog.publishedAt?.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                        <span className="text-slate-300">•</span>
                        <div className="flex items-center gap-1.5 text-blue-600 font-semibold">
                            <Clock className="w-4 h-4" />
                            <span>{blog.readingTime || 5} min read</span>
                        </div>
                    </div>

                    <div className="max-w-6xl mx-auto rounded-[4rem] overflow-hidden shadow-[0_60px_100px_-25px_rgba(0,0,0,0.15)] bg-slate-100 ring-1 ring-slate-200/50 relative group">
                        {blog.featuredImage ? (
                            <img
                                src={blog.featuredImage}
                                alt={blog.title}
                                className="w-full h-auto object-cover max-h-[800px] group-hover:scale-105 transition-transform duration-[5s] ease-out"
                                loading="eager"
                            />
                        ) : (
                            <div className="w-full aspect-[21/9] flex flex-col items-center justify-center text-slate-300">
                                <Calendar className="w-16 h-16 mb-4 opacity-20" />
                                <span className="font-serif italic text-xl opacity-50 uppercase tracking-[0.4em]">Personal Finance Insights</span>
                            </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    </div>
                </header>

                <BlogContent
                    blog={blog}
                    renderedContent={renderedContent}
                    toc={toc}
                    relatedBlogs={relatedBlogs}
                    clusterArticles={clusterArticles}
                    pillarSlug={clusterPillarSlug}
                    pillarArticle={pillarArticle}
                />
            </article>
        </main>
    );
}
