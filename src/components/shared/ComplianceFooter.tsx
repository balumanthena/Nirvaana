import NextImage from "next/image";
import Link from "next/link";
import { CONFIG } from "@/content/config";
import { Separator } from "@/components/ui/separator";

export function ComplianceFooter() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid md:grid-cols-4 gap-8 mb-12">
                    <div className="md:col-span-2">
                        <Link href="/" className="mb-6 block relative h-16 w-48 md:h-24 md:w-72">
                            <NextImage
                                src="/images/logologo.png"
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


                </div>

                <Separator className="bg-slate-200 mb-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400">
                    <p>
                        © {new Date().getFullYear()} {CONFIG.BRAND_NAME}. All rights reserved.
                    </p>
                    <p>
                        Designed and Developed by <a href="https://www.citrux.in/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-600 transition-colors">Citrux</a>
                    </p>
                </div>
            </div>
        </footer>
    );
}
