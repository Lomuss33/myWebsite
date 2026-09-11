# Maintainer Guide

Verified: 2026-09-11 against source/configuration. Existing filename retained for link compatibility.

Start with the [README](README.md), [user guide](USER_GUIDE.md), or [documentation index](docs/README.md).

## Where to work

| Task | Owner / guidance |
|---|---|
| Content, profile, languages | `public/data/`; [maintenance workflows](docs/guides/maintenance.md) |
| Article rendering | `src/components/articles/`; [registry](src/components/sections/SectionBody.jsx) |
| State and application behavior | `src/providers/` and hooks; [architecture](docs/architecture/overview.md) |
| Sizing and navigation | [Responsive layout](docs/architecture/responsive-layout.md) |
| Home behavior | [Home implementation](docs/architecture/home.md) |
| Generated CV/images | [Generated files](docs/guides/maintenance.md#generated-files) |

## Working sequence

1. Read the relevant current document and owning source; preserve unrelated working-tree changes.
2. Change the smallest correct layer, avoiding competing overrides.
3. Regenerate outputs when their sources change.
4. Run [targeted checks](docs/guides/validation.md); report actual coverage and limitations.
5. Update current guidance when behavior changes; record incomplete work under [active work](docs/work/README.md).

Home is `#about`, sourced from `home.json`. The registry also changes Home display order. Historical plans are not specifications. Generated outputs are not authoring sources. Pushes to `main` trigger deployment; see [deployment](docs/guides/validation.md#deployment).

For a fresh checkout, inspect `package.json`, the architecture map, target section JSON, and renderer. AI contributors start at [AGENTS.md](AGENTS.md).
