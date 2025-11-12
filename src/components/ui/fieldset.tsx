import { HTMLAttributes } from "react";

import { cn } from "@/lib/utils";

interface FieldsetProps extends HTMLAttributes<HTMLFieldSetElement> {
  label: string;
  padding?: string;
  width?: string;
}

export const Fieldset = ({
  label,
  className,
  children,
  padding = "1rem",
  width,
  ...props
}: FieldsetProps) => (
  <fieldset
    className={cn(
      "relative rounded-md border border-dashed border-[var(--verge-color-border)]",
      className,
    )}
    style={{ padding, width, ...props.style }}
    {...props}
  >
    <legend className="px-2 text-sm font-medium text-[var(--verge-color-muted-foreground)]">
      {label}
    </legend>
    {children}
  </fieldset>
);
