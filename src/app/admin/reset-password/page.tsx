"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { CONFIG } from "@/content/config";
import { Lock, ArrowRight, ShieldCheck, Loader2, CheckCircle2, XCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(true);
    const [email, setEmail] = useState("");

    const oobCode = searchParams.get("oobCode");

    useEffect(() => {
        if (!oobCode) {
            setError("Invalid or missing reset token.");
            setVerifying(false);
            setLoading(false);
            return;
        }

        verifyPasswordResetCode(auth, oobCode)
            .then((email) => {
                setEmail(email);
                setVerifying(false);
                setLoading(false);
            })
            .catch((err) => {
                setError("The reset link is invalid or has expired.");
                setVerifying(false);
                setLoading(false);
            });
    }, [oobCode]);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            await confirmPasswordReset(auth, oobCode!, password);
            setSuccess(true);
        } catch (err: any) {
            setError("Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (verifying) {
        return (
            <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="w-12 h-12 text-amber-600 animate-spin" />
                <p className="text-slate-500 font-medium">Verifying reset token...</p>
            </div>
        );
    }

    if (success) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8"
            >
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto text-green-600">
                    <CheckCircle2 className="w-12 h-12" />
                </div>
                <div>
                    <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Password Reset Successful</h2>
                    <p className="text-slate-500">Your security credentials have been updated. You can now sign in with your new password.</p>
                </div>
                <Link href="/admin/login">
                    <Button className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg rounded-xl transition-all">
                        Back to Login
                    </Button>
                </Link>
            </motion.div>
        );
    }

    return (
        <div className="w-full max-w-md">
            <div className="mb-10 text-center lg:text-left">
                <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Create New Password</h2>
                <p className="text-slate-500">Resetting password for <span className="font-bold text-slate-900">{email}</span></p>
            </div>

            <form onSubmit={handleReset} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-widest ml-1">New Password</label>
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

                <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 uppercase tracking-widest ml-1">Confirm Password</label>
                    <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-amber-600 transition-colors">
                            <Lock className="h-5 w-5" />
                        </div>
                        <Input
                            className="pl-12 h-14 bg-white border-slate-200 focus-visible:ring-amber-200 focus-visible:border-amber-500 transition-all rounded-xl"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                            <XCircle className="w-5 h-5 flex-shrink-0" />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <Button
                    type="submit"
                    className="w-full h-14 bg-amber-600 hover:bg-amber-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-amber-600/20 transition-all active:scale-[0.98] disabled:opacity-70"
                    disabled={loading || !!error && !verifying}
                >
                    {loading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        <span className="flex items-center">
                            Set New Password <ArrowRight className="ml-2 w-5 h-5" />
                        </span>
                    )}
                </Button>

                <p className="text-center text-sm text-slate-400 pt-4">
                    Security is our top priority. Choose a strong password.
                </p>
            </form>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <main className="min-h-screen grid lg:grid-cols-2 bg-white selection:bg-amber-100">
            {/* Left Side: Branding & Visuals (Shared with Login) */}
            <div className="hidden lg:flex relative flex-col justify-between p-12 overflow-hidden bg-slate-900 border-r border-white/5">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-slate-900 to-amber-900/20 z-10" />
                    <Image
                        src="/images/Untitled_design__15_-removebg-preview.png"
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
                        src="/images/Untitled_design__15_-removebg-preview.png"
                        alt={CONFIG.BRAND_NAME}
                        width={240}
                        height={60}
                        className="brightness-0 invert h-auto w-auto max-w-[200px]"
                    />
                </motion.div>

                <div className="relative z-10 max-w-md">
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-serif font-bold text-white mb-6 leading-tight"
                    >
                        Secure Your Digital Wealth.
                    </motion.h1>

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
                            <p className="text-sm font-bold text-white uppercase tracking-widest">Nirvana Wise Wealth Guardian</p>
                            <p className="text-xs text-slate-400">Advanced identity protection for financial architects.</p>
                        </div>
                    </motion.div>
                </div>

                <p className="relative z-10 text-sm text-slate-500">
                    &copy; {new Date().getFullYear()} {CONFIG.BRAND_NAME}. All rights reserved.
                </p>
            </div>

            {/* Right Side: Reset Form */}
            <div className="flex flex-col justify-center items-center p-8 bg-slate-50/50">
                <Suspense fallback={<Loader2 className="w-8 h-8 animate-spin text-amber-600" />}>
                    <ResetPasswordForm />
                </Suspense>
            </div>
        </main>
    );
}
