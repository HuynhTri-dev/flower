import axiosInstance from '@/config/AxiosConfig';
import { Category } from '@/data/models/Category';

// Mock data for development (when API is not available)
const MOCK_CATEGORIES: Category[] = [
    { id: 1, name: "Hoa Tươi", slug: "hoa-tuoi", description: "Các loại hoa tươi đẹp nhất" },
    { id: 2, name: "Hoa Khô", slug: "hoa-kho", description: "Hoa khô trang trí" },
    { id: 3, name: "Hoa Cưới", slug: "hoa-cuoi", description: "Bó hoa cưới lãng mạn" },
    { id: 4, name: "Hoa Văn Phòng", slug: "hoa-van-phong", description: "Cây cảnh văn phòng" },
    { id: 5, name: "Giỏ Quà", slug: "gio-qua", description: "Giỏ hoa và quà tặng" },
    { id: 6, name: "Hoa Sinh Nhật", slug: "hoa-sinh-nhat", description: "Hoa tặng sinh nhật" },
    { id: 7, name: "Hoa Khai Trương", slug: "hoa-khai-truong", description: "Hoa chúc mừng khai trương" },
];

// Flag to use mock data (set to false when API is ready)
const USE_MOCK_DATA = true;

export const CategoryApi = {
    // Get all categories
    getAll: async (): Promise<Category[]> => {
        if (USE_MOCK_DATA) {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 300));
            return MOCK_CATEGORIES;
        }

        const response = await axiosInstance.get<Category[]>('/categories');
        return response.data;
    },

    // Get category by ID
    getById: async (id: string | number): Promise<Category | null> => {
        if (USE_MOCK_DATA) {
            await new Promise(resolve => setTimeout(resolve, 200));
            return MOCK_CATEGORIES.find(cat => cat.id === id) || null;
        }

        const response = await axiosInstance.get<Category>(`/categories/${id}`);
        return response.data;
    },

    // Get category by slug
    getBySlug: async (slug: string): Promise<Category | null> => {
        if (USE_MOCK_DATA) {
            await new Promise(resolve => setTimeout(resolve, 200));
            return MOCK_CATEGORIES.find(cat => cat.slug === slug) || null;
        }

        const response = await axiosInstance.get<Category>(`/categories/slug/${slug}`);
        return response.data;
    },
};

export default CategoryApi;
