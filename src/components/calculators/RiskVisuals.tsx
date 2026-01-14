"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

// --- Gauge Component ---
export const RiskGauge = ({ score, maxScore = 40 }: { score: number; maxScore?: number }) => {
    const [animatedScore, setAnimatedScore] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setAnimatedScore(score), 300);
        return () => clearTimeout(timer);
    }, [score]);

    // Calculate rotation: -90deg (min) to 90deg (max)
    const percentage = Math.min(Math.max(animatedScore / maxScore, 0), 1);
    const rotation = -90 + percentage * 180;

    return (
        <div className="relative w-48 h-28 mx-auto flex items-end justify-center overflow-hidden">
            {/* Background Arc */}
            <svg viewBox="0 0 200 110" className="w-full h-full">
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="20"
                    strokeLinecap="round"
                />
                {/* Colored Zones (Optional overlay for gradient effect) */}
                <path
                    d="M 20 100 A 80 80 0 0 1 73 46" // Approx first third
                    fill="none"
                    stroke="#3b82f6" // Blue (Conservative)
                    strokeWidth="20"
                    className="opacity-30"
                />
                <path
                    d="M 73 46 A 80 80 0 0 1 127 46" // Middle third
                    fill="none"
                    stroke="#f59e0b" // Amber (Moderate)
                    strokeWidth="20"
                    className="opacity-30"
                />
                <path
                    d="M 127 46 A 80 80 0 0 1 180 100" // Last third
                    fill="none"
                    stroke="#22c55e" // Green (Aggressive - typical logic is green=good returns usually)
                    strokeWidth="20"
                    className="opacity-30"
                />

                {/* Needle */}
                <g className="transition-transform duration-1000 ease-out origin-[100px_100px]" style={{ transform: `rotate(${rotation}deg)` }}>
                    <path d="M 100 100 L 100 30" stroke="#1e293b" strokeWidth="4" strokeLinecap="round" />
                    <circle cx="100" cy="100" r="6" fill="#1e293b" />
                </g>
            </svg>
            <div className="absolute bottom-0 text-center">
                <span className="text-3xl font-bold text-slate-900">{Math.round(animatedScore)}</span>
                <span className="text-xs text-slate-500 block uppercase tracking-wider">Risk Score</span>
            </div>
        </div>
    );
};

// --- Donut Chart Component ---
export const AllocationChart = ({ equity, debt }: { equity: number; debt: number }) => {
    // Conic gradient for donut chart
    // Equity (Primary Color), Debt (Slate-200)
    const [animatedEquity, setAnimatedEquity] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setAnimatedEquity(equity), 500);
        return () => clearTimeout(timer);
    }, [equity]);

    return (
        <div className="flex items-center gap-6">
            <div className="relative w-32 h-32 rounded-full shadow-inner bg-slate-50 flex items-center justify-center">
                <div
                    className="absolute inset-0 rounded-full transition-all duration-1000 ease-out"
                    style={{
                        background: `conic-gradient(var(--primary) 0% ${animatedEquity}%, #e2e8f0 ${animatedEquity}% 100%)`,
                        // Mask to create donut hole
                        mask: "radial-gradient(transparent 55%, black 56%)",
                        WebkitMask: "radial-gradient(transparent 55%, black 56%)"
                    }}
                />
                <div className="z-10 text-center">
                    <span className="text-lg font-bold text-slate-900">{Math.round(animatedEquity)}%</span>
                    <span className="text-[10px] text-slate-500 block">Equity</span>
                </div>
            </div>

            {/* Legend */}
            <div className="space-y-2">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-primary" />
                    <div className="text-sm">
                        <span className="font-semibold text-slate-900">{equity}%</span>
                        <span className="text-slate-500 ml-1">Equity</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-200" />
                    <div className="text-sm">
                        <span className="font-semibold text-slate-900">{debt}%</span>
                        <span className="text-slate-500 ml-1">Debt / Fixed</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
