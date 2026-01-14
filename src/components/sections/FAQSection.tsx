"use client";

import React from "react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { CONFIG } from "@/content/config";

const FAQS = [
    {
        question: "What services does Nirvana Wealth Planner offer?",
        answer: "We offer comprehensive financial planning including retirement planning, goal-based investing (SIPs), insurance analysis (life & health), risk profiling, and emergency fund planning. We act as your holistic wealth partner."
    },
    {
        question: "Is financial planning suitable for salaried individuals?",
        answer: "Absolutely. Salaried individuals benefit immensely from structured planning to manage taxes, optimize savings, and achieve life goals like buying a home or early retirement."
    },
    {
        question: "How does SIP investment work?",
        answer: "A Systematic Investment Plan (SIP) allows you to invest small, fixed amounts regularly in mutual funds. It inculcates financial discipline and benefits from rupee cost averaging, handling market volatility automatically."
    },
    {
        question: "Do you provide retirement planning?",
        answer: "Yes, retirement planning is one of our core specializations. We help you estimate your future expense requirements (inflation-adjusted) and build a customized corpus strategy to ensure financial freedom."
    },
    {
        question: "How can I contact Nirvana Wealth Planner?",
        answer: `You can reach us via WhatsApp at +91 9182026548, email us at ${CONFIG.EMAIL}, or schedule a free consultation call directly through our website.`
    }
];

export function FAQSection() {
    // Generate FAQ Schema JSON-LD
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
        <section className="py-20 bg-white" id="faq">
            <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <span className="text-sm font-bold tracking-wider text-primary uppercase mb-2 block">Common Questions</span>
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-600">
                        Clear answers to help you make informed decisions.
                    </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {FAQS.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`} className="border-b border-slate-100">
                            <AccordionTrigger className="text-left text-lg font-medium text-slate-900 hover:text-primary py-4">
                                {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-slate-600 text-base leading-relaxed pb-4">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>

                {/* Inject FAQ Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            </div>
        </section>
    );
}
