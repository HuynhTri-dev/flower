"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Footer } from "@/component/common/Footer";
import { Navbar } from "@/component/header";
import { Button } from "@/component/common/Button";
import { InputField } from "@/component/common/InputField";
import { Blog, formatBlogDate, truncateContent } from "@/data/models/Blog";
import { BlogApi } from "@/data/api/BlogApi";
import Image from "next/image";

// Blog Card Component
const BlogCard = ({
    blog,
    onClick,
}: {
    blog: Blog;
    onClick: () => void;
}) => {
    return (
        <article
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
            onClick={onClick}
        >
            {/* Blog Image */}
            <div className="relative h-56 overflow-hidden bg-secondary">
                <Image
                    src={blog.imageUrl}
                    alt={blog.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Glossy overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-60" />
            </div>

            {/* Blog Content */}
            <div className="p-6">
                {/* Meta info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {blog.authorUsername || "Admin"}
                    </span>
                    <span className="flex items-center gap-1.5">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatBlogDate(blog.createdAt)}
                    </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-text-dark mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                </h2>

                {/* Summary */}
                <p className="text-gray-600 mb-4 line-clamp-3">
                    {blog.summary || truncateContent(blog.content, 120)}
                </p>

                {/* Read more button */}
                <button className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300">
                    Đọc tiếp
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>
            </div>
        </article>
    );
};

// Blog Skeleton Card for loading state
const BlogSkeletonCard = () => {
    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
            <div className="h-56 bg-gray-200" />
            <div className="p-6">
                <div className="flex gap-4 mb-3">
                    <div className="h-4 w-20 bg-gray-200 rounded" />
                    <div className="h-4 w-24 bg-gray-200 rounded" />
                </div>
                <div className="h-6 bg-gray-200 rounded mb-3" />
                <div className="h-4 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                <div className="h-4 w-20 bg-gray-200 rounded" />
            </div>
        </div>
    );
};

export default function BlogPage() {
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchBlogs = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await BlogApi.getAll();
            setBlogs(response.blogs);
        } catch (err) {
            setError("Không thể tải danh sách bài viết");
            console.error("Error fetching blogs:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleSearch = useCallback(async () => {
        if (!searchQuery.trim()) {
            fetchBlogs();
            return;
        }

        try {
            setLoading(true);
            setError(null);
            const response = await BlogApi.search(searchQuery);
            setBlogs(response.blogs);
        } catch (err) {
            setError("Không thể tìm kiếm bài viết");
            console.error("Error searching blogs:", err);
        } finally {
            setLoading(false);
        }
    }, [searchQuery, fetchBlogs]);

    const clearSearch = () => {
        setSearchQuery("");
        fetchBlogs();
    };

    const goToBlog = (id: string | number) => {
        router.push(`/blog/${id}`);
    };

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    // Debounce search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery) {
                handleSearch();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchQuery, handleSearch]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary/50 via-white to-accent/10">
            <Navbar />

            <main className="md:py-16 py-8 md:px-12 px-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header Section */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Blog
                            </span>
                        </h1>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Chia sẻ kiến thức và câu chuyện về hoa
                        </p>
                    </div>

                    {/* Search Section */}
                    <div className="max-w-xl mx-auto mb-12">
                        <div className="relative">
                            <InputField
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm bài viết..."
                                fullWidth
                                prefix={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                }
                            />
                            {searchQuery && (
                                <button
                                    onClick={clearSearch}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-accent transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <BlogSkeletonCard key={i} />
                            ))}
                        </div>
                    )}

                    {/* Error State */}
                    {!loading && error && (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                                <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <p className="text-lg text-gray-600 mb-4">{error}</p>
                            <Button onClick={fetchBlogs} variant="primary">
                                Thử lại
                            </Button>
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && !error && blogs.length === 0 && (
                        <div className="text-center py-16">
                            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-secondary flex items-center justify-center">
                                <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-lg text-gray-600">
                                {searchQuery ? "Không tìm thấy bài viết phù hợp" : "Chưa có bài viết nào"}
                            </p>
                        </div>
                    )}

                    {/* Blog Grid */}
                    {!loading && !error && blogs.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogs.map((blog) => (
                                <BlogCard
                                    key={blog.id}
                                    blog={blog}
                                    onClick={() => goToBlog(blog.id)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}