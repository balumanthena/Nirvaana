import Link from "next/link";
import { SERVICES } from "@/content/services";
import { ServiceCard } from "@/components/shared/ServiceCard";
import { Button } from "@/components/ui/button";
import { CONFIG } from "@/content/config";

export default function ServicesPage() {
    return (
        <main className="pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                        Our Services
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Holistic, data-driven financial planning solutions tailored to your unique life stage.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
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

                <div className="mt-20 bg-slate-100 rounded-3xl p-12 text-center">
                    <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Not sure what you need?</h2>
                    <p className="text-slate-600 mb-8 max-w-xl mx-auto">
                        Book a free discovery call and we will help you identify the right financial path for you.
                    </p>
                    <Button size="lg" asChild>
                        <Link href="/schedule">Book Discovery Call</Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}
