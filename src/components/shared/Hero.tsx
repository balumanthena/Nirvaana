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
        <section className="relative min-h-screen w-full overflow-hidden bg-slate-900">
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
                        <CarouselItem key={index} className="!pl-0 h-[100vh] w-full relative">
                            {/* Layer 1: Background Image */}
                            <div className="absolute inset-0">
                                <NextImage
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className={cn(
                                        "object-cover transition-transform duration-[20s] ease-out",
                                        (index + 1 === current) ? "scale-110" : "scale-100"
                                    )}
                                    sizes="100vw"
                                    priority={index === 0}
                                    quality={100}
                                />
                            </div>

                            {/* Layer 2: Gradient Overlay (Cinematic Depth) */}
                            <div
                                className="absolute inset-0 z-10"
                                style={{
                                    background: 'radial-gradient(circle at center, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
                                    backgroundColor: 'rgba(0,0,0,0.2)' // Base tint
                                }}
                            />
                            {/* Layer 3: Content Layer */}
                            {slide.title && (
                                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 px-4 md:px-8">
                                    <div className="max-w-6xl w-full text-center">
                                        <h2
                                            className={cn(
                                                "text-[28px] sm:text-[38px] md:text-[48px] lg:text-[56px] font-serif text-[#ffffff] font-bold tracking-tight mb-10 leading-[1.1] opacity-0 transition-all duration-1000 ease-out mx-auto max-w-4xl",
                                                (index + 1 === current) && "animate-fade-up opacity-100"
                                            )}
                                            style={{
                                                textShadow: '0 2px 8px rgba(0,0,0,0.5)',
                                            }}
                                        >
                                            {slide.title}
                                        </h2>
                                        {slide.cta && (
                                            <div
                                                className={cn(
                                                    "opacity-0 transition-all duration-1000 delay-500",
                                                    (index + 1 === current) && "animate-fade-up opacity-100"
                                                )}
                                            >
                                                <Link
                                                    href={slide.link || "#"}
                                                    className="px-10 py-3.5 bg-white text-slate-900 font-semibold text-base rounded-sm hover:bg-slate-100 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 inline-block"
                                                >
                                                    {slide.cta}
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation Arrows - Minimal & Glassmorphic */}
                <CarouselPrevious className="hidden md:flex left-8 bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-md w-14 h-14 z-30 transition-all duration-300 rounded-full" />
                <CarouselNext className="hidden md:flex right-8 bg-white/10 hover:bg-white/20 border-white/20 text-white backdrop-blur-md w-14 h-14 z-30 transition-all duration-300 rounded-full" />
            </Carousel>

            {/* Pagination Dots - Glassmorphic */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center gap-4 z-30">
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
