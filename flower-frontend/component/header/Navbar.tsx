"use client";

import React from "react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { CategoryDropdown } from "./CategoryDropdown";
import { SearchBar } from "./SearchBar";
import { ShoppingCart, User, Heart } from "lucide-react";
import { Button } from "../common";

export const Navbar = () => {
    return (
        <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between h-20 gap-8">
                    {/* Left: Logo & Category */}
                    <div className="flex items-center gap-8">
                        <Logo />
                        <div className="hidden lg:block">
                            <CategoryDropdown />
                        </div>
                    </div>

                    {/* Middle: Navigation & Search */}
                    <div className="flex-1 flex items-center justify-center lg:justify-start gap-8 max-w-3xl">
                        <div className="hidden xl:block">
                            <NavLinks />
                        </div>
                        <div className="flex-1 max-w-md hidden md:block">
                            <SearchBar />
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Mobile Search Trigger could go here */}

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
                            <Button variant="outline" size="sm">Log In</Button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation (Could be refactored into separate component) */}
                <div className="md:hidden pb-4 flex justify-between gap-4">
                    <SearchBar />
                    <CategoryDropdown />
                </div>
            </div>
        </header>
    );
};
