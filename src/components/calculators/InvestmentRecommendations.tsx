"use client";

import React, { useState } from "react";
import { ArrowRight, Calculator, Check, ChevronRight, PieChart, RefreshCw, Send, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONFIG } from "@/content/config";
import Link from "next/link";
import { FadeIn } from "@/components/shared/FadeIn";
import { NumberTicker } from "@/components/shared/NumberTicker";

type RiskProfile = "Conservative" | "Moderate" | "Aggressive";
type Goal = "Retirement" | "Wealth Creation" | "Tax Saving" | "Short Term";

interface Recommendation {
    assetAllocation: {
        equity: number;
        debt: number;
        gold: number;
    };
    suggestedFunds: string[];
    expectedReturn: string;
    description: string;
}

export function InvestmentRecommendations() {
    const [age, setAge] = useState<number>(30);
    const [amount, setAmount] = useState<number>(10000);
    const [risk, setRisk] = useState<RiskProfile>("Moderate");
    const [goal, setGoal] = useState<Goal>("Wealth Creation");
    const [showResult, setShowResult] = useState(false);

    const getRecommendation = (): Recommendation => {
        let equity = 0;
        let debt = 0;
        let gold = 0;
        let funds: string[] = [];
        let expReturn = "";
        let desc = "";

        // Basic Asset Allocation Logic
        if (risk === "Conservative") {
            equity = 20;
            debt = 70;
            gold = 10;
            expReturn = "7% - 9%";
            desc = "Prioritizing capital safety with steady, inflation-beating returns.";
            funds = ["Corporate Bond Funds", "Banking & PSU Funds", "Conservative Hybrid Funds"];
        } else if (risk === "Moderate") {
            equity = 50;
            debt = 40;
            gold = 10;
            expReturn = "10% - 12%";
            desc = "Balanced approach for stable growth with moderate volatility.";
            funds = ["Flexi Cap Funds", "Balanced Advantage Funds", "Multi Asset Allocation Funds"];
        } else { // Aggressive
            equity = 80;
            debt = 15;
            gold = 5;
            expReturn = "13% - 15%";
            desc = "High growth potential suitable for long-term wealth creation.";
            funds = ["Mid Cap Funds", "Small Cap Funds", "Large & Mid Cap Funds"];
        }

        // Adjust constraints based on Age (Rule of thumb: 100 - Age = Equity %)
        // However, we'll keep the risk profile as the primary driver but subtly adjust if age is high
        if (age > 50 && risk === "Aggressive") {
            equity -= 10;
            debt += 10;
            desc += " (Adjusted slightly for age stability).";
        }

        // Adjust based on Goal
        if (goal === "Tax Saving") {
            funds = ["ELSS (Tax Saving) Funds", ...funds.slice(1)];
            desc += " Includes tax-saving instruments under Section 80C.";
        } else if (goal === "Short Term") {
            equity = 10;
            debt = 90;
            gold = 0;
            expReturn = "6% - 8%";
            funds = ["Liquid Funds", "Ultra Short Duration Funds", "Arbitrage Funds"];
            desc = "Focus on liquidity and capital protection for short durations.";
        }

        return {
            assetAllocation: { equity, debt, gold },
            suggestedFunds: funds,
            expectedReturn: expReturn,
            description: desc,
        };
    };

    const handleCalculate = () => {
        setShowResult(true);
    };

    const recommendation = getRecommendation();

    const whatsappMessage = `Hi Nirvana Wealth Planner, I used the Investment Engine. 
    My Profile: Age ${age}, Investment ₹${amount}, Risk: ${risk}, Goal: ${goal}. 
    Suggested: ${recommendation.suggestedFunds.join(", ")}. Please guide me.`;

    return (
        <FadeIn>
            <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden max-w-5xl mx-auto grid md:grid-cols-12">

                {/* Input Section */}
                <div className="p-6 md:p-8 md:col-span-4 lg:col-span-4 bg-slate-50/50 border-r border-slate-100 flex flex-col justify-center">
                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-5">
                        Your Profile
                    </h3>

                    <div className="space-y-5">
                        {/* Age Input */}
                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1.5">Age</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="range"
                                    min="18"
                                    max="80"
                                    value={age}
                                    onChange={(e) => setAge(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
                                />
                                <span className="text-base font-bold text-primary w-8 text-center">{age}</span>
                            </div>
                        </div>

                        {/* Amount Input */}
                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1.5">Monthly Investment</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">₹</span>
                                <input
                                    type="number"
                                    min="500"
                                    step="500"
                                    value={amount}
                                    onChange={(e) => setAmount(Number(e.target.value))}
                                    className="w-full pl-8 pr-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none"
                                />
                            </div>
                        </div>

                        {/* Risk Profile */}
                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1.5">Risk Appetite</label>
                            <div className="grid grid-cols-3 gap-1.5">
                                {(["Conservative", "Moderate", "Aggressive"] as RiskProfile[]).map((r) => (
                                    <button
                                        key={r}
                                        onClick={() => setRisk(r)}
                                        className={cn(
                                            "px-1 py-1.5 text-[10px] sm:text-xs rounded-md border transition-all truncate",
                                            risk === r
                                                ? "bg-primary text-white border-primary shadow-sm"
                                                : "bg-white text-slate-600 border-slate-200 hover:border-primary/50"
                                        )}
                                    >
                                        {r}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Goal */}
                        <div>
                            <label className="block text-xs font-medium text-slate-700 mb-1.5">Investment Goal</label>
                            <select
                                value={goal}
                                onChange={(e) => setGoal(e.target.value as Goal)}
                                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none appearance-none"
                            >
                                <option value="Wealth Creation">Wealth Creation</option>
                                <option value="Retirement">Retirement Planning</option>
                                <option value="Tax Saving">Tax Saving (ELSS)</option>
                                <option value="Short Term">Short Term Parking</option>
                            </select>
                        </div>

                        <Button onClick={handleCalculate} className="w-full mt-2 h-10 text-sm">
                            Details & Recommendations <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                    </div>
                </div>

                {/* Result Section */}
                <div className="p-6 md:p-8 md:col-span-8 lg:col-span-8 bg-white min-h-[400px] flex flex-col justify-center">
                    {!showResult ? (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 opacity-40">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <TrendingUp className="w-8 h-8 text-slate-400" />
                            </div>
                            <h4 className="text-lg font-medium text-slate-800 mb-1">Ready to Guide You</h4>
                            <p className="text-sm text-slate-500 max-w-xs">
                                Enter your details on the left to get a personalized investment strategy.
                            </p>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1 block">Your Strategy</span>
                                    <h3 className="text-2xl font-serif font-bold text-slate-900">
                                        Recommended Plan
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <span className="text-[10px] text-slate-500 block mb-1">Exp. Returns</span>
                                    <span className="text-lg font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-md">
                                        {recommendation.expectedReturn}
                                    </span>
                                </div>
                            </div>

                            <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                                {recommendation.description}
                            </p>

                            {/* Allocation Visuals */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                <div className="p-3 bg-blue-50 rounded-lg text-center border border-blue-100">
                                    <span className="block text-xl font-bold text-blue-700">{recommendation.assetAllocation.equity}%</span>
                                    <span className="text-[10px] text-blue-600 font-medium uppercase tracking-wide">Equity</span>
                                </div>
                                <div className="p-3 bg-amber-50 rounded-lg text-center border border-amber-100">
                                    <span className="block text-xl font-bold text-amber-700">{recommendation.assetAllocation.debt}%</span>
                                    <span className="text-[10px] text-amber-600 font-medium uppercase tracking-wide">Debt</span>
                                </div>
                                <div className="p-3 bg-yellow-50 rounded-lg text-center border border-yellow-100">
                                    <span className="block text-xl font-bold text-yellow-600">{recommendation.assetAllocation.gold}%</span>
                                    <span className="text-[10px] text-yellow-600 font-medium uppercase tracking-wide">Gold</span>
                                </div>
                            </div>

                            {/* Suggested Funds */}
                            <div className="bg-slate-50 rounded-xl p-4 mb-6 border border-slate-100">
                                <h4 className="text-sm font-semibold text-slate-900 mb-3 flex items-center">
                                    <Check className="w-4 h-4 text-green-500 mr-2" />
                                    Suggested Categories to Explore
                                </h4>
                                <ul className="space-y-2">
                                    {recommendation.suggestedFunds.map((fund, idx) => (
                                        <li key={idx} className="flex items-center text-slate-700 bg-white p-2 rounded border border-slate-100 shadow-sm text-sm">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                                            {fund}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <div className="flex gap-3">
                                <Link
                                    href={`https://wa.me/${CONFIG.PHONE.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMessage)}`}
                                    target="_blank"
                                    className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors shadow-md shadow-green-600/20"
                                >
                                    <Send className="w-3.5 h-3.5 mr-2" />
                                    Get Portfolio
                                </Link>
                                <Button
                                    variant="outline"
                                    onClick={() => setShowResult(false)}
                                    className="h-auto py-3 px-4 rounded-lg"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" />
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </FadeIn>
    );
}
