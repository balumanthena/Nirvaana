import { Zap, Scale, HeartHandshake } from "lucide-react";

const VALUES = [
    {
        title: "Trusted Partnership",
        description: "Ongoing support to help you stay on track toward financial independence.",
        icon: Zap
    },
    {
        title: "Ethical Advisory",
        description: "Client-focused recommendations with full clarity and structured processes.",
        icon: Scale
    },
    {
        title: "Simple",
        description: "Financial jargon is out. We speak your language and make complex concepts easy to understand.",
        icon: HeartHandshake
    }
];

export function ValueCards() {
    return (
        <div className="grid md:grid-cols-3 gap-8">
            {VALUES.map((val) => (
                <div key={val.title} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-center hover:bg-white hover:shadow-lg transition-all duration-300">
                    <div className="w-16 h-16 mx-auto bg-background rounded-full flex items-center justify-center shadow-sm mb-6 text-primary">
                        <val.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-slate-900 mb-3">{val.title}</h3>
                    <p className="text-slate-600 leading-relaxed">
                        {val.description}
                    </p>
                </div>
            ))}
        </div>
    );
}
