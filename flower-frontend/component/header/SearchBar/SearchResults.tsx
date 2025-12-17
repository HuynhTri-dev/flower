"use client";

import Link from "next/link";
import { Search } from "lucide-react";

// Types for search results
export interface ProductResult {
    id: string;
    name: string;
    price: number;
    image?: string;
    slug: string;
}

interface SearchResultsProps {
    results: ProductResult[];
    isLoading: boolean;
    isVisible: boolean;
    onClose: () => void;
}

export const SearchResults = ({ results, isLoading, isVisible, onClose }: SearchResultsProps) => {
    if (!isVisible) return null;

    return (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
            {isLoading ? (
                <div className="p-4 text-center text-gray-500 text-sm flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                    Searching...
                </div>
            ) : results.length > 0 ? (
                <div className="py-2">
                    <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        Products
                    </div>
                    {results.map((product) => (
                        <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            onClick={onClose}
                            className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors"
                        >
                            <div className="w-10 h-10 bg-gray-100 rounded-md flex-shrink-0 flex items-center justify-center text-gray-300">
                                {/* Placeholder for image */}
                                <Search className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h4>
                                <p className="text-xs text-primary font-medium">${product.price.toFixed(2)}</p>
                            </div>
                        </Link>
                    ))}
                    <div className="border-t border-gray-100 mt-2">
                        <Link
                            href="/shop"
                            onClick={onClose}
                            className="block px-4 py-3 text-center text-xs text-primary font-medium hover:bg-gray-50 transition-colors"
                        >
                            View all results
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="p-6 text-center text-gray-500 text-sm">
                    No results found.
                </div>
            )}
        </div>
    );
};
