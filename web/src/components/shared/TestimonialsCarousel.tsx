"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { TESTIMONIALS } from "@/content/testimonials";

import Autoplay from "embla-carousel-autoplay";

export function TestimonialCarousel() {
    return (
        <Carousel
            opts={{
                align: "start",
                loop: true,
            }}
            plugins={[
                Autoplay({
                    delay: 4000,
                }),
            ]}
            className="w-full max-w-5xl mx-auto"
        >
            <CarouselContent>
                {TESTIMONIALS.map((testimonial, index) => (
                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                        <div className="p-1">
                            <Card className="border-none shadow-none bg-secondary/30">
                                <CardContent className="flex flex-col gap-4 p-6">
                                    <Quote className="w-8 h-8 text-primary/20" />
                                    <p className="text-muted-foreground italic leading-relaxed">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="flex items-center gap-3 mt-2">
                                        <div className="w-10 h-10 rounded-full bg-background border border-border flex items-center justify-center font-bold text-primary text-sm">
                                            {testimonial.initials}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                                            <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <div className="hidden md:block">
                <CarouselPrevious />
                <CarouselNext />
            </div>
        </Carousel>
    );
}
