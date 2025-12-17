"use client";

import React, { forwardRef } from "react";
import { Check } from "lucide-react";

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    description?: string;
    error?: string;
    containerClassName?: string;
    size?: "sm" | "md" | "lg";
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
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
        const checkboxId = id || React.useId();

        const sizeStyles = {
            sm: "h-4 w-4 rounded",
            md: "h-5 w-5 rounded",
            lg: "h-6 w-6 rounded-md",
        };

        const iconSizes = {
            sm: "h-3 w-3",
            md: "h-3.5 w-3.5",
            lg: "h-4 w-4",
        };

        return (
            <div className={`flex items-start gap-3 ${containerClassName}`}>
                <div className="relative flex items-center">
                    <input
                        type="checkbox"
                        ref={ref}
                        id={checkboxId}
                        disabled={disabled}
                        className={`
                            peer appearance-none border-2 border-gray-300 bg-white
                            checked:bg-primary checked:border-primary disabled:checked:bg-gray-400 disabled:checked:border-gray-400
                            transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-100
                            focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-offset-1
                            ${error ? "border-red-500" : "hover:border-primary"}
                            ${sizeStyles[size]}
                            ${className}
                        `}
                        {...props}
                    />
                    <Check
                        className={`
                            pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100
                            ${iconSizes[size]}
                        `}
                        strokeWidth={3}
                    />
                </div>

                {(label || description) && (
                    <div className="flex flex-col gap-0.5">
                        {label && (
                            <label
                                htmlFor={checkboxId}
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

Checkbox.displayName = "Checkbox";
