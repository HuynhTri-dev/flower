"use client";

import React, { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "gradient";
    size?: "sm" | "md" | "lg" | "xl";
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    fullWidth?: boolean;
}

export const Button = ({
    children,
    className = "",
    variant = "primary",
    size = "md",
    isLoading = false,
    leftIcon,
    rightIcon,
    fullWidth = false,
    disabled,
    ...props
}: ButtonProps) => {
    // Base styles
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    // Size styles
    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm gap-1.5",
        md: "px-5 py-2.5 text-base gap-2",
        lg: "px-6 py-3.5 text-lg gap-2",
        xl: "px-6 py-4 text-lg gap-2",
    };

    // Variant styles mapped to globals.css variables
    const variantStyles = {
        primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40",
        secondary: "bg-secondary text-primary hover:bg-secondary/80 focus:ring-secondary",
        accent: "bg-accent text-white hover:bg-accent/90 focus:ring-accent shadow-md shadow-accent/30",
        outline: "border-2 border-primary text-primary bg-white hover:bg-primary hover:text-white focus:ring-primary shadow-sm hover:shadow-md",
        ghost: "bg-transparent text-text-dark hover:bg-black/5",
        gradient: "bg-gradient-to-r from-primary to-pink-500 text-white hover:shadow-lg hover:shadow-primary/30 transform hover:scale-[1.02]",
    };

    // Width style
    const widthStyle = fullWidth ? "w-full" : "";

    return (
        <button
            className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyle} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : (
                <>
                    {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
                    {children}
                    {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
                </>
            )}
        </button>
    );
};
