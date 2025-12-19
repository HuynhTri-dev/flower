import axiosInstance from '@/config/AxiosConfig';
import { Collection } from '@/data/models/Collection';

// Mock data for development (when API is not available)
const MOCK_COLLECTIONS: Collection[] = [
    { id: 1, name: "Best Seller", slug: "best-seller", description: "Các sản phẩm bán chạy nhất" },
    { id: 2, name: "Luxury", slug: "luxury", description: "Bộ sưu tập hoa cao cấp" },
    { id: 3, name: "Summer", slug: "summer", description: "Hoa mùa hè tươi mát" },
    { id: 4, name: "Love", slug: "love", description: "Hoa tình yêu lãng mạn" },
    { id: 5, name: "Relax", slug: "relax", description: "Hoa thư giãn, dễ chịu" },
    { id: 6, name: "Premium", slug: "premium", description: "Dòng sản phẩm cao cấp nhất" },
    { id: 7, name: "Spring", slug: "spring", description: "Hoa mùa xuân rực rỡ" },
];

// Flag to use mock data (set to false when API is ready)
const USE_MOCK_DATA = true;

export const CollectionApi = {
    // Get all collections
    getAll: async (): Promise<Collection[]> => {
        if (USE_MOCK_DATA) {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 300));
            return MOCK_COLLECTIONS;
        }

        const response = await axiosInstance.get<Collection[]>('/collections');
        return response.data;
    },

    // Get collection by ID
    getById: async (id: string | number): Promise<Collection | null> => {
        if (USE_MOCK_DATA) {
            await new Promise(resolve => setTimeout(resolve, 200));
            return MOCK_COLLECTIONS.find(col => col.id === id) || null;
        }

        const response = await axiosInstance.get<Collection>(`/collections/${id}`);
        return response.data;
    },

    // Get collection by slug
    getBySlug: async (slug: string): Promise<Collection | null> => {
        if (USE_MOCK_DATA) {
            await new Promise(resolve => setTimeout(resolve, 200));
            return MOCK_COLLECTIONS.find(col => col.slug === slug) || null;
        }

        const response = await axiosInstance.get<Collection>(`/collections/slug/${slug}`);
        return response.data;
    },
};

export default CollectionApi;
