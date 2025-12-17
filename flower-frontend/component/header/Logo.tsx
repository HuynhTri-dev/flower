"use client";

import Link from "next/link";
import { Flower } from "lucide-react";

export const Logo = () => {
    return (
        <Link
            href="/"
            className="flex items-center gap-2 group transition-opacity hover:opacity-90"
        >
            <div className="bg-primary/10 p-2 rounded-full group-hover:bg-primary/20 transition-colors">
                <Flower className="w-8 h-8 text-primary" strokeWidth={2} />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                FlowerShop
            </span>
        </Link>
    );
};
