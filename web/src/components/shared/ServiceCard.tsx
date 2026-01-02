import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    slug: string;
}

export function ServiceCard({ title, description, icon: Icon, slug }: ServiceCardProps) {
    return (
        <Card className="h-full group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border-border/50 bg-card hover:border-primary/20">
            <CardHeader className="pb-4">
                <div className="w-16 h-16 mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-full h-full" />
                </div>
                <CardTitle className="text-xl font-serif text-foreground group-hover:text-primary transition-colors">
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3 text-[15px]">
                    {description}
                </p>
                <Link
                    href={`/services/${slug}`}
                    className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors"
                >
                    Learn more <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </CardContent>
        </Card>
    );
}
