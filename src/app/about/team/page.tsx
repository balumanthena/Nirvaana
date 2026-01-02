import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CONFIG } from "@/content/config";
import { CheckCircle2 } from "lucide-react";

export default function TeamPage() {
    return (
        <main className="pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-6 text-center">
                        Meet Our Team
                    </h1>
                    <p className="text-xl text-muted-foreground mb-16 leading-relaxed text-center max-w-2xl mx-auto">
                        Experienced professionals committed to your financial well-being.
                    </p>

                    <h2 className="text-2xl font-serif font-bold text-foreground mt-12 mb-6 text-center">Principal Planner</h2>
                    <div className="bg-secondary p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center border border-border shadow-md max-w-3xl mx-auto">
                        <div className="w-40 h-40 bg-background rounded-full shrink-0 border-4 border-white shadow-sm overflow-hidden">
                            {/* Placeholder for real team image if available later */}
                            <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 font-bold text-3xl">B</div>
                        </div>
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl font-bold text-foreground mb-2">Balakrishna</h3>
                            <p className="text-primary font-semibold mb-4">Founder & Principal Planner</p>
                            <p className="text-muted-foreground mb-6 leading-relaxed">
                                Certified Financial Planner (CFP) with 10+ years of experience in capital markets.
                                Passionate about simplifying personal finance and helping families achieve true independence from financial stress.
                            </p>
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-foreground/80">
                                <li className="flex items-center gap-2 justify-center md:justify-start"><CheckCircle2 className="w-4 h-4 text-primary" /> CFP Certified</li>
                                <li className="flex items-center gap-2 justify-center md:justify-start"><CheckCircle2 className="w-4 h-4 text-primary" /> SEBI RIA</li>
                                <li className="flex items-center gap-2 justify-center md:justify-start"><CheckCircle2 className="w-4 h-4 text-primary" /> NISM X-A & X-B</li>
                                <li className="flex items-center gap-2 justify-center md:justify-start"><CheckCircle2 className="w-4 h-4 text-primary" /> Fee-Only Advisor</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-20 text-center">
                        <h3 className="text-2xl font-serif font-bold text-foreground mb-6">Want to work with us?</h3>
                        <p className="text-muted-foreground mb-8">
                            We are always looking for talented individuals to join our mission.
                        </p>
                        <Button size="lg" asChild>
                            <Link href="/contact">Get in Touch</Link>
                        </Button>
                    </div>

                </div>
            </div>
        </main>
    );
}
