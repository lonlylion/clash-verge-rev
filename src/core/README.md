# Core Layer

Cross-cutting infrastructure that is not tied to any feature or UI lives here:

- `api/`: HTTP/IPC clients and query helpers.
- `config/`: runtime configuration loaders, schema validators, and app constants.
- `i18n/`: translation bootstrap code (namespaces, detectors, resource loaders).
- `state/`: global stores (zustand/jotai/swr caches) and strongly typed hooks.
- `tauri/`: wrappers around `@tauri-apps/*` APIs so UI code interacts through React hooks/services only.

The goal is to keep React components free of direct platform calls or command orchestration.
