# Widgets

Large, app-scoped view modules (traffic graphs, window controls, notifications, etc.) live here. They may contain UI and logic, but they should stay presentation-focused so multiple features can reuse them without owning the business rules.

Current modules:

- `traffic/`: traffic-specific error boundaries and HOCs (e.g. `TrafficErrorBoundary`, `withTrafficErrorBoundary`).
- `window/`: window chrome integrations such as `WindowControls`.

Always import them through the `@widgets` alias (`@widgets/traffic`, `@widgets/window`, or the root barrel) to make future refactors (or extraction into packages) straightforward.
