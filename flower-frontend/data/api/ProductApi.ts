import axiosInstance from '@/config/AxiosConfig';
import { Product, ProductDetail, ProductListResponse, RelatedProduct } from '@/data/models/Product';

// Mock data for development (when API is not available)
const MOCK_PRODUCTS: Product[] = [
    {
        id: 1,
        name: "Bó Hoa Cẩm Tú Cầu Hồng",
        price: 450000,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        collection: { id: 1, name: "Best Seller" },
        category: { id: 1, name: "Hoa Tươi" }
    },
    {
        id: 2,
        name: "Hoa Lan Hồ Điệp Trắng",
        price: 1200000,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        collection: { id: 2, name: "Luxury" },
        category: { id: 1, name: "Hoa Tươi" }
    },
    {
        id: 3,
        name: "Hoa Hướng Dương",
        price: 350000,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        collection: { id: 3, name: "Summer" },
        category: { id: 1, name: "Hoa Tươi" }
    },
    {
        id: 4,
        name: "Bó Hồng Đỏ Lãng Mạn",
        price: 550000,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        collection: { id: 4, name: "Love" },
        category: { id: 1, name: "Hoa Tươi" }
    },
    {
        id: 5,
        name: "Vườn Tulip",
        price: 480000,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        category: { id: 1, name: "Hoa Tươi" }
    },
    {
        id: 6,
        name: "Oải Hương Thư Giãn",
        price: 600000,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        collection: { id: 5, name: "Relax" },
        category: { id: 2, name: "Hoa Khô" }
    },
    {
        id: 7,
        name: "Mẫu Đơn Công Chúa",
        price: 950000,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        collection: { id: 6, name: "Premium" },
        category: { id: 1, name: "Hoa Tươi" }
    },
    {
        id: 8,
        name: "Baby Breath Tinh Khôi",
        price: 250000,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        category: { id: 1, name: "Hoa Tươi" }
    },
    {
        id: 9,
        name: "Hoa Mùa Xuân Đa Sắc",
        price: 420000,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        collection: { id: 7, name: "Spring" },
        category: { id: 1, name: "Hoa Tươi" }
    },
    {
        id: 10,
        name: "Cẩm Tú Cầu Xanh",
        price: 470000,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        category: { id: 1, name: "Hoa Tươi" }
    },
];

// Flag to use mock data (set to false when API is ready)
const USE_MOCK_DATA = true;

export const ProductApi = {
    // Get all products with optional pagination
    getAll: async (page = 1, limit = 10): Promise<ProductListResponse> => {
        if (USE_MOCK_DATA) {
            await new Promise(resolve => setTimeout(resolve, 500));
            const start = (page - 1) * limit;
            const products = MOCK_PRODUCTS.slice(start, start + limit);
            return {
                products,
                total: MOCK_PRODUCTS.length,
                page,
                limit
            };
        }

        const response = await axiosInstance.get<ProductListResponse>('/products', {
            params: { page, limit }
        });
        return response.data;
    },

    // Get top/featured products
    getTopProducts: async (limit = 10): Promise<Product[]> => {
        if (USE_MOCK_DATA) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return MOCK_PRODUCTS.slice(0, limit);
        }

        const response = await axiosInstance.get<Product[]>('/products/top', {
            params: { limit }
        });
        return response.data;
    },

    // Get product by ID
    getById: async (id: string | number): Promise<ProductDetail | null> => {
        if (USE_MOCK_DATA) {
            await new Promise(resolve => setTimeout(resolve, 300));
            // Convert id to number for comparison
            const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
            const product = MOCK_PRODUCTS.find(p => p.id === numericId);
            if (!product) return null;

            // Mock detailed descriptions for each product
            const detailedDescriptions: Record<number, string> = {
                1: "Bó Hoa Cẩm Tú Cầu Hồng mang vẻ đẹp nhẹ nhàng, thanh tao với những cánh hoa xếp lớp tinh tế. Được tuyển chọn từ những bông hoa tươi đẹp nhất, phù hợp để tặng người thân yêu trong những dịp đặc biệt như sinh nhật, kỷ niệm hay đơn giản là để trang trí không gian sống.",
                2: "Hoa Lan Hồ Điệp Trắng tượng trưng cho sự sang trọng và thanh lịch. Với những cánh hoa trắng tinh khôi như đôi cánh bướm đang bay, đây là món quà hoàn hảo cho những dịp quan trọng như khai trương, tân gia hay chúc mừng thành công.",
                3: "Hoa Hướng Dương mang theo ánh nắng mặt trời và năng lượng tích cực. Những bông hoa vàng rực rỡ sẽ làm sáng bừng mọi không gian, truyền tải thông điệp về niềm vui và hy vọng đến người nhận.",
                4: "Bó Hồng Đỏ Lãng Mạn - biểu tượng bất hủ của tình yêu nồng nàn. Mỗi bông hồng đỏ thắm được chọn lựa kỹ càng, thể hiện trọn vẹn tình cảm chân thành dành tặng người yêu thương.",
                5: "Vườn Tulip đem đến vẻ đẹp thanh lịch của xứ sở hoa tulip Hà Lan. Những bông tulip nhiều màu sắc tạo nên một bức tranh xuân tươi đẹp, hoàn hảo cho việc trang trí nội thất.",
                6: "Oải Hương Thư Giãn với hương thơm dịu nhẹ, giúp xoa dịu tinh thần và mang lại cảm giác thư thái. Là lựa chọn tuyệt vời cho những ai yêu thích sự yên bình và thanh tịnh.",
                7: "Mẫu Đơn Công Chúa - loài hoa vương giả với những cánh hoa xếp lớp dày dặn, mềm mại như lụa. Đây là biểu tượng của sự giàu sang, phú quý và hạnh phúc viên mãn.",
                8: "Baby Breath Tinh Khôi với những bông hoa nhỏ li ti trắng muốt, tạo nên vẻ đẹp thuần khiết và trong sáng. Thường được dùng để kết hợp với các loại hoa khác hoặc làm bó hoa độc lập đầy tinh tế.",
                9: "Hoa Mùa Xuân Đa Sắc là sự kết hợp hoàn hảo của nhiều loài hoa rực rỡ, mang đến không khí tươi vui của mùa xuân. Bó hoa đa dạng màu sắc này sẽ làm bất kỳ ai cũng phải trầm trồ.",
                10: "Cẩm Tú Cầu Xanh với màu xanh dương dịu mát, tượng trưng cho sự bình yên và lòng biết ơn. Đây là lựa chọn hoàn hảo để gửi lời cảm ơn hoặc trang trí không gian làm việc."
            };

            // Mock additional images for gallery
            const productImages: Record<number, string[]> = {
                1: [
                    "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
                    "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
                    "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp"
                ],
                2: [
                    "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
                    "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp"
                ],
                3: [
                    "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
                    "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp"
                ]
            };

            // Product-specific features
            const productFeatures: Record<number, string[]> = {
                1: [
                    "🌸 Hoa cẩm tú cầu tươi nhập khẩu",
                    "🎀 Gói giấy cao cấp tone hồng pastel",
                    "🚚 Giao hàng trong 2-4 giờ",
                    "💝 Tặng kèm thiệp chúc mừng",
                    "📦 Đóng hộp cẩn thận, bảo quản lạnh"
                ],
                2: [
                    "🌿 Lan Hồ Điệp nhập khẩu Đài Loan",
                    "🏺 Chậu sứ trắng cao cấp",
                    "✨ Tuổi thọ hoa 2-3 tháng",
                    "🎍 Trang trí rêu phủ gốc",
                    "📋 Hướng dẫn chăm sóc đi kèm"
                ],
                3: [
                    "☀️ Hoa Hướng Dương Đà Lạt",
                    "🌻 5-7 bông size lớn",
                    "🍃 Lá xanh tươi bọc quanh",
                    "🎁 Gói giấy kraft vintage"
                ],
                4: [
                    "🌹 Hồng đỏ Ecuador cao cấp",
                    "💕 20-25 bông/bó",
                    "✨ Giấy gói premium",
                    "🎀 Nơ satin đỏ",
                    "💐 Hộp đựng sang trọng (tuỳ chọn)"
                ]
            };

            const numId = typeof product.id === 'number' ? product.id : 1;

            return {
                ...product,
                description: detailedDescriptions[numId] || `${product.name} - Được tuyển chọn kỹ lưỡng từ những bông hoa tươi đẹp nhất, mang đến vẻ đẹp tinh tế và sang trọng cho mọi dịp đặc biệt.`,
                imageUrls: productImages[numId] || [product.imageUrl],
                features: productFeatures[numId] || [
                    "🌸 Hoa tươi 100% chất lượng cao",
                    "🎨 Thiết kế độc đáo, sang trọng",
                    "🚚 Giao hàng nhanh chóng trong ngày",
                    "💝 Tặng kèm thiệp chúc mừng miễn phí",
                    "🔄 Đổi trả trong 24h nếu hoa không tươi"
                ],
                productCode: `FL-${String(numId).padStart(4, '0')}`,
                createdAt: "2024-01-15T10:00:00Z",
                updatedAt: "2024-12-19T08:30:00Z"
            };
        }

        const response = await axiosInstance.get<ProductDetail>(`/products/${id}`);
        return response.data;
    },

    // Get products by category
    getByCategory: async (categoryId: string | number, page = 1, limit = 10): Promise<ProductListResponse> => {
        if (USE_MOCK_DATA) {
            await new Promise(resolve => setTimeout(resolve, 400));
            const filtered = MOCK_PRODUCTS.filter(p => p.category?.id === categoryId);
            const start = (page - 1) * limit;
            return {
                products: filtered.slice(start, start + limit),
                total: filtered.length,
                page,
                limit
            };
        }

        const response = await axiosInstance.get<ProductListResponse>(`/categories/${categoryId}/products`, {
            params: { page, limit }
        });
        return response.data;
    },

    // Get related products
    getRelatedProducts: async (productId: string | number, limit = 5): Promise<RelatedProduct[]> => {
        if (USE_MOCK_DATA) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return MOCK_PRODUCTS
                .filter(p => p.id !== productId)
                .slice(0, limit)
                .map(p => ({
                    id: p.id,
                    name: p.name,
                    price: p.price,
                    imageUrl: p.imageUrl
                }));
        }

        const response = await axiosInstance.get<RelatedProduct[]>(`/products/${productId}/related`, {
            params: { limit }
        });
        return response.data;
    },

    // Search products
    search: async (query: string, page = 1, limit = 10): Promise<ProductListResponse> => {
        if (USE_MOCK_DATA) {
            await new Promise(resolve => setTimeout(resolve, 300));
            const filtered = MOCK_PRODUCTS.filter(p =>
                p.name.toLowerCase().includes(query.toLowerCase())
            );
            const start = (page - 1) * limit;
            return {
                products: filtered.slice(start, start + limit),
                total: filtered.length,
                page,
                limit
            };
        }

        const response = await axiosInstance.get<ProductListResponse>('/products/search', {
            params: { q: query, page, limit }
        });
        return response.data;
    },
};

export default ProductApi;
