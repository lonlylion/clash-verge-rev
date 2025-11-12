import transformerDirectives from "@unocss/transformer-directives";
import transformerVariantGroup from "@unocss/transformer-variant-group";
import {
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind3,
} from "unocss";

export const vergeUnoPresets = [
  presetWind3(),
  presetAttributify(),
  presetTypography(),
  presetIcons({
    scale: 1.1,
    warn: true,
  }),
];

export const vergeUnoTransformers = [
  transformerDirectives(),
  transformerVariantGroup(),
];
