"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import NextImage from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";
import { CONFIG } from "@/content/config";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { name: "Home", href: "/" },
    {
        name: "About",
        href: "/about",
        children: [
            { name: "Why Us", href: "/about/why-us" },
            { name: "Our Process", href: "/process" },
            { name: "Team", href: "/about/team" },
        ]
    },
    { name: "Products", href: "/products" },
    {
        name: "Solutions",
        href: "/services",
        children: [
            { name: "Retirement Planning", href: "/services/retirement-planning" },
            { name: "Goal-based Investing", href: "/services/goal-based-investing" },
            { name: "Risk Profiling", href: "/services/risk-profiling" },
            { name: "Insurance Analysis", href: "/services/insurance-adequacy" },
            { name: "Emergency Planning", href: "/services/emergency-fund" },
            { name: "Portfolio Review", href: "/services/portfolio-review" },
        ]
    },
    {
        name: "Resources",
        href: "/resources",
        children: [
            { name: "All Resources", href: "/resources" },
            { name: "Financial Calculators", href: "/calculators" },
            { name: "Risk Profile Quiz", href: "/risk-profile" },
            { name: "Investment Recommendations", href: "/resources/investment-recommendations" },
        ]
    },
    { name: "Contact", href: "/contact" },
];

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!mounted) {
        return (
            <header className="fixed top-0 w-full z-50 py-4 bg-white/95 border-b border-white/10">
                <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                    {/* Static Logo Placeholder to prevent layout shift */}
                    <div className="flex items-center gap-2">
                        <div className="relative h-20 w-80" />
                    </div>
                </div>
            </header>
        );
    }

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b",
                isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-200 py-2"
                    : "bg-white/95 backdrop-blur-md border-transparent py-2"
            )}
        >
            <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative h-12 w-48 md:h-20 md:w-80">
                        <NextImage
                            src="/images/logologo.png"
                            alt="Nirvaana Financial Services"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    {NAV_LINKS.map((link) => (
                        <div key={link.name} className="relative group">
                            {link.children ? (
                                <>
                                    <button
                                        className={cn(
                                            "flex items-center gap-1 text-sm font-medium transition-colors py-2",
                                            (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) ? "text-primary font-semibold" : "text-slate-600 hover:text-primary"
                                        )}
                                    >
                                        {link.name}
                                        <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                                    </button>

                                    {/* Dropdown Menu */}
                                    <div className="absolute top-full left-0 pt-2 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="bg-white rounded-xl shadow-xl border border-border p-2 overflow-hidden">
                                            {link.children.map((child) => (
                                                <Link
                                                    key={child.name}
                                                    href={child.href}
                                                    className="block px-4 py-2.5 text-sm text-slate-600 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors"
                                                >
                                                    {child.name}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <Link
                                    href={link.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors",
                                        (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href)) ? "text-primary font-semibold" : "text-slate-600 hover:text-primary"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            )}
                        </div>
                    ))}
                </nav>

                {/* CTA & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:flex gap-3">
                        <Button variant="outline" asChild className="hidden lg:flex">
                            <Link href={CONFIG.WHATSAPP_URL} target="_blank">
                                WhatsApp Us
                            </Link>
                        </Button>
                        <Button asChild>
                            <Link href="/schedule">
                                Schedule Call
                            </Link>
                        </Button>
                    </div>

                    <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon" className="text-slate-900">
                                <Menu className="h-7 w-7" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[350px] sm:w-[540px] p-0 border-l border-white/20 bg-white/95 backdrop-blur-xl">
                            <SheetTitle className="sr-only">Mobile Menu</SheetTitle>
                            <div className="flex flex-col h-full">
                                {/* Header inside sheet */}
                                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                                    <span className="font-serif text-xl font-bold text-slate-900">Menu</span>
                                    {/* Close button is automatically handled by SheetContent, but we can add branding here if needed */}
                                </div>

                                <div className="flex-1 overflow-y-auto py-6 px-6">
                                    <Accordion type="single" collapsible className="w-full space-y-2">
                                        {NAV_LINKS.map((link, index) => (
                                            <div key={link.name}>
                                                {link.children ? (
                                                    <AccordionItem value={`item-${index}`} className="border-b-0">
                                                        <AccordionTrigger className="hover:no-underline py-4 text-2xl font-serif font-medium text-slate-900 data-[state=open]:text-primary transition-colors">
                                                            {link.name}
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <div className="flex flex-col gap-3 pl-2 pb-2">
                                                                {link.children.map((child) => (
                                                                    <Link
                                                                        key={child.name}
                                                                        href={child.href}
                                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                                        className="text-lg text-slate-500 hover:text-primary transition-colors py-1"
                                                                    >
                                                                        {child.name}
                                                                    </Link>
                                                                ))}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ) : (
                                                    <div className="py-4">
                                                        <Link
                                                            href={link.href}
                                                            onClick={() => setIsMobileMenuOpen(false)}
                                                            className={cn(
                                                                "block text-2xl font-serif font-medium transition-colors",
                                                                (link.href === "/" ? pathname === "/" : pathname.startsWith(link.href))
                                                                    ? "text-primary"
                                                                    : "text-slate-900 hover:text-primary"
                                                            )}
                                                        >
                                                            {link.name}
                                                        </Link>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </Accordion>
                                </div>

                                {/* Footer CTA */}
                                <div className="p-6 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
                                    <Button size="lg" className="w-full text-lg h-14" asChild>
                                        <Link href="/schedule">Schedule a Free Call</Link>
                                    </Button>
                                    <Button variant="outline" size="lg" className="w-full text-lg h-14 bg-white" asChild>
                                        <Link href={CONFIG.WHATSAPP_URL} target="_blank">WhatsApp Us</Link>
                                    </Button>

                                    <div className="mt-4 text-center">
                                        <p className="text-xs text-slate-400 uppercase tracking-widest">Nirvaana Financial Services</p>
                                    </div>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
