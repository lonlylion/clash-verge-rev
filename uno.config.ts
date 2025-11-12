import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind3,
} from "unocss";

export default defineConfig({
  shortcuts: [
    [
      "ui-btn",
      "relative inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[var(--verge-color-primary)] text-[var(--verge-color-primary-foreground)] focus-visible:ring-[var(--verge-color-ring)] focus-visible:ring-offset-[var(--verge-color-background)] hover:bg-[var(--verge-color-primary-hover)]",
    ],
    [
      "ui-btn-outline",
      "ui-btn border border-[var(--verge-color-border)] bg-transparent text-[var(--verge-color-foreground)] hover:bg-[var(--verge-color-surface-muted)]",
    ],
    [
      "ui-card",
      "rounded-lg border border-[var(--verge-color-border)] bg-[var(--verge-color-surface)] text-[var(--verge-color-foreground)] shadow-sm",
    ],
    ["ui-muted", "text-[var(--verge-color-muted-foreground)]"],
  ],
  safelist: [
    "text-left",
    "text-center",
    "text-right",
    "items-center",
    "justify-between",
    "gap-2",
    "gap-3",
    "rounded-md",
    "rounded-lg",
    "border",
    "inline-flex",
    "flex",
  ],
  theme: {
    colors: {
      background: "var(--verge-color-background)",
      foreground: "var(--verge-color-foreground)",
      muted: "var(--verge-color-muted)",
      "muted-foreground": "var(--verge-color-muted-foreground)",
      border: "var(--verge-color-border)",
      input: "var(--verge-color-input)",
      primary: "var(--verge-color-primary)",
      "primary-foreground": "var(--verge-color-primary-foreground)",
      secondary: "var(--verge-color-secondary)",
      "secondary-foreground": "var(--verge-color-secondary-foreground)",
      accented: "var(--verge-color-accent)",
      "accent-foreground": "var(--verge-color-accent-foreground)",
      destructive: "var(--verge-color-destructive)",
      "destructive-foreground": "var(--verge-color-destructive-foreground)",
      success: "var(--verge-color-success)",
      warning: "var(--verge-color-warning)",
      info: "var(--verge-color-info)",
      ring: "var(--verge-color-ring)",
      card: "var(--verge-color-card)",
      "card-foreground": "var(--verge-color-card-foreground)",
    },
    fontFamily: {
      sans: "var(--verge-font-sans)",
    },
    borderRadius: {
      none: "0px",
      sm: "calc(var(--verge-radius) - 4px)",
      md: "var(--verge-radius)",
      lg: "calc(var(--verge-radius) + 4px)",
      xl: "calc(var(--verge-radius) + 8px)",
      full: "9999px",
    },
  },
  presets: [
    presetWind3(),
    presetAttributify(),
    presetTypography(),
    presetIcons({
      scale: 1.1,
      warn: true,
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
