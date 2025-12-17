"use client";

import React, { forwardRef } from "react";

export interface InputFieldProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix'> {
    label?: string;
    error?: string;
    helperText?: string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    fullWidth?: boolean;
    containerClassName?: string;
    size?: "sm" | "md" | "lg";
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
    (
        {
            label,
            error,
            helperText,
            prefix,
            suffix,
            className = "",
            containerClassName = "",
            fullWidth = false,
            disabled,
            size = "md",
            id,
            ...props
        },
        ref
    ) => {
        // Generate a unique ID if not provided, for accessibility linking
        const inputId = id || React.useId();

        // Size configurations
        const sizeStyles = {
            sm: "h-8 text-sm px-2.5",
            md: "h-10 text-base px-3.5",
            lg: "h-12 text-lg px-4",
        };

        const iconSizeStyles = {
            sm: "h-4 w-4",
            md: "h-5 w-5",
            lg: "h-6 w-6",
        };

        // Base styles for the input wrapper
        const wrapperBaseStyles = "relative flex items-center transition-all duration-200 border rounded-lg bg-white overflow-hidden focus-within:ring-2 focus-within:ring-offset-0 focus-within:border-primary focus-within:ring-primary/20";

        // State-based styles
        const stateStyles = error
            ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20"
            : "border-gray-200 hover:border-gray-300";

        const disabledStyles = disabled
            ? "bg-gray-50 cursor-not-allowed opacity-75 pointer-events-none"
            : "";

        return (
            <div className={`flex flex-col gap-1.5 ${fullWidth ? "w-full" : "w-auto self-start"} ${containerClassName}`}>
                {label && (
                    <label
                        htmlFor={inputId}
                        className={`text-sm font-medium text-gray-700 ${disabled ? "opacity-75" : ""} pl-0.5`}
                    >
                        {label}
                    </label>
                )}

                <div
                    className={`
                        ${wrapperBaseStyles} 
                        ${stateStyles} 
                        ${disabledStyles}
                    `}
                >
                    {prefix && (
                        <div className={`flex items-center justify-center text-gray-400 pl-3 ${disabled ? "opacity-75" : ""}`}>
                            {prefix}
                        </div>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        disabled={disabled}
                        className={`
                            peer w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400
                            ${sizeStyles[size]}
                            ${prefix ? "pl-2.5" : ""}
                            ${suffix ? "pr-2.5" : ""}
                            ${className}
                        `}
                        {...props}
                    />

                    {suffix && (
                        <div className={`flex items-center justify-center text-gray-400 pr-3 ${disabled ? "opacity-75" : ""}`}>
                            {suffix}
                        </div>
                    )}
                </div>

                {(error || helperText) && (
                    <p className={`text-xs pl-0.5 ${error ? "text-red-500 font-medium" : "text-gray-500"}`}>
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

InputField.displayName = "InputField";