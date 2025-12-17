"use client";

import { Search, X } from "lucide-react";
import React from "react";

interface SearchInputProps {
    value: string;
    onChange: (value: string) => void;
    onClear: () => void;
    onFocus: () => void;
}

export const SearchInput = ({ value, onChange, onClear, onFocus }: SearchInputProps) => {
    return (
        <div className="relative w-full">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search className="w-4 h-4" />
            </div>

            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onFocus={onFocus}
                placeholder="Search flowers..."
                className="w-full h-10 pl-10 pr-10 rounded-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200 text-sm placeholder:text-gray-400"
            />

            {value && (
                <button
                    onClick={onClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            )}
        </div>
    );
};
