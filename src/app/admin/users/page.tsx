"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/admin/AuthProvider";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, ArrowLeft, Loader2, Users, Shield, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface AdminUser {
    uid: string;
    email: string;
    role: string;
    status: string;
    createdAt: string;
}

export default function ManageTeam() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!authLoading && !user) {
            router.push("/admin/login");
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        const fetchUsers = async () => {
            if (!user) return;
            try {
                const q = query(collection(db, "admin_users"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const users: AdminUser[] = [];
                querySnapshot.forEach((doc) => {
                    users.push(doc.data() as AdminUser);
                });
                setAdminUsers(users);
            } catch (err: any) {
                console.error("Error fetching users:", err);
                setError("Failed to load team members. Ensure Firestore rules allow access.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [user]);

    if (authLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-slate-300" />
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-slate-50 p-4 md:p-8">
            <div className="max-w-6xl mx-auto space-y-8">
                
                {/* Header */}
                <div>
                    <Link href="/admin/dashboard" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Dashboard
                    </Link>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">Team Management</h1>
                            <p className="text-slate-500">Manage administrator access and view verification statuses.</p>
                        </div>
                        <Link href="/admin/create-admin">
                            <Button className="bg-blue-900 hover:bg-blue-800 rounded-full px-6 shadow-lg shadow-blue-900/10">
                                <Plus className="w-4 h-4 mr-2" /> Invite Admin
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Error State */}
                {error && (
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium">
                        {error}
                    </div>
                )}

                {/* Data Table */}
                <Card className="border-0 shadow-2xl shadow-blue-900/5 rounded-[2rem] overflow-hidden bg-white">
                    <CardContent className="p-0">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-24 text-slate-400 space-y-4">
                                <Loader2 className="w-8 h-8 animate-spin" />
                                <p>Loading team members...</p>
                            </div>
                        ) : adminUsers.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-24 text-slate-400 space-y-4">
                                <Users className="w-12 h-12 opacity-50" />
                                <p>No team members found.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-500 text-xs uppercase tracking-wider font-semibold">
                                            <th className="py-4 px-6 font-bold">Email Address</th>
                                            <th className="py-4 px-6 font-bold">Role</th>
                                            <th className="py-4 px-6 font-bold">Status</th>
                                            <th className="py-4 px-6 font-bold text-right">Date Added</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {adminUsers.map((admin) => (
                                            <tr key={admin.uid} className="hover:bg-slate-50/50 transition-colors group">
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold uppercase text-sm border border-slate-200">
                                                            {admin.email.charAt(0)}
                                                        </div>
                                                        <span className="font-medium text-slate-900">{admin.email}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    <div className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                                        <Shield className="w-4 h-4 text-blue-900" />
                                                        <span className="capitalize">{admin.role}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-6">
                                                    {admin.status === 'active' ? (
                                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold tracking-wide border border-green-100">
                                                            <CheckCircle2 className="w-3.5 h-3.5" />
                                                            ACTIVE
                                                        </div>
                                                    ) : (
                                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold tracking-wide border border-amber-100">
                                                            <AlertCircle className="w-3.5 h-3.5" />
                                                            PENDING
                                                        </div>
                                                    )}
                                                </td>
                                                <td className="py-4 px-6 text-right">
                                                    <div className="flex items-center justify-end gap-1.5 text-slate-500 text-sm">
                                                        <Clock className="w-4 h-4 opacity-50" />
                                                        {new Date(admin.createdAt).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            year: 'numeric'
                                                        })}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}
