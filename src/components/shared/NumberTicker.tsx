"use client";

import { useEffect, useState } from "react";

export function NumberTicker({ value, duration = 1000, prefix = "", className = "" }: { value: number, duration?: number, prefix?: string, className?: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number | null = null;
        const startValue = 0;

        // Animate only if reduced motion is not preferred
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (prefersReducedMotion) {
            setCount(value);
            return;
        }

        const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function: easeOutExpo
            const easeOutExpo = (x: number): number => {
                return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
            };

            setCount(Math.floor(easeOutExpo(progress) * (value - startValue) + startValue));

            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };

        requestAnimationFrame(step);
    }, [value, duration]);

    const formatted = new Intl.NumberFormat("en-IN", {
        maximumFractionDigits: 0,
    }).format(count);

    return <span className={className}>{prefix}{formatted}</span>;
}
