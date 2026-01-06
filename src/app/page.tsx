import Link from "next/link";
import { Hero } from "@/components/shared/Hero";
import { QuestionCards } from "@/components/shared/QuestionCards";
import { ValueCards } from "@/components/shared/ValueCards";
import { ProductCards } from "@/components/shared/ProductCards";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { ProcessTimeline } from "@/components/shared/ProcessTimeline";
import { TestimonialCarousel } from "@/components/shared/TestimonialsCarousel";
import { CTASection } from "@/components/shared/CTASection";
import { SERVICES } from "@/content/services";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col pt-24">

      {/* A) Hero Section */}
      <Hero />

      {/* B) Question Slider Section */}
      {/* B) Question Slider Section
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
              Are you asking these questions?
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Most professionals struggle with these common financial dilemmas. We have the answers.
            </p>
          </div>
          <QuestionCards />
        </div>
      </section>
      */}

      {/* C) Values Section */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold tracking-wider text-primary uppercase mb-2 block">Our Ethos</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Why Trust Us?
            </h2>

          </div>
          <ValueCards />
        </div>
      </section>

      {/* C.5) Products Section [NEW] */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <span className="text-sm font-bold tracking-wider text-primary uppercase mb-2 block">Our Offerings</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Products
            </h2>

          </div>
          <ProductCards />
        </div>
      </section>

      {/* D) Services Grid */}
      <section className="py-20 bg-slate-50" id="services">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <span className="text-sm font-bold tracking-wider text-primary uppercase mb-2 block">Our Expertise</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
                Comprehensive Financial Solutions
              </h2>
              <p className="text-muted-foreground">
                From retirement planning to insurance analysis, we cover every aspect of your financial life.
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/services">View All Services <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                title={service.title}
                description={service.shortDescription}
                icon={service.icon}
                slug={service.slug}
              />
            ))}
          </div>
        </div>
      </section>

      {/* E) Process Timeline */}
      <section className="py-20 bg-slate-50" id="process">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold tracking-wider text-primary uppercase mb-2 block">How We Work</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              Your Path to Financial Nirvana
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A structured, scientific approach to managing your wealth.
            </p>
          </div>
          <ProcessTimeline />
        </div>
      </section>

      {/* G) Social Proof */}
      <section className="py-20 bg-slate-50/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-sm font-bold tracking-wider text-primary uppercase mb-2 block">Client Stories</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
              Don&apos;t just take our word for it.
            </h2>
          </div>
          <TestimonialCarousel />
        </div>
      </section>



      {/* I) CTA Strip */}
      <CTASection />

    </main>
  );
}
