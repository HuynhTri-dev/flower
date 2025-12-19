"use client";

import { useState } from "react";
import { Button } from "@/component/common/Button";
import { InputField } from "@/component/common/InputField";
import { Plus, Edit, Trash2, X, Users, Shield, Search } from "lucide-react";

interface Admin {
    id: number;
    username: string;
    createdAt: string;
}

export default function AdminAccounts() {
    const [admins, setAdmins] = useState<Admin[]>([
        { id: 1, username: "admin", createdAt: "2024-01-01" },
        { id: 2, username: "manager", createdAt: "2024-06-15" }
    ]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
    const [form, setForm] = useState({ username: "", password: "" });
    const [saving, setSaving] = useState(false);

    const currentAdmin = JSON.parse(localStorage.getItem("admin") || "{}");

    // Filter admins by search query
    const filteredAdmins = admins.filter((admin) => {
        if (!searchQuery) return true;
        return admin.username.toLowerCase().includes(searchQuery.toLowerCase());
    });

    const openCreateModal = () => {
        setEditingAdmin(null);
        setForm({ username: "", password: "" });
        setShowModal(true);
    };

    const openEditModal = (admin: Admin) => {
        setEditingAdmin(admin);
        setForm({ username: admin.username, password: "" });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingAdmin(null);
        setForm({ username: "", password: "" });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        await new Promise(r => setTimeout(r, 500));

        if (editingAdmin) {
            setAdmins(prev => prev.map(a => a.id === editingAdmin.id ? { ...a, username: form.username } : a));
            alert("Cập nhật thành công!");
        } else {
            setAdmins(prev => [...prev, { id: Date.now(), username: form.username, createdAt: new Date().toISOString().split('T')[0] }]);
            alert("Thêm thành công!");
        }
        closeModal();
        setSaving(false);
    };

    const handleDelete = (admin: Admin) => {
        if (admin.username === currentAdmin.username) {
            alert("Không thể xóa tài khoản đang đăng nhập!");
            return;
        }
        if (admins.length <= 1) {
            alert("Phải có ít nhất 1 tài khoản admin!");
            return;
        }
        if (confirm(`Xóa tài khoản "${admin.username}"?`)) {
            setAdmins(prev => prev.filter(a => a.id !== admin.id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý tài khoản</h1>
                    <p className="text-gray-500">Thêm và quản lý tài khoản quản trị</p>
                </div>
                <Button onClick={openCreateModal} leftIcon={<Plus className="w-5 h-5" />}>
                    Thêm tài khoản
                </Button>
            </div>

            {/* Search Filter */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm">
                <div className="flex-1">
                    <InputField
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tìm kiếm tài khoản..."
                        prefix={<Search className="w-5 h-5" />}
                        fullWidth
                    />
                </div>
            </div>

            {/* Accounts Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600">Tài khoản</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600">Vai trò</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600">Ngày tạo</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600">Trạng thái</th>
                                <th className="text-right px-6 py-4 font-semibold text-gray-600">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(3)].map((_, i) => (
                                    <tr key={i} className="border-b border-gray-100">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse" />
                                                <div className="space-y-2">
                                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                                                    <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"><div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse" /></td>
                                        <td className="px-6 py-4"><div className="h-4 w-24 bg-gray-200 rounded animate-pulse" /></td>
                                        <td className="px-6 py-4"><div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse" /></td>
                                        <td className="px-6 py-4"><div className="h-8 w-20 bg-gray-200 rounded animate-pulse ml-auto" /></td>
                                    </tr>
                                ))
                            ) : filteredAdmins.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p>Không tìm thấy tài khoản nào</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredAdmins.map((admin) => (
                                    <tr key={admin.id} className={`border-b border-gray-100 hover:bg-gray-50 ${admin.username === currentAdmin.username ? 'bg-primary/5' : ''}`}>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                                                    {admin.username.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{admin.username}</p>
                                                    <p className="text-sm text-gray-500">ID: {admin.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full">
                                                <Shield className="w-3 h-3 inline mr-1" />
                                                Admin
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{admin.createdAt}</td>
                                        <td className="px-6 py-4">
                                            {admin.username === currentAdmin.username ? (
                                                <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                                                    Đang đăng nhập
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                                                    Hoạt động
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(admin)}
                                                    className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(admin)}
                                                    className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                                    disabled={admin.username === currentAdmin.username}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination hint */}
                {!loading && filteredAdmins.length > 0 && (
                    <div className="px-6 py-4 border-t border-gray-100 text-sm text-gray-500">
                        Hiển thị {filteredAdmins.length} tài khoản
                    </div>
                )}
            </div>

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
                    <div className="relative bg-white rounded-2xl w-full max-w-md">
                        <div className="border-b px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold">{editingAdmin ? "Đổi mật khẩu" : "Thêm tài khoản"}</h2>
                            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <InputField label="Tên đăng nhập" value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} required disabled={!!editingAdmin} fullWidth />
                            <InputField label={editingAdmin ? "Mật khẩu mới" : "Mật khẩu"} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required={!editingAdmin} placeholder={editingAdmin ? "Để trống nếu không đổi" : ""} fullWidth />
                            <div className="flex gap-4 pt-4">
                                <Button type="button" variant="ghost" onClick={closeModal} className="flex-1">Hủy</Button>
                                <Button type="submit" isLoading={saving} className="flex-1">{editingAdmin ? "Lưu" : "Thêm"}</Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
