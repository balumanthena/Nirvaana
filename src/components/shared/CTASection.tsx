import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CONFIG } from "@/content/config";

export function CTASection() {
    return (
        <section className="relative isolated overflow-hidden py-24 sm:py-32">
            {/* Background Image */}
            <div className="absolute inset-0 -z-20">
                <Image
                    src="/images/Hero4.png"
                    alt="Financial Future"
                    fill
                    className="object-cover object-center"
                    quality={90}
                />
                <div className="absolute inset-0 bg-slate-950/80 mix-blend-multiply" />
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
