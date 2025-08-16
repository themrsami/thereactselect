import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export const selectVariants = cva(
  "relative w-full cursor-pointer rounded-md border bg-input text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "border-border bg-background",
        outline: "border-border bg-transparent",
        ghost: "border-transparent bg-transparent hover:bg-accent hover:text-accent-foreground",
        filled: "border-transparent bg-muted",
      },
      size: {
        default: "h-10 px-3 py-2",
        sm: "h-8 px-2 py-1 text-xs",
        lg: "h-12 px-4 py-3",
        xl: "h-14 px-5 py-4 text-lg",
      },
      state: {
        default: "",
        error: "border-destructive focus:ring-destructive",
        success: "border-green-500 focus:ring-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
);

export const optionVariants = cva(
  "relative cursor-pointer select-none py-2 px-3 text-sm outline-none transition-colors",
  {
    variants: {
      variant: {
        default: "hover:bg-accent data-[highlighted]:bg-accent",
        subtle: "hover:bg-muted data-[highlighted]:bg-muted",
      },
      state: {
        default: "",
        selected: "bg-primary text-primary-foreground data-[highlighted]:bg-primary/90",
        disabled: "opacity-50 cursor-not-allowed",
      },
    },
    defaultVariants: {
      variant: "default",
      state: "default",
    },
  }
);

export type SelectVariants = VariantProps<typeof selectVariants>;
export type OptionVariants = VariantProps<typeof optionVariants>;
