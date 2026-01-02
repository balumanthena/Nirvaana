import { Check } from "lucide-react";

const STEPS = [
    {
        title: "Discovery Call",
        description: "A 30-min chat to understand your goals and see if we are a right fit.",
        outcome: "Clarity on your needs"
    },
    {
        title: "Data Collection",
        description: "We gather details about your income, expenses, assets, and liabilities.",
        outcome: "Full financial picture"
    },
    {
        title: "Risk Profiling",
        description: "Scientific assessment of your risk tolerance and capacity.",
        outcome: "Risk Scorecard"
    },
    {
        title: "Plan Construction",
        description: "We design a comprehensive roadmap covering all aspects of your finance.",
        outcome: "Draft Financial Plan"
    },
    {
        title: "Presentation & Action",
        description: "We present the plan, discuss feedback, and finalize the action steps.",
        outcome: "Execution Roadmap"
    },
    {
        title: "Review & Monitor",
        description: "Periodic reviews to ensure you stay on track towards your goals.",
        outcome: "Peace of Mind"
    }
];

export function ProcessTimeline() {
    return (
        <div className="relative max-w-4xl mx-auto pl-8 md:pl-0">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 hidden md:block" />
            <div className="absolute left-8 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 md:hidden" />

            <div className="space-y-12">
                {STEPS.map((step, index) => (
                    <div key={index} className={`relative flex flex-col md:flex-row gap-8 ${index % 2 === 0 ? 'md:text-right' : 'md:flex-row-reverse md:text-left'}`}>

                        {/* Dot */}
                        <div className="absolute left-0 top-0 w-16 h-16 flex items-center justify-center -translate-x-1/2 md:left-1/2 md:translate-x-[-50%] z-10">
                            <div className="w-8 h-8 rounded-full bg-background border-4 border-muted flex items-center justify-center text-primary font-bold text-sm shadow-sm">
                                {index + 1}
                            </div>
                        </div>

                        {/* Content Spacer for Alignment */}
                        <div className="flex-1 md:w-1/2" />

                        {/* Content Card */}
                        <div className="flex-1 md:w-1/2 pl-12 md:pl-0">
                            <h3 className="text-xl font-bold text-foreground mb-2">{step.title}</h3>
                            <p className="text-muted-foreground mb-3">{step.description}</p>
                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                <Check className="w-3 h-3" />
                                <span>Outcome: {step.outcome}</span>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
