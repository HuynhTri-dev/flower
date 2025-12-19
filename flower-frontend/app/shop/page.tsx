"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "@/component/common/Footer";
import { Navbar } from "@/component/header";
import { SearchBar, TopProductEachCate } from "@/component/shop";
import { ProductCard } from "@/component/card/ProductCard";
import { ProductSkeletonCard } from "@/component/card/ProductSekeltonCard";
import { Pagination, usePagination } from "@/component/common/Pagination";
import { ProductApi } from "@/data/api/ProductApi";
import { Product } from "@/data/models/Product";

export default function ShopPage() {
    const router = useRouter();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await ProductApi.getAll(1, 12);
                setProducts(response.products);
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Không thể tải sản phẩm. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Pagination - 20 items per page
    const {
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedItems: paginatedProducts,
        totalItems,
        itemsPerPage,
    } = usePagination(products, 20);

    const handleAddToCart = (product: Product) => {
        console.log("Add to cart:", product);
    };

    const handleProductClick = (product: Product) => {
        router.push(`/shop/${product.id}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />
            <main className="py-12 md:px-24 px-16 flex flex-col gap-4 md:gap-6">
                <TopProductEachCate />

                <SearchBar />

                <h2 className="text-2xl font-bold mb-4">Sản phẩm</h2>

                {/* Error State */}
                {error && (
                    <div className="text-center py-8">
                        <p className="text-red-500 mb-4">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Thử lại
                        </button>
                    </div>
                )}

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-4">
                    {/* Loading State - Skeleton Cards */}
                    {loading && (
                        <>
                            {Array.from({ length: 8 }).map((_, index) => (
                                <ProductSkeletonCard key={`skeleton-${index}`} />
                            ))}
                        </>
                    )}

                    {/* Products */}
                    {!loading && !error && paginatedProducts.map((product) => (
                        <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            price={product.price}
                            imageUrl={product.imageUrl}
                            collection={product.collection?.name}
                            onAddToCart={() => handleAddToCart(product)}
                            onClick={() => handleProductClick(product)}
                        />
                    ))}
                </div>

                {/* Pagination */}
                {!loading && !error && products.length > 0 && (
                    <div className="mt-8">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            type="product"
                            itemsPerPage={itemsPerPage}
                            totalItems={totalItems}
                        />
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && products.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Không có sản phẩm nào.</p>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}
