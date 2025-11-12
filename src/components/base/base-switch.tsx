import {
  type CSSProperties,
  type ChangeEvent,
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";

import { Switch as UiSwitch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

type UiSwitchProps = ComponentPropsWithoutRef<typeof UiSwitch>;

export interface BaseSwitchProps
  extends Omit<
    UiSwitchProps,
    "onCheckedChange" | "onChange" | "value" | "style"
  > {
  edge?: "start" | "end";
  value?: any;
  size?: string;
  color?: string;
  sx?: Record<string, any>;
  style?: CSSProperties;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  onCheckedChange?: (checked: boolean) => void;
}

const spacingMap: Record<string, keyof CSSProperties> = {
  ml: "marginLeft",
  mr: "marginRight",
  mt: "marginTop",
  mb: "marginBottom",
  mx: "marginLeft",
  my: "marginTop",
};

const SPACING_UNIT = 8;

const convertSx = (sx?: Record<string, any>): CSSProperties | undefined => {
  if (!sx) return undefined;
  const style: CSSProperties = {};
  Object.entries(sx).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (key === "mx") {
      const resolved =
        typeof value === "number"
          ? `${value * SPACING_UNIT}px`
          : (value as any);
      style.marginLeft = resolved;
      style.marginRight = resolved;
      return;
    }
    if (key === "my") {
      const resolved =
        typeof value === "number"
          ? `${value * SPACING_UNIT}px`
          : (value as any);
      style.marginTop = resolved;
      style.marginBottom = resolved;
      return;
    }
    if (key in spacingMap) {
      style[spacingMap[key]] =
        typeof value === "number"
          ? `${value * SPACING_UNIT}px`
          : (value as any);
      return;
    }
    style[key as keyof CSSProperties] = value as any;
  });
  return style;
};

export const Switch = forwardRef<ElementRef<typeof UiSwitch>, BaseSwitchProps>(
  (
    {
      edge,
      className,
      onChange,
      onCheckedChange,
      value,
      size: _size,
      color: _color,
      sx,
      style,
      ...props
    },
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
      <UiSwitch
        ref={ref}
        className={cn(
          edge === "end" ? "ml-auto" : edge === "start" ? "mr-auto" : "",
          className,
        )}
        value={
          typeof value === "string" || typeof value === "number"
            ? value
            : value !== undefined
              ? String(value)
              : undefined
        }
        style={{
          ...style,
          ...convertSx(sx),
        }}
        {...props}
        onCheckedChange={handleCheckedChange}
      />
    );
  },
);

Switch.displayName = "BaseSwitch";
