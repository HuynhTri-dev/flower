"use client";

import React, { forwardRef } from "react";
import { Calendar, Clock } from "lucide-react";

export interface DateTimePickerProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'> {
    label?: string;
    error?: string;
    helperText?: string;
    type?: "date" | "time" | "datetime-local";
    containerClassName?: string;
    size?: "sm" | "md" | "lg";
}

export const DateTimePicker = forwardRef<HTMLInputElement, DateTimePickerProps>(
    (
        {
            label,
            error,
            helperText,
            type = "date",
            className = "",
            containerClassName = "",
            size = "md",
            disabled,
            id,
            ...props
        },
        ref
    ) => {
        const inputId = id || React.useId();

        // Size configurations
        const sizeStyles = {
            sm: "h-8 text-sm px-2.5",
            md: "h-10 text-base px-3.5",
            lg: "h-12 text-lg px-4",
        };

        // Wrapper styles (matching standard input style)
        const wrapperBaseStyles = "relative flex items-center transition-all duration-200 border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-offset-0 focus-within:border-primary focus-within:ring-primary/20 bg-white";

        // State styles
        const stateStyles = error
            ? "border-red-500 focus-within:border-red-500 focus-within:ring-red-500/20"
            : "border-gray-200 hover:border-gray-300";

        const disabledStyles = disabled
            ? "bg-gray-50 cursor-not-allowed opacity-75 pointer-events-none"
            : "";

        // Icon based on type
        const Icon = type === "time" ? Clock : Calendar;

        return (
            <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
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
                    <div className={`flex items-center justify-center text-gray-400 pl-3 ${disabled ? "opacity-75" : ""}`}>
                        <Icon className="h-4 w-4" />
                    </div>

                    <input
                        ref={ref}
                        id={inputId}
                        type={type}
                        disabled={disabled}
                        className={`
                            peer w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-400
                            [color-scheme:light] 
                            ${sizeStyles[size]}
                            pl-2.5
                            ${className}
                        `}
                        {...props}
                    />
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

DateTimePicker.displayName = "DateTimePicker";
