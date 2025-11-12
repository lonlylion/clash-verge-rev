import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--verge-color-ring)] focus-visible:ring-offset-[var(--verge-color-background)] disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--verge-color-primary)] text-[var(--verge-color-primary-foreground)] hover:bg-[var(--verge-color-primary-hover)]",
        secondary:
          "bg-[var(--verge-color-secondary)] text-[var(--verge-color-secondary-foreground)] hover:bg-[var(--verge-color-secondary)]/90",
        outline:
          "border border-[var(--verge-color-border)] bg-transparent text-[var(--verge-color-foreground)] hover:bg-[var(--verge-color-surface-muted)]",
        ghost:
          "bg-transparent text-[var(--verge-color-foreground)] hover:bg-[var(--verge-color-surface-muted)]",
        destructive:
          "bg-[var(--verge-color-destructive)] text-[var(--verge-color-destructive-foreground)] hover:bg-[var(--verge-color-destructive)]/90",
        link: "text-[var(--verge-color-primary)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-6 text-base",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 className="mr-2 h-4 w-4 animate-spin text-current" />
        )}
        {children}
      </Comp>
    );
  },
);

Button.displayName = "Button";
