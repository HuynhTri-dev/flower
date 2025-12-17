"use client";

import React, { forwardRef, useEffect, useRef } from "react";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    containerClassName?: string;
    autoResize?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            label,
            error,
            helperText,
            className = "",
            containerClassName = "",
            autoResize = true,
            id,
            disabled,
            rows = 3,
            onChange,
            ...props
        },
        ref
    ) => {
        const textareaId = id || React.useId();
        const internalRef = useRef<HTMLTextAreaElement>(null);

        // Handle auto-resizing
        const handleResize = (target: HTMLTextAreaElement) => {
            if (autoResize) {
                target.style.height = "auto";
                target.style.height = `${target.scrollHeight}px`;
            }
        };

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            handleResize(e.target);
            onChange?.(e);
        };

        // Define shared refs (user provided + internal)
        const setRefs = (element: HTMLTextAreaElement | null) => {
            internalRef.current = element;
            if (typeof ref === "function") {
                ref(element);
            } else if (ref) {
                ref.current = element;
            }
        };

        // State-based styles
        const stateStyles = error
            ? "border-red-500 focus:border-red-500 focus:ring-red-500/20"
            : "border-gray-200 hover:border-gray-300 focus:border-primary focus:ring-primary/20";

        const disabledStyles = disabled
            ? "bg-gray-50 cursor-not-allowed opacity-75 resize-none"
            : "bg-white";

        return (
            <div className={`flex flex-col gap-1.5 w-full ${containerClassName}`}>
                {label && (
                    <label
                        htmlFor={textareaId}
                        className={`text-sm font-medium text-gray-700 ${disabled ? "opacity-75" : ""} pl-0.5`}
                    >
                        {label}
                    </label>
                )}

                <textarea
                    ref={setRefs}
                    id={textareaId}
                    disabled={disabled}
                    rows={rows}
                    onChange={handleChange}
                    className={`
                        block w-full rounded-lg border px-3 py-2.5 text-base text-gray-900 outline-none
                        transition-all duration-200 placeholder:text-gray-400 focus:ring-2 focus:ring-offset-0
                        ${stateStyles}
                        ${disabledStyles}
                        ${className}
                    `}
                    {...props}
                />

                {(error || helperText) && (
                    <p className={`text-xs pl-0.5 ${error ? "text-red-500 font-medium" : "text-gray-500"}`}>
                        {error || helperText}
                    </p>
                )}
            </div>
        );
    }
);

Textarea.displayName = "Textarea";
