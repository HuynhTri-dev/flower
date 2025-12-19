'use client'

import React, { useState, useEffect } from 'react';
import { ProductCard } from '@/component/card/ProductCard';
import { ProductSkeletonCard } from '@/component/card/ProductSekeltonCard';
import { Product } from '@/data/models/Product';
import { ProductApi } from '@/data/api/ProductApi';

export const TopProductBanner = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const itemsToShow = 5;
    const autoSlideInterval = 3000;

    // Fetch products on mount
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const data = await ProductApi.getTopProducts(10);
            setProducts(data);
        } catch (err) {
            setError("Không thể tải sản phẩm");
            console.error("Error fetching products:", err);
        } finally {
            setIsLoading(false);
        }
    };

    // Auto slide logic
    useEffect(() => {
        if (isLoading || products.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const maxIndex = products.length - itemsToShow;
                return prevIndex >= maxIndex ? 0 : prevIndex + 1;
            });
        }, autoSlideInterval);

        return () => clearInterval(interval);
    }, [isLoading, products.length]);

    const handleAddToCart = (product: Product) => {
        console.log("Added to cart:", product.name);
        // TODO: Implement cart functionality
    };

    // Get collection name from product
    const getCollectionName = (product: Product) => {
        return product.collection?.name;
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

    if (error) {
        return (
            <div className="w-full py-12 bg-gray-50/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                        <span className="w-1 h-8 bg-pink-500 rounded-full"></span>
                        Top Sản Phẩm Bán Chạy
                    </h2>
                    <p className="text-red-500 mb-4">{error}</p>
                    <button
                        onClick={fetchProducts}
                        className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    if (products.length === 0) {
        return (
            <div className="w-full py-12 bg-gray-50/50">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">
                        Chưa có sản phẩm nào
                    </h2>
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

                    {/* Navigation Dots */}
                    <div className="flex gap-1.5 pb-2">
                        {Array.from({ length: Math.max(1, products.length - itemsToShow + 1) }).map((_, idx) => (
                            <div
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? 'w-8 bg-pink-500' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="overflow-hidden p-1 -m-1">
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{
                            width: `${(products.length / itemsToShow) * 100}%`,
                            transform: `translateX(-${currentIndex * (100 / products.length)}%)`
                        }}
                    >
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className="px-3 flex-shrink-0"
                                style={{ width: `${100 / products.length}%` }}
                            >
                                <ProductCard
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    imageUrl={product.imageUrl}
                                    collection={getCollectionName(product)}
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
