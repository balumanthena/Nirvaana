"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { NumberTicker } from "@/components/shared/NumberTicker";
import { FadeIn } from "@/components/shared/FadeIn";

export const SipCalculator = () => {
    const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
    const [expectedReturn, setExpectedReturn] = useState(12);
    const [duration, setDuration] = useState(10);
    const [result, setResult] = useState({
        investedAmount: 0,
        estimatedReturns: 0,
        totalValue: 0,
    });

    useEffect(() => {
        const i = expectedReturn / 12 / 100;
        const n = duration * 12;

        // SIP Formula: M = P × ({[1 + i]^n - 1} / i) × (1 + i)
        const totalValue =
            monthlyInvestment *
            ((Math.pow(1 + i, n) - 1) / i) *
            (1 + i);

        const investedAmount = monthlyInvestment * n;
        const estimatedReturns = totalValue - investedAmount;

        setResult({
            investedAmount: Math.round(investedAmount),
            estimatedReturns: Math.round(estimatedReturns),
            totalValue: Math.round(totalValue),
        });
    }, [monthlyInvestment, expectedReturn, duration]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-blue-50 rounded-lg">
                    <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">SIP Calculator</h2>
            </div>

            <div className="space-y-6">
                {/* Monthly Investment */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Monthly Investment
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                            ₹
                        </span>
                        <input
                            type="number"
                            min="500"
                            value={monthlyInvestment}
                            onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        />
                    </div>
                    <input
                        type="range"
                        min="500"
                        max="100000"
                        step="500"
                        value={monthlyInvestment}
                        onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                        className="w-full mt-3 accent-blue-600"
                    />
                </div>

                {/* Expected Return */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Expected Return (p.a)
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            min="1"
                            max="30"
                            value={expectedReturn}
                            onChange={(e) => setExpectedReturn(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                            %
                        </span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="30"
                        step="0.5"
                        value={expectedReturn}
                        onChange={(e) => setExpectedReturn(Number(e.target.value))}
                        className="w-full mt-3 accent-blue-600"
                    />
                </div>

                {/* Duration */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Time Period
                    </label>
                    <div className="relative">
                        <input
                            type="number"
                            min="1"
                            max="50"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                            Years
                        </span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="50"
                        step="1"
                        value={duration}
                        onChange={(e) => setDuration(Number(e.target.value))}
                        className="w-full mt-3 accent-blue-600"
                    />
                </div>

                {/* Results */}
                <FadeIn delay={200} className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                    <div className="flex justify-between text-slate-600">
                        <span>Invested Amount</span>
                        <span className="font-semibold">
                            <NumberTicker value={result.investedAmount} prefix="₹" />
                        </span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Est. Returns</span>
                        <span className="font-semibold text-green-600">
                            +<NumberTicker value={result.estimatedReturns} prefix="₹" />
                        </span>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                        <span className="text-lg font-medium text-slate-900">Total Value</span>
                        <span className="text-3xl font-bold text-blue-600">
                            <NumberTicker value={result.totalValue} prefix="₹" />
                        </span>
                    </div>
                </FadeIn>

                {/* CTA */}
                <div className="pt-6 flex flex-col gap-3">
                    <Link
                        href="/contact"
                        className="group flex items-center justify-center w-full px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
                    >
                        Get a free consultation
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href={`https://wa.me/919182026548?text=${encodeURIComponent("Hi Nirvana Wealth Planner, I calculated my SIP and would like personalized investment advice.")}`}
                        target="_blank"
                        onClick={() => {
                            if (typeof window !== "undefined" && (window as any).clarity) {
                                (window as any).clarity("event", "whatsapp_click_sip");
                            }
                        }}
                        className="group flex items-center justify-center w-full px-6 py-3 bg-green-50 text-green-700 font-medium rounded-xl hover:bg-green-100 transition-colors border border-green-200"
                    >
                        {/* Simple WhatsApp-like icon using standard SVG path or just text */}
                        <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2 fill-green-600" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Get Advice on WhatsApp
                    </Link>

                    <p className="text-center text-xs text-slate-500">
                        Get expert advice on achieveing this goal.
                    </p>
                </div>
            </div>
        </div>
    );
};
