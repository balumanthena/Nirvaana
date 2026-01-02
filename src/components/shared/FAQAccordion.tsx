import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQS } from "@/content/faqs";

export function FAQAccordion() {
    return (
        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
            {FAQS.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-slate-900 font-medium hover:text-primary transition-colors">
                        {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-600 leading-relaxed">
                        {faq.answer}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
