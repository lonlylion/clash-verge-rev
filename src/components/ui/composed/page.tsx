import React, { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { ErrorBoundary } from "../primitives";

interface PageProps {
  title?: ReactNode;
  header?: ReactNode;
  full?: boolean;
  contentStyle?: React.CSSProperties;
  children?: ReactNode;
}

export const Page = ({
  title,
  header,
  full,
  contentStyle,
  children,
}: PageProps) => (
  <ErrorBoundary>
    <div className="flex flex-col gap-3">
      <header
        data-tauri-drag-region="true"
        className="flex items-center justify-between px-3 py-2"
      >
        <h1 className="text-xl font-semibold" data-tauri-drag-region="true">
          {title}
        </h1>
        {header}
      </header>

      <div
        className={cn(
          "rounded-2xl border border-[var(--verge-color-border)] bg-[var(--verge-color-surface)]",
          full && "p-0",
          !full && "p-3",
        )}
      >
        <section className="rounded-xl bg-[var(--verge-color-background)]">
          <div className={cn("p-3", full && "p-0")} style={contentStyle}>
            {children}
          </div>
        </section>
      </div>
    </div>
  </ErrorBoundary>
);
