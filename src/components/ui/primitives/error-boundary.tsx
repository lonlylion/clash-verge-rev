import { ReactNode } from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  type FallbackProps,
} from "react-error-boundary";

interface ErrorBoundaryProps {
  children?: ReactNode;
}

const ErrorFallback = ({ error }: FallbackProps) => (
  <div
    role="alert"
    className="rounded-md border border-[var(--verge-color-border)] bg-[var(--verge-color-surface)] p-4 text-sm text-[var(--verge-color-destructive)]"
  >
    <p className="font-semibold">Something went wrong :(</p>
    <pre className="mt-2 whitespace-pre-wrap text-xs">{error.message}</pre>
  </div>
);

export const ErrorBoundary = ({ children }: ErrorBoundaryProps) => (
  <ReactErrorBoundary FallbackComponent={ErrorFallback}>
    {children}
  </ReactErrorBoundary>
);
