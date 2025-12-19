"use client";

import React, { forwardRef } from "react";
import { ChevronDown } from "lucide-react";

// Define option types - supports both simple strings and value/label objects
export type SelectOption = string | { value: string; label: string };

export interface SelectFieldProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size' | 'prefix' | 'onChange' | 'value'> {
    label?: string;
    placeholder?: string;
    options: SelectOption[];
    fullWidth?: boolean;
    containerClassName?: string;
    inputId?: string;
    error?: string;
    helperText?: string;
    size?: "sm" | "md" | "lg";
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// Helper function to normalize options
const normalizeOption = (option: SelectOption): { value: string; label: string } => {
    if (typeof option === 'string') {
        return { value: option, label: option };
    }
    return option;
};

export const SelectField = forwardRef<HTMLSelectElement, SelectFieldProps>(
    (
        {
            label,
            placeholder = "Select an option",
            options,
            fullWidth = false,
            containerClassName = "",
            inputId,
            error,
            helperText,
            size = "md",
            disabled,
            prefix,
            suffix,
            className = "",
            value,
            onChange,
            ...props
        },
        ref
    ) => {
        // Generate a unique ID if not provided
        const selectId = inputId || React.useId();

        // Size configurations (matching InputField)
        const sizeStyles = {
            sm: "h-8 text-sm px-2.5",
            md: "h-10 text-base px-3.5",
            lg: "h-12 text-lg px-4",
        };

        // Base styles for the wrapper (matching InputField)
        const wrapperBaseStyles = "relative flex items-center transition-all duration-200 border rounded-lg bg-white overflow-hidden focus-within:ring-2 focus-within:ring-offset-0 focus-within:border-primary focus-within:ring-primary/20";

        // State-based styles
        const stateStyles = error
            ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20"
            : "border-gray-200 hover:border-gray-300";

        const disabledStyles = disabled
            ? "bg-gray-50 cursor-not-allowed opacity-75 pointer-events-none"
            : "";

        // Normalize all options
        const normalizedOptions = options.map(normalizeOption);

        return (
            <div className={`flex flex-col gap-1.5 ${fullWidth ? "w-full" : "w-auto self-start"} ${containerClassName}`}>
                {label && (
                    <label
                        htmlFor={selectId}
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

                    <div className="relative w-full">
                        <select
                            ref={ref}
                            id={selectId}
                            disabled={disabled}
                            value={value}
                            onChange={onChange}
                            className={`
                                peer w-full appearance-none bg-transparent outline-none text-gray-900 
                                ${sizeStyles[size]}
                                ${prefix ? "pl-2.5" : ""}
                                ${suffix ? "pr-10" : "pr-8"}
                                ${!value ? "text-gray-400" : ""}
                                ${className}
                            `}
                            {...props}
                        >
                            <option value="" disabled hidden>
                                {placeholder}
                            </option>
                            {normalizedOptions.map((option, index) => (
                                <option key={`${option.value}-${index}`} value={option.value} className="text-gray-900">
                                    {option.label}
                                </option>
                            ))}
                        </select>

                        {/* Custom chevron or provided suffix */}
                        <div className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center text-gray-400 pointer-events-none pr-3 ${disabled ? "opacity-75" : ""}`}>
                            {suffix || <ChevronDown className="h-4 w-4" />}
                        </div>
                    </div>
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

SelectField.displayName = "SelectField";