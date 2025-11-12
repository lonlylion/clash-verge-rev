import { X } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";

import {
  getSnapshotNotices,
  hideNotice,
  subscribeNotices,
} from "@/services/noticeService";
import type { TranslationKey } from "@/types/generated/i18n-keys";

export const NotificationStack = () => {
  const { t } = useTranslation();
  const notices = useSyncExternalStore(subscribeNotices, getSnapshotNotices);

  const resolveMessage = (notice: (typeof notices)[number]) => {
    if (!notice.i18n) return notice.message;
    const params = (notice.i18n.params ?? {}) as Record<string, unknown>;
    const { prefixKey, prefixParams, prefix, message, ...rest } = params;

    const resolvedPrefix =
      typeof prefixKey === "string"
        ? t(prefixKey as TranslationKey, {
            defaultValue: prefixKey,
            ...(prefixParams as Record<string, unknown>),
            ...rest,
          })
        : typeof prefix === "string"
          ? prefix
          : undefined;

    const defaultValue =
      resolvedPrefix && typeof message === "string"
        ? `${resolvedPrefix} ${message}`
        : typeof message === "string"
          ? message
          : undefined;

    return t(notice.i18n.key as TranslationKey, {
      defaultValue,
      ...rest,
      prefix: resolvedPrefix,
    });
  };

  if (notices.length === 0) return null;

  return (
    <div className="pointer-events-none fixed right-5 top-5 z-[1500] flex max-w-sm flex-col gap-2">
      {notices.map((notice) => (
        <div
          key={notice.id}
          className="pointer-events-auto rounded-lg border border-[var(--verge-color-border)] bg-[var(--verge-color-surface)] p-3 shadow-lg"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[var(--verge-color-foreground)]">
                {resolveMessage(notice)}
              </p>
            </div>
            <button
              type="button"
              className="rounded-md p-1 text-[var(--verge-color-muted-foreground)] hover:bg-[var(--verge-color-surface-muted)]"
              onClick={() => hideNotice(notice.id)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
