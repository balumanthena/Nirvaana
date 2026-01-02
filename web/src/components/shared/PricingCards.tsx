import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check } from "lucide-react";
import { PRICING_PLANS } from "@/content/pricing";
import { CONFIG } from "@/content/config";
import { cn } from "@/lib/utils";

export function PricingCards() {
    return (
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {PRICING_PLANS.map((plan) => (
                <Card
                    key={plan.name}
                    className={cn(
                        "flex flex-col relative overflow-hidden transition-all duration-300",
                        plan.popular ? "border-slate-900 shadow-xl scale-105 z-10" : "border-slate-200 hover:border-slate-300"
                    )}
                >
                    {plan.popular && (
                        <div className="absolute top-0 inset-x-0 h-1 bg-slate-900" />
                    )}
                    <CardHeader>
                        {plan.popular && (
                            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">Most Popular</span>
                        )}
                        <CardTitle className="text-2xl font-serif text-slate-900">{plan.name}</CardTitle>
                        <CardDescription className="text-slate-500 mt-2">{plan.description}</CardDescription>
                        <div className="mt-4">
                            <span className="text-3xl font-bold text-slate-900">{plan.price}</span>
                            <span className="text-slate-500 ml-1">{plan.period}</span>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <ul className="flex flex-col gap-3">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-2 text-sm text-slate-600">
                                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            asChild
                            className="w-full"
                            variant={plan.popular ? "default" : "outline"}
                        >
                            <Link href={CONFIG.CALENDLY_URL} target="_blank">{plan.cta}</Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
