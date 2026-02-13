import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CONFIG } from "@/content/config";
import { CheckCircle2 } from "lucide-react";

export default function TeamPage() {
    return (
        <main className="pt-[80px] lg:min-h-screen lg:overflow-hidden flex flex-col relative bg-background">
            <div className="container mx-auto px-4 md:px-8 max-w-7xl flex-1 flex flex-col justify-center py-6 lg:py-8">

                <div className="max-w-4xl mx-auto mb-8 shrink-0">
                    <h1 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4 text-center">
                        Meet Our Team
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed text-center max-w-2xl mx-auto">
                        Experienced professionals committed to your financial well-being.
                    </p>
                </div>

                {/* Redesigned Founder Section */}
                <div className="bg-gradient-to-br from-white to-slate-50 border border-slate-100 shadow-xl rounded-2xl overflow-hidden relative w-full shrink-0">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 p-6 lg:p-12 items-center">

                        {/* Decorative Background Element */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />

                        {/* Founder Image Column (45% width) */}
                        <div className="relative group flex justify-center lg:justify-end">
                            <div className="w-full max-w-sm aspect-[3/4] lg:max-h-[480px] rounded-2xl overflow-hidden shadow-2xl border-2 border-primary/20 relative z-10 transition-transform duration-500 group-hover:scale-[1.02]">
                                <img
                                    src="/S26_3826.jpg.jpeg"
                                    alt="Srikanth Revoju - Founder & Principal Planner"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Decorative Frame Offset */}
                            <div className="absolute inset-0 border-2 border-primary/10 rounded-2xl translate-x-3 translate-y-3 -z-0 w-full max-w-sm lg:max-h-[480px] mx-auto lg:mx-0 lg:ml-auto" />
                        </div>

                        {/* Content Column (55% width) */}
                        <div className="text-center lg:text-left relative z-10">
                            <div className="max-w-xl mx-auto lg:mx-0">
                                <h3 className="text-3xl lg:text-5xl font-serif font-bold text-slate-900 mb-2 tracking-tight">
                                    Srikanth Revoju
                                </h3>
                                <p className="text-primary font-medium text-lg uppercase tracking-wider mb-6">
                                    Founder & Principal Planner
                                </p>

                                <div className="text-slate-600 space-y-4 leading-relaxed text-base">
                                    <p>
                                        I bring over a decade of experience in capital markets and financial education, with a clear mission: to simplify personal finance and help families become truly independent. As an <strong>AMFI Registered Mutual Fund Distributor</strong> and <strong>IRDAI‑licensed insurance agent</strong>, I provide calm, objective, and personalised guidance tailored to each family’s unique goals.
                                    </p>
                                    <p>
                                        I do not focus on selling products; I focus on <strong className="text-slate-800">building financially confident families</strong> through goal‑based planning that supports education, retirement, health protection, and long‑term wealth creation.
                                    </p>
                                    <p>
                                        My philosophy is simple: real wealth is not about high‑net‑worth individuals; it is about creating <strong className="text-slate-800">high‑net‑worth families</strong>.
                                    </p>
                                    <p>
                                        Through transparent advice and customised strategies, I aim to be your <strong>Family Wealth Guardian</strong>, supporting you at every stage of your financial journey.
                                    </p>
                                </div>

                                {/* Trust Badges */}
                                <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3 md:gap-4">



                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-semibold text-slate-700">AMFI Registered Mutual Fund Distributor </span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border border-slate-200 shadow-sm">
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                        <span className="text-sm font-semibold text-slate-700">IRDAI licensed insurance agent</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-8 md:mt-12 text-center shrink-0">
                    <h3 className="text-xl font-serif font-bold text-foreground mb-4">Want to work with us?</h3>
                    <p className="text-muted-foreground mb-6 text-sm md:text-base">
                        We are always looking for talented individuals to join our mission.
                    </p>
                    <Button size="lg" asChild className="mb-4">
                        <Link href="/contact">Get in Touch</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
