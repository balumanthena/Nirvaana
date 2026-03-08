import React from "react";

export default function Loading() {
    return (
        <main className="pt-40 pb-20 bg-white min-h-screen">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto space-y-12">
                    {/* Header Skeleton */}
                    <div className="space-y-6 text-center animate-pulse">
                        <div className="h-4 w-32 bg-slate-100 rounded-full mx-auto" />
                        <div className="h-16 w-full bg-slate-200 rounded-2xl mx-auto" />
                        <div className="h-16 w-3/4 bg-slate-200 rounded-2xl mx-auto" />
                        <div className="flex justify-center gap-6 pt-4">
                            <div className="h-4 w-24 bg-slate-100 rounded-full" />
                            <div className="h-4 w-24 bg-slate-100 rounded-full" />
                        </div>
                    </div>

                    {/* Image Skeleton */}
                    <div className="aspect-[21/9] w-full bg-slate-200 rounded-[3rem] animate-pulse" />

                    {/* Content Skeleton */}
                    <div className="max-w-3xl mx-auto space-y-10 animate-pulse pt-10">
                        <div className="space-y-4">
                            <div className="h-4 w-full bg-slate-100 rounded" />
                            <div className="h-4 w-full bg-slate-100 rounded" />
                            <div className="h-4 w-full bg-slate-100 rounded" />
                            <div className="h-4 w-4/5 bg-slate-100 rounded" />
                        </div>
                        <div className="space-y-6">
                            <div className="h-10 w-1/2 bg-slate-200 rounded-xl" />
                            <div className="space-y-4">
                                <div className="h-4 w-full bg-slate-100 rounded" />
                                <div className="h-4 w-full bg-slate-100 rounded" />
                                <div className="h-4 w-3/4 bg-slate-100 rounded" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="h-4 w-full bg-slate-100 rounded" />
                            <div className="h-4 w-full bg-slate-100 rounded" />
                            <div className="h-4 w-2/3 bg-slate-100 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
