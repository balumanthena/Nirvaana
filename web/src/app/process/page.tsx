import { ProcessTimeline } from "@/components/shared/ProcessTimeline";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CONFIG } from "@/content/config";

export default function ProcessPage() {
    return (
        <main className="pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-sm font-bold tracking-wider text-primary uppercase mb-2 block">Your Path to Financial Nirvana</span>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                        How We Work
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        We follow a rigorous, scientific process to ensure nothing is left to chance.
                    </p>
                </div>

                <ProcessTimeline />

                <div className="mt-20 text-center">
                    <Button size="lg" asChild>
                        <Link href={CONFIG.CALENDLY_URL} target="_blank">Start the Process</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
