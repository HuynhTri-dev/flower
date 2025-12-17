"use client";

import React, { forwardRef } from "react";
import { Flower, Flower2 } from "lucide-react";

export interface SwitchProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    description?: string;
    error?: string;
    containerClassName?: string;
    size?: "sm" | "md" | "lg";
    variant?: "primary" | "accent";
}

export const Switch = forwardRef<HTMLInputElement, SwitchProps>(
    (
        {
            label,
            description,
            error,
            className = "",
            containerClassName = "",
            size = "md",
            variant = "primary",
            id,
            disabled,
            ...props
        },
        ref
    ) => {
        const switchId = id || React.useId();

        // Size configurations for the Track
        const trackSizes = {
            sm: "w-8 h-5",
            md: "w-12 h-7",
            lg: "w-14 h-8",
        };

        // Size configurations for the Thumb
        const thumbSizes = {
            sm: "h-4 w-4",
            md: "h-6 w-6",
            lg: "h-7 w-7",
        };

        // Translation values for ON state
        const thumbTranslate = {
            sm: "translate-x-3.5",
            md: "translate-x-5.5",
            lg: "translate-x-6.5",
        };

        // Variant Styles
        const variantStyles = {
            primary: "peer-checked:bg-primary peer-focus:ring-primary/20",
            accent: "peer-checked:bg-accent peer-focus:ring-accent/20",
        };

        // Icon Colors
        const iconColors = {
            primary: "text-primary",
            accent: "text-accent",
        };

        return (
            <div className={`flex items-center justify-between gap-4 ${containerClassName}`}>
                {(label || description) && (
                    <div className="flex flex-col gap-0.5 flex-1">
                        {label && (
                            <label
                                htmlFor={switchId}
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
                    </div>
                )}

                {/* Wrapper is now a label clearly linked to the input */}
                <label
                    htmlFor={switchId}
                    className={`relative inline-flex items-center cursor-pointer ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                    <input
                        type="checkbox"
                        ref={ref}
                        id={switchId}
                        disabled={disabled}
                        className="peer sr-only"
                        {...props}
                    />

                    {/* Track */}
                    <div
                        className={`
                            bg-gray-200 rounded-full transition-colors duration-200
                            peer-focus:outline-none peer-focus:ring-2 
                            ${variantStyles[variant]}
                            ${trackSizes[size]}
                            ${className}
                        `}
                    />

                    {/* Thumb with Icon */}
                    <div
                        className={`
                            absolute left-0.5 top-0.5 bg-white rounded-full shadow-sm transition-transform duration-200 flex items-center justify-center pointer-events-none
                            peer-checked:${thumbTranslate[size]}
                            ${thumbSizes[size]}
                        `}
                    >
                        {variant === "primary" ? (
                            <Flower className={`w-[70%] h-[70%] ${iconColors.primary}`} strokeWidth={2.5} />
                        ) : (
                            <Flower2 className={`w-[70%] h-[70%] ${iconColors.accent}`} strokeWidth={2.5} />
                        )}
                    </div>
                </label>

                {error && (
                    <p className="text-xs text-red-500 font-medium absolute -bottom-5 right-0">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Switch.displayName = "Switch";
