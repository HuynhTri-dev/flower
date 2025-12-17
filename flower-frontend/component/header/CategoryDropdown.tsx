"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

// Mock data - in real app this could come from props or API
const categories = [
    { id: 1, name: "Fresh Flowers", href: "/category/fresh" },
    { id: 2, name: "Dried Flowers", href: "/category/dried" },
    { id: 3, name: "Wedding Bouquets", href: "/category/wedding" },
    { id: 4, name: "Office Plants", href: "/category/office" },
    { id: 5, name: "Gift Baskets", href: "/category/gifts" },
];

export const CategoryDropdown = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
                <span className="font-medium text-sm">Categories</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="py-2">
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                href={category.href}
                                onClick={() => setIsOpen(false)}
                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:text-primary transition-colors"
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
