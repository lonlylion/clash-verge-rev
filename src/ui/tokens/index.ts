import { useMemo } from "react";

import { defaultDarkTheme, defaultTheme } from "./defaults";

export type ThemeMode = "light" | "dark";

export interface VergeThemeSetting {
  primary_color?: string;
  secondary_color?: string;
  background_color?: string;
  primary_text?: string;
  secondary_text?: string;
  info_color?: string;
  error_color?: string;
  warning_color?: string;
  success_color?: string;
  font_family?: string;
  css_injection?: string;
  background_image?: string;
  background_blend_mode?: string;
  background_opacity?: number;
}

export interface ThemeTokens {
  primary: string;
  primaryForeground: string;
  primaryHover: string;
  secondary: string;
  secondaryForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  destructiveForeground: string;
  info: string;
  infoForeground: string;
  success: string;
  successForeground: string;
  warning: string;
  warningForeground: string;
  background: string;
  foreground: string;
  surface: string;
  surfaceMuted: string;
  card: string;
  cardForeground: string;
  border: string;
  input: string;
  muted: string;
  mutedForeground: string;
  ring: string;
  selection: string;
  scrollbarThumb: string;
  scrollbarHover: string;
  scrollbarTrack: string;
  divider: string;
  fontFamily: string;
  radius: string;
  primarySoft: string;
}

const SURFACE_COLOR: Record<ThemeMode, string> = {
  light: "#FFFFFF",
  dark: "#20212B",
};

const SURFACE_MUTED_COLOR: Record<ThemeMode, string> = {
  light: "#F5F5F7",
  dark: "#2B2D3A",
};

const FOREGROUND_COLOR: Record<ThemeMode, string> = {
  light: "#0F1115",
  dark: "#F4F4F5",
};

const SCROLLBAR_TRACK: Record<ThemeMode, string> = {
  light: "#f1f1f1",
  dark: "#2E303D",
};

const SCROLLBAR_THUMB: Record<ThemeMode, string> = {
  light: "#c1c1c1",
  dark: "#555555",
};

const SCROLLBAR_HOVER: Record<ThemeMode, string> = {
  light: "#a1a1a1",
  dark: "#666666",
};

const DIVIDER_COLOR: Record<ThemeMode, string> = {
  light: "rgba(0, 0, 0, 0.06)",
  dark: "rgba(255, 255, 255, 0.06)",
};

const SELECTION_COLOR: Record<ThemeMode, string> = {
  light: "#f5f5f5",
  dark: "#3E3E3E",
};

const WINDOW_BORDER_COLOR: Record<ThemeMode, string> = {
  light: "#cccccc",
  dark: "#1E1E1E",
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const normalizeHex = (hex: string) => {
  if (!hex) return null;
  let value = hex.trim();
  if (value.startsWith("#")) value = value.slice(1);
  if (![3, 6].includes(value.length)) {
    return null;
  }
  if (value.length === 3) {
    value = value
      .split("")
      .map((char) => char + char)
      .join("");
  }
  return value;
};

const hexToRgb = (hex: string): [number, number, number] | null => {
  const normalized = normalizeHex(hex);
  if (!normalized) return null;
  const intValue = Number.parseInt(normalized, 16);
  if (Number.isNaN(intValue)) return null;
  return [(intValue >> 16) & 255, (intValue >> 8) & 255, intValue & 255];
};

const rgbToHex = (r: number, g: number, b: number) =>
  `#${[r, g, b]
    .map((channel) => channel.toString(16).padStart(2, "0"))
    .join("")}`;

const mixHexColors = (hexA: string, hexB: string, weight: number) => {
  const rgbA = hexToRgb(hexA);
  const rgbB = hexToRgb(hexB);
  if (!rgbA || !rgbB) {
    return hexA;
  }

  const ratio = clamp(weight, 0, 1);
  const mixed = rgbA.map((channelA, index) =>
    Math.round(channelA * (1 - ratio) + rgbB[index] * ratio),
  ) as [number, number, number];

  return rgbToHex(mixed[0], mixed[1], mixed[2]);
};

const withAlpha = (hex: string, alpha: number) => {
  const rgb = hexToRgb(hex);
  if (!rgb) {
    return hex;
  }
  const safeAlpha = clamp(alpha, 0, 1);
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${safeAlpha})`;
};

export const buildThemeTokens = (
  mode: ThemeMode,
  themeSetting?: VergeThemeSetting,
): ThemeTokens => {
  const baseTheme = mode === "light" ? defaultTheme : defaultDarkTheme;
  const setting = themeSetting ?? {};

  const primary = setting.primary_color ?? baseTheme.primary_color;
  const secondary = setting.secondary_color ?? baseTheme.secondary_color;
  const info = setting.info_color ?? baseTheme.info_color;
  const warning = setting.warning_color ?? baseTheme.warning_color;
  const error = setting.error_color ?? baseTheme.error_color;
  const success = setting.success_color ?? baseTheme.success_color;
  const primaryText = setting.primary_text ?? baseTheme.primary_text;
  const secondaryText = setting.secondary_text ?? baseTheme.secondary_text;
  const background = setting.background_color ?? baseTheme.background_color;
  const fontFamily = setting.font_family
    ? `${setting.font_family}, ${baseTheme.font_family}`
    : baseTheme.font_family;

  return {
    primary,
    primaryForeground: mode === "light" ? "#ffffff" : "#0F1115",
    primaryHover:
      mode === "light"
        ? mixHexColors(primary, "#000000", 0.15)
        : mixHexColors(primary, "#ffffff", 0.2),
    primarySoft: withAlpha(primary, 0.1),
    secondary,
    secondaryForeground: mode === "light" ? "#1C1C1C" : "#F5F5F5",
    accent: secondary,
    accentForeground: mode === "light" ? "#1C1C1C" : "#F5F5F5",
    destructive: error,
    destructiveForeground: "#ffffff",
    info,
    infoForeground: "#ffffff",
    success,
    successForeground: "#ffffff",
    warning,
    warningForeground: "#0F1115",
    background,
    foreground: primaryText || FOREGROUND_COLOR[mode],
    surface: SURFACE_COLOR[mode],
    surfaceMuted: SURFACE_MUTED_COLOR[mode],
    card: SURFACE_COLOR[mode],
    cardForeground: primaryText || FOREGROUND_COLOR[mode],
    border: DIVIDER_COLOR[mode],
    input: DIVIDER_COLOR[mode],
    muted: SURFACE_MUTED_COLOR[mode],
    mutedForeground: secondaryText || FOREGROUND_COLOR[mode],
    ring: withAlpha(primary, mode === "light" ? 0.4 : 0.5),
    selection: SELECTION_COLOR[mode],
    scrollbarThumb: SCROLLBAR_THUMB[mode],
    scrollbarHover: SCROLLBAR_HOVER[mode],
    scrollbarTrack: SCROLLBAR_TRACK[mode],
    divider: DIVIDER_COLOR[mode],
    fontFamily,
    radius: "8px",
  };
};

export const useThemeTokens = (
  mode: ThemeMode,
  themeSetting?: VergeThemeSetting,
) => useMemo(() => buildThemeTokens(mode, themeSetting), [mode, themeSetting]);

interface ApplyThemeCssVarsOptions {
  tokens: ThemeTokens;
  mode: ThemeMode;
  cssInjection?: string;
  userBackgroundImage?: string;
  backgroundBlendMode?: string;
  backgroundOpacity?: number;
}

export const applyThemeCssVars = ({
  tokens,
  mode,
  cssInjection,
  userBackgroundImage,
  backgroundBlendMode,
  backgroundOpacity,
}: ApplyThemeCssVarsOptions) => {
  if (typeof document === "undefined") {
    return;
  }

  const root = document.documentElement;
  if (!root) {
    return;
  }

  const cssVars: Record<string, string> = {
    "--verge-color-background": tokens.background,
    "--verge-color-foreground": tokens.foreground,
    "--verge-color-muted": tokens.muted,
    "--verge-color-muted-foreground": tokens.mutedForeground,
    "--verge-color-border": tokens.border,
    "--verge-color-input": tokens.input,
    "--verge-color-primary": tokens.primary,
    "--verge-color-primary-hover": tokens.primaryHover,
    "--verge-color-primary-foreground": tokens.primaryForeground,
    "--verge-color-secondary": tokens.secondary,
    "--verge-color-secondary-foreground": tokens.secondaryForeground,
    "--verge-color-accent": tokens.accent,
    "--verge-color-accent-foreground": tokens.accentForeground,
    "--verge-color-destructive": tokens.destructive,
    "--verge-color-destructive-foreground": tokens.destructiveForeground,
    "--verge-color-success": tokens.success,
    "--verge-color-warning": tokens.warning,
    "--verge-color-info": tokens.info,
    "--verge-color-ring": tokens.ring,
    "--verge-color-card": tokens.card,
    "--verge-color-card-foreground": tokens.cardForeground,
    "--verge-color-surface": tokens.surface,
    "--verge-color-surface-muted": tokens.surfaceMuted,
    "--verge-font-sans": tokens.fontFamily,
    "--verge-radius": tokens.radius,
    "--primary-main": tokens.primary,
    "--text-primary": tokens.foreground,
    "--text-secondary": tokens.mutedForeground,
    "--selection-color": tokens.selection,
    "--scroller-color": tokens.scrollbarThumb,
    "--background-color": tokens.background,
    "--background-color-alpha": tokens.primarySoft,
    "--window-border-color": WINDOW_BORDER_COLOR[mode],
    "--scrollbar-bg": tokens.scrollbarTrack,
    "--scrollbar-thumb": tokens.scrollbarThumb,
    "--divider-color": tokens.divider,
  };

  Object.entries(cssVars).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });

  root.style.setProperty(
    "--user-background-image",
    userBackgroundImage ? `url('${userBackgroundImage}')` : "none",
  );
  root.style.setProperty(
    "--background-blend-mode",
    backgroundBlendMode || "normal",
  );
  root.style.setProperty(
    "--background-opacity",
    backgroundOpacity !== undefined ? String(backgroundOpacity) : "1",
  );

  const globalStyles = `
    ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
      background-color: var(--scrollbar-bg);
    }
    ::-webkit-scrollbar-thumb {
      background-color: var(--scrollbar-thumb);
      border-radius: 4px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${tokens.scrollbarHover};
    }

    body {
      background-color: var(--background-color);
      font-family: var(--verge-font-sans);
      ${
        userBackgroundImage
          ? `
        background-image: var(--user-background-image);
        background-size: cover;
        background-position: center;
        background-attachment: fixed;
        background-blend-mode: var(--background-blend-mode);
        opacity: var(--background-opacity);
      `
          : ""
      }
    }

    .MuiPaper-root {
      border-color: var(--window-border-color) !important;
    }

    .MuiDialog-paper {
      background-color: ${mode === "light" ? "#ffffff" : "#2E303D"} !important;
    }

    * {
      outline: none !important;
      box-shadow: none !important;
    }
  `;

  const styleId = "verge-theme";
  let styleElement = document.querySelector<HTMLStyleElement>(
    `style#${styleId}`,
  );
  if (!styleElement) {
    styleElement = document.createElement("style");
    styleElement.id = styleId;
    document.head.appendChild(styleElement);
  }

  styleElement.innerHTML = `${cssInjection || ""}${globalStyles}`;
};

export { defaultTheme, defaultDarkTheme } from "./defaults";
