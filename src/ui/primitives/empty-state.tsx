import { Inbox } from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import type { TranslationKey } from "@/types/generated/i18n-keys";

interface EmptyStateProps {
  text?: ReactNode;
  textKey?: TranslationKey;
  extra?: ReactNode;
}

export const EmptyState = ({
  text,
  textKey = "shared.statuses.empty",
  extra,
}: EmptyStateProps) => {
  const { t } = useTranslation();
  const resolvedText = text ?? t(textKey);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-[var(--verge-color-muted-foreground)]">
      <Inbox className="h-10 w-10" />
      <p className="text-base font-medium text-[var(--verge-color-foreground)]">
        {resolvedText}
      </p>
      {extra}
    </div>
  );
};
