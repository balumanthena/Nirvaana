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
        <div className="relative w-full max-w-[240px] aspect-[2/1] mx-auto flex items-end justify-center">
            {/* Background Arc */}
            <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
                {/* Track */}
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="#f1f5f9"
                    strokeWidth="12"
                    strokeLinecap="round"
                />

                {/* Active Arc (Gradient) */}
                <defs>
                    <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#cbd5e1" />
                        <stop offset="100%" stopColor="var(--primary)" />
                    </linearGradient>
                </defs>

                {/* Needle Indicator Arc */}
                <path
                    d="M 20 100 A 80 80 0 0 1 180 100"
                    fill="none"
                    stroke="url(#gaugeGradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray="251.2" // Circumference of semicircle (PI * R)
                    strokeDashoffset={251.2 * (1 - percentage)}
                    className="transition-all duration-1000 ease-out"
                />

                {/* Needle */}
                <g
                    className="transition-transform duration-1000 ease-out origin-bottom"
                    style={{
                        transformBox: "fill-box",
                        transformOrigin: "100px 100px",
                        transform: `rotate(${rotation}deg)`
                    }}
                >
                    <circle cx="100" cy="100" r="5" fill="var(--primary)" />
                    <path d="M 100 100 L 100 35" stroke="var(--primary)" strokeWidth="3" strokeLinecap="round" />
                </g>
            </svg>

            {/* Score Text */}
            <div className="absolute bottom-0 translate-y-6 text-center">
                <div className="bg-white border border-slate-100 shadow-sm px-4 py-1.5 rounded-full inline-flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-900 leading-none">{Math.round(animatedScore)}</span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">/ {maxScore}</span>
                </div>
            </div>
        </div>
    );
};

// --- Donut Chart Component ---
export const AllocationChart = ({ equity, debt }: { equity: number; debt: number }) => {
    const [animatedEquity, setAnimatedEquity] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setAnimatedEquity(equity), 500);
        return () => clearTimeout(timer);
    }, [equity]);

    return (
        <div className="flex items-center justify-center gap-8">
            <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Background Ring */}
                <div className="absolute inset-0 rounded-full border-[8px] border-slate-50" />

                {/* Active Ring */}
                <div
                    className="absolute inset-0 rounded-full transition-all duration-1000 ease-out"
                    style={{
                        background: `conic-gradient(var(--primary) 0% ${animatedEquity}%, #cbd5e1 ${animatedEquity}% 100%)`,
                        mask: "radial-gradient(transparent 62%, black 63%)",
                        WebkitMask: "radial-gradient(transparent 62%, black 63%)"
                    }}
                />

                {/* Center Text */}
                <div className="z-10 text-center flex flex-col items-center justify-center">
                    <span className="text-2xl font-bold text-slate-900">{Math.round(animatedEquity)}%</span>
                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">Equity</span>
                </div>
            </div>

            {/* Legend */}
            <div className="space-y-3">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-primary" />
                    <div className="text-sm">
                        <span className="font-semibold text-slate-900">{equity}%</span>
                        <span className="text-slate-500 ml-1.5 text-xs">Equity</span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-slate-300" />
                    <div className="text-sm">
                        <span className="font-semibold text-slate-900">{debt}%</span>
                        <span className="text-slate-500 ml-1.5 text-xs">Fixed Income</span>
                    </div>
                </div>
            </div>
        </div>
    );
};
