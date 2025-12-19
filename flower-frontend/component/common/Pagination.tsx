"use client";

import { FlowerIcon } from "lucide-react";
import React from "react";

export type PaginationType = "product" | "post";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    type?: PaginationType;
    itemsPerPage?: number;
    totalItems?: number;
    className?: string;
}

// Icon: Hạt mầm (Seed/Sprout) - cho trang đầu của product
const SeedIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Seed body */}
        <ellipse cx="12" cy="16" rx="4" ry="5" />
        {/* Small sprout emerging */}
        <path d="M12 11 C12 9, 10 7, 8 8" />
        <path d="M12 11 C12 9, 14 7, 16 8" />
    </svg>
);


// Icon: Tờ giấy trống (Blank paper) - cho trang đầu của post
const BlankPaperIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Paper outline */}
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        {/* Folded corner */}
        <polyline points="14,2 14,8 20,8" />
    </svg>
);

// Icon: Tờ giấy có chữ (Paper with text) - cho trang cuối của post
const TextPaperIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Paper outline */}
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        {/* Folded corner */}
        <polyline points="14,2 14,8 20,8" />
        {/* Text lines */}
        <line x1="8" y1="13" x2="16" y2="13" />
        <line x1="8" y1="17" x2="14" y2="17" />
    </svg>
);

export const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    type = "product",
    itemsPerPage = 20,
    totalItems,
    className = "",
}) => {
    // Don't render if no pages at all
    if (totalPages < 1) return null;

    const getPageNumbers = () => {
        const pages: (number | string)[] = [];
        const showPages = 5; // Maximum visible page numbers

        if (totalPages <= showPages + 2) {
            // Show all pages if total is small
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Always show first page
            pages.push(1);

            if (currentPage > 3) {
                pages.push("...");
            }

            // Calculate range around current page
            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) {
                pages.push("...");
            }

            // Always show last page
            pages.push(totalPages);
        }

        return pages;
    };

    const handleFirst = () => {
        onPageChange(1);
    };

    const handleLast = () => {
        onPageChange(totalPages);
    };

    // Get icons based on type
    const StartIcon = type === "product" ? SeedIcon : BlankPaperIcon;
    const EndIcon = type === "product" ? FlowerIcon : TextPaperIcon;

    const pageNumbers = getPageNumbers();

    // Calculate display info
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = totalItems
        ? Math.min(currentPage * itemsPerPage, totalItems)
        : currentPage * itemsPerPage;

    return (
        <div className={`flex flex-col items-center gap-4 ${className}`}>
            {/* Pagination Controls */}
            <div className="flex items-center gap-2">
                {/* First Page Button with Start Icon */}
                <button
                    onClick={handleFirst}
                    disabled={currentPage === 1}
                    className={`
                        flex items-center justify-center w-10 h-10 rounded-full
                        transition-all duration-300 ease-out
                        ${currentPage === 1
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-primary/20 text-primary hover:bg-primary hover:text-white hover:scale-110 hover:shadow-lg"
                        }
                    `}
                    title={type === "product" ? "Trang đầu (Hạt mầm)" : "Trang đầu (Bài viết trống)"}
                    aria-label="Trang đầu"
                >
                    <StartIcon className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex items-center gap-1">
                    {pageNumbers.map((page, index) => (
                        <React.Fragment key={index}>
                            {page === "..." ? (
                                <span className="w-10 h-10 flex items-center justify-center text-gray-400 font-medium">
                                    •••
                                </span>
                            ) : (
                                <button
                                    onClick={() => onPageChange(page as number)}
                                    className={`
                                        w-10 h-10 rounded-full font-semibold
                                        transition-all duration-300 ease-out
                                        ${currentPage === page
                                            ? "bg-primary text-white shadow-lg shadow-primary/40 scale-110"
                                            : "bg-white text-gray-700 hover:bg-primary hover:text-white hover:scale-105 hover:shadow-md border border-gray-200"
                                        }
                                    `}
                                    aria-label={`Trang ${page}`}
                                    aria-current={currentPage === page ? "page" : undefined}
                                >
                                    {page}
                                </button>
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Last Page Button with End Icon */}
                <button
                    onClick={handleLast}
                    disabled={currentPage === totalPages}
                    className={`
                        flex items-center justify-center w-10 h-10 rounded-full
                        transition-all duration-300 ease-out
                        ${currentPage === totalPages
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : "bg-primary/20 text-primary hover:bg-primary hover:text-white hover:scale-110 hover:shadow-lg"
                        }
                    `}
                    title={type === "product" ? "Trang cuối (Hoa nở)" : "Trang cuối (Bài viết đầy đủ)"}
                    aria-label="Trang cuối"
                >
                    <EndIcon className="w-5 h-5" />
                </button>
            </div>

            {/* Info Text */}
            {totalItems && (
                <p className="text-sm text-gray-500">
                    Hiển thị <span className="font-semibold text-primary">{startItem}</span> - <span className="font-semibold text-primary">{endItem}</span> trong tổng số <span className="font-semibold text-primary">{totalItems}</span> {type === "product" ? "sản phẩm" : "bài viết"}
                </p>
            )}
        </div>
    );
};

// Helper hook to calculate pagination
export const usePagination = <T,>(
    items: T[],
    itemsPerPage: number = 20
) => {
    const [currentPage, setCurrentPage] = React.useState(1);

    const totalPages = Math.ceil(items.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = items.slice(startIndex, endIndex);

    // Reset to page 1 when items change
    React.useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1);
        }
    }, [items.length, totalPages, currentPage]);

    return {
        currentPage,
        setCurrentPage,
        totalPages,
        paginatedItems,
        totalItems: items.length,
        itemsPerPage,
    };
};

export default Pagination;
