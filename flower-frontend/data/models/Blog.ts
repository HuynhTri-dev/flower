export interface Blog {
    id: string | number;
    title: string;
    summary?: string;
    content: string;
    imageUrl: string;
    authorUsername?: string;
    createdAt: string;
    updatedAt?: string;
}

// Extended Blog Detail model (for detail page)
export interface BlogDetail extends Blog {
    imageUrls?: string[]; // Additional images for gallery
    tags?: string[]; // Blog tags
}

// Related Blog (slim version for recommendations)
export interface RelatedBlog {
    id: string | number;
    title: string;
    imageUrl: string;
    createdAt: string;
}

// API Response types
export interface BlogListResponse {
    blogs: Blog[];
    total: number;
    page: number;
    limit: number;
}

export interface BlogDetailResponse {
    blog: BlogDetail;
    relatedBlogs?: RelatedBlog[];
}

// Default placeholder image
export const DEFAULT_BLOG_IMAGE = "https://via.placeholder.com/800x400/E8F6F8/2B50AA?text=Blog";

// Helper function to format date in Vietnamese
export const formatBlogDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).format(date);
};

// Helper function to format date with time
export const formatBlogDateTime = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(date);
};

// Helper function to truncate content
export const truncateContent = (content: string, maxLength: number = 150): string => {
    return content.length > maxLength ? content.substring(0, maxLength) + "..." : content;
};
