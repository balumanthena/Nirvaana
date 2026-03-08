"use client";

import React, { useEffect, useState } from "react";
import { subscribeToBlog } from "@/lib/blog-db";
import { Eye } from "lucide-react";

interface RealtimeViewsProps {
    blogId: string;
    initialViews: number;
}

export default function RealtimeViews({ blogId, initialViews }: RealtimeViewsProps) {
    const [views, setViews] = useState(initialViews);
    const [isLive, setIsLive] = useState(false);

    useEffect(() => {
        const unsubscribe = subscribeToBlog(blogId, (blog) => {
            if (blog.views !== undefined) {
                setViews(blog.views);
                setIsLive(true);
            }
        });

        // Toggle live status visually
        const interval = setInterval(() => {
            setIsLive(prev => !prev);
        }, 3000);

        return () => {
            unsubscribe();
            clearInterval(interval);
        };
    }, [blogId]);

    return (
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-400">
            <Eye className={`w-4 h-4 transition-colors duration-500 ${isLive ? "text-green-500" : "text-slate-400"}`} />
            <span className="tabular-nums">{views.toLocaleString()} Views</span>
            <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            <span className="text-[9px] text-green-600 font-black animate-pulse">Live</span>
        </div>
    );
}
