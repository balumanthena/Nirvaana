"use client";

import React from "react";
import { RiskProfileQuiz } from "@/components/calculators/RiskProfileQuiz";

export default function RiskProfilePage() {
    return (
        <main className="bg-slate-50 min-h-screen pt-20 pb-20">
            {/* Hero Section */}
            <section className="bg-slate-900 text-white py-16 mb-12">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">What's Your Risk Style?</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                        Successful investing starts with knowing yourself. Take this free 2-minute assessment to discover your investment personality.
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 max-w-3xl">
                <RiskProfileQuiz />

                {/* Additional Content / FAQ could go here */}
                <div className="mt-16 text-center">
                    <p className="text-slate-500 text-sm">
                        This quiz helps in understanding your psychological comfort with market volatility and your financial capacity to take risks.
                    </p>
                </div>
            </div>
        </main>
    );
}
