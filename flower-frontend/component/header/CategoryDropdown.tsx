"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu, Loader2 } from "lucide-react";
import { Category } from "@/data/models/Category";
import { CategoryApi } from "@/data/api/CategoryApi";

export const CategoryDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Fetch categories when dropdown opens
    useEffect(() => {
        if (isOpen && categories.length === 0) {
            fetchCategories();
        }
    }, [isOpen]);

    const fetchCategories = async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await CategoryApi.getAll();
            setCategories(data);
        } catch (err) {
            setError("Không thể tải danh mục");
            console.error("Error fetching categories:", err);
        } finally {
            setLoading(false);
        }
    };

    // Handle click outside to close
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Generate href from category
    const getCategoryHref = (category: Category) => {
        return `/shop?category=${category.slug || category.id}`;
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                    ${isOpen ? "bg-primary text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
                `}
            >
                <Menu className="w-5 h-5" />
                <span className="font-medium text-sm">Danh mục</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="py-2">
                        {loading ? (
                            <div className="flex items-center justify-center py-6 text-gray-400">
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                                <span className="text-sm">Đang tải...</span>
                            </div>
                        ) : error ? (
                            <div className="px-4 py-3 text-sm text-red-500 text-center">
                                {error}
                                <button
                                    onClick={fetchCategories}
                                    className="block w-full mt-2 text-primary hover:underline"
                                >
                                    Thử lại
                                </button>
                            </div>
                        ) : categories.length === 0 ? (
                            <div className="px-4 py-3 text-sm text-gray-400 text-center">
                                Không có danh mục nào
                            </div>
                        ) : (
                            categories.map((category) => (
                                <Link
                                    key={category.id}
                                    href={getCategoryHref(category)}
                                    onClick={() => setIsOpen(false)}
                                    className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                                >
                                    {category.name}
                                </Link>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
