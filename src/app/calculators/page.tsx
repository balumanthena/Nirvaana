"use client";

import React, { useState } from "react";
import { SipCalculator } from "@/components/calculators/SipCalculator";
import { RetirementCalculator } from "@/components/calculators/RetirementCalculator";
import { ArrowRight, Calculator, TreeDeciduous } from "lucide-react";
import Link from "next/link";

import { CalculatorsFAQ } from "@/components/calculators/CalculatorsFAQ";

export default function CalculatorsPage() {
    const [activeTab, setActiveTab] = useState<"sip" | "retirement">("sip");

    const appSchema = {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Nirvana Wealth Financial Calculators",
        "applicationCategory": "FinanceApplication",
        "operatingSystem": "Any",
        "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "INR"
        }
    };

    return (
        <main className="bg-slate-50 min-h-screen pt-20 pb-20">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
            />
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-16 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Financial Calculators</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Plan your future with precision. Use our free tools to estimate your wealth creation potential and retirement needs.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-5xl">
                {/* Tab Navigation */}
                <div className="flex justify-center mb-8">
                    <div className="inline-flex bg-white p-1 rounded-2xl shadow-sm border border-slate-200">
                        <button
                            onClick={() => setActiveTab("sip")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === "sip"
                                ? "bg-blue-600 text-white shadow-md"
                                : "text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            <Calculator className="w-5 h-5" />
                            SIP Calculator
                        </button>
                        <button
                            onClick={() => setActiveTab("retirement")}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${activeTab === "retirement"
                                ? "bg-green-600 text-white shadow-md"
                                : "text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            <TreeDeciduous className="w-5 h-5" />
                            Retirement Planner
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="max-w-4xl mx-auto">
                    {activeTab === "sip" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="mb-6 text-center">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Systematic Investment Plan (SIP)</h2>
                                <p className="text-slate-600">See how small regular investments can grow into a large corpus over time.</p>
                            </div>
                            <div className="max-w-xl mx-auto mb-12">
                                <SipCalculator />
                            </div>

                            {/* SIP SEO Content */}
                            <div className="prose prose-slate max-w-none bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">How SIP Works</h3>
                                <p className="text-slate-600 mb-4">
                                    A Systematic Investment Plan (SIP) is a disciplined way of investing in mutual funds. By investing a fixed amount regularly (e.g., monthly), you can build a significant corpus over time.
                                </p>
                                <p className="text-slate-600">
                                    SIPs benefit from <strong>Rupee Cost Averaging</strong>, which means you buy more units when the market is low and fewer when the market is high. This approach, combined with the power of compounding, helps in wealth creation and mitigating market volatility over the long term.
                                </p>
                            </div>
                        </div>
                    )}

                    {activeTab === "retirement" && (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="mb-6 text-center">
                                <h2 className="text-2xl font-bold text-slate-900 mb-2">Retirement Planning Tool</h2>
                                <p className="text-slate-600">Estimate the retirement corpus you need to maintain your current lifestyle.</p>
                            </div>
                            <div className="max-w-xl mx-auto mb-12">
                                <RetirementCalculator />
                            </div>

                            {/* Retirement SEO Content */}
                            <div className="prose prose-slate max-w-none bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                                <h3 className="text-xl font-bold text-slate-900 mb-4">Why Plan Retirement Early?</h3>
                                <p className="text-slate-600 mb-4">
                                    Retirement planning isn't just about saving; it's about combating inflation. The cost of living doubles roughly every 10-12 years. If you spend ₹50,000 monthly today, you might need ₹1.5 Lakhs or more in 20 years to maintain the same lifestyle.
                                </p>
                                <p className="text-slate-600">
                                    Our retirement planner helps you visualize this future requirement. By starting early and investing in assets beating inflation, you can build a sufficient corpus that ensures your financial independence post-retirement.
                                </p>
                            </div>
                        </div>
                    )}
                </div>

                {/* FAQ Section */}
                <CalculatorsFAQ />

                {/* Footer CTA */}
                <div className="mt-16 text-center bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Need help interpreting these numbers?</h3>
                    <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
                        Calculators provide estimates, but a personalized plan considers tax, risk, and life goals. Let's build your roadmap together.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center px-8 py-4 bg-amber-600 text-white font-medium rounded-full hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20"
                    >
                        Get Free Financial Consultation
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </Link>
                </div>

            </div>
        </main>
    );
}
