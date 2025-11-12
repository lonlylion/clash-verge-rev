import { X } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useTranslation } from "react-i18next";

import {
  getSnapshotNotices,
  hideNotice,
  subscribeNotices,
} from "@/services/noticeService";
import type { TranslationKey } from "@/types/generated/i18n-keys";

type Notice = ReturnType<typeof getSnapshotNotices>[number];

const NOTICE_ACCENTS: Record<Notice["type"], string> = {
  success: "var(--verge-color-success)",
  error: "var(--verge-color-destructive)",
  info: "var(--verge-color-info)",
};

const resolveTranslation = (
  notice: Notice,
  t: ReturnType<typeof useTranslation>["t"],
) => {
  if (!notice.i18n) return notice.message;

  const params = (notice.i18n.params ?? {}) as Record<string, unknown>;
  const { prefixKey, prefixParams, prefix, message, ...rest } = params;

  const normalizedPrefixParams = isPlainRecord(prefixParams)
    ? prefixParams
    : undefined;

  const resolvedPrefix =
    typeof prefixKey === "string"
      ? t(prefixKey as TranslationKey, {
          defaultValue: prefixKey,
          ...(normalizedPrefixParams ?? {}),
          ...rest,
        })
      : typeof prefix === "string"
        ? prefix
        : undefined;

  const finalParams: Record<string, unknown> = {
    ...rest,
  };
  if (resolvedPrefix !== undefined) {
    finalParams.prefix = resolvedPrefix;
  }
  if (typeof message === "string") {
    finalParams.message = message;
  }

  const defaultValue =
    resolvedPrefix && typeof message === "string"
      ? `${resolvedPrefix} ${message}`
      : typeof message === "string"
        ? message
        : undefined;

  return t(notice.i18n.key as TranslationKey, {
    defaultValue,
    ...finalParams,
  });
};

const isPlainRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const NotificationStack = () => {
  const { t } = useTranslation();
  const notices = useSyncExternalStore(subscribeNotices, getSnapshotNotices);

  if (notices.length === 0) return null;

  return (
    <div className="pointer-events-none fixed right-5 top-5 z-[1500] flex max-w-sm flex-col gap-2">
      {notices.map((notice) => {
        const accent = NOTICE_ACCENTS[notice.type];
        const role = notice.type === "error" ? "alert" : "status";
        const live = notice.type === "error" ? "assertive" : "polite";

        return (
          <div
            key={notice.id}
            role={role}
            aria-live={live}
            className="pointer-events-auto relative overflow-hidden rounded-lg border bg-[var(--verge-color-surface)] px-4 py-3 shadow-lg"
            style={{ borderColor: accent }}
          >
            <span
              aria-hidden="true"
              className="absolute inset-y-0 left-0 w-1"
              style={{ backgroundColor: accent }}
            />
            <div className="flex items-start justify-between gap-4">
              <p className="text-sm font-medium text-[var(--verge-color-foreground)]">
                {resolveTranslation(notice, t)}
              </p>
              <button
                type="button"
                aria-label={t("shared.actions.close")}
                className="rounded-md p-1 text-[var(--verge-color-muted-foreground)] transition-colors hover:bg-[var(--verge-color-surface-muted)]"
                onClick={() => hideNotice(notice.id)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
