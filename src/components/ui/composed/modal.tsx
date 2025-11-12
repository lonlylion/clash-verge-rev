import { type CSSProperties, ReactNode, useMemo } from "react";

import { cn } from "@/lib/utils";

import {
  Button,
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../primitives";

type ResponsiveValue<T> =
  | T
  | {
      xs?: T;
      sm?: T;
      md?: T;
      lg?: T;
      xl?: T;
      default?: T;
    };

type ContentSx =
  | Record<string, ResponsiveValue<string | number>>
  | Array<Record<string, ResponsiveValue<string | number>>>;

const resolveResponsiveValue = (value: ResponsiveValue<string | number>) => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return (
      value.sm ?? value.md ?? value.lg ?? value.xl ?? value.xs ?? value.default
    );
  }
  return value;
};

const resolveContentSx = (sx?: ContentSx): CSSProperties | undefined => {
  if (!sx) return undefined;

  const entries = Array.isArray(sx) ? sx : [sx];
  const style: CSSProperties = {};

  entries.forEach((entry) => {
    Object.entries(entry || {}).forEach(([key, value]) => {
      const resolved = resolveResponsiveValue(
        value as ResponsiveValue<string | number>,
      );
      if (resolved !== undefined) {
        (style as any)[key] = resolved;
      }
    });
  });

  return style;
};

interface Props {
  title: ReactNode;
  open: boolean;
  okBtn?: ReactNode;
  cancelBtn?: ReactNode;
  disableOk?: boolean;
  disableCancel?: boolean;
  disableFooter?: boolean;
  contentSx?: ContentSx;
  contentClassName?: string;
  contentStyle?: React.CSSProperties;
  children?: ReactNode;
  loading?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
}

export interface DialogRef {
  open: () => void;
  close: () => void;
}

export const Modal: React.FC<Props> = ({
  open,
  title,
  children,
  okBtn,
  cancelBtn,
  contentSx,
  contentStyle,
  contentClassName,
  disableCancel,
  disableOk,
  disableFooter,
  loading,
  onOk,
  onCancel,
  onClose,
}) => {
  const mergedStyle = useMemo(() => {
    const sxStyle = resolveContentSx(contentSx);
    return { ...sxStyle, ...contentStyle };
  }, [contentSx, contentStyle]);

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      onClose?.();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className={cn(
          "max-h-[85vh] overflow-y-auto bg-[var(--verge-color-surface)] text-[var(--verge-color-foreground)]",
          contentClassName,
        )}
        style={mergedStyle}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">{children}</div>

        {!disableFooter && (
          <DialogFooter className="pt-2">
            {!disableCancel && (
              <Button
                variant="outline"
                onClick={onCancel}
                type="button"
                className="min-w-[96px]"
              >
                {cancelBtn ?? "Cancel"}
              </Button>
            )}
            {!disableOk && (
              <Button
                type="button"
                onClick={onOk}
                isLoading={loading}
                className="min-w-[96px]"
              >
                {okBtn ?? "Confirm"}
              </Button>
            )}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
