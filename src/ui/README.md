# UI System

This folder hosts the design-system-first stack that will replace the existing MUI widgets. It is split into:

- `tokens/`: source of truth for Verge design tokens plus adapters (CSS vars, Uno theme, Radix contexts).
- `foundations/`: UnoCSS config, resets, and any global styles needed by tokens.
- `primitives/`: shadcn/Radix powered atoms (Button, Input, Dialog...).
- `components/`: design-system level molecules/organisms (Page, Card, Form layouts) composed from primitives.
- `patterns/`: app-wide UI patterns that stitch multiple components (search shells, data tables, etc.).
- `providers/`: Theme/Toast/Dialog providers that wire primitives into the React tree.
- `legacy-mui/`: quarantined MUI-based pieces that cannot yet be rewritten; they should gradually shrink to zero.

Import everything from this stack via the `@ui` alias (e.g. `import { Page } from "@ui";`). Avoid using old `@/components/ui` paths so we can delete the legacy folder entirely once all features migrate.

Anything exported from here should be framework-agnostic (no feature-specific logic) so features can migrate progressively.
