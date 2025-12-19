"use client";

import { useState, useEffect } from "react";
import {
    ShoppingBag,
    FileText,
    Users,
    TrendingUp,
    Package,
    Eye,
    ArrowUpRight,
    ArrowDownRight
} from "lucide-react";
import RevenueChart from "@/component/admin/RevenueChart";

interface StatCard {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change: number;
    changeLabel: string;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        products: 0,
        blogs: 0,
        categories: 0,
        views: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetching stats
        setTimeout(() => {
            setStats({
                products: 24,
                blogs: 12,
                categories: 8,
                views: 1234
            });
            setLoading(false);
        }, 500);
    }, []);

    const statCards: StatCard[] = [
        {
            title: "Tổng sản phẩm",
            value: stats.products,
            icon: <ShoppingBag className="w-6 h-6" />,
            change: 12,
            changeLabel: "so với tháng trước"
        },
        {
            title: "Bài viết blog",
            value: stats.blogs,
            icon: <FileText className="w-6 h-6" />,
            change: 8,
            changeLabel: "so với tháng trước"
        },
        {
            title: "Danh mục",
            value: stats.categories,
            icon: <Package className="w-6 h-6" />,
            change: 0,
            changeLabel: "không đổi"
        },
        {
            title: "Lượt xem",
            value: stats.views.toLocaleString(),
            icon: <Eye className="w-6 h-6" />,
            change: -5,
            changeLabel: "so với tuần trước"
        }
    ];

    const recentActivities = [
        { action: "Thêm sản phẩm mới", item: "Bó hoa hồng đỏ", time: "5 phút trước" },
        { action: "Cập nhật blog", item: "Cách chăm sóc hoa tươi", time: "1 giờ trước" },
        { action: "Xóa sản phẩm", item: "Hoa cúc trắng", time: "3 giờ trước" },
        { action: "Xuất bản blog", item: "Top 10 loại hoa phổ biến", time: "Hôm qua" },
    ];

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
                            <div className="h-4 w-24 bg-gray-200 rounded mb-4"></div>
                            <div className="h-8 w-16 bg-gray-200 rounded mb-2"></div>
                            <div className="h-3 w-32 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-gray-500 font-medium">{stat.title}</span>
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                                {stat.icon}
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-gray-800 mb-2">
                            {stat.value}
                        </div>
                        <div className="flex items-center gap-1 text-sm">
                            {stat.change > 0 ? (
                                <ArrowUpRight className="w-4 h-4 text-green-500" />
                            ) : stat.change < 0 ? (
                                <ArrowDownRight className="w-4 h-4 text-red-500" />
                            ) : null}
                            <span className={stat.change > 0 ? "text-green-500" : stat.change < 0 ? "text-red-500" : "text-gray-500"}>
                                {stat.change !== 0 && `${Math.abs(stat.change)}%`} {stat.changeLabel}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <RevenueChart />

            {/* Charts and Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        Thao tác nhanh
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            onClick={() => window.location.href = '/admin/products'}
                            className="p-4 bg-primary/5 hover:bg-primary/10 rounded-xl text-left transition-colors"
                        >
                            <ShoppingBag className="w-8 h-8 text-primary mb-2" />
                            <span className="font-semibold text-gray-800">Thêm sản phẩm</span>
                            <p className="text-sm text-gray-500 mt-1">Tạo sản phẩm mới</p>
                        </button>
                        <button
                            onClick={() => window.location.href = '/admin/blogs'}
                            className="p-4 bg-accent/5 hover:bg-accent/10 rounded-xl text-left transition-colors"
                        >
                            <FileText className="w-8 h-8 text-accent mb-2" />
                            <span className="font-semibold text-gray-800">Viết blog</span>
                            <p className="text-sm text-gray-500 mt-1">Tạo bài viết mới</p>
                        </button>
                        <button
                            onClick={() => window.location.href = '/admin/accounts'}
                            className="p-4 bg-green-50 hover:bg-green-100 rounded-xl text-left transition-colors"
                        >
                            <Users className="w-8 h-8 text-green-600 mb-2" />
                            <span className="font-semibold text-gray-800">Quản lý admin</span>
                            <p className="text-sm text-gray-500 mt-1">Thêm tài khoản</p>
                        </button>
                        <button
                            onClick={() => window.location.href = '/shop'}
                            className="p-4 bg-blue-50 hover:bg-blue-100 rounded-xl text-left transition-colors"
                        >
                            <Eye className="w-8 h-8 text-blue-600 mb-2" />
                            <span className="font-semibold text-gray-800">Xem cửa hàng</span>
                            <p className="text-sm text-gray-500 mt-1">Mở trang shop</p>
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                        Hoạt động gần đây
                    </h3>
                    <div className="space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                            >
                                <div>
                                    <p className="font-medium text-gray-800">{activity.action}</p>
                                    <p className="text-sm text-gray-500">{activity.item}</p>
                                </div>
                                <span className="text-xs text-gray-400">{activity.time}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white">
                <h2 className="text-2xl font-bold mb-2">Chào mừng đến với Florist Admin!</h2>
                <p className="opacity-90 mb-4">
                    Quản lý cửa hàng hoa của bạn một cách dễ dàng và hiệu quả.
                </p>
                <div className="flex gap-3">
                    <button
                        onClick={() => window.location.href = '/admin/products'}
                        className="px-4 py-2 bg-white text-primary font-semibold rounded-lg hover:bg-white/90 transition-colors"
                    >
                        Xem sản phẩm
                    </button>
                    <button
                        onClick={() => window.location.href = '/admin/blogs'}
                        className="px-4 py-2 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/30 transition-colors"
                    >
                        Xem blog
                    </button>
                </div>
            </div>
        </div>
    );
}
