import { cn } from "@/lib/utils";

interface LoaderDotsProps {
  className?: string;
}

export const LoaderDots = ({ className }: LoaderDotsProps) => (
  <div className={cn("flex items-center gap-1", className)}>
    {[0, 1, 2].map((index) => (
      <span
        key={index}
        className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--verge-color-muted-foreground)]"
        style={{ animationDelay: `${index * 120}ms` }}
      />
    ))}
  </div>
);
