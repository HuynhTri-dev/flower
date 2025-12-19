'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product, formatPrice } from "@/data/models/Product";
import { Category } from "@/data/models/Category";
import { ArrowRight, Sparkles } from "lucide-react";

// Interface for category with featured product
interface CategoryWithProduct {
    category: Category;
    product: Product;
}

// Mock data - 5 categories with featured products
const MOCK_CATEGORY_PRODUCTS: CategoryWithProduct[] = [
    {
        category: { id: 1, name: "Hoa Tươi", slug: "hoa-tuoi", description: "Hoa tươi mỗi ngày" },
        product: {
            id: 1,
            name: "Bó Hồng Đỏ Lãng Mạn",
            price: 550000,
            imageUrl: "https://i.pinimg.com/736x/54/5c/11/545c1175bcf6512ef0103cc0dbdcc57b.jpg",
        }
    },
    {
        category: { id: 2, name: "Hoa Cưới", slug: "hoa-cuoi", description: "Hoa cưới lãng mạn" },
        product: {
            id: 2,
            name: "Bó Hoa Cô Dâu Tinh Khôi",
            price: 1200000,
            imageUrl: "https://i.pinimg.com/736x/6e/36/c0/6e36c0e23b0084809db4863a1a1a9993.jpg",
        }
    },
    {
        category: { id: 3, name: "Hoa Khô", slug: "hoa-kho", description: "Hoa khô trang trí" },
        product: {
            id: 3,
            name: "Bình Hoa Khô Vintage",
            price: 450000,
            imageUrl: "https://i.pinimg.com/736x/7b/b4/10/7bb4100de579b4774da1db657e4c7cf4.jpg",

        }
    },
    {
        category: { id: 4, name: "Giỏ Hoa", slug: "gio-hoa", description: "Giỏ hoa quà tặng" },
        product: {
            id: 4,
            name: "Giỏ Hoa Chúc Mừng",
            price: 850000,
            imageUrl: "https://i.pinimg.com/1200x/98/a4/d5/98a4d5a9807be77bb6acdc96382fed5c.jpg",
        }
    },
];

// Color themes for each category
const CATEGORY_COLORS: Record<number, { bg: string; accent: string; text: string }> = {
    1: { bg: "from-rose-50 to-pink-100", accent: "bg-rose-500", text: "text-rose-600" },
    2: { bg: "from-purple-50 to-violet-100", accent: "bg-purple-500", text: "text-purple-600" },
    3: { bg: "from-amber-50 to-orange-100", accent: "bg-amber-500", text: "text-amber-600" },
    4: { bg: "from-emerald-50 to-teal-100", accent: "bg-emerald-500", text: "text-emerald-600" },
    5: { bg: "from-blue-50 to-indigo-100", accent: "bg-blue-500", text: "text-blue-600" },
};

export const TopProductEachCate = () => {
    const [data, setData] = useState<CategoryWithProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        const fetchData = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            setData(MOCK_CATEGORY_PRODUCTS);
            setLoading(false);
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="py-16">
                <div className="container mx-auto px-4">
                    <div className="animate-pulse space-y-4">
                        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto"></div>
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
                            {[...Array(5)].map((_, i) => (
                                <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section >
            <div className="container mx-auto">

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 auto-rows-[200px]">
                    {data.map((item, index) => {
                        const colors = CATEGORY_COLORS[item.category.id as number] || CATEGORY_COLORS[1];

                        // Different sizes for bento grid
                        const gridClasses = [
                            "lg:col-span-3 lg:row-span-2", // Hoa Tươi - large
                            "lg:col-span-3 lg:row-span-1", // Hoa Cưới - medium wide
                            "lg:col-span-2 lg:row-span-1", // Hoa Khô - small
                            "lg:col-span-1 lg:row-span-1", // Giỏ Hoa - small
                        ];

                        return (
                            <Link
                                key={item.category.id}
                                href={`/shop?category=${item.category.slug}`}
                                className={`group relative overflow-hidden rounded-3xl ${gridClasses[index]} transition-all duration-500 hover:shadow-2xl hover:-translate-y-1`}
                            >
                                {/* Background Gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-90`} />

                                {/* Product Image */}
                                <div className="absolute inset-0 overflow-hidden">
                                    <img
                                        src={item.product.imageUrl}
                                        alt={item.product.name}
                                        className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-all duration-700"
                                    />
                                </div>

                                {/* Content Overlay */}
                                <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                                    {/* Category Badge */}
                                    <div className="flex justify-between items-start">
                                        <span className={`inline-block px-3 py-1 rounded-full ${colors.accent} text-white text-xs font-semibold`}>
                                            {item.category.name}
                                        </span>
                                        <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <ArrowRight className={`w-5 h-5 ${colors.text}`} />
                                        </div>
                                    </div>

                                    {/* Product Info */}
                                    <div className="space-y-2">
                                        <h3 className={`text-xl lg:text-2xl font-bold text-slate-800 line-clamp-2 group-hover:${colors.text} transition-colors`}>
                                            {item.product.name}
                                        </h3>
                                        <div className="flex items-center justify-between pt-2">
                                            <span className={`text-lg font-bold ${colors.text}`}>
                                                {formatPrice(item.product.price)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover Border Effect */}
                                <div className={`absolute inset-0 rounded-3xl ring-2 ring-transparent group-hover:ring-white/50 transition-all duration-300`} />
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};