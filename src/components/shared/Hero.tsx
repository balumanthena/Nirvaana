"use client";

import * as React from "react";
import Link from "next/link";
import NextImage from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import { cn } from "@/lib/utils";

const HERO_SLIDES = [
    {
        image: "/images/Hero1.png",
        title: "Are your investments in line with your risk appetite?",
        cta: "Read More",
        link: "/services/risk-profiling"
    },
    {
        image: "/images/Her02.png",
        title: "Are you adequately insured?",
        cta: "Read More",
        link: "/services/insurance-adequacy"
    },
    {
        image: "/images/Hero3.png",
        title: "Are you investing enough for your retirement?",
        cta: "Read More",
        link: "/services/retirement-planning"
    },
    {
        image: "/images/Hero4.png",
        title: "Do you have adequate savings for a rainy day?",
        cta: "Read More",
        link: "/services/emergency-fund"
    },
    {
        image: "/images/Hero5.png",
        title: "Whether your portfolio is generating adequate returns?",
        cta: "Read More",
        link: "/services/portfolio-review"
    },
];

export function Hero() {
    const [api, setApi] = React.useState<CarouselApi>();
    const [current, setCurrent] = React.useState(0);
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!api) {
            return;
        }

        setCount(api.scrollSnapList().length);
        setCurrent(api.selectedScrollSnap() + 1);

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap() + 1);
        });
    }, [api]);

    return (
        <section className="relative h-[calc(100vh-6rem)] w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden">
            {/* Full Screen Carousel */}
            <Carousel
                setApi={setApi}
                plugins={[
                    Autoplay({
                        delay: 6000,
                    }),
                    Fade(),
                ]}
                opts={{
                    loop: true,
                    align: "center",
                }}
                className="w-full h-full absolute inset-0"
            >
                <CarouselContent className="!ml-0 h-full">
                    {HERO_SLIDES.map((slide, index) => (
                        <CarouselItem key={index} className="!pl-0 h-full w-full relative bg-gray-900">
                            <NextImage
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className={cn(
                                    "object-cover transition-transform duration-[20s]",
                                    (index + 1 === current) ? "scale-110" : "scale-100"
                                )}
                                sizes="100vw"
                                priority={index === 0}
                            />
                            {/* Cinematic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

                            {/* Slide Content */}
                            {slide.title && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4">
                                    <h1
                                        className={cn(
                                            "text-3xl md:text-5xl lg:text-6xl font-serif text-white text-center font-medium tracking-wide mb-8 drop-shadow-lg max-w-4xl leading-tight opacity-0",
                                            (index + 1 === current) && "animate-fade-up"
                                        )}
                                    >
                                        {slide.title}
                                    </h1>
                                    {slide.cta && (
                                        <div
                                            className={cn(
                                                "opacity-0",
                                                (index + 1 === current) && "animate-fade-up"
                                            )}
                                            style={{ animationDelay: "300ms" }}
                                        >
                                            <Link
                                                href={slide.link || "#"}
                                                className="px-8 py-3 bg-white text-slate-900 font-medium text-lg rounded-sm hover:bg-slate-100 transition-colors shadow-lg inline-block"
                                            >
                                                {slide.cta}
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )}
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Arrows - Minimal & Glassmorphic */}
                <CarouselPrevious className="left-4 md:left-8 bg-white/5 hover:bg-white/20 border-white/10 text-white backdrop-blur-md w-12 h-12 z-30 transition-all duration-300 rounded-full" />
                <CarouselNext className="right-4 md:right-8 bg-white/5 hover:bg-white/20 border-white/10 text-white backdrop-blur-md w-12 h-12 z-30 transition-all duration-300 rounded-full" />
            </Carousel>

            {/* Pagination Dots - Glassmorphic */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 z-20">
                {Array.from({ length: count }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => api?.scrollTo(index)}
                        className={cn(
                            "h-1.5 rounded-full transition-all duration-500 backdrop-blur-sm",
                            current === index + 1
                                ? "bg-white w-8 shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                                : "bg-white/30 w-1.5 hover:bg-white/50"
                        )}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
