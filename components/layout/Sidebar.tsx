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
    LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const Sidebar = () => {
    const { currentUser, logout } = useApp();
    const pathname = usePathname();

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

    return (
        <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-background transition-transform">
            <div className="flex h-full flex-col">
                <div className="flex h-16 items-center justify-center border-b px-2">
                    <Image
                        src="/logo-final.png"
                        alt="Ujwal Academy"
                        width={180}
                        height={50}
                        className="h-12 w-auto object-contain"
                        priority
                    />
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
                                        className={cn(
                                            "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
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
                    <div className="mb-4 flex items-center px-2">
                        <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {currentUser.name.charAt(0)}
                        </div>
                        <div className="ml-3">
                            <p className="text-sm font-medium">{currentUser.name}</p>
                            <p className="text-xs text-muted-foreground capitalize">{currentUser.role}</p>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50" onClick={logout}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
