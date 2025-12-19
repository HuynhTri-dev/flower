"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Search, SlidersHorizontal, X, ChevronDown, Check } from "lucide-react";
import { Category } from "@/data/models/Category";
import { Collection } from "@/data/models/Collection";
import { CategoryApi } from "@/data/api/CategoryApi";
import { CollectionApi } from "@/data/api/CollectionApi";
import { formatPrice } from "@/data/models/Product";

// Filter state interface
export interface ProductFilters {
    searchQuery: string;
    categoryId: string | number | null;
    collectionId: string | number | null;
    minPrice: number | null;
    maxPrice: number | null;
}

interface SearchBarProps {
    onFiltersChange?: (filters: ProductFilters) => void;
    initialFilters?: Partial<ProductFilters>;
    className?: string;
}

// Price range presets
const PRICE_RANGES = [
    { label: "Dưới 300.000đ", min: 0, max: 300000 },
    { label: "300.000đ - 500.000đ", min: 300000, max: 500000 },
    { label: "500.000đ - 1.000.000đ", min: 500000, max: 1000000 },
    { label: "Trên 1.000.000đ", min: 1000000, max: null },
];

export const SearchBar: React.FC<SearchBarProps> = ({
    onFiltersChange,
    initialFilters,
    className = "",
}) => {
    // State for filters
    const [filters, setFilters] = useState<ProductFilters>({
        searchQuery: initialFilters?.searchQuery || "",
        categoryId: initialFilters?.categoryId || null,
        collectionId: initialFilters?.collectionId || null,
        minPrice: initialFilters?.minPrice || null,
        maxPrice: initialFilters?.maxPrice || null,
    });

    // State for dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    // State for data
    const [categories, setCategories] = useState<Category[]>([]);
    const [collections, setCollections] = useState<Collection[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    // Custom price range inputs
    const [customMinPrice, setCustomMinPrice] = useState<string>("");
    const [customMaxPrice, setCustomMaxPrice] = useState<string>("");

    // Refs
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Fetch categories and collections
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [categoriesData, collectionsData] = await Promise.all([
                    CategoryApi.getAll(),
                    CollectionApi.getAll(),
                ]);
                setCategories(categoriesData);
                setCollections(collectionsData);
            } catch (error) {
                console.error("Error fetching filter data:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Notify parent of filter changes
    useEffect(() => {
        onFiltersChange?.(filters);
    }, [filters, onFiltersChange]);

    // Handlers
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
    };

    const handleCategorySelect = (categoryId: string | number | null) => {
        setFilters(prev => ({ ...prev, categoryId }));
    };

    const handleCollectionSelect = (collectionId: string | number | null) => {
        setFilters(prev => ({ ...prev, collectionId }));
    };

    const handlePriceRangeSelect = (min: number | null, max: number | null) => {
        setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
        setCustomMinPrice(min?.toString() || "");
        setCustomMaxPrice(max?.toString() || "");
    };

    const handleCustomPriceApply = () => {
        const min = customMinPrice ? parseInt(customMinPrice) : null;
        const max = customMaxPrice ? parseInt(customMaxPrice) : null;
        setFilters(prev => ({ ...prev, minPrice: min, maxPrice: max }));
    };

    const clearFilters = () => {
        setFilters({
            searchQuery: "",
            categoryId: null,
            collectionId: null,
            minPrice: null,
            maxPrice: null,
        });
        setCustomMinPrice("");
        setCustomMaxPrice("");
    };

    const toggleSection = (section: string) => {
        setExpandedSection(expandedSection === section ? null : section);
    };

    // Count active filters
    const activeFilterCount = [
        filters.categoryId,
        filters.collectionId,
        filters.minPrice !== null || filters.maxPrice !== null,
    ].filter(Boolean).length;

    // Get selected category/collection names
    const selectedCategory = categories.find(c => c.id === filters.categoryId);
    const selectedCollection = collections.find(c => c.id === filters.collectionId);

    // Price range display
    const getPriceRangeDisplay = () => {
        if (filters.minPrice === null && filters.maxPrice === null) return null;
        if (filters.minPrice !== null && filters.maxPrice !== null) {
            return `${formatPrice(filters.minPrice)} - ${formatPrice(filters.maxPrice)}`;
        }
        if (filters.minPrice !== null) {
            return `Từ ${formatPrice(filters.minPrice)}`;
        }
        if (filters.maxPrice !== null) {
            return `Đến ${formatPrice(filters.maxPrice)}`;
        }
        return null;
    };

    return (
        <div className={`w-full ${className}`}>
            {/* Main Search Bar Container */}
            <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                    <div className="relative flex items-center">
                        <Search className="absolute left-4 h-5 w-5 text-gray-400 pointer-events-none" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={filters.searchQuery}
                            onChange={handleSearchChange}
                            className="w-full h-12 pl-12 pr-4 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 shadow-sm hover:shadow-md"
                        />
                        {filters.searchQuery && (
                            <button
                                onClick={() => setFilters(prev => ({ ...prev, searchQuery: "" }))}
                                className="absolute right-4 p-1 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Filter Button */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`
                            flex items-center gap-2 h-12 px-5 rounded-xl border transition-all duration-200 shadow-sm hover:shadow-md
                            ${isDropdownOpen || activeFilterCount > 0
                                ? "bg-primary text-white border-primary"
                                : "bg-white text-gray-700 border-gray-200 hover:border-gray-300"
                            }
                        `}
                    >
                        <SlidersHorizontal className="h-5 w-5" />
                        <span className="font-medium">Bộ lọc</span>
                        {activeFilterCount > 0 && (
                            <span className={`
                                flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full text-xs font-bold
                                ${isDropdownOpen ? "bg-white text-primary" : "bg-accent text-white"}
                            `}>
                                {activeFilterCount}
                            </span>
                        )}
                        <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Filter Dropdown */}
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                            {/* Dropdown Header */}
                            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-primary/5 to-accent/5">
                                <h3 className="font-semibold text-gray-800">Lọc sản phẩm</h3>
                                {activeFilterCount > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-accent hover:text-accent/80 font-medium transition-colors"
                                    >
                                        Xóa tất cả
                                    </button>
                                )}
                            </div>

                            {isLoading ? (
                                <div className="flex items-center justify-center py-10">
                                    <div className="h-8 w-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : (
                                <div className="max-h-[400px] overflow-y-auto">
                                    {/* Category Section */}
                                    <div className="border-b border-gray-100">
                                        <button
                                            onClick={() => toggleSection("category")}
                                            className="flex items-center justify-between w-full px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-gray-800">Danh mục</span>
                                                {selectedCategory && (
                                                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                                                        {selectedCategory.name}
                                                    </span>
                                                )}
                                            </div>
                                            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${expandedSection === "category" ? "rotate-180" : ""}`} />
                                        </button>
                                        {expandedSection === "category" && (
                                            <div className="px-3 pb-3 space-y-1">
                                                <button
                                                    onClick={() => handleCategorySelect(null)}
                                                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left transition-colors ${filters.categoryId === null
                                                            ? "bg-primary text-white"
                                                            : "hover:bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    <span>Tất cả danh mục</span>
                                                    {filters.categoryId === null && <Check className="h-4 w-4" />}
                                                </button>
                                                {categories.map((category) => (
                                                    <button
                                                        key={category.id}
                                                        onClick={() => handleCategorySelect(category.id)}
                                                        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left transition-colors ${filters.categoryId === category.id
                                                                ? "bg-primary text-white"
                                                                : "hover:bg-gray-100 text-gray-700"
                                                            }`}
                                                    >
                                                        <span>{category.name}</span>
                                                        {filters.categoryId === category.id && <Check className="h-4 w-4" />}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Collection Section */}
                                    <div className="border-b border-gray-100">
                                        <button
                                            onClick={() => toggleSection("collection")}
                                            className="flex items-center justify-between w-full px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-gray-800">Bộ sưu tập</span>
                                                {selectedCollection && (
                                                    <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full">
                                                        {selectedCollection.name}
                                                    </span>
                                                )}
                                            </div>
                                            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${expandedSection === "collection" ? "rotate-180" : ""}`} />
                                        </button>
                                        {expandedSection === "collection" && (
                                            <div className="px-3 pb-3 space-y-1">
                                                <button
                                                    onClick={() => handleCollectionSelect(null)}
                                                    className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left transition-colors ${filters.collectionId === null
                                                            ? "bg-primary text-white"
                                                            : "hover:bg-gray-100 text-gray-700"
                                                        }`}
                                                >
                                                    <span>Tất cả bộ sưu tập</span>
                                                    {filters.collectionId === null && <Check className="h-4 w-4" />}
                                                </button>
                                                {collections.map((collection) => (
                                                    <button
                                                        key={collection.id}
                                                        onClick={() => handleCollectionSelect(collection.id)}
                                                        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left transition-colors ${filters.collectionId === collection.id
                                                                ? "bg-primary text-white"
                                                                : "hover:bg-gray-100 text-gray-700"
                                                            }`}
                                                    >
                                                        <span>{collection.name}</span>
                                                        {filters.collectionId === collection.id && <Check className="h-4 w-4" />}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Price Range Section */}
                                    <div>
                                        <button
                                            onClick={() => toggleSection("price")}
                                            className="flex items-center justify-between w-full px-5 py-4 text-left hover:bg-gray-50 transition-colors"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-gray-800">Khoảng giá</span>
                                                {getPriceRangeDisplay() && (
                                                    <span className="text-xs px-2 py-0.5 bg-secondary text-primary rounded-full">
                                                        {getPriceRangeDisplay()}
                                                    </span>
                                                )}
                                            </div>
                                            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${expandedSection === "price" ? "rotate-180" : ""}`} />
                                        </button>
                                        {expandedSection === "price" && (
                                            <div className="px-3 pb-4 space-y-3">
                                                {/* Preset Ranges */}
                                                <div className="space-y-1">
                                                    <button
                                                        onClick={() => handlePriceRangeSelect(null, null)}
                                                        className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left transition-colors ${filters.minPrice === null && filters.maxPrice === null
                                                                ? "bg-primary text-white"
                                                                : "hover:bg-gray-100 text-gray-700"
                                                            }`}
                                                    >
                                                        <span>Tất cả mức giá</span>
                                                        {filters.minPrice === null && filters.maxPrice === null && <Check className="h-4 w-4" />}
                                                    </button>
                                                    {PRICE_RANGES.map((range, index) => {
                                                        const isSelected = filters.minPrice === range.min && filters.maxPrice === range.max;
                                                        return (
                                                            <button
                                                                key={index}
                                                                onClick={() => handlePriceRangeSelect(range.min, range.max)}
                                                                className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-left transition-colors ${isSelected
                                                                        ? "bg-primary text-white"
                                                                        : "hover:bg-gray-100 text-gray-700"
                                                                    }`}
                                                            >
                                                                <span>{range.label}</span>
                                                                {isSelected && <Check className="h-4 w-4" />}
                                                            </button>
                                                        );
                                                    })}
                                                </div>

                                                {/* Custom Price Range */}
                                                <div className="pt-3 border-t border-gray-100">
                                                    <p className="text-sm text-gray-500 mb-2">Hoặc nhập khoảng giá</p>
                                                    <div className="flex items-center gap-2">
                                                        <input
                                                            type="number"
                                                            placeholder="Từ"
                                                            value={customMinPrice}
                                                            onChange={e => setCustomMinPrice(e.target.value)}
                                                            className="flex-1 h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                        />
                                                        <span className="text-gray-400">-</span>
                                                        <input
                                                            type="number"
                                                            placeholder="Đến"
                                                            value={customMaxPrice}
                                                            onChange={e => setCustomMaxPrice(e.target.value)}
                                                            className="flex-1 h-10 px-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                                        />
                                                        <button
                                                            onClick={handleCustomPriceApply}
                                                            className="h-10 px-4 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                                                        >
                                                            Áp dụng
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Active Filters Tags */}
            {(selectedCategory || selectedCollection || filters.minPrice !== null || filters.maxPrice !== null) && (
                <div className="flex flex-wrap items-center gap-2 mt-4">
                    <span className="text-sm text-gray-500">Đang lọc:</span>
                    {selectedCategory && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                            {selectedCategory.name}
                            <button
                                onClick={() => handleCategorySelect(null)}
                                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </span>
                    )}
                    {selectedCollection && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium">
                            {selectedCollection.name}
                            <button
                                onClick={() => handleCollectionSelect(null)}
                                className="hover:bg-accent/20 rounded-full p-0.5 transition-colors"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </span>
                    )}
                    {(filters.minPrice !== null || filters.maxPrice !== null) && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-primary rounded-full text-sm font-medium">
                            {getPriceRangeDisplay()}
                            <button
                                onClick={() => handlePriceRangeSelect(null, null)}
                                className="hover:bg-primary/10 rounded-full p-0.5 transition-colors"
                            >
                                <X className="h-3.5 w-3.5" />
                            </button>
                        </span>
                    )}
                    <button
                        onClick={clearFilters}
                        className="text-sm text-gray-500 hover:text-gray-700 underline ml-2 transition-colors"
                    >
                        Xóa tất cả
                    </button>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
