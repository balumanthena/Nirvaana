"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, HelpCircle } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const QUESTIONS = [
    {
        text: "Am I saving enough for my retirement?",
        link: "/services/retirement-planning"
    },
    {
        text: "Is my insurance cover sufficient for my family?",
        link: "/services/insurance-adequacy"
    },
    {
        text: "Can I afford that international trip next year?",
        link: "/services/goal-based-investing"
    },
    {
        text: "Is my portfolio generating the best returns?",
        link: "/services/portfolio-review"
    },
    {
        text: "How much risk can I actually afford to take?",
        link: "/services/risk-profiling"
    },
    {
        text: "Do I have a safety net for sudden job loss?",
        link: "/services/emergency-fund"
    }
];

export function QuestionCards() {
    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                className="w-full"
            >
                <CarouselContent>
                    {QUESTIONS.map((q, i) => (
                        <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3">
                            <div className="p-2 h-full">
                                <Link href={q.link} className="block h-full">
                                    <Card className="bg-white border-slate-200 hover:border-slate-300 hover:shadow-md transition-all h-full group cursor-pointer">
                                        <CardContent className="p-6 flex flex-col justify-between h-full min-h-[180px]">
                                            <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform hover:scale-110 duration-300">
                                                <HelpCircle className="w-8 h-8 text-primary fill-primary/20 mb-0" />
                                            </div>
                                            <h3 className="text-xl font-semibold text-foreground mb-3 leading-tight">
                                                {q.text}
                                            </h3>
                                            <div className="flex items-center text-sm font-semibold text-primary mt-4 group-hover:underline decoration-2 underline-offset-4">
                                                Read more <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="flex justify-end gap-2 mt-4 pr-4">
                    <CarouselPrevious className="static translate-y-0" />
                    <CarouselNext className="static translate-y-0" />
                </div>
            </Carousel>
        </div>
    );
}
