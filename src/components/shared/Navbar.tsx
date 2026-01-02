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
    { name: "Resources", href: "/resources" },
    { name: "Contact", href: "/contact" },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mounted, setMounted] = useState(false);
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
                    <div className="relative h-20 w-80">
                        <NextImage
                            src="/images/nirvaana-logo-v2.png"
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
                            <Link href={CONFIG.CALENDLY_URL} target="_blank">
                                Schedule Call
                            </Link>
                        </Button>
                    </div>

                    <Sheet>
                        <SheetTrigger asChild className="md:hidden">
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] overflow-y-auto">
                            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                            <div className="flex flex-col gap-6 mt-8">
                                <div className="flex flex-col gap-4">
                                    {NAV_LINKS.map((link) => (
                                        <div key={link.name} className="flex flex-col gap-2">
                                            {link.children ? (
                                                <>
                                                    <span className="text-lg font-medium text-slate-900 border-b pb-1 mb-1">
                                                        {link.name}
                                                    </span>
                                                    <div className="flex flex-col gap-3 pl-4 border-l-2 border-slate-100 ml-1">
                                                        {link.children.map((child) => (
                                                            <Link
                                                                key={child.name}
                                                                href={child.href}
                                                                className="text-base text-slate-600 hover:text-primary"
                                                            >
                                                                {child.name}
                                                            </Link>
                                                        ))}
                                                    </div>
                                                </>
                                            ) : (
                                                <Link
                                                    href={link.href}
                                                    className="text-lg font-medium text-slate-700 hover:text-primary"
                                                >
                                                    {link.name}
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-col gap-3 mt-4">
                                    <Button className="w-full" asChild>
                                        <Link href={CONFIG.CALENDLY_URL} target="_blank">Schedule Call</Link>
                                    </Button>
                                    <Button variant="outline" className="w-full" asChild>
                                        <Link href={CONFIG.WHATSAPP_URL} target="_blank">WhatsApp</Link>
                                    </Button>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
