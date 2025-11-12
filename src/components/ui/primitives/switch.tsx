import * as SwitchPrimitive from "@radix-ui/react-switch";
import {
  forwardRef,
  type CSSProperties,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type ElementRef,
} from "react";

import { cn } from "@/lib/utils";

type PrimitiveProps = ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>;

export interface SwitchProps
  extends Omit<PrimitiveProps, "onCheckedChange" | "onChange" | "value"> {
  edge?: "start" | "end";
  value?: any;
  size?: string;
  color?: string;
  sx?: Record<string, any>;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
}

const SPACING_UNIT = 8;

const convertSx = (sx?: Record<string, any>): CSSProperties | undefined => {
  if (!sx) return undefined;
  const style: CSSProperties = {};
  Object.entries(sx).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    const spacingValue =
      typeof value === "number" ? `${value * SPACING_UNIT}px` : (value as any);
    switch (key) {
      case "ml":
        style.marginLeft = spacingValue;
        break;
      case "mr":
        style.marginRight = spacingValue;
        break;
      case "mt":
        style.marginTop = spacingValue;
        break;
      case "mb":
        style.marginBottom = spacingValue;
        break;
      case "mx":
        style.marginLeft = spacingValue;
        style.marginRight = spacingValue;
        break;
      case "my":
        style.marginTop = spacingValue;
        style.marginBottom = spacingValue;
        break;
      default:
        style[key as keyof CSSProperties] = value as any;
    }
  });
  return style;
};

export const Switch = forwardRef<
  ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(
  (
    { edge, className, onChange, onCheckedChange, value, sx, style, ...props },
    ref,
  ) => {
    const handleCheckedChange = (checked: boolean) => {
      if (onChange) {
        const syntheticEvent = {
          target: { checked },
          currentTarget: { checked },
        } as ChangeEvent<HTMLInputElement>;
        onChange(syntheticEvent, checked);
      }
      onCheckedChange?.(checked);
    };

    return (
      <SwitchPrimitive.Root
        ref={ref}
        className={cn(
          "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border border-transparent bg-[var(--verge-color-muted)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--verge-color-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--verge-color-background)] disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[var(--verge-color-primary)]",
          edge === "end" ? "ml-auto" : edge === "start" ? "mr-auto" : "",
          className,
        )}
        style={{
          ...style,
          ...convertSx(sx),
        }}
        {...props}
        onCheckedChange={handleCheckedChange}
        value={
          typeof value === "string" || typeof value === "number"
            ? value
            : value !== undefined
              ? String(value)
              : undefined
        }
      >
        <SwitchPrimitive.Thumb className="pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-1" />
      </SwitchPrimitive.Root>
    );
  },
);

Switch.displayName = "Switch";
