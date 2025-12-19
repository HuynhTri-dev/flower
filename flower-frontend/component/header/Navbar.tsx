"use client";

import React, { useState } from "react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { CategoryDropdown } from "./CategoryDropdown";
import { SearchBar } from "./SearchBar";
import { ShoppingCart, User, Heart, Menu, X } from "lucide-react";
import { Button } from "../common";
import { useRouter } from "next/navigation";

export const Navbar = () => {
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogin = () => {
        router.push("/login");
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20 gap-4 lg:gap-8">
                    {/* Left: Logo & Category */}
                    <div className="flex items-center gap-4 lg:gap-8">
                        <Logo />
                        {/* Desktop Category Dropdown */}
                        <div className="hidden lg:block">
                            <CategoryDropdown />
                        </div>
                    </div>

                    {/* Middle: Navigation & Search - Hidden on mobile/tablet */}
                    <div className="flex-1 hidden lg:flex items-center justify-start gap-8 max-w-3xl">
                        <div className="hidden xl:block">
                            <NavLinks />
                        </div>
                        <div className="flex-1 max-w-md">
                            <SearchBar />
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="flex items-center gap-1 sm:gap-2 text-gray-600">
                            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" title="Wishlist">
                                <Heart className="w-5 h-5" />
                            </Button>

                            <Button variant="ghost" size="sm" className="relative" title="Cart">
                                <ShoppingCart className="w-5 h-5" />
                                <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                            </Button>

                            <Button variant="ghost" size="sm" title="Account">
                                <User className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="hidden sm:block w-px h-8 bg-gray-200 mx-2"></div>

                        <div className="hidden sm:flex gap-3">
                            <Button variant="outline" size="sm" onClick={handleLogin}>Log In</Button>
                        </div>

                        {/* Mobile Menu Toggle Button - Only visible on tablet/mobile */}
                        <Button
                            variant="ghost"
                            size="sm"
                            className="lg:hidden"
                            onClick={toggleMobileMenu}
                            title={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </Button>
                    </div>
                </div>

                {/* Mobile Dropdown Menu */}
                <div
                    className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
                            ? "max-h-96 opacity-100 pb-6"
                            : "max-h-0 opacity-0"
                        }`}
                >
                    <div className="flex flex-col gap-4 pt-2 border-t border-gray-100">
                        {/* Category Dropdown */}
                        <div className="px-2">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Danh mục</p>
                            <CategoryDropdown />
                        </div>

                        {/* Navigation Links */}
                        <div className="px-2">
                            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Điều hướng</p>
                            <NavLinks />
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
