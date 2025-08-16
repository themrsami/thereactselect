"use client";

import { useState, useEffect } from "react";
import { cn } from "../../lib/utils";

interface StyledInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  variant?: "default" | "outline" | "ghost" | "filled";
  size?: "sm" | "default" | "lg" | "xl";
  debounceMs?: number;
}

export function StyledInput({ 
  value, 
  onChange, 
  variant = "default", 
  size = "sm",
  debounceMs = 500,
  className,
  ...props 
}: StyledInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (localValue !== value) {
        onChange(localValue);
      }
    }, debounceMs);

    return () => clearTimeout(handler);
  }, [localValue, onChange, value, debounceMs]);

  const sizeClasses = {
    sm: "h-8 px-2 py-1 text-xs",
    default: "h-10 px-3 py-2",
    lg: "h-12 px-4 py-3",
    xl: "h-14 px-5 py-4 text-lg",
  };

  const variantClasses = {
    default: "border-border bg-background",
    outline: "border-border bg-transparent",
    ghost: "border-transparent bg-transparent hover:bg-accent",
    filled: "border-transparent bg-muted",
  };

  return (
    <input
      {...props}
      value={localValue}
      onChange={(e) => setLocalValue(e.target.value)}
      className={cn(
        "w-full rounded-md border transition-colors",
        "focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "placeholder:text-muted-foreground",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    />
  );
}
