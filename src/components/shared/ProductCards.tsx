"use client";

import {
    MutualFundsIllustration,
    TermLifeIllustration,
    HealthInsuranceIllustration,
} from "@/components/shared/Illustrations";

const PRODUCTS = [
    {
        subheader: "",
        title: "Mutual Funds",
        description: (
            <>
                Mutual Funds offer a simple way to invest across diversified assets, helping you build{" "}
                <span className="font-semibold text-primary">Long-Term Wealth Creation</span>. Through SIPs, you can start small and benefit from the{" "}
                <span className="font-semibold text-primary">Power of Compounding</span> and rupee-cost averaging to achieve your financial goals with confidence.
            </>
        ),
        icon: MutualFundsIllustration,
    },
    {
        subheader: "",
        title: "Health Insurance",
        description: (
            <>
                Health Insurance is essential for protecting your savings from rising medical expenses. It offers extensive hospitalization coverage and cashless treatment at network hospitals, creating a dependable{" "}
                <span className="font-semibold text-primary">Safety Net</span> for your health and finances.
            </>
        ),
        icon: HealthInsuranceIllustration,
    },
    {
        subheader: "",
        title: "Term Insurance",
        description: (
            <>
                Term Insurance provides high, affordable coverage designed to protect your loved ones during life’s uncertainties. It offers complete{" "}
                <span className="font-semibold text-primary">Pure Protection</span> to{" "}
                <span className="font-semibold text-primary">secure</span> your family's{" "}
                <span className="font-semibold text-primary">financial future</span>, ensuring stability even in your absence.
            </>
        ),
        icon: TermLifeIllustration,
    }
];

export function ProductCards() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1200px] mx-auto">
            {PRODUCTS.map((product, index) => (
                <div
                    key={index}
                    className="group relative bg-white border border-slate-100 rounded-xl p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center overflow-hidden"
                >
                    {/* Top Accent Line on Hover */}
                    <div className="absolute top-0 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />

                    {/* Icon */}
                    <div className="w-14 h-14 mb-5 rounded-full bg-[#F4F4F4] flex items-center justify-center group-hover:bg-primary/5 transition-colors duration-300 p-3">
                        <product.icon className="w-full h-full drop-shadow-none transform group-hover:scale-105 transition-transform duration-300" />
                    </div>

                    {/* Title */}
                    <h4 className="text-base font-bold text-slate-800 mb-4 group-hover:text-primary transition-colors duration-300 font-serif tracking-tight">
                        {product.title}
                    </h4>

                    {/* Divider */}
                    <div className="w-10 h-[1px] bg-slate-200 mb-4" />

                    {/* Description */}
                    <div className="text-slate-600 leading-normal text-[14px] max-w-[90%] mx-auto">
                        {product.description}
                    </div>
                </div>
            ))}
        </div>
    );
}
