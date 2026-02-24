import NextImage from "next/image";
import Link from "next/link";
import { CONFIG } from "@/content/config";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin, Linkedin, Twitter } from "lucide-react";

export function ComplianceFooter() {
    return (
        <footer className="bg-slate-50 border-t border-slate-200 pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="block relative h-16 w-48 md:h-20 md:w-64">
                            <NextImage
                                src="/images/brand-logo.png"
                                alt={CONFIG.BRAND_NAME}
                                fill
                                className="object-contain object-left"
                            />
                        </Link>
                        <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
                            {CONFIG.TAGLINE}
                        </p>
                        <div className="flex items-center gap-4">
                            <a href={CONFIG.SOCIAL_LINKS.LINKEDIN} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all duration-300">
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a href={CONFIG.SOCIAL_LINKS.TWITTER} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-primary hover:border-primary transition-all duration-300">
                                <Twitter className="w-4 h-4" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Company</h4>
                        <ul className="space-y-4 text-sm text-slate-600">
                            <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                            <li><Link href="/process" className="hover:text-primary transition-colors">Our Process</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                            <li><Link href="/about/team" className="hover:text-primary transition-colors">Our Team</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Services</h4>
                        <ul className="space-y-4 text-sm text-slate-600">
                            <li><Link href="/services/retirement-planning" className="hover:text-primary transition-colors">Retirement Planning</Link></li>
                            <li><Link href="/services/goal-based-investing" className="hover:text-primary transition-colors">Goal Based Investing</Link></li>
                            <li><Link href="/services/risk-profiling" className="hover:text-primary transition-colors">Risk Profiling</Link></li>
                            <li><Link href="/services" className="hover:text-primary transition-colors">View All Services</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-xs">Get in Touch</h4>
                        <div className="space-y-6">
                            <div className="space-y-3 text-sm text-slate-600">
                                <div className="flex items-start gap-3">
                                    <Phone className="w-4 h-4 text-primary shrink-0 mt-1" />
                                    <p>{CONFIG.PHONE}</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Mail className="w-4 h-4 text-primary shrink-0 mt-1" />
                                    <p>{CONFIG.EMAIL}</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                {CONFIG.ADDRESSES.map((addr, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <MapPin className="w-4 h-4 text-primary shrink-0 mt-1" />
                                        <div className="text-xs text-slate-500 space-y-1">
                                            <p className="font-semibold text-slate-900 text-sm">{addr.label}</p>
                                            <p>{addr.line1}</p>
                                            <p>{addr.line2}</p>
                                            <p>{addr.line3}, {addr.pincode}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <Separator className="bg-slate-200 mb-8" />

                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] md:text-xs text-slate-400 uppercase tracking-widest">
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
