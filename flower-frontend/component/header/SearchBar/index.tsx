"use client";

import { useState, useEffect, useRef } from "react";
import { useDebounce } from "use-debounce";
import { SearchInput } from "./SearchInput";
import { SearchResults, ProductResult } from "./SearchResults";

// Mock API function
const mockSearchAPI = async (query: string): Promise<ProductResult[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (!query) return [];

    const mockDB: ProductResult[] = [
        { id: "1", name: "Red Rose Bouquet", price: 45.00, slug: "red-rose-bouquet" },
        { id: "2", name: "White Lily Arrangement", price: 35.50, slug: "white-lily" },
        { id: "3", name: "Sunflower Bundle", price: 25.00, slug: "sunflower-bundle" },
        { id: "4", name: "Tulip Garden", price: 42.00, slug: "tulip-garden" },
        { id: "5", name: "Orchid Pot", price: 55.00, slug: "orchid-pot" },
    ];

    return mockDB.filter(item =>
        item.name.toLowerCase().includes(query.toLowerCase())
    );
};

export const SearchBar = () => {
    const [query, setQuery] = useState("");
    const [debouncedQuery] = useDebounce(query, 500);
    const [results, setResults] = useState<ProductResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Fetch results when debounced query changes
    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedQuery) {
                setResults([]);
                return;
            }

            setIsSearching(true);
            try {
                // In a real app, you would fetch from your API here
                // const res = await fetch(\`/api/search?q=\${debouncedQuery}\`);
                // const data = await res.json();
                const data = await mockSearchAPI(debouncedQuery);
                setResults(data);
                setShowResults(true);
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setIsSearching(false);
            }
        };

        fetchResults();
    }, [debouncedQuery]);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleClear = () => {
        setQuery("");
        setResults([]);
        setShowResults(false);
    };

    return (
        <div className="relative w-full max-w-md" ref={containerRef}>
            <SearchInput
                value={query}
                onChange={setQuery}
                onClear={handleClear}
                onFocus={() => {
                    if (results.length > 0 || debouncedQuery) {
                        setShowResults(true);
                    }
                }}
            />
            <SearchResults
                results={results}
                isLoading={isSearching}
                isVisible={showResults && (query.length > 0)}
                onClose={() => setShowResults(false)}
            />
        </div>
    );
};
