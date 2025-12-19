"use client";

import { Button } from "../common";
import { ArrowRight, FlowerIcon, MessageCircle } from "lucide-react";

export const HeroBanner = () => {
    return (
        <section className="relative w-full overflow-hidden bg-primary/20 py-8 md:py-16">
            {/* Background geometric shapes for visual interest */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/3 w-[400px] h-[400px] bg-accent/20 rounded-full blur-3xl" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 lg:gap-20">

                    {/* Left Content */}
                    <div className="flex-1 space-y-8 text-center md:text-left">
                        <div className="space-y-4">
                            <h2 className="text-primary font-bold tracking-wider uppercase text-sm animate-fade-in-up">
                                Welcome to our garden
                            </h2>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 tracking-tight leading-tight">
                                FLORIST
                            </h1>
                            <p className="text-xl md:text-3xl text-gray-700 font-serif italic relative inline-block">
                                <span className="absolute -left-4 -top-2 text-6xl text-primary/20 font-sans">"</span>
                                Hoa đẹp nhất khi nằm trên tay em
                                <span className="absolute -right-4 -bottom-4 text-6xl text-primary/20 font-sans">"</span>
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
                            <Button size="lg" className="rounded-full px-8 w-full sm:w-auto gap-2 group shadow-xl shadow-primary/20">
                                Mua ngay
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </Button>
                            <Button variant="outline" size="lg" className="rounded-full px-8 w-full sm:w-auto gap-2 bg-transparent border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900">
                                <MessageCircle className="w-4 h-4" />
                                Liên hệ
                            </Button>
                        </div>

                        {/* Stats or Trust Indicators */}
                        <div className="pt-8 flex items-center justify-center md:justify-start gap-8 opacity-80">
                            <div>
                                <p className="text-2xl font-bold text-gray-900">1.2k+</p>
                                <p className="text-sm text-gray-600">Khách hàng hài lòng</p>
                            </div>
                            <div className="w-px h-10 bg-gray-300" />
                            <div>
                                <p className="text-2xl font-bold text-gray-900">100%</p>
                                <p className="text-sm text-gray-600">Hoa tươi</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Image */}
                    <div className="flex-1 w-full max-w-lg lg:max-w-xl relative">
                        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-all duration-500 ease-in-out border-8 border-white">

                            <img
                                src="banner.jpg"
                                alt="Girl planting flowers happily"
                                className="w-full h-full object-cover transform scale-105 hover:scale-110 transition-transform duration-700"
                            />

                            {/* Floating decorative card */}
                            <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-white/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                                        <FlowerIcon />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">Hoa tươi</p>
                                        <p className="text-xs text-gray-500">Nẩy mầm bằng tình yêu và sự chăm sóc</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements behind image */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
                        <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
                    </div>

                </div>
            </div>
        </section>
    );
};
