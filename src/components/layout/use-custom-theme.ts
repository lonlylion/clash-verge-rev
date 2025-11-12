import { createTheme, Theme as MuiTheme, Shadows } from "@mui/material";
import {
  arSD as arXDataGrid,
  enUS as enXDataGrid,
  faIR as faXDataGrid,
  ruRU as ruXDataGrid,
  zhCN as zhXDataGrid,
} from "@mui/x-data-grid/locales";
import {
  getCurrentWebviewWindow,
  WebviewWindow,
} from "@tauri-apps/api/webviewWindow";
import { Theme as TauriOsTheme } from "@tauri-apps/api/window";
import { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useVerge } from "@/hooks/use-verge";
import { defaultDarkTheme, defaultTheme } from "@/pages/_theme";
import { useSetThemeMode, useThemeMode } from "@/services/states";
import { applyThemeCssVars, useThemeTokens } from "@/theme/tokens";

const languagePackMap: Record<string, any> = {
  zh: { ...zhXDataGrid },
  fa: { ...faXDataGrid },
  ru: { ...ruXDataGrid },
  ar: { ...arXDataGrid },
  en: { ...enXDataGrid },
};

const getLanguagePackMap = (key: string) =>
  languagePackMap[key] || languagePackMap.en;

/**
 * custom theme
 */
export const useCustomTheme = () => {
  const appWindow: WebviewWindow = useMemo(() => getCurrentWebviewWindow(), []);
  const { verge } = useVerge();
  const { i18n } = useTranslation();
  const { theme_mode, theme_setting } = verge ?? {};
  const mode = useThemeMode();
  const setMode = useSetThemeMode();
  const userBackgroundImage = theme_setting?.background_image || "";
  const tokens = useThemeTokens(mode, theme_setting);

  useEffect(() => {
    if (theme_mode === "light" || theme_mode === "dark") {
      setMode(theme_mode);
    }
  }, [theme_mode, setMode]);

  useEffect(() => {
    if (theme_mode !== "system") {
      return;
    }

    const preferBrowserMatchMedia =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      // Skip Tauri flow when running purely in browser.
      !("__TAURI__" in window);

    if (preferBrowserMatchMedia) {
      return;
    }

    let isMounted = true;

    const timerId = setTimeout(() => {
      if (!isMounted) return;
      appWindow
        .theme()
        .then((systemTheme) => {
          if (isMounted && systemTheme) {
            setMode(systemTheme);
          }
        })
        .catch((err) => {
          console.error("Failed to get initial system theme:", err);
        });
    }, 0);

    const unlistenPromise = appWindow.onThemeChanged(({ payload }) => {
      if (isMounted) {
        setMode(payload);
      }
    });

    return () => {
      isMounted = false;
      clearTimeout(timerId);
      unlistenPromise
        .then((unlistenFn) => {
          if (typeof unlistenFn === "function") {
            unlistenFn();
          }
        })
        .catch((err) => {
          console.error("Failed to unlisten from theme changes:", err);
        });
    };
  }, [theme_mode, appWindow, setMode]);

  useEffect(() => {
    if (theme_mode !== "system") {
      return;
    }

    if (
      typeof window === "undefined" ||
      typeof window.matchMedia !== "function"
    ) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncMode = (isDark: boolean) => setMode(isDark ? "dark" : "light");
    const handleChange = (event: MediaQueryListEvent) =>
      syncMode(event.matches);

    syncMode(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }

    type MediaQueryListLegacy = MediaQueryList & {
      addListener?: (
        listener: (this: MediaQueryList, event: MediaQueryListEvent) => void,
      ) => void;
      removeListener?: (
        listener: (this: MediaQueryList, event: MediaQueryListEvent) => void,
      ) => void;
    };

    const legacyQuery = mediaQuery as MediaQueryListLegacy;
    legacyQuery.addListener?.(handleChange);
    return () => legacyQuery.removeListener?.(handleChange);
  }, [theme_mode, setMode]);

  useEffect(() => {
    if (theme_mode === undefined) {
      return;
    }

    if (theme_mode === "system") {
      appWindow.setTheme(null).catch((err) => {
        console.error(
          "Failed to set window theme to follow system (setTheme(null)):",
          err,
        );
      });
    } else if (mode) {
      appWindow.setTheme(mode as TauriOsTheme).catch((err) => {
        console.error(`Failed to set window theme to ${mode}:`, err);
      });
    }
  }, [mode, appWindow, theme_mode]);

  const theme = useMemo(() => {
    const setting = theme_setting || {};
    const dt = mode === "light" ? defaultTheme : defaultDarkTheme;
    let muiTheme: MuiTheme;

    try {
      muiTheme = createTheme(
        {
          breakpoints: {
            values: { xs: 0, sm: 650, md: 900, lg: 1200, xl: 1536 },
          },
          palette: {
            mode,
            primary: { main: setting.primary_color || dt.primary_color },
            secondary: { main: setting.secondary_color || dt.secondary_color },
            info: { main: setting.info_color || dt.info_color },
            error: { main: setting.error_color || dt.error_color },
            warning: { main: setting.warning_color || dt.warning_color },
            success: { main: setting.success_color || dt.success_color },
            text: {
              primary: setting.primary_text || dt.primary_text,
              secondary: setting.secondary_text || dt.secondary_text,
            },
            background: {
              paper: dt.background_color,
              default: dt.background_color,
            },
          },
          shadows: Array(25).fill("none") as Shadows,
          typography: {
            fontFamily: setting.font_family
              ? `${setting.font_family}, ${dt.font_family}`
              : dt.font_family,
          },
        },
        getLanguagePackMap(i18n.language),
      );
    } catch (e) {
      console.error("Error creating MUI theme, falling back to defaults:", e);
      muiTheme = createTheme({
        breakpoints: {
          values: { xs: 0, sm: 650, md: 900, lg: 1200, xl: 1536 },
        },
        palette: {
          mode,
          primary: { main: dt.primary_color },
          secondary: { main: dt.secondary_color },
          info: { main: dt.info_color },
          error: { main: dt.error_color },
          warning: { main: dt.warning_color },
          success: { main: dt.success_color },
          text: { primary: dt.primary_text, secondary: dt.secondary_text },
          background: {
            paper: dt.background_color,
            default: dt.background_color,
          },
        },
        typography: { fontFamily: dt.font_family },
      });
    }

    return muiTheme;
  }, [mode, theme_setting, i18n.language]);

  useEffect(() => {
    applyThemeCssVars({
      tokens,
      mode,
      cssInjection: theme_setting?.css_injection,
      userBackgroundImage,
      backgroundBlendMode: theme_setting?.background_blend_mode,
      backgroundOpacity: theme_setting?.background_opacity,
    });
  }, [
    tokens,
    mode,
    theme_setting?.css_injection,
    theme_setting?.background_blend_mode,
    theme_setting?.background_opacity,
    userBackgroundImage,
  ]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const palettePrimary = theme?.palette.primary;
    if (!palettePrimary) {
      return;
    }

    const timer = window.setTimeout(() => {
      const gradientDom = document.querySelector("#Gradient2");
      if (gradientDom) {
        gradientDom.innerHTML = `
        <stop offset="0%" stop-color="${palettePrimary.main}" />
        <stop offset="80%" stop-color="${palettePrimary.dark}" />
        <stop offset="100%" stop-color="${palettePrimary.dark}" />
        `;
      }
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [theme]);

  return { theme };
};
