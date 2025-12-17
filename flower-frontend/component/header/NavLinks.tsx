"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/shop", label: "Shop" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/ui-library", label: "UI Library" },
];

export const NavLinks = () => {
    const pathname = usePathname();

    return (
        <nav className="hidden md:flex items-center gap-6">
            {links.map((link) => {
                const isActive = pathname === link.href;

                return (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`
                            text-sm font-medium transition-colors duration-200 relative
                            ${isActive ? "text-primary" : "text-gray-600 hover:text-primary"}
                        `}
                    >
                        {link.label}
                        {isActive && (
                            <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary rounded-full animate-fade-in" />
                        )}
                    </Link>
                );
            })}
        </nav>
    );
};
