"use client";

import React, { useEffect, useRef } from "react";
import { Sprout, Sun, Gift, Truck } from "lucide-react";
import { ImageCard } from "../card/ImageCard";

const STEPS = [
    {
        id: 1,
        title: "Gieo Hạt Mầm",
        description:
            "Mọi hành trình vĩ đại đều bắt đầu từ những điều nhỏ bé. Tại Florist, chúng tôi tuyển chọn kỹ lưỡng từng hạt giống, gieo trồng trên những mảnh đất màu mỡ nhất.",
        icon: Sprout,
        image: "https://i.pinimg.com/736x/ed/1e/24/ed1e2446507d63e6b90643cacc107982.jpg",
        color: "bg-green-500",
    },
    {
        id: 2,
        title: "Chăm Sóc & Nuôi Dưỡng",
        description:
            "Bằng sự kiên nhẫn và tình yêu, các nghệ nhân làm vườn của chúng tôi chăm chút từng nhành lá, từng nụ hoa với quy trình chăm sóc hữu cơ.",
        icon: Sun,
        image: "https://i.pinimg.com/736x/ef/91/3b/ef913b57a9b520c881938f2253fd5073.jpg",
        color: "bg-orange-500",
    },
    {
        id: 3,
        title: "Nghệ Thuật Bó Hoa",
        description:
            "Khi những bông hoa đạt độ nở đẹp nhất, chúng được trao vào tay những nghệ nhân cắm hoa. Mỗi bó hoa là một tác phẩm nghệ thuật.",
        icon: Gift,
        image: "https://i.pinimg.com/1200x/ec/88/4c/ec884cc8edf585132656c6c6793c6301.jpg",
        color: "bg-pink-500",
    },
    {
        id: 4,
        title: "Giao Trao Yêu Thương",
        description:
            "Hành trình kết thúc bằng nụ cười của người nhận. Đội ngũ giao hàng chuyên nghiệp nâng niu từng cánh hoa, đảm bảo món quà đến tay người thương vẹn nguyên cảm xúc.",
        icon: Truck,
        image: "https://i.pinimg.com/1200x/e7/e5/0b/e7e50bce11e78781ec07d7dcb0126898.jpg",
        color: "bg-blue-500",
    },
];

export const OurJourney = () => {
    const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("animate-in");
                }
            });
        };

        const observerOptions = {
            root: null,
            rootMargin: "0px 0px -100px 0px",
            threshold: 0.2,
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        stepRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <section className="pb-18 md:pb-24 bg-gradient-to-b from-secondary/20 to-white relative overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-semibold text-sm tracking-wide mb-4">
                        HÀNH TRÌNH CỦA CHÚNG TÔI
                    </span>
                    <h2 className="text-4xl lg:text-5xl font-bold text-slate-800">
                        Từ Vườn Ươm Đến <span className="text-pink-500">Trái Tim</span>
                    </h2>
                    <p className="mt-4 text-gray-500 max-w-2xl mx-auto text-lg">
                        Mỗi bó hoa đều trải qua một hành trình đặc biệt trước khi đến tay bạn
                    </p>
                </div>

                <div className="flex flex-col gap-24 lg:gap-28">
                    {STEPS.map((step, index) => {
                        const isOdd = step.id % 2 !== 0;

                        const ImageBlock = (
                            <div className={`relative group step-image ${isOdd ? 'slide-from-left' : 'slide-from-right'}`}>
                                <div className="relative overflow-hidden rounded-3xl shadow-2xl aspect-[4/3] transform group-hover:scale-[1.02] transition-transform duration-500">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Glossy Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-white/10 pointer-events-none" />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-3xl pointer-events-none" />
                                </div>
                                {/* Step number badge on image */}
                                <div className={`absolute -bottom-4 ${isOdd ? '-right-4' : '-left-4'} w-16 h-16 rounded-2xl ${step.color} text-white shadow-xl flex items-center justify-center font-bold text-xl step-badge`}>
                                    0{step.id}
                                </div>
                            </div>
                        );

                        const TextBlock = (
                            <div className={`flex flex-col space-y-5 step-text ${isOdd ? 'slide-from-right' : 'slide-from-left'} ${isOdd ? '' : 'lg:items-end lg:text-right'}`}>
                                <div className={`inline-flex items-center gap-3 ${isOdd ? '' : 'lg:flex-row-reverse'}`}>
                                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${step.color}/10`}>
                                        <step.icon size={24} className={step.color.replace('bg-', 'text-')} />
                                    </div>
                                    <span className="text-sm font-bold text-gray-400 tracking-widest uppercase">
                                        Bước {step.id < 10 ? `0${step.id}` : step.id}
                                    </span>
                                </div>

                                <h3 className="text-3xl lg:text-4xl font-bold text-slate-800 leading-tight">
                                    {step.title}
                                </h3>

                                <p className="text-lg text-gray-500 leading-relaxed max-w-md">
                                    {step.description}
                                </p>
                            </div>
                        );

                        return (
                            <div
                                key={step.id}
                                ref={(el) => { stepRefs.current[index] = el; }}
                                className="step-item grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center"
                                style={{ '--delay': `${index * 0.1}s` } as React.CSSProperties}
                            >
                                {isOdd ? (
                                    <>
                                        {ImageBlock}
                                        {TextBlock}
                                    </>
                                ) : (
                                    <>
                                        {TextBlock}
                                        {ImageBlock}
                                    </>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
                .step-item .step-image,
                .step-item .step-text {
                    opacity: 0;
                    transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
                }

                .step-item .slide-from-left {
                    transform: translateX(-60px);
                }

                .step-item .slide-from-right {
                    transform: translateX(60px);
                }

                .step-item .step-badge {
                    opacity: 0;
                    transform: scale(0.5);
                    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s;
                }

                .step-item.animate-in .step-image,
                .step-item.animate-in .step-text {
                    opacity: 1;
                    transform: translateX(0);
                }

                .step-item.animate-in .step-image {
                    transition-delay: calc(var(--delay) + 0s);
                }

                .step-item.animate-in .step-text {
                    transition-delay: calc(var(--delay) + 0.15s);
                }

                .step-item.animate-in .step-badge {
                    opacity: 1;
                    transform: scale(1);
                    transition-delay: calc(var(--delay) + 0.5s);
                }
            `}</style>
        </section>
    );
};