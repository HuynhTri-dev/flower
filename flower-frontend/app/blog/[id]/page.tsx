"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { Footer } from "@/component/common/Footer";
import { Navbar } from "@/component/header";
import { Button } from "@/component/common/Button";
import { BlogDetail, RelatedBlog, formatBlogDateTime, formatBlogDate } from "@/data/models/Blog";
import { BlogApi } from "@/data/api/BlogApi";
import Image from "next/image";
import Link from "next/link";

// Related Blog Card
const RelatedBlogCard = ({ blog }: { blog: RelatedBlog }) => {
    return (
        <Link href={`/blog/${blog.id}`} className="group block">
            <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative h-32 overflow-hidden">
                    <Image
                        src={blog.imageUrl}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </div>
                <div className="p-4">
                    <h4 className="font-semibold text-text-dark line-clamp-2 group-hover:text-primary transition-colors">
                        {blog.title}
                    </h4>
                    <p className="text-sm text-gray-500 mt-2">{formatBlogDate(blog.createdAt)}</p>
                </div>
            </div>
        </Link>
    );
};

// Loading Skeleton
const BlogDetailSkeleton = () => {
    return (
        <div className="animate-pulse">
            <div className="h-8 w-32 bg-gray-200 rounded mb-6" />
            <div className="h-12 bg-gray-200 rounded mb-4" />
            <div className="h-12 bg-gray-200 rounded w-3/4 mb-6" />
            <div className="flex gap-4 mb-8">
                <div className="h-5 w-24 bg-gray-200 rounded" />
                <div className="h-5 w-32 bg-gray-200 rounded" />
            </div>
            <div className="h-80 bg-gray-200 rounded-2xl mb-8" />
            <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-4/5" />
            </div>
        </div>
    );
};

export default function BlogDetailPage() {
    const router = useRouter();
    const params = useParams();
    const blogId = params.id as string;

    const [blog, setBlog] = useState<BlogDetail | null>(null);
    const [relatedBlogs, setRelatedBlogs] = useState<RelatedBlog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBlog = useCallback(async () => {
        if (!blogId) return;

        try {
            setLoading(true);
            setError(null);

            const [blogData, relatedData] = await Promise.all([
                BlogApi.getById(blogId),
                BlogApi.getRelatedBlogs(blogId, 3)
            ]);

            if (!blogData) {
                setError("Không tìm thấy bài viết");
                return;
            }

            setBlog(blogData);
            setRelatedBlogs(relatedData);
        } catch (err) {
            setError("Không thể tải bài viết");
            console.error("Error fetching blog:", err);
        } finally {
            setLoading(false);
        }
    }, [blogId]);

    useEffect(() => {
        fetchBlog();
    }, [fetchBlog]);

    const goBack = () => {
        router.push("/blog");
    };

    const formatContent = (content: string) => {
        // Convert markdown-style formatting to HTML
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-text-dark font-semibold">$1</strong>')
            .replace(/\n\n/g, '</p><p class="mb-4">')
            .replace(/\n/g, '<br />');
    };

    const shareToFacebook = () => {
        const url = window.location.href;
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
    };

    const shareToTwitter = () => {
        const url = window.location.href;
        const text = blog?.title || '';
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('Đã sao chép link!');
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-secondary/50 via-white to-accent/10">
            <Navbar />

            <main className="md:py-8 py-4">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Loading State */}
                    {loading && <BlogDetailSkeleton />}

                    {/* Error State */}
                    {!loading && error && (
                        <div className="text-center py-16">
                            <div className="bg-white rounded-2xl p-12 shadow-lg max-w-md mx-auto">
                                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/20 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-text-dark mb-3">Không tìm thấy bài viết</h2>
                                <p className="text-gray-600 mb-6">{error}</p>
                                <Button onClick={goBack} variant="primary">
                                    Quay lại
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Blog Content */}
                    {!loading && !error && blog && (
                        <article>
                            {/* Back Button */}
                            <button
                                onClick={goBack}
                                className="inline-flex items-center gap-2 text-primary font-semibold mb-6 hover:gap-3 transition-all duration-300 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-sm hover:shadow-md"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Quay lại
                            </button>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-dark leading-tight mb-6">
                                {blog.title}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {blog.authorUsername || "Admin"}
                                </span>
                                <span className="text-accent">•</span>
                                <span className="flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {formatBlogDateTime(blog.createdAt)}
                                </span>
                                {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                                    <>
                                        <span className="text-accent">•</span>
                                        <span className="flex items-center gap-2 text-sm">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                            Cập nhật: {formatBlogDateTime(blog.updatedAt)}
                                        </span>
                                    </>
                                )}
                            </div>

                            {/* Featured Image */}
                            {blog.imageUrl && (
                                <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-10 shadow-xl">
                                    <Image
                                        src={blog.imageUrl}
                                        alt={blog.title}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Glossy overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20" />
                                </div>
                            )}

                            {/* Tags */}
                            {blog.tags && blog.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {blog.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-secondary text-primary text-sm font-medium rounded-full"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Content */}
                            <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg mb-10">
                                <div
                                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: `<p class="mb-4">${formatContent(blog.content)}</p>`
                                    }}
                                />
                            </div>

                            {/* Share Section */}
                            <div className="bg-white rounded-2xl p-6 shadow-lg mb-10">
                                <h3 className="text-lg font-bold text-text-dark mb-4">Chia sẻ bài viết</h3>
                                <div className="flex gap-3">
                                    <button
                                        onClick={shareToFacebook}
                                        className="w-12 h-12 rounded-xl bg-[#1877f2] text-white flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={shareToTwitter}
                                        className="w-12 h-12 rounded-xl bg-[#1da1f2] text-white flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </button>
                                    <button
                                        onClick={copyLink}
                                        className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Related Blogs */}
                            {relatedBlogs.length > 0 && (
                                <div>
                                    <h3 className="text-2xl font-bold text-text-dark mb-6">Bài viết liên quan</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {relatedBlogs.map((relatedBlog) => (
                                            <RelatedBlogCard key={relatedBlog.id} blog={relatedBlog} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
