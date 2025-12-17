"use client";

import React, { forwardRef } from "react";

export interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    description?: string;
    error?: string;
    containerClassName?: string;
    size?: "sm" | "md" | "lg";
}

export const Radio = forwardRef<HTMLInputElement, RadioProps>(
    (
        {
            label,
            description,
            error,
            className = "",
            containerClassName = "",
            size = "md",
            id,
            disabled,
            ...props
        },
        ref
    ) => {
        const radioId = id || React.useId();

        const sizeStyles = {
            sm: "h-4 w-4",
            md: "h-5 w-5",
            lg: "h-6 w-6",
        };

        const indicatorSizes = {
            sm: "h-2 w-2",
            md: "h-2.5 w-2.5",
            lg: "h-3 w-3",
        };

        return (
            <div className={`flex items-start gap-3 ${containerClassName}`}>
                <div className="relative flex items-center justify-center">
                    <input
                        type="radio"
                        ref={ref}
                        id={radioId}
                        disabled={disabled}
                        className={`
                            peer appearance-none border-2 border-gray-300 rounded-full bg-white
                            checked:border-primary disabled:checked:border-gray-400
                            transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100
                            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1
                            ${error ? "border-red-500" : "hover:border-primary"}
                            ${sizeStyles[size]}
                            ${className}
                        `}
                        {...props}
                    />
                    <span
                        className={`
                            pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-0 transition-all duration-200 scale-0 peer-checked:opacity-100 peer-checked:scale-100 peer-disabled:bg-gray-400
                            ${indicatorSizes[size]}
                        `}
                    />
                </div>

                {(label || description) && (
                    <div className="flex flex-col gap-0.5">
                        {label && (
                            <label
                                htmlFor={radioId}
                                className={`font-medium text-gray-900 select-none cursor-pointer ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${size === 'lg' ? 'text-lg' : size === 'sm' ? 'text-sm' : 'text-base'}`}
                            >
                                {label}
                            </label>
                        )}
                        {description && (
                            <p className={`text-gray-500 ${size === 'lg' ? 'text-base' : 'text-sm'}`}>
                                {description}
                            </p>
                        )}
                        {error && (
                            <p className="text-xs text-red-500 font-medium mt-0.5">
                                {error}
                            </p>
                        )}
                    </div>
                )}
            </div>
        );
    }
);

Radio.displayName = "Radio";
