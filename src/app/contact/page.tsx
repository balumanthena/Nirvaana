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
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage("");

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    email,
                    message,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            setStatus('success');
            setName("");
            setEmail("");
            setMessage("");

            // Reset success message after 5 seconds
            setTimeout(() => setStatus('idle'), 5000);
        } catch (error) {
            setStatus('error');
            setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
        }
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
                                    <div className="space-y-4">
                                        {CONFIG.ADDRESSES.map((addr, idx) => (
                                            <div key={idx}>
                                                <p className="font-medium text-slate-800 text-sm mb-1">{addr.label}</p>
                                                <p className="text-slate-600 text-sm leading-relaxed">
                                                    {addr.line1}, {addr.line2},<br />
                                                    {addr.line3} - {addr.pincode}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
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
                                                disabled={status === 'loading'}
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
                                                disabled={status === 'loading'}
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
                                            disabled={status === 'loading'}
                                        />
                                    </div>

                                    {status === 'error' && (
                                        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-md">
                                            {errorMessage || 'Something went wrong. Please try again.'}
                                        </div>
                                    )}

                                    {status === 'success' && (
                                        <div className="p-3 text-sm text-emerald-600 bg-emerald-50 rounded-md">
                                            Message sent successfully! We'll get back to you soon.
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full"
                                        disabled={status === 'loading'}
                                    >
                                        {status === 'loading' ? 'Sending...' : 'Send Message'}
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
