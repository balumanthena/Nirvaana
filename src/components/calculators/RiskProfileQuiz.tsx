"use client";

import React, { useState } from "react";
import { ArrowRight, Check, ChevronRight, RefreshCw, Send, ShieldCheck, PieChart, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONFIG } from "@/content/config";
import Link from "next/link";
import { FadeIn } from "@/components/shared/FadeIn";
import { RiskGauge, AllocationChart } from "@/components/calculators/RiskVisuals";

// Question Type
type Question = {
    id: number;
    text: string;
    options: {
        text: string;
        score: number;
    }[];
};

const QUESTIONS: Question[] = [
    {
        id: 1,
        text: "What is your current age group?",
        options: [
            { text: "Above 60 years", score: 1 },
            { text: "45 - 60 years", score: 2 },
            { text: "30 - 45 years", score: 4 },
            { text: "Below 30 years", score: 5 },
        ],
    },
    {
        id: 2,
        text: "What is your primary goal for this investment?",
        options: [
            { text: "Capital Safety (I want to protect my money)", score: 1 },
            { text: "Regular Income (I need monthly earnings)", score: 2 },
            { text: "Wealth Growth (I want to grow my money over time)", score: 4 },
            { text: "Aggressive Growth (I want maximum returns)", score: 5 },
        ],
    },
    {
        id: 3,
        text: "How long do you plan to stay invested?",
        options: [
            { text: "Less than 1 year", score: 1 },
            { text: "1 - 3 years", score: 2 },
            { text: "3 - 7 years", score: 4 },
            { text: "More than 7 years", score: 5 },
        ],
    },
    {
        id: 4,
        text: "How stable is your current income source?",
        options: [
            { text: "Unstable / Variable", score: 1 },
            { text: "Somewhat stable but varies", score: 3 },
            { text: "Very stable (Government/MNC Job)", score: 5 },
        ],
    },
    {
        id: 5,
        text: "How would you react if your portfolio drops by 20% in a month?",
        options: [
            { text: "Panic and withdraw immediately", score: 1 },
            { text: "Worry but wait for recovery", score: 3 },
            { text: "See it as an opportunity to invest more", score: 5 },
        ],
    },
    {
        id: 6,
        text: "What percentage of your income can you save/invest?",
        options: [
            { text: "Less than 10%", score: 1 },
            { text: "10% - 25%", score: 3 },
            { text: "More than 25%", score: 5 },
        ],
    },
    {
        id: 7,
        text: "What is your experience with equity markets (Stocks/Mutual Funds)?",
        options: [
            { text: "No experience", score: 1 },
            { text: "Some experience but loss-averse", score: 3 },
            { text: "Good understanding and comfortable with risks", score: 5 },
        ],
    },
    {
        id: 8,
        text: "Do you have an emergency fund (6 months of expenses)?",
        options: [
            { text: "No", score: 1 },
            { text: "Yes, partially", score: 3 },
            { text: "Yes, fully funded", score: 5 },
        ],
    },
];

type RiskProfile = {
    label: string;
    description: string;
    recommendation: string;
    color: string;
    allocations: { equity: number; debt: number };
};

export function RiskProfileQuiz() {
    const [step, setStep] = useState(0);
    const [scores, setScores] = useState<number[]>(new Array(QUESTIONS.length).fill(0));
    const [showResult, setShowResult] = useState(false);

    // Calculate Progress
    const progress = ((step) / QUESTIONS.length) * 100;

    const handleOptionSelect = (score: number) => {
        const newScores = [...scores];
        newScores[step] = score;
        setScores(newScores);

        if (step < QUESTIONS.length - 1) {
            setTimeout(() => setStep(step + 1), 250); // Small delay for better UX
        } else {
            finishQuiz(newScores);
        }
    };

    const finishQuiz = (finalScores: number[]) => {
        setShowResult(true);
        const totalScore = finalScores.reduce((a, b) => a + b, 0);

        // Determine Profile
        let result = "";
        if (totalScore <= 20) result = "Conservative";
        else if (totalScore <= 32) result = "Moderate";
        else result = "Aggressive";

        // Track Event
        if (typeof window !== "undefined" && (window as any).clarity) {
            (window as any).clarity("event", "risk_quiz_completed", { result });
        }
    };

    const calculateResult = (): RiskProfile => {
        const totalScore = scores.reduce((a, b) => a + b, 0);
        if (totalScore <= 20) {
            return {
                label: "Conservative Investor",
                description: "You prefer safety over high returns. Your primary goal is to protect your capital.",
                recommendation: "Focus on Debt Mutual Funds, Fixed Deposits, and low-risk bonds. Limit equity exposure.",
                color: "text-blue-600 bg-blue-50 border-blue-200",
                allocations: { equity: 20, debt: 80 }
            };
        } else if (totalScore <= 32) {
            return {
                label: "Moderate Investor",
                description: "You want a balance between growth and safety. You can tolerate some market volatility.",
                recommendation: "A balanced portfolio of Equity (Hybrid Funds) and Debt instruments suits you best.",
                color: "text-amber-600 bg-amber-50 border-amber-200",
                allocations: { equity: 50, debt: 50 }
            };
        } else {
            return {
                label: "Aggressive Investor",
                description: "You aim for long-term wealth creation and are comfortable with short-term market ups and downs.",
                recommendation: "Pure Equity Funds (Large Cap, Mid Cap) and SIPs for long-term compounding are ideal.",
                color: "text-green-600 bg-green-50 border-green-200",
                allocations: { equity: 80, debt: 20 }
            };
        }
    };

    const resetQuiz = () => {
        setStep(0);
        setScores(new Array(QUESTIONS.length).fill(0));
        setShowResult(false);
    };

    if (showResult) {
        const result = calculateResult();
        const whatsappMessage = `Hi Nirvana Wealth Planner, my risk profile is ${result.label}. Please guide me.`;

        const currentScore = scores.reduce((a, b) => a + b, 0);

        return (
            <div className="max-w-4xl mx-auto space-y-8 animate-in zoom-in-95 duration-500">
                {/* Dashboard Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Risk Score Card */}
                    <FadeIn delay={100} className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 flex flex-col items-center justify-center text-center">
                        <div className="mb-6 bg-slate-50 p-4 rounded-full">
                            <Gauge className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-lg text-slate-500 font-medium mb-1">Risk Profile Score</h2>
                        <RiskGauge score={currentScore} maxScore={40} />
                        <h3 className={`text-2xl font-serif font-bold mt-4 px-6 py-2 rounded-full border ${result.color}`}>
                            {result.label}
                        </h3>
                        <p className="text-slate-600 mt-4 text-sm max-w-xs mx-auto">
                            {result.description}
                        </p>
                    </FadeIn>

                    {/* Asset Allocation Card */}
                    <FadeIn delay={200} className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 flex flex-col items-center justify-center">
                        <div className="mb-6 bg-slate-50 p-4 rounded-full">
                            <PieChart className="w-8 h-8 text-primary" />
                        </div>
                        <h2 className="text-lg text-slate-500 font-medium mb-6">Suggested Allocation</h2>
                        <AllocationChart equity={result.allocations.equity} debt={result.allocations.debt} />

                        <div className="mt-8 p-4 bg-slate-50 rounded-xl w-full text-left border border-slate-100">
                            <h4 className="font-semibold text-slate-900 text-sm mb-2">Strategy:</h4>
                            <p className="text-slate-600 text-sm leading-relaxed">
                                {result.recommendation}
                            </p>
                        </div>
                    </FadeIn>
                </div>

                {/* Actions */}
                <FadeIn delay={300} className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link
                        href={`https://wa.me/${CONFIG.PHONE.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        className="inline-flex items-center justify-center px-8 py-4 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25 hover:shadow-xl hover:scale-105 transform duration-200"
                    >
                        <Send className="w-5 h-5 mr-2" />
                        Get Expert Advice
                    </Link>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={resetQuiz}
                        className="rounded-full h-14 px-8 border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                    >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Retake Assessment
                    </Button>
                </FadeIn>
            </div>
        );
    }

    const currentQuestion = QUESTIONS[step];

    return (
        <FadeIn>
            <div className="bg-white rounded-3xl shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden max-w-2xl mx-auto">
                {/* Header Section */}
                <div className="bg-slate-50/50 px-8 py-6 border-b border-slate-100">
                    <div className="flex justify-between items-center mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold tracking-wide uppercase">
                            Question {step + 1} of {QUESTIONS.length}
                        </span>
                        <span className="text-xs font-medium text-slate-400">
                            {Math.round(progress)}% Completed
                        </span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-primary transition-all duration-500 ease-out rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                <div className="p-8 md:p-10">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-8 leading-tight">
                        {currentQuestion.text}
                    </h3>

                    <div className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleOptionSelect(option.score)}
                                className="w-full text-left p-5 rounded-xl border-2 border-slate-100 hover:border-primary hover:bg-primary/5 hover:shadow-md transition-all duration-200 group flex items-center justify-between"
                            >
                                <span className="text-lg text-slate-700 group-hover:text-primary font-medium">
                                    {option.text}
                                </span>
                                <div className="h-6 w-6 rounded-full border-2 border-slate-200 group-hover:border-primary flex items-center justify-center transition-colors">
                                    <div className="h-2.5 w-2.5 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity transform scale-0 group-hover:scale-100 duration-200" />
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </FadeIn>
    );
}
