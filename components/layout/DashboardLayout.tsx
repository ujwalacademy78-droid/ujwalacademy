"use client";

import { useApp } from "@/lib/context";
import Sidebar from "@/components/layout/Sidebar";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { currentUser } = useApp();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!currentUser && !pathname.includes("/login")) {
            router.push("/login");
        }
    }, [currentUser, pathname, router]);

    if (!currentUser) return null;

    return (
        <div className="flex min-h-screen bg-gray-50/50">
            <Sidebar />
            <main className="flex-1 ml-64 p-8 overflow-auto h-screen">
                {children}
            </main>
        </div>
    );
}
