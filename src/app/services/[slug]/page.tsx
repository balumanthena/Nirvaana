import { SERVICES } from "@/content/services";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CONFIG } from "@/content/config";
import { ArrowLeft, CheckCircle } from "lucide-react";

// Correctly define PageProps for Next.js 15+ (if applicable) or standard App Router
interface PageProps {
    params: Promise<{
        slug: string;
    }>;
}

export function generateStaticParams() {
    return SERVICES.map((service) => ({
        slug: service.slug,
    }));
}

export default async function ServicePage({ params }: PageProps) {
    const { slug } = await params;
    const service = SERVICES.find((s) => s.slug === slug);

    if (!service) {
        notFound();
    }

    const Icon = service.icon;

    return (
        <main className="pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <Link href="/services" className="inline-flex items-center text-slate-500 hover:text-slate-900 mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                </Link>
                <div className="grid lg:grid-cols-2 gap-12 items-start">
                    <div>
                        <div className="w-16 h-16 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6">
                            <Icon className="w-8 h-8 text-emerald-700" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                            {service.title}
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                            {service.fullDescription}
                        </p>

                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
                            <h3 className="font-semibold text-slate-900 mb-4">What&apos;s included:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                    <span className="text-slate-700">Comprehensive analysis of current situation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                    <span className="text-slate-700">Customized strategy document</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                                    <span className="text-slate-700">Implementation support</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex gap-4">
                            <Button size="lg" asChild>
                                <Link href="/schedule">Get Started</Link>
                            </Button>
                        </div>
                    </div>

                    {/* Visual Placeholder for Service Image */}
                    <div className="bg-slate-200 rounded-3xl aspect-square lg:aspect-auto lg:h-full min-h-[400px]"></div>
                </div>
            </div>
        </main>
    );
}
