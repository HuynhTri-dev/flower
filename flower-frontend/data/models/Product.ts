import { Category } from "./Category";
import { Collection } from "./Collection";

export interface Product {
    id: string | number;
    name: string;
    price: number;
    imageUrl: string;
    description?: string;
    productCode?: string;
    category?: Category;
    collection?: Collection;
}

// Extended Product Detail model (for detail page)
export interface ProductDetail extends Product {
    imageUrls?: string[]; // Additional images for gallery
    features?: string[]; // Product features/highlights
    createdAt?: string;
    updatedAt?: string;
}

// Related Product (slim version for recommendations)
export interface RelatedProduct {
    id: string | number;
    name: string;
    price: number;
    imageUrl: string;
}

// API Response types
export interface ProductListResponse {
    products: Product[];
    total: number;
    page: number;
    limit: number;
}

export interface ProductDetailResponse {
    product: ProductDetail;
    relatedProducts?: RelatedProduct[];
}

// Helper type for product form (create/edit)
export interface ProductFormData {
    name: string;
    price: number;
    description?: string;
    productCode?: string;
    categoryId?: string | number;
    collectionId?: string | number;
    imageUrl?: string;
    imageUrls?: string[];
}

// Price formatting utility type
export type PriceFormatter = (price: number) => string;

// Default placeholder image
export const DEFAULT_PRODUCT_IMAGE = "https://via.placeholder.com/600x600/FFE1F0/F36DA1?text=Flower";

// Helper function to get all images from a product
export const getAllProductImages = (product: ProductDetail): string[] => {
    const images: string[] = [];

    if (product.imageUrl) {
        images.push(product.imageUrl);
    }

    if (product.imageUrls && product.imageUrls.length > 0) {
        images.push(...product.imageUrls);
    }

    return images.length > 0 ? images : [DEFAULT_PRODUCT_IMAGE];
};

// Helper function to format price in VND
export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
};
