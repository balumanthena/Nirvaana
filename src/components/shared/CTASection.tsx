import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONFIG } from "@/content/config";

export function CTASection() {
    return (
        <section className="relative isolated overflow-hidden bg-slate-950 py-24 sm:py-32">
            {/* Background Glow Effect */}
            <div className="absolute left-[50%] top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6" aria-hidden="true">
                <div
                    className="aspect-[1155/678] w-[72.1875rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                    style={{
                        clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        background: 'linear-gradient(to top right, var(--color-primary), #4f46e5)'
                    }}
                />
            </div>

            <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
                <h2 className="text-4xl md:text-5xl font-serif font-medium text-white mb-6 tracking-tight drop-shadow-sm">
                    Ready to take control of your <br className="hidden md:block" />financial future?
                </h2>
                <p className="text-slate-300 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
                    No hidden commissions. No biased advice. Just pure financial clarity designed for you.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button size="lg" className="h-14 px-8 w-full sm:w-auto text-lg bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300" asChild>
                        <Link href={CONFIG.CALENDLY_URL} target="_blank">Schedule a Free Call</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 px-8 w-full sm:w-auto text-lg border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 hover:text-white transition-all duration-300" asChild>
                        <Link href={CONFIG.WHATSAPP_URL} target="_blank">WhatsApp Us</Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
