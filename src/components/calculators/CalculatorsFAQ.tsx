"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
    {
        question: "How accurate is the SIP calculator?",
        answer: "Our SIP calculator uses the standard compound interest formula with monthly compounding. While mathematically precise based on your inputs, actual market returns vary. It serves as an excellent estimation tool for wealth planning."
    },
    {
        question: "What inflation rate should I assume for retirement?",
        answer: "For India, a long-term inflation rate of 6-7% is standard. If you expect lifestyle upgrades or higher medical costs, consider using 8%. Our calculator defaults to a conservative 6%."
    },
    {
        question: "Can I start SIP with 500 Rs?",
        answer: "Yes! Many mutual funds in India allow SIPs starting as low as ₹500. The key is consistency—starting early with a small amount often beats starting late with a large amount."
    },
    {
        question: "How is the retirement corpus calculated?",
        answer: "We estimate your future monthly expenses based on inflation and calculate the corpus required to generate that income (via interest/withdrawals) indefinitely or for a fixed period, assuming a safe withdrawal rate."
    },
    {
        question: "Do you help with executing these investments?",
        answer: "Absolutely. Nirvana Wealth Planner is a full-service financial advisory. We can help you select the right funds, set up SIPs, and manage your portfolio. Book a free consultation to get started."
    }
];

export function CalculatorsFAQ() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": FAQS.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };

    return (
        <div className="mt-16 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h2>
                <p className="text-slate-600">Common queries about planning your finances.</p>
            </div>

            <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                {FAQS.map((faq, index) => (
                    <AccordionItem key={index} value={`calc-faq-${index}`} className="border-b border-slate-100">
                        <AccordionTrigger className="text-left text-base font-medium text-slate-900 hover:text-blue-600 py-4">
                            {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 pb-4">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
        </div>
    );
}
