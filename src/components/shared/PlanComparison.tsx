"use client";


import { cn } from "@/lib/utils";

// Messy Block - Tilted, overlapped, random margins
const MessyBlock = ({
    text,
    color = "bg-muted-foreground/50",
    className,
    style
}: {
    text: string,
    color?: string,
    className?: string,
    style?: React.CSSProperties
}) => (
    <div
        className={cn(
            "absolute flex items-center justify-center text-white text-xs font-bold rounded shadow-md border-b-4 border-r-4 border-black/10 z-10",
            color,
            className
        )}
        style={style}
    >
        {text}
    </div>
);

// Organized Block - Uniform, aligned
const NeatBlock = ({
    text,
    className
}: {
    text: string,
    className?: string
}) => (
    <div className={cn(
        "flex items-center justify-center bg-secondary text-secondary-foreground text-xs font-semibold rounded border border-border shadow-sm transition-all hover:bg-background hover:shadow-md hover:scale-[1.02]",
        className
    )}>
        {text}
    </div>
);

export function PlanComparison() {
    return (
        <section className="py-24 bg-background">
            <div className="container mx-auto px-4 md:px-6">

                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6">
                        Chaos vs. Clarity
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                        Without a plan, financial decisions are reactive and cluttered. <br className="hidden md:inline" />
                        With a plan, everything fits together perfectly.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 max-w-5xl mx-auto">

                    {/* LEFT: The MESS (Pile of Bricks) */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-[320px] h-[320px]">

                            {/* A literal pile of mess */}
                            <MessyBlock text="TAXES" className="bottom-14 left-10 w-24 h-12 rotate-[-12deg] z-10 bg-rose-900/60" />
                            <MessyBlock text="INSURANCE" className="bottom-8 left-24 w-28 h-14 rotate-[6deg] z-20 bg-amber-900/60" />
                            <MessyBlock text="LOANS" className="bottom-20 right-14 w-20 h-20 rotate-[45deg] z-0 bg-stone-500" />
                            <MessyBlock text="STOCKS?" className="bottom-32 left-12 w-24 h-10 rotate-[-25deg] z-30 bg-indigo-900/50" />
                            <MessyBlock text="EXPENSES" className="top-24 right-16 w-24 h-24 rotate-[15deg] z-10 bg-slate-600" />
                            <MessyBlock text="SAVINGS" className="top-10 left-20 w-20 h-16 rotate-[170deg] z-20 bg-primary/40" />
                            <MessyBlock text="GOALS??" className="top-40 left-8 w-20 h-12 rotate-[-10deg] z-40 bg-purple-900/50" />

                            <p className="absolute bottom-4 w-full text-center text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">
                                ( The struggle is real )
                            </p>
                        </div>
                        <h3 className="mt-8 text-xl font-bold text-foreground">Without a Plan</h3>
                        <p className="text-muted-foreground text-sm mt-2">Stressful. Unpredictable.</p>
                    </div>

                    {/* RIGHT: The ORDER (Perfect Grid) */}
                    <div className="flex flex-col items-center">
                        <div className="w-[320px] h-[320px] flex flex-col gap-4 p-2">

                            {/* Header: Goals */}
                            <div className="w-full bg-primary text-primary-foreground font-bold py-3 rounded-lg text-center shadow-md">
                                YOUR LIFE GOALS
                            </div>

                            {/* The Organized Structure */}
                            <div className="flex-1 grid grid-cols-2 gap-3">
                                {/* Left Col */}
                                <div className="flex flex-col gap-3">
                                    <NeatBlock text="Investments" className="flex-1 bg-secondary border-primary/20 text-foreground" />
                                    <NeatBlock text="Tax Planning" className="h-12" />
                                    <NeatBlock text="Insurance" className="h-12" />
                                </div>

                                {/* Right Col */}
                                <div className="flex flex-col gap-3">
                                    <NeatBlock text="Retirement" className="h-12" />
                                    <NeatBlock text="Emergency Fund" className="h-12" />
                                    <NeatBlock text="Cashflow" className="flex-1 bg-foreground text-background" />
                                </div>
                            </div>

                        </div>
                        <h3 className="mt-8 text-xl font-bold text-primary">With a Plan</h3>
                        <p className="text-primary/60 text-sm mt-2">Peaceful. Structured.</p>
                    </div>

                </div>

            </div>
        </section>
    );
}
