"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/admin/AuthProvider";
import { initializeApp, deleteApp, FirebaseApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, setPersistence, inMemoryPersistence } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, UserPlus, Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { isConfigured, db } from "@/lib/firebase";

export default function CreateAdmin() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");

    // Protect route
    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/admin/login");
        }
    }, [user, authLoading, router]);

    const handleCreateAdmin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) return;
        
        setStatus("loading");
        setErrorMessage("");

        if (!isConfigured) {
            setStatus("error");
            setErrorMessage("Firebase is not configured properly.");
            return;
        }

        const firebaseConfig = {
            apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
            authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
        };

        let secondaryApp: FirebaseApp | null = null;

        try {
            // Initialize a secondary app to avoid logging out the current admin
            secondaryApp = initializeApp(firebaseConfig, "SecondaryApp");
            const secondaryAuth = getAuth(secondaryApp);
            
            // Critical: Set persistence to memory so it doesn't overwrite the primary admin's session in local storage!
            await setPersistence(secondaryAuth, inMemoryPersistence);

            // Create the new user
            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, email, password);
            const newUser = userCredential.user;

            // Send verification email
            await sendEmailVerification(newUser);

            // Store in Firestore
            await setDoc(doc(db, "admin_users", newUser.uid), {
                uid: newUser.uid,
                email: newUser.email,
                role: "admin",
                status: "pending",
                createdAt: new Date().toISOString()
            });

            setStatus("success");
            setEmail("");
            setPassword("");
            
            // Clean up the secondary app immediately so it doesn't linger
            await deleteApp(secondaryApp);
            
            // Automatically clear success message after 5 seconds
            setTimeout(() => {
                setStatus("idle");
            }, 5000);
            
        } catch (error: any) {
            console.error("Error creating admin:", error);
            setStatus("error");
            
            if (error.code === 'auth/email-already-in-use') {
                setErrorMessage("An account with this email already exists. Try using a different email, or log in and resend the verification email.");
            } else if (error.code === 'permission-denied') {
                setErrorMessage("Firestore permissions denied. Please update your Firebase Rules to allow writes to the admin_users collection.");
            } else {
                setErrorMessage(error.message || "Failed to create administrator account.");
            }
            
            // Ensure we clean up even if creation failed
            if (secondaryApp) {
                try {
                    await deleteApp(secondaryApp);
                } catch (cleanupError) {
                    console.error("Failed to cleanup secondary app:", cleanupError);
                }
            }
        }
    };

    if (authLoading) return null; // Or a loading spinner

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8">
                {/* Header */}
                <div>
                    <Link href="/admin/users" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Team
                    </Link>
                    <h2 className="text-3xl font-serif font-bold text-slate-900 text-center">New Administrator</h2>
                    <p className="mt-2 text-center text-slate-500">
                        Create a new admin account with full dashboard access.
                    </p>
                </div>

                {/* Form Card */}
                <Card className="border-0 shadow-2xl shadow-blue-900/5 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl">
                    <CardContent className="p-8">
                        <form onSubmit={handleCreateAdmin} className="space-y-6">
                            
                            {/* Error State */}
                            {status === "error" && (
                                <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                                    {errorMessage}
                                </div>
                            )}

                            {/* Success State */}
                            {status === "success" && (
                                <div className="p-4 rounded-2xl bg-green-50 border border-green-100 text-green-600 text-sm font-medium">
                                    Administrator account created successfully! A verification email has been sent.
                                </div>
                            )}

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-4 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 focus:bg-white transition-all text-slate-900"
                                        placeholder="admin@nirvanawise.in"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-slate-700 ml-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-4 pr-12 py-3 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white/50 focus:bg-white transition-all text-slate-900"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors p-1"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-400 ml-1">Must be at least 6 characters long.</p>
                                </div>
                            </div>

                            <Button 
                                type="submit" 
                                className="w-full rounded-2xl py-6 bg-blue-900 hover:bg-blue-800 text-white font-medium shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
                                disabled={status === "loading" || !email || !password}
                            >
                                {status === "loading" ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Creating Account...
                                    </>
                                ) : (
                                    <>
                                        <UserPlus className="mr-2 h-5 w-5" />
                                        Create Administrator
                                    </>
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
