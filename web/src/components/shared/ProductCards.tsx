"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
    MutualFundsIllustration,
    TermLifeIllustration,
    HealthInsuranceIllustration
} from "@/components/shared/Illustrations";

const PRODUCTS = [
    {
        subheader: "",
        title: "Mutual Funds",
        description: "When you buy a mutual fund, your money is combined with the money from other investors, and allows you to buy part of a pool of investments.",
        icon: MutualFundsIllustration,
    },
    {
        subheader: "",
        title: "Term Insurance",
        description: "Your Car, Travel, Home, Office, Health & Bike Insurance. Get an Instant quote Now. Customized Quote in 2 min. Issue Policy Online in 2 min. Get Tax Benefits.",
        icon: TermLifeIllustration,
    },
    {
        subheader: "",
        title: "Health Insurance",
        description: "Important as it protects your family and lets you leave them a non-taxable amount at the time of death. Issue Policy Online in 5 min. Get Tax Benefits.",
        icon: HealthInsuranceIllustration,
    }
];

export function ProductCards() {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            {PRODUCTS.map((product, index) => (
                <div key={index} className="flex flex-col space-y-4 group">
                    {/* Sub-header above card */}
                    {product.subheader && (
                        <h3 className="text-xl font-serif font-medium text-primary text-center opacity-80 group-hover:opacity-100 transition-opacity">
                            {product.subheader}
                        </h3>
                    )}

                    {/* Card */}
                    <Card className="border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-full bg-white rounded-2xl hover:border-primary/20 overflow-hidden relative">
                        {/* Subtle top accent */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/0 to-transparent group-hover:via-primary/50 transition-all duration-500" />

                        <CardContent className="flex flex-col items-center text-center p-8 h-full">
                            {/* Illustration Container */}
                            <div className="w-20 h-20 mb-6 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-primary/5 transition-colors duration-500 p-4">
                                <product.icon className="w-full h-full drop-shadow-sm transform group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            {/* Title */}
                            <h4 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors duration-300">
                                {product.title}
                            </h4>

                            {/* Description */}
                            <p className="text-slate-600 leading-relaxed text-sm">
                                {product.description}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            ))}
        </div>
    );
}
