import axiosInstance from '@/config/AxiosConfig';
import { Blog, BlogDetail, BlogListResponse, RelatedBlog } from '@/data/models/Blog';

// Mock data for development (when API is not available)
const MOCK_BLOGS: Blog[] = [
    {
        id: 1,
        title: "Ý nghĩa các loại hoa phổ biến trong văn hóa Việt Nam",
        summary: "Khám phá ý nghĩa sâu sắc của các loại hoa trong văn hóa Việt Nam, từ hoa mai, hoa đào đến hoa sen...",
        content: `Hoa không chỉ là vật trang trí đẹp mắt mà còn mang trong mình nhiều ý nghĩa sâu sắc trong văn hóa Việt Nam.

**Hoa Mai** - Biểu tượng của mùa xuân miền Nam, tượng trưng cho sự may mắn, thịnh vượng và khởi đầu mới. Cây mai vàng nở rộ vào dịp Tết là dấu hiệu báo hiệu một năm mới tốt lành.

**Hoa Đào** - Đặc trưng của mùa xuân miền Bắc, hoa đào mang ý nghĩa về tình yêu, hạnh phúc và sự đổi mới. Màu hồng của hoa đào tượng trưng cho sự nồng ấm của mùa xuân.

**Hoa Sen** - Quốc hoa của Việt Nam, tượng trưng cho sự thuần khiết, thanh cao và kiên cường. Dù sinh ra từ bùn lầy nhưng hoa sen vẫn toát lên vẻ đẹp tinh khiết.

**Hoa Hồng** - Biểu tượng của tình yêu và sự lãng mạn. Mỗi màu hồng có ý nghĩa khác nhau: đỏ - tình yêu nồng nàn, trắng - sự thuần khiết, vàng - tình bạn.

**Hoa Cúc** - Tượng trưng cho trường thọ và sự kiên nhẫn. Hoa cúc thường được dùng trong các dịp lễ hội và thờ cúng.`,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        authorUsername: "Florist Team",
        createdAt: "2024-12-15T10:00:00Z",
        updatedAt: "2024-12-15T10:00:00Z"
    },
    {
        id: 2,
        title: "Cách chăm sóc hoa tươi để giữ được lâu hơn",
        summary: "Những bí quyết đơn giản giúp bạn giữ hoa tươi lâu hơn trong nhà...",
        content: `Bạn muốn giữ bó hoa tươi lâu hơn? Hãy áp dụng những mẹo sau đây:

**1. Cắt gốc hoa đúng cách**
Cắt xiên gốc hoa khoảng 45 độ để tăng diện tích hấp thụ nước. Nên cắt dưới vòi nước chảy để tránh bọt khí.

**2. Thay nước thường xuyên**
Thay nước mỗi ngày hoặc ít nhất 2 ngày một lần. Nước sạch giúp ngăn chặn vi khuẩn phát triển.

**3. Loại bỏ lá ngâm nước**
Lá ngâm trong nước sẽ thối và tạo điều kiện cho vi khuẩn phát triển, làm hoa héo nhanh hơn.

**4. Đặt hoa ở nơi mát mẻ**
Tránh ánh nắng trực tiếp và nguồn nhiệt. Nhiệt độ lý tưởng là 18-22°C.

**5. Sử dụng chất bảo quản**
Có thể thêm một ít đường và vài giọt chanh vào nước để nuôi dưỡng hoa.

**6. Tách riêng một số loại hoa**
Một số loại hoa như hoa thủy tiên tiết ra chất làm héo các loại hoa khác, nên để riêng.`,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        authorUsername: "Florist Team",
        createdAt: "2024-12-10T09:30:00Z",
        updatedAt: "2024-12-10T09:30:00Z"
    },
    {
        id: 3,
        title: "Top 10 loại hoa được yêu thích nhất năm 2024",
        summary: "Danh sách những loại hoa được khách hàng yêu thích và đặt mua nhiều nhất trong năm 2024...",
        content: `Năm 2024 đã chứng kiến nhiều xu hướng hoa mới. Dưới đây là top 10 loại hoa được yêu thích nhất:

**1. Hoa Hồng** - Vẫn giữ vững vị trí số 1 với sự đa dạng về màu sắc và ý nghĩa.

**2. Hoa Cẩm Tú Cầu** - Ngày càng được ưa chuộng nhờ vẻ đẹp nhẹ nhàng và sự bền bỉ.

**3. Hoa Lan Hồ Điệp** - Lựa chọn hoàn hảo cho quà tặng sang trọng.

**4. Hoa Hướng Dương** - Mang đến năng lượng tích cực và niềm vui.

**5. Hoa Tulip** - Vẻ đẹp thanh lịch từ xứ sở hoa tulip.

**6. Hoa Mẫu Đơn** - Biểu tượng của sự giàu sang và hạnh phúc.

**7. Baby Breath** - Nhẹ nhàng, tinh khiết và lãng mạn.

**8. Hoa Oải Hương** - Hương thơm dịu nhẹ, thư giãn tinh thần.

**9. Hoa Cúc** - Truyền thống và ý nghĩa.

**10. Hoa Lily** - Sang trọng và thơm ngát.`,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        authorUsername: "Admin",
        createdAt: "2024-12-05T14:00:00Z",
        updatedAt: "2024-12-05T14:00:00Z"
    },
    {
        id: 4,
        title: "Lựa chọn hoa phù hợp cho từng dịp đặc biệt",
        summary: "Hướng dẫn chọn hoa phù hợp cho sinh nhật, đám cưới, khai trương và các dịp quan trọng khác...",
        content: `Mỗi dịp đặc biệt cần một loại hoa phù hợp để thể hiện đúng thông điệp bạn muốn gửi gắm:

**Sinh nhật**
- Hoa hồng, hoa hướng dương, hoa cẩm tú cầu
- Chọn màu sắc tươi sáng, vui tươi

**Đám cưới**
- Hoa hồng trắng, hoa lily, hoa mẫu đơn
- Tượng trưng cho tình yêu thuần khiết và hạnh phúc

**Khai trương**
- Lan hồ điệp, hoa đồng tiền
- Mang ý nghĩa thịnh vượng và may mắn

**Chúc mừng tốt nghiệp**
- Hoa hướng dương, hoa hồng vàng
- Tượng trưng cho tương lai tươi sáng

**Thăm bệnh**
- Hoa cẩm tú cầu, hoa ly
- Tránh hoa có mùi quá nồng

**Xin lỗi**
- Hoa hồng trắng, hoa lan
- Thể hiện sự chân thành

**Valentine**
- Hoa hồng đỏ là lựa chọn kinh điển
- Số lượng hoa cũng mang ý nghĩa riêng`,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        authorUsername: "Florist Expert",
        createdAt: "2024-11-28T11:15:00Z",
        updatedAt: "2024-11-28T11:15:00Z"
    },
    {
        id: 5,
        title: "Xu hướng trang trí hoa cho không gian sống 2025",
        summary: "Khám phá những xu hướng trang trí hoa mới nhất cho ngôi nhà của bạn trong năm 2025...",
        content: `Năm 2025 mang đến nhiều xu hướng trang trí hoa mới mẻ và sáng tạo:

**1. Phong cách tối giản (Minimalist)**
Một bình hoa đơn giản với 1-3 loại hoa, tập trung vào chất lượng hơn số lượng.

**2. Hoa khô và hoa ép**
Xu hướng bền vững với hoa khô, hoa ép tạo điểm nhấn nghệ thuật cho không gian.

**3. Màu sắc đất (Earth Tones)**
Các tông màu nâu, cam cháy, xanh olive được ưa chuộng.

**4. Kết hợp cây xanh**
Hoa tươi kết hợp với cây lá xanh tạo không gian sinh động.

**5. Bình hoa độc đáo**
Bình gốm thủ công, bình thủy tinh tái chế, chai rượu cũ.

**6. Hoa treo và kệ hoa**
Tận dụng không gian theo chiều đứng.

**7. Hoa ăn được**
Hoa như hoa atiso, hoa hướng dương có thể dùng trong ẩm thực.

Hãy thử nghiệm và tìm phong cách phù hợp với bạn!`,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        authorUsername: "Design Team",
        createdAt: "2024-11-20T16:45:00Z",
        updatedAt: "2024-11-20T16:45:00Z"
    },
    {
        id: 6,
        title: "Câu chuyện về nghề trồng hoa ở Đà Lạt",
        summary: "Tìm hiểu về nghề trồng hoa truyền thống và hiện đại tại thành phố hoa Đà Lạt...",
        content: `Đà Lạt từ lâu đã được mệnh danh là "Thành phố hoa" của Việt Nam. Nghề trồng hoa nơi đây có lịch sử lâu đời và phát triển mạnh mẽ.

**Lịch sử**
Từ những năm 1920, người Pháp đã bắt đầu trồng các loại hoa ôn đới tại Đà Lạt. Khí hậu mát mẻ quanh năm tạo điều kiện lý tưởng cho nhiều loại hoa.

**Các vùng trồng hoa nổi tiếng**
- Làng hoa Vạn Thành
- Làng hoa Thái Phiên
- Làng hoa Hà Đông

**Các loại hoa đặc trưng**
Hoa hồng, hoa cẩm tú cầu, hoa lily, hoa cúc, hoa đồng tiền, hoa tulip...

**Kỹ thuật hiện đại**
Ngày nay, nông dân Đà Lạt áp dụng công nghệ nhà kính, hệ thống tưới tự động, giống hoa nhập khẩu chất lượng cao.

**Thách thức và cơ hội**
Người trồng hoa đối mặt với biến đổi khí hậu, chi phí sản xuất tăng, nhưng cũng có nhiều cơ hội xuất khẩu và bán online.`,
        imageUrl: "https://hoaviet247.com/wp-content/uploads/2025/05/mau-trang-hoa-cam-tu-cau.webp",
        authorUsername: "Florist Team",
        createdAt: "2024-11-15T08:30:00Z",
        updatedAt: "2024-11-15T08:30:00Z"
    }
];

// Flag to use mock data (set to false when API is ready)
const USE_MOCK_DATA = true;

export const BlogApi = {
    // Get all blogs with optional pagination
    getAll: async (page = 1, limit = 10): Promise<BlogListResponse> => {
        if (USE_MOCK_DATA) {
            await new Promise(resolve => setTimeout(resolve, 500));
            const start = (page - 1) * limit;
            const blogs = MOCK_BLOGS.slice(start, start + limit);
            return {
                blogs,
                total: MOCK_BLOGS.length,
                page,
                limit
            };
        }

        const response = await axiosInstance.get<BlogListResponse>('/blogs', {
            params: { page, limit }
        });
        return response.data;
    },

    // Get blog by ID
    getById: async (id: string | number): Promise<BlogDetail | null> => {
        if (USE_MOCK_DATA) {
            await new Promise(resolve => setTimeout(resolve, 300));
            const numericId = typeof id === 'string' ? parseInt(id, 10) : id;
            const blog = MOCK_BLOGS.find(b => b.id === numericId);
            if (!blog) return null;

            return {
                ...blog,
                tags: ["hoa", "florist", "việt nam", "trang trí"]
            };
        }

        const response = await axiosInstance.get<BlogDetail>(`/blogs/${id}`);
        return response.data;
    },

    // Search blogs
    search: async (query: string, page = 1, limit = 10): Promise<BlogListResponse> => {
        if (USE_MOCK_DATA) {
            await new Promise(resolve => setTimeout(resolve, 300));
            const filtered = MOCK_BLOGS.filter(b =>
                b.title.toLowerCase().includes(query.toLowerCase()) ||
                b.content.toLowerCase().includes(query.toLowerCase())
            );
            const start = (page - 1) * limit;
            return {
                blogs: filtered.slice(start, start + limit),
                total: filtered.length,
                page,
                limit
            };
        }

        const response = await axiosInstance.get<BlogListResponse>('/blogs/search', {
            params: { q: query, page, limit }
        });
        return response.data;
    },

    // Get related blogs
    getRelatedBlogs: async (blogId: string | number, limit = 3): Promise<RelatedBlog[]> => {
        if (USE_MOCK_DATA) {
            await new Promise(resolve => setTimeout(resolve, 300));
            return MOCK_BLOGS
                .filter(b => b.id !== blogId)
                .slice(0, limit)
                .map(b => ({
                    id: b.id,
                    title: b.title,
                    imageUrl: b.imageUrl,
                    createdAt: b.createdAt
                }));
        }

        const response = await axiosInstance.get<RelatedBlog[]>(`/blogs/${blogId}/related`, {
            params: { limit }
        });
        return response.data;
    }
};

export default BlogApi;
