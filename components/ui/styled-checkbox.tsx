"use client";

import { Check } from "lucide-react";
import { cn } from "../../lib/utils";

interface StyledCheckboxProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
  className?: string;
}

export function StyledCheckbox({ 
  checked, 
  onChange, 
  label, 
  disabled = false,
  className 
}: StyledCheckboxProps) {
  return (
    <label className={cn(
      "flex items-center space-x-2 cursor-pointer",
      disabled && "cursor-not-allowed opacity-50",
      className
    )}>
      <div className="relative">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div className={cn(
          "w-4 h-4 rounded border-2 transition-colors flex items-center justify-center",
          checked 
            ? "bg-foreground border-foreground text-background" 
            : "bg-background border-border hover:border-foreground/50",
          disabled && "opacity-50"
        )}>
          {checked && <Check className="h-3 w-3" />}
        </div>
      </div>
      <span className="text-sm select-none">{label}</span>
    </label>
  );
}
