import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { Info } from "lucide-react";
import {
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
} from "react";

import { cn } from "@/lib/utils";

interface TooltipIconProps
  extends Omit<ComponentPropsWithoutRef<"button">, "title"> {
  title?: string;
  icon?: ElementType<{ className?: string }>;
  color?: string;
  sx?: Record<string, any>;
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

export const TooltipIcon = ({
  title,
  icon: Icon = Info,
  className,
  color,
  sx,
  ...props
}: TooltipIconProps) => (
  <TooltipPrimitive.Provider>
    <TooltipPrimitive.Root>
      <TooltipPrimitive.Trigger asChild>
        <button
          type="button"
          className={cn(
            "rounded-full p-1 text-[var(--verge-color-muted-foreground)] transition-colors hover:bg-[var(--verge-color-surface-muted)]",
            className,
          )}
          style={{
            ...getColorStyle(color),
            ...convertSx(sx),
            ...props.style,
          }}
          {...props}
        >
          <Icon className="h-4 w-4" />
        </button>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          sideOffset={6}
          className="rounded-md border border-[var(--verge-color-border)] bg-[var(--verge-color-surface)] px-2 py-1 text-xs text-[var(--verge-color-foreground)] shadow"
        >
          {title}
          <TooltipPrimitive.Arrow className="fill-[var(--verge-color-surface)]" />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  </TooltipPrimitive.Provider>
);

const getColorStyle = (color?: string): CSSProperties | undefined => {
  if (!color) return undefined;
  if (color === "inherit") return { color };
  if (color.startsWith("var(") || color.startsWith("#")) {
    return { color };
  }
  const map: Record<string, string> = {
    primary: "var(--verge-color-primary)",
    secondary: "var(--verge-color-secondary)",
    warning: "var(--verge-color-warning)",
    success: "var(--verge-color-success)",
    info: "var(--verge-color-info)",
  };
  return { color: map[color] ?? color };
};
