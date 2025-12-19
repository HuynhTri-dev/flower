'use client'

import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/component/card/ProductCard';
import { ProductSkeletonCard } from '@/component/card/ProductSekeltonCard';

interface Product {
    id: string | number;
    name: string;
    price: number;
    imageUrl: string;
    collection?: string;
}

// Mock Data for Top 10 Products
const TOP_PRODUCTS: Product[] = [
    { id: 1, name: "Pink Hydrangea Bouquet", price: 450000, imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp", collection: "Best Seller" },
    { id: 2, name: "White Orchid Royal", price: 1200000, imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp", collection: "Luxury" },
    { id: 3, name: "Sunflower Sunshine", price: 350000, imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp", collection: "Summer" },
    { id: 4, name: "Red Rose Romance", price: 550000, imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp", collection: "Love" },
    { id: 5, name: "Tulip Garden", price: 480000, imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp" },
    { id: 6, name: "Lavender Dream", price: 600000, imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp", collection: "Relax" },
    { id: 7, name: "Peony Princess", price: 950000, imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp", collection: "Premium" },
    { id: 8, name: "Baby Breath Pure", price: 250000, imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp" },
    { id: 9, name: "Mixed Spring Flowers", price: 420000, imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp", collection: "Spring" },
    { id: 10, name: "Blue Hydrangea Sky", price: 470000, imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp" },
];

export const TopProductBanner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const itemsToShow = 5;
    const autoSlideInterval = 3000; // 5 seconds

    // Fake loading effect
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    // Auto slide logic
    useEffect(() => {
        if (isLoading) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const maxIndex = TOP_PRODUCTS.length - itemsToShow;
                return prevIndex >= maxIndex ? 0 : prevIndex + 1;
            });
        }, autoSlideInterval);

        return () => clearInterval(interval);
    }, [isLoading]);

    const handleAddToCart = (product: Product) => {
        console.log("Added to cart:", product.name);
    };

    if (isLoading) {
        return (
            <div className="w-full py-8 bg-gray-50/50">
                <div className="container mx-auto px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                        <span className="w-1 h-8 bg-pink-500 rounded-full"></span>
                        Top Sản Phẩm Bán Chạy
                    </h2>
                    <div className="flex gap-6 overflow-hidden">
                        {Array.from({ length: itemsToShow }).map((_, index) => (
                            <div key={index} className="w-1/5 flex-shrink-0">
                                <ProductSkeletonCard />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full py-12 bg-gray-50/50">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <span className="w-1.5 h-8 bg-gradient-to-b from-pink-500 to-purple-500 rounded-full"></span>
                        Top Sản Phẩm Bán Chạy
                    </h2>

                    {/* Navigation Dots (Optional visualization of steps) */}
                    <div className="flex gap-1.5 pb-2">
                        {Array.from({ length: TOP_PRODUCTS.length - itemsToShow + 1 }).map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-pink-500' : 'w-2 bg-gray-300'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden p-1 -m-1">
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{
                            width: `${(TOP_PRODUCTS.length / itemsToShow) * 100}%`,
                            transform: `translateX(-${currentIndex * (100 / TOP_PRODUCTS.length)}%)`
                        }}
                    >
                        {TOP_PRODUCTS.map((product) => (
                            <div
                                key={product.id}
                                className="px-3 flex-shrink-0"
                                style={{ width: `${100 / TOP_PRODUCTS.length}%` }}
                            >
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    imageUrl={product.imageUrl}
                                    collection={product.collection}
                                    onAddToCart={() => handleAddToCart(product)}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
