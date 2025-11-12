import { defineConfig } from "unocss";

import {
  vergeUnoPresets,
  vergeUnoTransformers,
} from "./src/ui/foundations/uno-presets";
import {
  vergeUnoSafelist,
  vergeUnoShortcuts,
  vergeUnoTheme,
} from "./src/ui/foundations/uno-theme";

export default defineConfig({
  shortcuts: vergeUnoShortcuts,
  safelist: vergeUnoSafelist,
  theme: vergeUnoTheme,
  presets: vergeUnoPresets,
  transformers: vergeUnoTransformers,
});
