"use client";

import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "accent" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    isLoading?: boolean;
}

export const Button = ({
    children,
    className = "",
    variant = "primary",
    size = "md",
    isLoading = false,
    disabled,
    ...props
}: ButtonProps) => {
    // Base styles
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    // Size styles
    const sizeStyles = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-5 py-2.5 text-base",
        lg: "px-8 py-3.5 text-lg",
    };

    // Variant styles mapped to globals.css variables
    const variantStyles = {
        primary: "bg-primary text-white hover:bg-primary/90 focus:ring-primary shadow-lg shadow-primary/30",
        secondary: "bg-secondary text-primary hover:bg-secondary/80 focus:ring-secondary",
        accent: "bg-accent text-white hover:bg-accent/90 focus:ring-accent shadow-md shadow-accent/30",
        outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/5 focus:ring-primary",
        ghost: "bg-transparent text-text-dark hover:bg-black/5",
    };

    return (
        <button
            className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading ? (
                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : null}
            {children}
        </button>
    );
};
