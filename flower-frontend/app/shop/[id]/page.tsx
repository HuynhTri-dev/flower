"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Footer } from "@/component/common/Footer";
import { Button } from "@/component/common/Button";
import { Navbar } from "@/component/header";
import { ProductApi } from "@/data/api/ProductApi";
import {
    ProductDetail,
    RelatedProduct,
    formatPrice,
    getAllProductImages,
} from "@/data/models/Product";
import { Flower, Loader, ShoppingCart, Truck } from "lucide-react";

// Loading Skeleton Component
function ProductDetailSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Image Skeleton */}
                <div className="space-y-4">
                    <div className="aspect-square bg-gray-200 rounded-2xl"></div>
                    <div className="flex gap-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-20 h-20 bg-gray-200 rounded-lg"></div>
                        ))}
                    </div>
                </div>

                {/* Info Skeleton */}
                <div className="space-y-6">
                    <div className="h-4 w-24 bg-gray-200 rounded"></div>
                    <div className="h-10 w-3/4 bg-gray-200 rounded"></div>
                    <div className="h-8 w-32 bg-gray-200 rounded"></div>
                    <div className="space-y-2">
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-full bg-gray-200 rounded"></div>
                        <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-6 w-3/4 bg-gray-200 rounded"></div>
                        ))}
                    </div>
                    <div className="flex gap-4">
                        <div className="h-14 flex-1 bg-gray-200 rounded-xl"></div>
                        <div className="h-14 w-14 bg-gray-200 rounded-xl"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Related Product Card Component
function RelatedProductCard({
    product,
    onClick,
}: {
    product: RelatedProduct;
    onClick: () => void;
}) {
    return (
        <div
            onClick={onClick}
            className="group cursor-pointer bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
            <div className="aspect-square relative overflow-hidden">
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-4">
                <h3 className="font-medium text-gray-800 truncate group-hover:text-primary transition-colors">
                    {product.name}
                </h3>
                <p className="text-primary font-bold mt-1">{formatPrice(product.price)}</p>
            </div>
        </div>
    );
}

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const productId = params.id as string;

    const [product, setProduct] = useState<ProductDetail | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<RelatedProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProductDetail = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch product details
                const productData = await ProductApi.getById(productId);
                if (!productData) {
                    setError("Không tìm thấy sản phẩm");
                    return;
                }
                setProduct(productData);

                // Fetch related products
                const related = await ProductApi.getRelatedProducts(productId, 4);
                setRelatedProducts(related);
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setError("Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.");
            } finally {
                setLoading(false);
            }
        };

        if (productId) {
            fetchProductDetail();
        }
    }, [productId]);

    const images = product ? getAllProductImages(product) : [];

    const handleAddToCart = () => {
        // TODO: Implement add to cart
        console.log("Add to cart:", { product, quantity });
        alert(`Đã thêm ${quantity} ${product?.name} vào giỏ hàng!`);
    };

    const handleBuyNow = () => {
        // TODO: Implement buy now
        console.log("Buy now:", { product, quantity });
    };

    const handleQuantityChange = (delta: number) => {
        setQuantity((prev) => Math.max(1, prev + delta));
    };

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            <main className="py-8 md:py-12 px-4 md:px-16 lg:px-24">
                {/* Breadcrumb */}
                <nav className="mb-6 md:mb-8">
                    <ol className="flex items-center gap-2 text-sm text-gray-500">
                        <li>
                            <button
                                onClick={() => router.push("/")}
                                className="hover:text-primary transition-colors"
                            >
                                Trang chủ
                            </button>
                        </li>
                        <li>/</li>
                        <li>
                            <button
                                onClick={() => router.push("/shop")}
                                className="hover:text-primary transition-colors"
                            >
                                Cửa hàng
                            </button>
                        </li>
                        <li>/</li>
                        <li className="text-gray-800 font-medium truncate max-w-[200px]">
                            {product?.name || "Chi tiết sản phẩm"}
                        </li>
                    </ol>
                </nav>

                {/* Error State */}
                {error && (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">🌸</div>
                        <p className="text-gray-600 text-lg mb-6">{error}</p>
                        <button
                            onClick={() => router.push("/shop")}
                            className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors font-medium"
                        >
                            Quay lại cửa hàng
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {loading && !error && <ProductDetailSkeleton />}

                {/* Product Content */}
                {!loading && !error && product && (
                    <>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                            {/* Image Gallery */}
                            <div className="space-y-4">
                                {/* Main Image */}
                                <div className="aspect-square relative rounded-2xl overflow-hidden bg-white shadow-lg">
                                    <Image
                                        src={images[selectedImageIndex]}
                                        alt={product.name}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                    {product.collection && (
                                        <span className="absolute top-4 left-4 px-3 py-1.5 bg-primary/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                                            {product.collection.name}
                                        </span>
                                    )}
                                </div>

                                {/* Thumbnail Gallery */}
                                {images.length > 1 && (
                                    <div className="flex gap-3 overflow-x-auto pb-2">
                                        {images.map((img, index) => (
                                            <button
                                                key={index}
                                                onClick={() => setSelectedImageIndex(index)}
                                                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${selectedImageIndex === index
                                                    ? "border-primary shadow-md"
                                                    : "border-transparent hover:border-gray-300"
                                                    }`}
                                            >
                                                <Image
                                                    src={img}
                                                    alt={`${product.name} - ${index + 1}`}
                                                    width={80}
                                                    height={80}
                                                    className="object-cover w-full h-full"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="space-y-6">
                                {/* Category & Code */}
                                <div className="flex items-center gap-3 flex-wrap">
                                    {product.category && (
                                        <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                                            {product.category.name}
                                        </span>
                                    )}
                                    {product.productCode && (
                                        <span className="text-sm text-gray-400">
                                            Mã: {product.productCode}
                                        </span>
                                    )}
                                </div>

                                {/* Title */}
                                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                    {product.name}
                                </h1>

                                {/* Price */}
                                <div className="flex items-baseline gap-3">
                                    <span className="text-3xl md:text-4xl font-bold text-primary">
                                        {formatPrice(product.price)}
                                    </span>
                                </div>

                                {/* Description */}
                                {product.description && (
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {product.description}
                                    </p>
                                )}

                                {/* Features */}
                                {product.features && product.features.length > 0 && (
                                    <div className="bg-gradient-to-br from-pink-50 to-rose-50 rounded-xl p-5 space-y-3">
                                        <h3 className="font-semibold text-gray-800 mb-3">
                                            Đặc điểm nổi bật
                                        </h3>
                                        <ul className="space-y-2">
                                            {product.features.map((feature, index) => (
                                                <li
                                                    key={index}
                                                    className="text-gray-700 flex items-start gap-2"
                                                >
                                                    <span>{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Quantity Selector */}
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-700 font-medium">Số lượng:</span>
                                    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                        <button
                                            onClick={() => handleQuantityChange(-1)}
                                            disabled={quantity <= 1}
                                            className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            −
                                        </button>
                                        <span className="w-16 text-center font-semibold text-lg">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => handleQuantityChange(1)}
                                            className="w-12 h-12 flex items-center justify-center text-xl hover:bg-gray-100 transition-colors"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4 pt-4">
                                    <Button
                                        onClick={handleAddToCart}
                                        variant="outline"
                                        size="xl"
                                        leftIcon={<ShoppingCart size={20} />}
                                        className="flex-1"
                                    >
                                        Thêm vào giỏ
                                    </Button>
                                    <Button
                                        onClick={handleBuyNow}
                                        variant="gradient"
                                        size="xl"
                                        className="flex-1"
                                    >
                                        Mua ngay
                                    </Button>
                                </div>

                                {/* Trust Badges */}
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Truck />
                                        <span>Giao hàng nhanh</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Loader />
                                        <span>Đổi trả 24h</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Flower />
                                        <span>Hoa tươi 100%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Related Products */}
                        {relatedProducts.length > 0 && (
                            <section className="mt-16 md:mt-24">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                                        Sản phẩm liên quan
                                    </h2>
                                    <button
                                        onClick={() => router.push("/shop")}
                                        className="text-primary font-medium hover:underline"
                                    >
                                        Xem tất cả →
                                    </button>
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                    {relatedProducts.map((item) => (
                                        <RelatedProductCard
                                            key={item.id}
                                            product={item}
                                            onClick={() => router.push(`/shop/${item.id}`)}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}
