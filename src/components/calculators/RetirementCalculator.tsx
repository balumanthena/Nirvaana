"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TreeDeciduous, ArrowRight } from "lucide-react";
import { NumberTicker } from "@/components/shared/NumberTicker";
import { FadeIn } from "@/components/shared/FadeIn";

export const RetirementCalculator = () => {
    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [currentExpenses, setCurrentExpenses] = useState(50000);
    const [inflation, setInflation] = useState(6);
    const [expectedReturn, setExpectedReturn] = useState(8); // Conservative post-retirement return

    const [result, setResult] = useState({
        yearsToRetire: 0,
        futureMonthlyExpense: 0,
        retirementCorpus: 0,
    });

    useEffect(() => {
        const yearsToRetire = Math.max(0, retirementAge - currentAge);

        // Future Value of Expenses: FV = PV * (1 + r)^n
        const futureMonthlyExpense =
            currentExpenses * Math.pow(1 + inflation / 100, yearsToRetire);

        // Corpus Required (Simplified Perpetuity for robustness): 
        // Corpus = (Annual Future Expense) / (Real Rate of Return)
        // Real Rate ~ (Return - Inflation) / 100 (Simplified for user understanding)
        // If Return <= Inflation, we use a multiplier relative to life expectancy (e.g. 25 years) as a fallback

        let corpus = 0;
        const realRate = (expectedReturn - inflation) / 100;
        const futureAnnualExpense = futureMonthlyExpense * 12;

        if (realRate > 0) {
            corpus = futureAnnualExpense / realRate;
        } else {
            // Fallback: 25 years of expenses provided
            corpus = futureAnnualExpense * 25;
        }

        setResult({
            yearsToRetire,
            futureMonthlyExpense: Math.round(futureMonthlyExpense),
            retirementCorpus: Math.round(corpus),
        });
    }, [currentAge, retirementAge, currentExpenses, inflation, expectedReturn]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-slate-100 h-full">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-green-50 rounded-lg">
                    <TreeDeciduous className="w-5 h-5 text-green-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Retirement Planner</h2>
            </div>

            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    {/* Current Age */}
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                            Current Age
                        </label>
                        <input
                            type="number"
                            min="18"
                            max="80"
                            value={currentAge}
                            onChange={(e) => setCurrentAge(Number(e.target.value))}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                    </div>
                    {/* Retirement Age */}
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                            Retire Age
                        </label>
                        <input
                            type="number"
                            min="40"
                            max="90"
                            value={retirementAge}
                            onChange={(e) => setRetirementAge(Number(e.target.value))}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                    </div>
                </div>

                {/* Current Expenses */}
                <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        Current Monthly Expenses
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">
                            ₹
                        </span>
                        <input
                            type="number"
                            min="5000"
                            value={currentExpenses}
                            onChange={(e) => setCurrentExpenses(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                    </div>
                    <input
                        type="range"
                        min="10000"
                        max="500000"
                        step="1000"
                        value={currentExpenses}
                        onChange={(e) => setCurrentExpenses(Number(e.target.value))}
                        className="w-full mt-2 accent-green-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    />
                </div>

                {/* Inflation & Return */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Inflation */}
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                            Inflation (%)
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="15"
                            value={inflation}
                            onChange={(e) => setInflation(Number(e.target.value))}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                    </div>
                    {/* Expected Return */}
                    <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                            Exp. Return (%)
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={expectedReturn}
                            onChange={(e) => setExpectedReturn(Number(e.target.value))}
                            className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none text-sm"
                        />
                    </div>
                </div>



                {/* Results */}
                <FadeIn delay={200} className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                    <div className="flex justify-between text-slate-600 text-sm">
                        <span>Years to Retire</span>
                        <span className="font-semibold">{result.yearsToRetire} Years</span>
                    </div>
                    <div className="flex justify-between text-slate-600 text-sm">
                        <span>Future Monthly Expense</span>
                        <span className="font-semibold text-slate-900">
                            <NumberTicker value={result.futureMonthlyExpense} prefix="₹" />
                        </span>
                    </div>
                    <div className="pt-2">
                        <span className="block text-xs font-medium text-slate-500 mb-1">Required Corpus</span>
                        <span className="text-2xl font-bold text-green-700">
                            <NumberTicker value={result.retirementCorpus} prefix="₹" />
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1">
                            *Estimated corpus to sustain lifestyle indefinitely via interest.
                        </p>
                    </div>
                </FadeIn>

                {/* CTA */}
                <div className="pt-4 flex flex-col gap-2.5">
                    <Link
                        href="/contact"
                        className="group flex items-center justify-center w-full px-6 py-2.5 bg-green-900 text-white font-medium rounded-lg hover:bg-green-800 transition-colors text-sm"
                    >
                        Plan your retirement
                        <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href={`https://wa.me/919182026548?text=${encodeURIComponent("Hi Nirvana Wealth Planner, I used the retirement planner and want help planning my retirement.")}`}
                        target="_blank"
                        onClick={() => {
                            if (typeof window !== "undefined" && (window as any).clarity) {
                                (window as any).clarity("event", "whatsapp_click_retirement");
                            }
                        }}
                        className="group flex items-center justify-center w-full px-6 py-2.5 bg-green-50 text-green-700 font-medium rounded-lg hover:bg-green-100 transition-colors border border-green-200 text-sm"
                    >
                        <svg viewBox="0 0 24 24" className="w-4 h-4 mr-2 fill-green-600" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        Get Advice on WhatsApp
                    </Link>

                    <p className="text-center text-[10px] text-slate-500">
                        Is your current savings enough? Let's check.
                    </p>
                </div>
            </div>
        </div>
    );
};
