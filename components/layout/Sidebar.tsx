"use client";

import { useApp, Role } from "@/lib/context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
    LayoutDashboard,
    Users,
    Video,
    FileText,
    PenTool,
    CreditCard,
    GraduationCap,
    PlayCircle,
    BookOpen,
    LogOut,
    Menu,
    X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

const Sidebar = () => {
    const { currentUser, logout } = useApp();
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (!currentUser) return null;

    const adminLinks = [
        { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/dashboard/admin/students", label: "Students", icon: Users },
        { href: "/dashboard/admin/content", label: "Content CMS", icon: Video },
        { href: "/dashboard/admin/exams", label: "Exam Creator", icon: PenTool },
        { href: "/dashboard/admin/finance", label: "Finance", icon: CreditCard },
    ];

    const studentLinks = [
        { href: "/dashboard/student", label: "Home", icon: LayoutDashboard },
        { href: "/dashboard/student/learning", label: "Learning Zone", icon: PlayCircle },
        { href: "/dashboard/student/notes", label: "Study Notes", icon: FileText },
        { href: "/dashboard/student/exams", label: "Exams", icon: GraduationCap },
        { href: "/dashboard/student/progress", label: "My Progress", icon: BookOpen },
    ];

    const links = currentUser.role === "admin" ? adminLinks : studentLinks;

    const SidebarContent = () => (
        <>
            <div className="flex h-16 items-center justify-between border-b px-4">
                <Image
                    src="/logo-final.png"
                    alt="Ujwal Academy"
                    width={180}
                    height={50}
                    className="h-10 w-auto object-contain"
                    priority
                />
                {/* Close button for mobile */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                    <X className="h-5 w-5" />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto py-4 px-3">
                <ul className="space-y-2">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={cn(
                                        "flex items-center rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground touch-manipulation",
                                        isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                                    )}
                                >
                                    <Icon className="mr-3 h-5 w-5" />
                                    {link.label}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="border-t p-4">
                <div className="mb-3 flex items-center gap-3 rounded-lg bg-muted p-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white font-semibold">
                        {currentUser.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{currentUser.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{currentUser.email}</p>
                    </div>
                </div>
                <Button
                    onClick={logout}
                    variant="outline"
                    className="w-full justify-start touch-manipulation"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg hover:bg-gray-100 touch-manipulation"
            >
                <Menu className="h-6 w-6" />
            </button>

            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background flex-col">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Drawer */}
            <div
                className={`lg:hidden fixed inset-0 z-[70] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
            >
                {/* Backdrop */}
                <div
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />

                {/* Drawer */}
                <aside
                    className={`absolute left-0 top-0 h-full w-64 bg-background shadow-2xl transform transition-transform duration-300 flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                >
                    <SidebarContent />
                </aside>
            </div>
        </>
    );
};

export default Sidebar;
