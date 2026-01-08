import { SERVICES } from "@/content/services";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CONFIG } from "@/content/config";
import { ArrowLeft, CheckCircle } from "lucide-react";
import Image from "next/image";

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
                <Link href="/services" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Services
                </Link>
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
                    <div>
                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                            <Icon className="w-8 h-8 text-primary" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6">
                            {service.title}
                        </h1>
                        <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                            {service.fullDescription}
                        </p>

                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 mb-8">
                            <h3 className="font-semibold text-slate-900 mb-4">What&apos;s included:</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">Comprehensive analysis of current situation</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">Customized strategy document</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">Implementation support</span>
                                </li>
                            </ul>
                        </div>

                        <div className="flex gap-4 mb-12">
                            <Button size="lg" asChild>
                                <Link href="/schedule">Get Started</Link>
                            </Button>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="border-t border-slate-200 pt-8 flex justify-between items-center gap-4">
                            {(() => {
                                const currentIndex = SERVICES.findIndex(s => s.slug === service.slug);
                                const prevService = SERVICES[currentIndex - 1];
                                const nextService = SERVICES[currentIndex + 1];

                                return (
                                    <>
                                        <div>
                                            {prevService ? (
                                                <Link
                                                    href={`/services/${prevService.slug}`}
                                                    className="group flex flex-col items-start gap-1"
                                                >
                                                    <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-wider flex items-center gap-1">
                                                        <ArrowLeft className="w-3 h-3" /> Previous
                                                    </span>
                                                    <span className="text-base font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 max-w-[150px]">
                                                        {prevService.title}
                                                    </span>
                                                </Link>
                                            ) : (
                                                <div />
                                            )}
                                        </div>

                                        <div>
                                            {nextService ? (
                                                <Link
                                                    href={`/services/${nextService.slug}`}
                                                    className="group flex flex-col items-end gap-1 text-right"
                                                >
                                                    <span className="text-xs font-medium text-muted-foreground group-hover:text-primary transition-colors uppercase tracking-wider flex items-center gap-1">
                                                        Next <ArrowLeft className="w-3 h-3 rotate-180" />
                                                    </span>
                                                    <span className="text-sm md:text-base font-serif font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1 max-w-[150px]">
                                                        {nextService.title}
                                                    </span>
                                                </Link>
                                            ) : (
                                                <div />
                                            )}
                                        </div>
                                    </>
                                );
                            })()}
                        </div>
                    </div>

                    {/* Visual Placeholder for Service Image */}
                    {/* Visual Placeholder for Service Image */}
                    <div className="bg-slate-200 rounded-3xl aspect-square lg:aspect-auto lg:h-full min-h-[300px] lg:min-h-[400px] overflow-hidden relative">
                        {/* @ts-ignore */}
                        {service.image ? (
                            /* @ts-ignore */
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                            />
                        ) : null}
                    </div>
                </div>


            </div>
        </main>
    );
}
