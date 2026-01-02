import NextImage from "next/image";
import Link from "next/link";
import { CONFIG } from "@/content/config";
import { Separator } from "@/components/ui/separator";

export function ComplianceFooter() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div className="md:col-span-1">
                        <Link href="/" className="mb-6 block relative h-24 w-72">
                            <NextImage
                                src="/images/nirvaana-logo-v2.png"
                                alt={CONFIG.BRAND_NAME}
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="text-sm text-slate-500 mb-4">
                            {CONFIG.TAGLINE}
                        </p>
                        <div className="text-sm text-slate-500">
                            <p>{CONFIG.CITY}</p>
                            <p>{CONFIG.PHONE}</p>
                            <p>{CONFIG.EMAIL}</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link href="/about" className="hover:text-slate-900">About Us</Link></li>
                            <li><Link href="/process" className="hover:text-slate-900">Our Process</Link></li>
                            <li><Link href="/contact" className="hover:text-slate-900">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Services</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link href="/services/retirement-planning" className="hover:text-slate-900">Retirement Planning</Link></li>
                            <li><Link href="/services/goal-based-investing" className="hover:text-slate-900">Goal Based Investing</Link></li>
                            <li><Link href="/services/risk-profiling" className="hover:text-slate-900">Risk Profiling</Link></li>
                            <li><Link href="/services" className="hover:text-slate-900">View All Services</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold text-slate-900 mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><Link href="/sebi-disclosures" className="hover:text-slate-900">SEBI Disclosures</Link></li>
                            <li><Link href="/privacy" className="hover:text-slate-900">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-slate-900">Terms of Service</Link></li>
                            <li><Link href={CONFIG.DISCLOSURE_URL} className="hover:text-slate-900">Regulatory Info</Link></li>
                        </ul>
                    </div>
                </div>

                <Separator className="bg-slate-200 mb-8" />

                <div className="grid md:grid-cols-2 gap-8 text-xs text-slate-400">
                    <div>
                        <p className="mb-2">
                            <strong>SEBI Registration No:</strong> {CONFIG.RIA_NUMBER} | <strong>BASL Membership ID:</strong> {CONFIG.BASL_ID}
                        </p>
                        <p>
                            Investments in securities market are subject to market risks. Read all the related documents carefully before investing.
                            Registration granted by SEBI, membership of BASL and certification from NISM in no way guarantee performance of the intermediary or provide any assurance of returns to investors.
                        </p>
                    </div>
                    <div className="md:text-right">
                        <p className="mb-2">
                            © {new Date().getFullYear()} {CONFIG.BRAND_NAME}. All rights reserved.
                        </p>
                        <p>
                            Designed with precision and trust.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
