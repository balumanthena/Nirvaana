"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";

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
                <div className="mt-8 pt-8 border-t border-slate-100 space-y-4">
                    <div className="flex justify-between text-slate-600">
                        <span>Invested Amount</span>
                        <span className="font-semibold">{formatCurrency(result.investedAmount)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                        <span>Est. Returns</span>
                        <span className="font-semibold text-green-600">
                            +{formatCurrency(result.estimatedReturns)}
                        </span>
                    </div>
                    <div className="flex justify-between items-end pt-2">
                        <span className="text-lg font-medium text-slate-900">Total Value</span>
                        <span className="text-3xl font-bold text-blue-600">
                            {formatCurrency(result.totalValue)}
                        </span>
                    </div>
                </div>

                {/* CTA */}
                <div className="pt-6">
                    <Link
                        href="/contact"
                        className="group flex items-center justify-center w-full px-6 py-3 bg-slate-900 text-white font-medium rounded-xl hover:bg-slate-800 transition-colors"
                    >
                        Get a free consultation
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <p className="text-center text-xs text-slate-500 mt-3">
                        Get expert advice on achieveing this goal.
                    </p>
                </div>
            </div>
        </div>
    );
};
