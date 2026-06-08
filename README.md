# cldr-engine-website

Website for [cldr-engine](https://phensley.github.io/cldr-engine/) built with
[Docusaurus 3](https://docusaurus.io/) (migrated from Docusaurus 1.14.7; see
[MIGRATION-PLAN.md](MIGRATION-PLAN.md)).

## Layout

| Path | Purpose |
|---|---|
| `docs/` | Current docs (also the "1.12.1" version). `src/docgen` generates the `api-*` files from `@phensley/cldr` types (`pnpm generate`). |
| `website/` | Docusaurus site (config, theme, remark plugins, scripts) |
| `website/versioned_docs/`, `website/versioned_sidebars/` | Materialized snapshots for the 12 archived versions (1.0.9 … 1.12.0). Regenerate with `pnpm materialize` (idempotent). |
| `website/scripts/` | `gencrossref` (prebuild), `materialize-versions`, `url-inventory`, `check-build` (URL parity), `content-check` (text parity vs live), `html-aliases` (v1-era `.html` URLs) |

## Development

```bash
cd website
pnpm install
pnpm start      # dev server
```

## Build & checks

```bash
cd website
pnpm build      # gencrossref -> docusaurus build -> .html aliases
pnpm check:build    # every inventoried URL exists in build/ (2,675 URLs)
pnpm check:content  # spot-check rendered text vs the live site
```

## Releasing a new doc version

```bash
cd website
pnpm docusaurus docs:version 1.13.0   # snapshots docs/ into versioned_docs/
```

The version dropdown and `/versions` page pick it up automatically. To retire a
version later, delete its `versioned_docs/version-X/` dir and drop the entry from
`website/versions.json`.

## Deploy

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml):
pnpm install → build → checks → publish `website/build/` to the `gh-pages` branch
(https://phensley.github.io/cldr-engine/).

## Notes

- Markdown is processed in `md` (CommonMark) format; raw HTML in docs is rendered
  as-is (`src/theme/MDXComponents.js` keeps theme code-block handling for fenced
  fences while passing raw `<pre>`/`<code>` through).
- Custom markdown syntax from the v1 site is preserved via remark plugins:
  `{%refs Type}` (cross-reference sections from `crossref.json`), `{> path}`
  includes, `*`-bullet list styling, and `.html`-link rewriting.
- The React "live API" playground (`src/liveapi/` + `webpack.config.js`) is
  dormant pending an optional rebuild (Phase 9 in MIGRATION-PLAN.md).
- Node 20+ required (`.nvmrc` pins 22); pnpm is the package manager.
