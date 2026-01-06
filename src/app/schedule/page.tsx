"use client";

import { InlineWidget } from "react-calendly";
import { CONFIG } from "@/content/config";

export default function SchedulePage() {
    return (
        <main className="min-h-screen bg-slate-50 pt-24 md:pt-32 pb-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h1 className="font-serif text-4xl md:text-5xl text-slate-900 mb-4">
                        Schedule a Consultation
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                        Book a 30-minute introductory call to discuss your financial goals and how we can help you achieve them.
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 h-[700px]">
                    <InlineWidget
                        url={CONFIG.CALENDLY_URL}
                        styles={{
                            height: '1000px',
                            minWidth: '320px'
                        }}
                    />
                </div>
            </div>
        </main>
    );
}
