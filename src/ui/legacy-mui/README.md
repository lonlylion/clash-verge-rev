# Legacy MUI Zone

Place components that still depend on `@mui/*` here. Feature code should import wrappers from this folder instead of touching MUI directly. This keeps the migration surface constrained and makes it obvious which pieces still require the old design system.

Current wrappers:

- `EnhancedCard`: legacy dashboard card shell used by Home widgets.
- `ScrollTopButton`: floating action button built on MUI `Fade`/`IconButton`.

As more views get rewritten with UnoCSS/shadcn primitives, migrate them out of this folder and delete the wrapper.
