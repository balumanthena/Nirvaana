"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { TreeDeciduous, ArrowRight } from "lucide-react";

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
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100 h-full">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-green-50 rounded-lg">
                    <TreeDeciduous className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Retirement Planner</h2>
            </div>

            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    {/* Current Age */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Current Age
                        </label>
                        <input
                            type="number"
                            min="18"
                            max="80"
                            value={currentAge}
                            onChange={(e) => setCurrentAge(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        />
                    </div>
                    {/* Retirement Age */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Retire Age
                        </label>
                        <input
                            type="number"
                            min="40"
                            max="90"
                            value={retirementAge}
                            onChange={(e) => setRetirementAge(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        />
                    </div>
                </div>

                {/* Current Expenses */}
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Current Monthly Expenses
                    </label>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                            ₹
                        </span>
                        <input
                            type="number"
                            min="5000"
                            value={currentExpenses}
                            onChange={(e) => setCurrentExpenses(Number(e.target.value))}
                            className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        />
                    </div>
                    <input
                        type="range"
                        min="10000"
                        max="500000"
                        step="1000"
                        value={currentExpenses}
                        onChange={(e) => setCurrentExpenses(Number(e.target.value))}
                        className="w-full mt-3 accent-green-600"
                    />
                </div>

                {/* Inflation & Return */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Inflation */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Inflation (%)
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="15"
                            value={inflation}
                            onChange={(e) => setInflation(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        />
                    </div>
                    {/* Expected Return */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Exp. Return (%)
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={expectedReturn}
                            onChange={(e) => setExpectedReturn(Number(e.target.value))}
                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                        />
                    </div>
                </div>


                {/* Results */}
                <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                    <div className="flex justify-between text-slate-600">
                        <span>Years to Retire</span>
                        <span className="font-semibold">{result.yearsToRetire} Years</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Future Monthly Expense</span>
                        <span className="font-semibold text-slate-900">
                            {formatCurrency(result.futureMonthlyExpense)}
                        </span>
                    </div>
                    <div className="pt-2">
                        <span className="block text-sm font-medium text-slate-500 mb-1">Required Corpus</span>
                        <span className="text-3xl font-bold text-green-700">
                            {formatCurrency(result.retirementCorpus)}
                        </span>
                        <p className="text-xs text-slate-400 mt-1">
                            *Estimated corpus to sustain lifestyle indefinitely via interest.
                        </p>
                    </div>
                </div>

                {/* CTA */}
                <div className="pt-6">
                    <Link
                        href="/contact"
                        className="group flex items-center justify-center w-full px-6 py-3 bg-green-900 text-white font-medium rounded-xl hover:bg-green-800 transition-colors"
                    >
                        Plan your retirement
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="text-center text-xs text-slate-500 mt-3">
                        Is your current savings enough? Let's check.
                    </p>
                </div>
            </div>
        </div>
    );
};
