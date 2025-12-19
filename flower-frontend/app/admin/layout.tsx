"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import SideBar, { menuItems } from "@/component/admin/SideBar";

interface AdminLayoutProps {
    children: React.ReactNode;
}

interface AdminUser {
    username: string;
    role: string;
    token: string;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [admin, setAdmin] = useState<AdminUser | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("admin");
        if (stored) {
            setAdmin(JSON.parse(stored));
        } else {
            router.push("/login");
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("admin");
        router.push("/login");
    };

    const isActive = (href: string) => pathname === href;

    if (!admin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-secondary">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <SideBar onLogout={handleLogout} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                {menuItems.find(item => isActive(item.href))?.label || "Dashboard"}
                            </h2>
                            <p className="text-sm text-gray-500">
                                Quản lý cửa hàng hoa Florist
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                                <RefreshCw className="w-5 h-5 text-gray-500" />
                            </button>

                            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                                    {admin.username.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-semibold text-gray-800">{admin.username}</p>
                                    <p className="text-xs text-gray-500">Quản trị viên</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
