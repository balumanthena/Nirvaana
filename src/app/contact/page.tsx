"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { CONFIG } from "@/content/config";
import { Mail, Phone, MapPin } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const subject = `New Inquiry from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
        window.location.href = `mailto:${CONFIG.EMAIL}?subject=${subject}&body=${body}`;
    };

    return (
        <main className="pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">
                        Get in Touch
                    </h1>
                    <p className="text-xl text-slate-600 leading-relaxed">
                        Have questions? We are here to help. Reach out to us via email, phone, or simply fill out the form below.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <Card className="border-slate-200">
                            <CardContent className="p-6 flex items-start gap-4">
                                <Mail className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">Email Us</h3>
                                    <a href={`mailto:${CONFIG.EMAIL}`} className="text-slate-600 hover:text-emerald-700">{CONFIG.EMAIL}</a>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-slate-200">
                            <CardContent className="p-6 flex items-start gap-4">
                                <Phone className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">Call Us</h3>
                                    <a href={`tel:${CONFIG.PHONE}`} className="text-slate-600 hover:text-emerald-700">{CONFIG.PHONE}</a>
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="border-slate-200">
                            <CardContent className="p-6 flex items-start gap-4">
                                <MapPin className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-semibold text-slate-900 mb-1">Visit Us</h3>
                                    <p className="text-slate-600">
                                        {CONFIG.CITY}, India.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <Card className="border-slate-200 h-full">
                            <CardContent className="p-8">
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="name" className="text-sm font-medium text-slate-700">Full Name</label>
                                            <Input
                                                id="name"
                                                placeholder="John Doe"
                                                required
                                                value={name}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                required
                                                value={email}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-slate-700">Message</label>
                                        <Textarea
                                            id="message"
                                            placeholder="How can we help you?"
                                            className="min-h-[150px]"
                                            required
                                            value={message}
                                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value)}
                                        />
                                    </div>
                                    <Button type="submit" size="lg" className="w-full">
                                        Send Message
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </main>
    );
}
