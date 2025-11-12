import { Spinner } from "@/components/ui/spinner";

interface BaseLoadingOverlayProps {
  isLoading: boolean;
}

export const BaseLoadingOverlay = ({ isLoading }: BaseLoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70">
      <Spinner size="lg" />
    </div>
  );
};
