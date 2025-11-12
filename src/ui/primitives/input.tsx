import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-[var(--verge-color-border)] bg-[var(--verge-color-surface)] px-3 py-1 text-sm text-[var(--verge-color-foreground)] shadow-sm transition-colors placeholder:text-[var(--verge-color-muted-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--verge-color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--verge-color-background)] disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
