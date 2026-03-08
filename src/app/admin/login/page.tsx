"use client";

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "@/content/config";
import { Lock, Mail, ArrowRight, ShieldCheck, Loader2 } from "lucide-react";
import Image from "next/image";

export default function AdminLoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin/dashboard");
        } catch (err: any) {
            setError(err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password'
                ? "Invalid credentials. Please try again."
                : "An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen grid lg:grid-cols-2 bg-white selection:bg-amber-100">
            {/* Left Side: Branding & Visuals */}
            <div className="hidden lg:flex relative flex-col justify-between p-12 overflow-hidden bg-slate-900 border-r border-white/5">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-slate-900 to-amber-900/20 z-10" />
                    <Image
                        src="/images/brand-logo.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-20 blur-sm scale-110"
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                >
                    <Image
                        src="/images/brand-logo.png"
                        alt={CONFIG.BRAND_NAME}
                        width={240}
                        height={60}
                        className="brightness-0 invert h-auto w-auto max-w-[200px]"
                    />
                </motion.div>

                <div className="relative z-10 max-w-md">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h1 className="text-4xl font-serif font-bold text-white mb-6 leading-tight">
                            Secure Access for financial Architects.
                        </h1>
                        <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                            Welcome back to the Nirvana Command Center. Manage insights, advisory tools, and client resources with absolute precision.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md"
                    >
                        <div className="p-3 bg-amber-500/20 rounded-xl text-amber-400">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white uppercase tracking-widest">End-to-End Encryption</p>
                            <p className="text-xs text-slate-400">Your session is secured by industry-leading protocols.</p>
                        </div>
                    </motion.div>
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="relative z-10 text-sm text-slate-500"
                >
                    &copy; {new Date().getFullYear()} {CONFIG.BRAND_NAME}. All rights reserved.
                </motion.p>
            </div>

            {/* Right Side: Login Form */}
            <div className="flex flex-col justify-center items-center p-8 bg-slate-50/50">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md"
                >
                    <div className="lg:hidden mb-12 flex flex-col items-center">
                        <Image
                            src="/images/brand-logo.png"
                            alt={CONFIG.BRAND_NAME}
                            width={160}
                            height={40}
                            className="h-auto w-auto mb-4"
                        />
                    </div>

                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Admin Login</h2>
                        <p className="text-slate-500">Enter your credentials to manage your dashboard.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-600 transition-colors">
                                    <Mail className="h-5 w-5" />
                                </div>
                                <Input
                                    className="pl-12 h-14 bg-white border-slate-200 focus-visible:ring-amber-200 focus-visible:border-amber-500 transition-all rounded-xl"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="admin@nirvaana.in"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-slate-700 uppercase tracking-widest">Password</label>
                                <button type="button" className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors">Forgot?</button>
                            </div>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-600 transition-colors">
                                    <Lock className="h-5 w-5" />
                                </div>
                                <Input
                                    className="pl-12 h-14 bg-white border-slate-200 focus-visible:ring-amber-200 focus-visible:border-amber-500 transition-all rounded-xl"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <AnimatePresence>
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm"
                                >
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                                    {error}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <Button
                            type="submit"
                            className="w-full h-14 bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-amber-600/20 transition-all active:scale-[0.98] disabled:opacity-70"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <span className="flex items-center">
                                    Sign In <ArrowRight className="ml-2 w-5 h-5" />
                                </span>
                            )}
                        </Button>

                        <p className="text-center text-sm text-slate-400 pt-4">
                            Strictly for Nirvana internal use only.
                        </p>
                    </form>
                </motion.div>
            </div>
        </main>
    );
}
