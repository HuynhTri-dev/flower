'use client';

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
    LayoutDashboard,
    ShoppingBag,
    FileText,
    Users,
    LogOut,
    Home,
    Flower2,
    ChevronRight
} from "lucide-react";

interface SideBarProps {
    onLogout: () => void;
}

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: ShoppingBag, label: "Sản phẩm", href: "/admin/products" },
    { icon: FileText, label: "Blog", href: "/admin/blogs" },
    { icon: Users, label: "Tài khoản", href: "/admin/accounts" },
];

export default function SideBar({ onLogout }: SideBarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const isActive = (href: string) => pathname === href;

    return (
        <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative`}>
            {/* Brand - Click to toggle sidebar */}
            <div
                className="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                        <Flower2 className="w-6 h-6 text-white" />
                    </div>
                    {!sidebarCollapsed && (
                        <div>
                            <h1 className="font-bold text-primary text-lg">Florist</h1>
                            <p className="text-xs text-gray-500">Quản lý cửa hàng</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    return (
                        <button
                            key={item.href}
                            onClick={() => router.push(item.href)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${active
                                ? "bg-primary text-white shadow-lg shadow-primary/30"
                                : "text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            <Icon className="w-5 h-5" />
                            {!sidebarCollapsed && (
                                <span className="font-medium">{item.label}</span>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-100 space-y-2">
                <button
                    onClick={() => router.push("/")}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all"
                >
                    <Home className="w-5 h-5" />
                    {!sidebarCollapsed && <span className="font-medium">Về trang chủ</span>}
                </button>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all"
                >
                    <LogOut className="w-5 h-5" />
                    {!sidebarCollapsed && <span className="font-medium">Đăng xuất</span>}
                </button>
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="absolute top-1/2 -right-3 w-6 h-6 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
                <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${sidebarCollapsed ? '' : 'rotate-180'}`} />
            </button>
        </aside>
    );
}

// Export menu items for use in layout header
export { menuItems };