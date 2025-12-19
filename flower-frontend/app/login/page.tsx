"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/component/common/Button";
import { InputField } from "@/component/common/InputField";
import { Checkbox } from "@/component/common/Checkbox";
import { Eye, EyeOff, Flower2 } from "lucide-react";

export default function AdminLoginPage() {
    const router = useRouter();

    const [form, setForm] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (loading) return;
        setError("");
        setLoading(true);

        try {
            // TODO: Replace with actual API call
            // const response = await axiosInstance.post("/admins/login", {
            //     username: form.username,
            //     password: form.password,
            // });

            // Simulate API call
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Mock validation
            if (form.username === "admin" && form.password === "admin123") {
                // Save admin data to localStorage
                localStorage.setItem(
                    "admin",
                    JSON.stringify({
                        username: form.username,
                        role: "admin",
                        token: "mock-jwt-token",
                    })
                );

                // Navigate to dashboard
                router.push("/admin/dashboard");
            } else {
                setError("Tên đăng nhập hoặc mật khẩu không chính xác");
            }
        } catch (err: unknown) {
            interface ErrorResponse {
                response?: {
                    data?: {
                        message?: string;
                    } | Array<{ message?: string } | string>;
                };
            }

            const error = err as ErrorResponse;

            if (error.response?.data) {
                if (typeof error.response.data === "object" && "message" in error.response.data) {
                    setError(error.response.data.message || "Đăng nhập không thành công");
                } else if (Array.isArray(error.response.data)) {
                    setError(
                        error.response.data
                            .map((item) => (typeof item === "string" ? item : item.message || ""))
                            .join(", ")
                    );
                }
            } else {
                setError("Đăng nhập không thành công. Vui lòng thử lại.");
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-white to-accent/20 p-4 md:p-8">
            {/* Decorative elements */}
            <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />

            <div className="w-full max-w-md relative z-10">
                {/* Login Card */}
                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 md:p-10 shadow-2xl shadow-primary/10 border border-primary/10">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/30">
                            <Flower2 className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold text-primary">
                                Đăng nhập
                            </h1>
                            <p className="text-accent font-medium text-sm mt-1">
                                Quản trị viên Florist
                            </p>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-accent/10 border border-accent/30 text-accent font-semibold text-sm animate-in fade-in slide-in-from-top-2 duration-300">
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <InputField
                            label="Tên đăng nhập"
                            name="username"
                            value={form.username}
                            onChange={handleInputChange}
                            placeholder="Nhập tên đăng nhập"
                            autoComplete="username"
                            required
                            fullWidth
                        />

                        <div className="relative">
                            <InputField
                                label="Mật khẩu"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                value={form.password}
                                onChange={handleInputChange}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                required
                                fullWidth
                                suffix={
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="text-gray-400 hover:text-primary transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                }
                            />
                        </div>

                        <div className="flex justify-end">
                            <Checkbox
                                label="Hiển thị mật khẩu"
                                checked={showPassword}
                                onChange={(e) => setShowPassword(e.target.checked)}
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            fullWidth
                            isLoading={loading}
                            className="mt-6"
                        >
                            {loading ? "Đang kiểm tra..." : "Đăng nhập"}
                        </Button>
                    </form>

                    {/* Hint */}
                    <p className="mt-6 text-center text-sm text-gray-500 font-medium">
                        Liên hệ quản trị viên cao cấp nếu bạn quên thông tin đăng nhập.
                    </p>

                    {/* Demo credentials hint */}
                    <div className="mt-4 p-3 rounded-lg bg-secondary/50 text-xs text-center text-primary/70">
                        <span className="font-semibold">Demo:</span> admin / admin123
                    </div>
                </div>

                {/* Back to home link */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => router.push("/")}
                        className="text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        Quay lại trang chủ
                    </button>
                </div>
            </div>
        </div>
    );
}
