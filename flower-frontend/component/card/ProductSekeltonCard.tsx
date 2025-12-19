import React from 'react';

export const ProductSkeletonCard = () => {
    return (
        <div className="flex flex-col w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
            {/* Image Placeholder */}
            <div className="w-full aspect-square bg-gray-200 relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
            </div>

            {/* Content Placeholder */}
            <div className="flex flex-col p-4 flex-grow space-y-3">
                {/* Title */}
                <div className="h-6 bg-gray-200 rounded-md w-3/4" />

                {/* Description */}
                <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-2/3" />
                </div>

                {/* Footer (Price + Button) */}
                <div className="mt-4 flex items-center justify-between pt-2">
                    <div className="h-6 bg-gray-200 rounded w-1/3" />
                    <div className="h-9 w-9 bg-gray-200 rounded-full" />
                </div>
            </div>
        </div>
    );
};
