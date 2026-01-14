"use client";

import React, { useState } from "react";
import { ArrowRight, Check, ChevronRight, RefreshCw, Send, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CONFIG } from "@/content/config";
import Link from "next/link";

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
            };
        } else if (totalScore <= 32) {
            return {
                label: "Moderate Investor",
                description: "You want a balance between growth and safety. You can tolerate some market volatility.",
                recommendation: "A balanced portfolio of Equity (Hybrid Funds) and Debt instruments suits you best.",
                color: "text-amber-600 bg-amber-50 border-amber-200",
            };
        } else {
            return {
                label: "Aggressive Investor",
                description: "You aim for long-term wealth creation and are comfortable with short-term market ups and downs.",
                recommendation: "Pure Equity Funds (Large Cap, Mid Cap) and SIPs for long-term compounding are ideal.",
                color: "text-green-600 bg-green-50 border-green-200",
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
        const whatsappMessage = `Hi Nirvana Wealth Planner, I just took your Risk Profile Quiz and I got: *${result.label}*. I'd like some guidance on where to invest.`;

        return (
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 text-center animate-in zoom-in-95 duration-500">
                <div className="flex justify-center mb-6">
                    <div className="h-20 w-20 bg-slate-100 rounded-full flex items-center justify-center">
                        <ShieldCheck className="w-10 h-10 text-slate-800" />
                    </div>
                </div>

                <h2 className="text-xl text-slate-500 font-medium mb-2">Your Risk Profile is</h2>
                <h3 className={`text-3xl md:text-4xl font-serif font-bold mb-6 px-6 py-3 rounded-full inline-block border ${result.color}`}>
                    {result.label}
                </h3>

                <p className="text-slate-600 text-lg mb-4 max-w-lg mx-auto">
                    {result.description}
                </p>

                <div className="bg-slate-50 rounded-xl p-6 mb-8 text-left max-w-lg mx-auto border border-slate-100">
                    <h4 className="font-semibold text-slate-900 mb-2">Suggested Approach:</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                        {result.recommendation}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href={`https://wa.me/${CONFIG.PHONE.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(whatsappMessage)}`}
                        target="_blank"
                        className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white font-medium rounded-full hover:bg-green-700 transition-colors shadow-lg shadow-green-600/20"
                    >
                        <Send className="w-5 h-5 mr-2" />
                        Get Expert Advice on WhatsApp
                    </Link>
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={resetQuiz}
                        className="rounded-full h-14 px-8 border-slate-200 hover:bg-slate-50 text-slate-600"
                    >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Retake Quiz
                    </Button>
                </div>

                <p className="text-xs text-slate-400 mt-8 max-w-md mx-auto">
                    Disclaimer: This assessment provides a general indication of your risk appetite. Please consult a financial advisor before making investment decisions.
                </p>
            </div>
        );
    }

    const currentQuestion = QUESTIONS[step];

    return (
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 w-full">
                <div
                    className="h-full bg-primary transition-all duration-500 ease-out"
                    style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
                />
            </div>

            <div className="p-8 md:p-12">
                <div className="flex justify-between items-center mb-8">
                    <span className="text-sm font-medium text-slate-400 uppercase tracking-widest">
                        Question {step + 1} of {QUESTIONS.length}
                    </span>
                    <span className="text-sm font-bold text-primary">{Math.round(progress)}% Completed</span>
                </div>

                <h3 className="text-2xl md:text-3xl font-serif font-bold text-slate-900 mb-8 leading-tight">
                    {currentQuestion.text}
                </h3>

                <div className="space-y-4">
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleOptionSelect(option.score)}
                            className="w-full text-left p-6 rounded-xl border border-slate-200 hover:border-primary hover:bg-primary/5 transition-all group flex items-center justify-between"
                        >
                            <span className="text-lg text-slate-700 group-hover:text-primary font-medium">
                                {option.text}
                            </span>
                            <div className="h-6 w-6 rounded-full border-2 border-slate-200 group-hover:border-primary flex items-center justify-center">
                                <div className="h-3 w-3 rounded-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
