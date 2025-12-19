import React from 'react';
import { ShoppingCart } from 'lucide-react';

export interface ProductCardProps {
    id: string | number;
    name: string;
    price: number;
    imageUrl: string;
    collection?: string;
    onAddToCart?: () => void;
    onClick?: () => void;
}

export const ProductCard = ({
    id,
    name,
    price,
    imageUrl,
    collection,
    onAddToCart,
    onClick
}: ProductCardProps) => {
    // Format price to VND
    const formattedPrice = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(price);

    return (
        <div
            className="group relative flex flex-col w-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer"
            onClick={onClick}
        >
            {/* Image Section */}
            <div className="relative w-full aspect-square overflow-hidden bg-gray-50">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Collection Badge */}
                {collection && (
                    <div className="absolute top-3 right-3 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-xs font-semibold text-gray-700 shadow-sm border border-white/50 z-10">
                        {collection}
                    </div>
                )}

                {/* Glassy Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>

            {/* Content Section */}
            <div className="flex flex-col p-4 flex-grow">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-blue-600 transition-colors duration-200">
                    {name}
                </h3>

                <div className="mt-4 flex items-center justify-between">
                    <span className="text-lg font-bold text-blue-600">
                        {formattedPrice}
                    </span>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onAddToCart?.();
                        }}
                        className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-600 hover:text-white transition-all duration-300 transform active:scale-95 shadow-sm hover:shadow-md"
                        title="Thêm vào giỏ"
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};