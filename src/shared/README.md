# Shared Utilities

Reusable but non-UI pieces that sit above `core/` and below `features/`:

- `hooks/`: cross-feature React hooks (debounced effects, polling, etc.).
- `utils/`: pure helpers and formatters.
- `stores/`: medium-scope stores that are not global enough for `core/state` but shared by several features.
- `schemas/`: JSON schema definitions, zod validators, and type guards.

When in doubt, place logic here instead of duplicating it under multiple features.
