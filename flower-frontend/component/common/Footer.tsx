'use client';

import { Facebook, Instagram, Youtube, MessageCircleMore, Music2, Mail, MapPin, Phone, Clock, Flower } from "lucide-react";

const SOCIAL_LINKS = [
    { icon: Facebook, href: "https://facebook.com/yourpage", label: "Facebook", hoverColor: "hover:bg-blue-600" },
    { icon: Instagram, href: "https://instagram.com/yourpage", label: "Instagram", hoverColor: "hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-500" },
    { icon: Music2, href: "https://tiktok.com/@yourid", label: "TikTok", hoverColor: "hover:bg-black" },
    { icon: MessageCircleMore, href: "https://zalo.me/0123456789", label: "Zalo", hoverColor: "hover:bg-blue-500" },
    { icon: Youtube, href: "https://youtube.com/c/yourchannel", label: "YouTube", hoverColor: "hover:bg-red-600" },
];

export const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                            <Flower /> Florist
                        </h2>
                        <p className="text-slate-400 leading-relaxed mb-6">
                            Mang vẻ đẹp thiên nhiên đến từng ngôi nhà. Chúng tôi cam kết cung cấp những bó hoa tươi đẹp nhất với dịch vụ tận tâm.
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-3">
                            {SOCIAL_LINKS.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className={`w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center transition-all duration-300 ${social.hoverColor} hover:scale-110`}
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-5">Điều Hướng</h3>
                        <ul className="space-y-3">
                            {["Trang Chủ", "Sản Phẩm", "Về Chúng Tôi", "Liên Hệ", "Blog"].map((link) => (
                                <li key={link}>
                                    <a href="#" className="text-slate-400 hover:text-accent transition-colors duration-200">
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-5">Dịch Vụ</h3>
                        <ul className="space-y-3">
                            {["Hoa Cưới", "Hoa Sinh Nhật", "Hoa Khai Trương", "Hoa Chia Buồn", "Trang Trí Sự Kiện"].map((service) => (
                                <li key={service}>
                                    <a href="#" className="text-slate-400 hover:text-accent transition-colors duration-200">
                                        {service}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-5">Liên Hệ</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                                <span className="text-slate-400">123 Nguyễn Văn Linh, Quận 7, TP.HCM</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-5 h-5 text-accent shrink-0" />
                                <a href="tel:0123456789" className="text-slate-400 hover:text-white transition-colors">
                                    0123 456 789
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-5 h-5 text-accent shrink-0" />
                                <a href="mailto:contact@florist.com" className="text-slate-400 hover:text-white transition-colors">
                                    contact@florist.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Clock className="w-5 h-5 text-accent shrink-0" />
                                <span className="text-slate-400">8:00 - 21:00 (Hằng ngày)</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="container mx-auto px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <p className="text-slate-500 text-sm">
                            © {new Date().getFullYear()} Florist. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-sm">
                            <a href="#" className="text-slate-500 hover:text-white transition-colors">
                                Chính sách bảo mật
                            </a>
                            <a href="#" className="text-slate-500 hover:text-white transition-colors">
                                Điều khoản sử dụng
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};