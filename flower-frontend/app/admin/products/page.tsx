"use client";

import { useState, useEffect } from "react";
import { Button } from "@/component/common/Button";
import { InputField } from "@/component/common/InputField";
import { Textarea } from "@/component/common/Textarea";
import { SelectField } from "@/component/common/SelectField";
import { Pagination, usePagination } from "@/component/common/Pagination";
import { ProductApi } from "@/data/api/ProductApi";
import { Product, formatPrice } from "@/data/models/Product";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    X,
    ImageIcon,
    Package
} from "lucide-react";
import Image from "next/image";

interface ProductForm {
    productCode: string;
    name: string;
    description: string;
    price: string;
    categoryId: string;
    imageUrl: string;
}

const initialForm: ProductForm = {
    productCode: "",
    name: "",
    description: "",
    price: "",
    categoryId: "",
    imageUrl: ""
};

export default function AdminProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [form, setForm] = useState<ProductForm>(initialForm);

    // Mock categories
    const categories = [
        { id: "1", name: "Hoa Tươi" },
        { id: "2", name: "Hoa Khô" },
        { id: "3", name: "Cây Cảnh" },
        { id: "4", name: "Phụ Kiện" },
    ];

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await ProductApi.getAll(1, 50);
            setProducts(response.products);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchSearch = !searchQuery ||
            product.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchCategory = categoryFilter === "all" ||
            String(product.category?.id) === categoryFilter;
        return matchSearch && matchCategory;
    });

    // Pagination
    const {
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedItems: paginatedProducts,
        totalItems,
        itemsPerPage,
    } = usePagination(filteredProducts, 20);

    const openCreateModal = () => {
        setEditingProduct(null);
        setForm(initialForm);
        setShowModal(true);
    };

    const openEditModal = (product: Product) => {
        setEditingProduct(product);
        setForm({
            productCode: product.productCode || "",
            name: product.name,
            description: product.description || "",
            price: String(product.price),
            categoryId: String(product.category?.id || ""),
            imageUrl: product.imageUrl
        });
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setEditingProduct(null);
        setForm(initialForm);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // TODO: Implement actual API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (editingProduct) {
                // Update product
                setProducts(prev => prev.map(p =>
                    p.id === editingProduct.id
                        ? { ...p, ...form, price: Number(form.price) }
                        : p
                ));
                alert("Cập nhật sản phẩm thành công!");
            } else {
                // Create product
                const newProduct: Product = {
                    id: Date.now(),
                    name: form.name,
                    price: Number(form.price),
                    imageUrl: form.imageUrl || "https://via.placeholder.com/400",
                    description: form.description,
                    productCode: form.productCode,
                    category: categories.find(c => c.id === form.categoryId) as { id: string | number; name: string }
                };
                setProducts(prev => [newProduct, ...prev]);
                alert("Thêm sản phẩm thành công!");
            }

            closeModal();
        } catch (error) {
            console.error("Error saving product:", error);
            alert("Có lỗi xảy ra!");
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (product: Product) => {
        if (!confirm(`Bạn có chắc muốn xóa "${product.name}"?`)) return;

        try {
            // TODO: Implement actual API call
            await new Promise(resolve => setTimeout(resolve, 500));
            setProducts(prev => prev.filter(p => p.id !== product.id));
            alert("Xóa sản phẩm thành công!");
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Có lỗi xảy ra!");
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Quản lý sản phẩm</h1>
                    <p className="text-gray-500">Thêm, sửa, xóa sản phẩm của cửa hàng</p>
                </div>
                <Button onClick={openCreateModal} leftIcon={<Plus className="w-5 h-5" />}>
                    Thêm sản phẩm
                </Button>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-sm">
                <div className="flex-1">
                    <InputField
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Tìm kiếm sản phẩm..."
                        prefix={<Search className="w-5 h-5" />}
                        fullWidth
                    />
                </div>
                <div className="w-full md:w-48">
                    <SelectField
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        options={[
                            { value: "all", label: "Tất cả danh mục" },
                            ...categories.map(c => ({ value: c.id, label: c.name }))
                        ]}
                        fullWidth
                    />
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600">Sản phẩm</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600">Danh mục</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600">Giá</th>
                                <th className="text-left px-6 py-4 font-semibold text-gray-600">Mã SP</th>
                                <th className="text-right px-6 py-4 font-semibold text-gray-600">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                [...Array(5)].map((_, i) => (
                                    <tr key={i} className="border-b border-gray-100">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse" />
                                                <div className="space-y-2">
                                                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
                                                    <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4"><div className="h-4 w-20 bg-gray-200 rounded animate-pulse" /></td>
                                        <td className="px-6 py-4"><div className="h-4 w-24 bg-gray-200 rounded animate-pulse" /></td>
                                        <td className="px-6 py-4"><div className="h-4 w-16 bg-gray-200 rounded animate-pulse" /></td>
                                        <td className="px-6 py-4"><div className="h-8 w-20 bg-gray-200 rounded animate-pulse ml-auto" /></td>
                                    </tr>
                                ))
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        <Package className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                                        <p>Không tìm thấy sản phẩm nào</p>
                                    </td>
                                </tr>
                            ) : (
                                paginatedProducts.map((product) => (
                                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 relative">
                                                    <Image
                                                        src={product.imageUrl}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{product.name}</p>
                                                    <p className="text-sm text-gray-500 line-clamp-1 max-w-xs">
                                                        {product.description || "Chưa có mô tả"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                                                {product.category?.name || "Chưa phân loại"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-primary">
                                            {formatPrice(product.price)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                                {product.productCode || "N/A"}
                                            </code>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => openEditModal(product)}
                                                    className="p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(product)}
                                                    className="p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors"
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

                {/* Pagination */}
                {!loading && filteredProducts.length > 0 && (
                    <div className="px-6 py-6 border-t border-gray-100">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                            type="product"
                            itemsPerPage={itemsPerPage}
                            totalItems={totalItems}
                        />
                    </div>
                )}
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
                    <div className="relative bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-gray-800">
                                {editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
                            </h2>
                            <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField
                                    label="Mã sản phẩm"
                                    value={form.productCode}
                                    onChange={(e) => setForm({ ...form, productCode: e.target.value })}
                                    placeholder="VD: FL001"
                                    required
                                />
                                <InputField
                                    label="Tên sản phẩm"
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    placeholder="VD: Bó hoa hồng đỏ"
                                    required
                                />
                            </div>

                            <Textarea
                                label="Mô tả"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                placeholder="Mô tả chi tiết sản phẩm..."
                                rows={4}
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField
                                    label="Giá bán (VNĐ)"
                                    type="number"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    placeholder="VD: 500000"
                                    required
                                />
                                <SelectField
                                    label="Danh mục"
                                    value={form.categoryId}
                                    onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                                    options={[
                                        { value: "", label: "Chọn danh mục" },
                                        ...categories.map(c => ({ value: c.id, label: c.name }))
                                    ]}
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Hình ảnh
                                </label>
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                                    {form.imageUrl ? (
                                        <div className="relative w-32 h-32 mx-auto">
                                            <Image
                                                src={form.imageUrl}
                                                alt="Preview"
                                                fill
                                                className="object-cover rounded-lg"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setForm({ ...form, imageUrl: "" })}
                                                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-gray-400">
                                            <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                                            <p>Nhập URL hình ảnh bên dưới</p>
                                        </div>
                                    )}
                                    <InputField
                                        value={form.imageUrl}
                                        onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                                        placeholder="https://example.com/image.jpg"
                                        className="mt-4"
                                        fullWidth
                                    />
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="button" variant="ghost" onClick={closeModal} className="flex-1">
                                    Hủy
                                </Button>
                                <Button type="submit" variant="primary" isLoading={saving} className="flex-1">
                                    {editingProduct ? "Lưu thay đổi" : "Thêm sản phẩm"}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
