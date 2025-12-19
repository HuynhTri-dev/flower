"use client";

import { useState, useEffect } from "react";
import { Button } from "@/component/common/Button";
import { InputField } from "@/component/common/InputField";
import { Textarea } from "@/component/common/Textarea";
import { SelectField } from "@/component/common/SelectField";
import { Pagination, usePagination } from "@/component/common/Pagination";
import { BlogApi } from "@/data/api/BlogApi";
import { Blog, formatBlogDate } from "@/data/models/Blog";
import { Plus, Search, Edit, Trash2, X, FileText, Send, EyeOff } from "lucide-react";
import Image from "next/image";

interface BlogForm {
    title: string;
    summary: string;
    content: string;
    imageUrl: string;
    status: "DRAFT" | "PUBLISHED";
}

const initialForm: BlogForm = {
    title: "",
    summary: "",
    content: "",
    imageUrl: "",
    status: "DRAFT"
};

export default function AdminBlogs() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
    const [form, setForm] = useState<BlogForm>(initialForm);

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            setLoading(true);
            const response = await BlogApi.getAll(1, 50);
            const blogsWithStatus = response.blogs.map(blog => ({
                ...blog,
                status: Math.random() > 0.3 ? "PUBLISHED" : "DRAFT"
            }));
            setBlogs(blogsWithStatus as Array<Blog & { status: string }>);
        } catch (error) {
            console.error("Error fetching blogs:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredBlogs = blogs.filter((blog) => {
        const matchSearch = !searchQuery ||
            blog.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchStatus = statusFilter === "all" ||
            (blog as Blog & { status: string }).status === statusFilter;
        return matchSearch && matchStatus;
    });

    // Pagination
    const {
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedItems: paginatedBlogs,
        totalItems,
        itemsPerPage,
    } = usePagination(filteredBlogs, 20);

    const openCreateModal = () => {
        setEditingBlog(null);
        setForm(initialForm);
        setShowModal(true);
    };

    const openEditModal = (blog: Blog) => {
        setEditingBlog(blog);
        setForm({
            title: blog.title,
            summary: blog.summary || "",
            content: blog.content,
            imageUrl: blog.imageUrl,
            status: ((blog as Blog & { status?: string }).status as "DRAFT" | "PUBLISHED") || "DRAFT"
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingBlog(null);
        setForm(initialForm);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (editingBlog) {
                setBlogs(prev => prev.map(b => b.id === editingBlog.id ? { ...b, ...form } : b));
                alert("Cập nhật thành công!");
            } else {
                const newBlog = {
                    id: Date.now(),
                    ...form,
                    authorUsername: "Admin",
                    createdAt: new Date().toISOString()
                };
                setBlogs(prev => [newBlog as Blog, ...prev]);
                alert("Tạo thành công!");
            }
            closeModal();
        } catch {
            alert("Có lỗi!");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (blog: Blog) => {
        if (!confirm(`Xóa "${blog.title}"?`)) return;
        setBlogs(prev => prev.filter(b => b.id !== blog.id));
        alert("Đã xóa!");
    };

    const handlePublish = (blog: Blog) => {
        const status = (blog as Blog & { status?: string }).status;
        const newStatus = status === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
        setBlogs(prev => prev.map(b => b.id === blog.id ? { ...b, status: newStatus } : b));
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý Blog</h1>
                    <p className="text-gray-500">Tạo và quản lý bài viết</p>
                </div>
                <Button onClick={openCreateModal} leftIcon={<Plus className="w-5 h-5" />}>
                    Tạo bài viết
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm">
                <div className="flex-1">
                    <InputField value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Tìm kiếm..." prefix={<Search className="w-5 h-5" />} fullWidth />
                </div>
                <div className="w-full md:w-48">
                    <SelectField value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} options={[{ value: "all", label: "Tất cả" }, { value: "PUBLISHED", label: "Xuất bản" }, { value: "DRAFT", label: "Bản nháp" }]} fullWidth />
                </div>
            </div>

            {/* Blogs Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 w-1/3">Bài viết</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 w-28">Tác giả</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 w-32">Trạng thái</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600 w-32">Ngày tạo</th>
                                <th className="text-right px-6 py-4 font-semibold text-gray-600 w-32">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="border-b border-gray-100">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-12 bg-gray-200 rounded-lg animate-pulse" />
                                                <div className="space-y-2">
                                                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                                                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-200 rounded animate-pulse" /></td>
                                        <td className="px-6 py-4"><div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" /></td>
                                        <td className="px-6 py-4"><div className="h-4 w-24 bg-gray-200 rounded animate-pulse" /></td>
                                        <td className="px-6 py-4"><div className="h-8 w-24 bg-gray-200 rounded animate-pulse ml-auto" /></td>
                                    </tr>
                                ))
                            ) : filteredBlogs.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p>Không tìm thấy bài viết nào</p>
                                    </td>
                                </tr>
                            ) : (
                                paginatedBlogs.map((blog) => {
                                    const status = (blog as Blog & { status?: string }).status;
                                    return (
                                        <tr key={blog.id} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 relative">
                                                        <Image src={blog.imageUrl} alt={blog.title} fill className="object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{blog.title}</p>
                                                        <p className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                                                            {blog.summary || "Chưa có tóm tắt"}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-gray-700">{blog.authorUsername || "Admin"}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 text-sm font-medium rounded-full ${status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                                    {status === "PUBLISHED" ? "Xuất bản" : "Nháp"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-gray-600">{formatBlogDate(blog.createdAt)}</td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        onClick={() => handlePublish(blog)}
                                                        className={`p-2 rounded-lg transition-colors ${status === "PUBLISHED" ? "hover:bg-yellow-50 text-yellow-600" : "hover:bg-green-50 text-green-600"}`}
                                                        title={status === "PUBLISHED" ? "Chuyển về nháp" : "Xuất bản"}
                                                    >
                                                        {status === "PUBLISHED" ? <EyeOff className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                                                    </button>
                                                    <button onClick={() => openEditModal(blog)} className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors">
                                                        <Edit className="w-4 h-4" />
                                                    </button>
                                                    <button onClick={() => handleDelete(blog)} className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {!loading && filteredBlogs.length > 0 && (
                    <div className="px-6 py-6 border-t border-gray-100">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            type="post"
                            itemsPerPage={itemsPerPage}
                            totalItems={totalItems}
                        />
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
                    <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">{editingBlog ? "Sửa" : "Tạo"} bài viết</h2>
                            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <InputField label="Tiêu đề" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required fullWidth />
                            <InputField label="URL ảnh" value={form.imageUrl} onChange={(e) => setForm({ ...form, imageUrl: e.target.value })} fullWidth />
                            <Textarea label="Tóm tắt" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} rows={2} />
                            <Textarea label="Nội dung" value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} rows={8} required />
                            <SelectField label="Trạng thái" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "DRAFT" | "PUBLISHED" })} options={[{ value: "DRAFT", label: "Nháp" }, { value: "PUBLISHED", label: "Xuất bản" }]} />
                            <div className="flex gap-4 pt-4">
                                <Button type="button" variant="ghost" onClick={closeModal} className="flex-1">Hủy</Button>
                                <Button type="submit" isLoading={saving} className="flex-1">{editingBlog ? "Lưu" : "Tạo"}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
