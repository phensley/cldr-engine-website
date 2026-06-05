# Migration Plan: cldr-engine Website → Docusaurus 3

**Status:** Draft for review · **Date:** 2025 · **Author:** (assist) Patrick Hensley
**Target:** Replace Docusaurus 1.14.7 (EOL) with a maintained framework, preserving every page, feature, and customization.

---

## 1. Executive Summary

The site is built on **Docusaurus 1.14.7** (2019, unmaintained since ~2020; requires a
webpack 4 / React 16-era toolchain). The content ecosystem around it — generated API
docs, custom markdown syntax, and a separate webpack-built "live API" app — is healthy
and must carry over. All 12 archived doc versions are retained (revised decision D5):
v1's delta/inheritance model is materialized into full v3 snapshots by porting
Docusaurus v1's own fallback algorithm, so every version shows the content that
actually belonged to that version (verified per-version, D8).

**Recommendation: migrate to Docusaurus 3 (v3.10.x, actively maintained)** — not a
different static-site generator. Rationale:

- The v1 → v3 path is a documented, well-trodden migration, and the site's architecture
  (docs + versioning + React pages + static assets) maps 1:1 onto v3 concepts.
- **Versioning is first-class and kept in full**: all 12 archived doc versions
  (1.0.9 → 1.12.0) stay live with zero URL breakage, and v3's one-command
  `docs:version` keeps future per-release snapshots easy (other frameworks treat
  versioning as an add-on).
- **Raw-HTML-heavy markdown is preserved** via the `markdown.format: 'md'` (CommonMark)
  option: the docs contain 500+ raw `<pre class="syntax">` blocks, a giant hand-pasted
  HTML table, an inline `<style>` block, and iframes — all of which pass through
  unchanged in CommonMark mode without MDX breakage.
- The custom markdown syntax (`{%refs …}`, `{> …}`, `*`-list classes) ports cleanly to
  **remark/rehype plugins** — the same plugin architecture Docusaurus 3 uses natively.
- The site is already React; the custom pages and theme port trivially.
- GitHub Pages subpath deployment (`/cldr-engine/`) is directly supported.

Alternatives (VitePress, Astro/Starlight, MkDocs) were evaluated and rejected in §4,
chiefly on versioning and content-pipeline fit.

---

## 2. Current State Inventory

| Asset | Where | Size / Notes |
|---|---|---|
| Docs (current) | `docs/` | **102 files**, ~15.5k lines; generated + handwritten |
| Versioned docs | `website/versioned_docs/` | 11 **delta** dirs (1.0.9 → 1.12.0), 177 files, ~1.4 MB — **retained (D5-rev)**: materialized into 12 full per-version snapshots (~1,200 files) by the Phase-4 script |
| Versioned sidebars | `website/versioned_sidebars/` | 3 legacy files (1.0.9, 1.1.2, 1.2.10) — normalized (key/id prefix strip) + generated for the other 9 versions in Phase 4 |
| Versions list | `website/versions.json` | 13 entries, newest-first. Corrected assumption: v1 serves **all 12 archived versions 200 today** (1.4.1 included — resolved via the fallback chain); `/docs/1.12.1/*` 404s because versions[0] (1.12.1) is "current" with no versioned path. Replaced by v3 config |
| Custom pages | `website/pages/en/` | `index.js` (home, ported), `help.js`/`users.js` (**dropped — D4**, unreachable today), `versions.js` (replaced by v3 built-in) |
| Theme | `website/core/Footer.js` | Custom footer (sitemap, GitHub star button) |
| Custom CSS | `website/static/css/custom.css` | 134 lines; uses one Sass var (`$baseFont`); styles `.list`, `pre.syntax`, `pre.output` |
| Custom markdown plugins | `website/markdown/` | `refs.js`, `include.js`, `list.js` (+ `crossref.js` generator) |
| crossref data | `website/crossref.json` | 71 types, 191 reverse refs; regenerated before every build |
| Doc generator | `website/src/docgen/` | TS tool emitting `api-*.md` for currencies/ids/units/zones |
| Examples | `website/src/examples/` | TS examples used by docgen output |
| Live API app | `website/src/liveapi/` | React 18 + Redux + Redux-Saga, separate webpack build → `static/liveapi/` |
| Webpack | `website/webpack.config.js` | Second build emitting `static/liveapi/index.html` + JS |
| Static assets | `website/static/` | img, favicon, `js/sidenav.js`, `liveapi-css/min.css`, locale packs (copied in by build) |
| i18n | `website/i18n/en.json`, `languages.js` | English only (`en` enabled; all others disabled) |
| Checks | `website/scan404.js`, `scripts/check-sidebars.js` | Custom QA scripts |
| Config | `siteConfig.js`, `sidebars.json` | Two sidebar sections: `docs`, `reference` |
| Deploy | — | GitHub Pages via `docusaurus-publish` (v1-only); no CI present |
| Analytics | `siteConfig.js` | `gaTrackingId: UA-…` — **Universal Analytics is dead (sunset 2023)** |

### Traffic/URL facts (important for parity)

- Site lives at `https://phensley.github.io/cldr-engine/` (baseUrl `/cldr-engine/`).
- `cleanUrl: true` means **both** `/docs/api-bundle` and `/docs/api-bundle.html`
  currently return 200 (v1 emits both forms). Inbound `.html` links exist → must keep
  serving them after migration (see §7, Phase 6).
- Docs cross-link with `.html`-style relative links (`[Locale](api-locale.html)`),
  including anchors — several hundred occurrences.
- No blog, no Algolia (commented out), no search.

---

## 3. The Customization Contract (must be preserved)

These are the non-stock behaviors that make this site work. Every one has a direct
v3 mapping; none blocks the migration:

| # | Customization | Current implementation | v3 replacement |
|---|---|---|---|
| C1 | `{%refs TypeName [level]}` inline syntax renders a "References" section (bulleted list of every type/method linking to this one), from `crossref.json` | markdown-it inline rule (`markdown/refs.js`) | remark plugin (same output via mdast) — **used in 73 current docs** |
| C2 | `{> path}` include syntax: inlines `.md` (rendered) or `.ts` (as typescript fence) | markdown-it inline rule (`markdown/include.js`) | remark plugin (not currently used in committed docs, but keep for parity — docgen/examples rely on the capability) |
| C3 | `*`-bulleted lists render `<li class="list">` (styled in custom.css); `-`/`+` lists don't | Fork of markdown-it's list parser (`markdown/list.js`) tracking the bullet char | rehype plugin (post-parse walk: mark `<li>` under `*` lists with class `list`) — used in ~11 current docs |
| C4 | `crossref.json` generation: scan of all `api-*.md` for `[Type](api-x.html)` links → reverse index | `gencrossref.js` + `markdown/crossref.js` (regex-based, no framework deps) | **Unchanged** — prebuild node script |
| C5 | Doc generation: `yarn generate` writes `api-*.md` into `docs/` from `@phensley/cldr` types | `src/docgen/*.ts` (ts-node) | **Unchanged** — prebuild step; docs dir stays at repo root |
| C6 | Live API playground (`src/liveapi`): standalone React+Redux+Saga app, html-webpack-plugin build into `static/liveapi/` | `webpack.config.js` + `scripts/copy-packs.js` (locale packs → `static/packs/`) | **Deferred to optional Phase 9** (owner decision). Source + webpack config stay committed but are excluded from the initial build chain; v3 copies `static/` verbatim either way |
| C7 | Homepage splash (logo, tagline, Docs button) | `pages/en/index.js` w/ v1 `CompLibrary` | Rewrite `src/pages/index.js` with plain React; adopt v3 default template styling (owner decision: no look preservation) |
| C8 | Custom footer (sitemap columns, GitHub star button) | `core/Footer.js` | v3 `themeConfig.footer` config — clean default footer, GitHub link; no swizzle needed |
| C9 | Header nav: Docs, API, Demo, GitHub, Yarn, NPM | `headerLinks` in `src/data.js` | v3 `themeConfig.navbar.items` (doc links + external links) |
| C10 | Raw-HTML markdown (500+ `<pre class=...>`, giant hand-built `<table>`, inline `<style>`, iframes with code-sandbox) | markdown-it `html: true` (default in v1) | **`markdown.format: 'md'`** (CommonMark; raw HTML passthrough; no JSX parsing) — non-negotiable, see risk R1 |
| C11 | Code highlight theme "vs" | v1 highlight.js theme | **Default v3 Prism light theme** (owner decision: adopt new look; optional `vsLight` later if preferred for code) |
| C12 | Styling hooks: `.list`, `pre.syntax`, `pre.output`, rounding-table classes, fonts, colors | `static/css/custom.css` (Sass-var inside) | Port **content-level styles only** (`pre.syntax`, `pre.output`, `li.list`, `table.rounding .mode-*`, iframe sizing) to `src/css/custom.css`; theme chrome adopts v3 defaults + brand colors (#2c2c2e) + Source Sans Pro |
| C13 | Version dropdown + versions page | v1 built-in dropdown + custom `pages/en/versions.js` | v3 built-in versions page/dropdown; **12 archived versions + current** (D5-rev) via materialized snapshots + `versions` config; `docs:version` for future releases |
| C14 | Sidebar scroll-to-active, clean URLs, footer/header icons, favicon, og/twitter images | v1 built-ins + `static/js/sidenav.js` | v3 handles active-item scroll natively → **drop `sidenav.js`**; config equivalents for the rest |
| C15 | `.html` URL form still serving | v1 emits both clean + `.html` files | Post-build script emitting `.html` aliases (§6, Phase 6) |
| C16 | QA scripts | `scan404.js`, `scripts/check-sidebars.js` | Port to operate on v3 build (Phases 6) |

---

## 4. Framework Evaluation

Criteria: (1) multi-version docs, (2) raw-HTML-heavy markdown, (3) custom inline
markdown syntax, (4) React/self-contained sub-app coexist, (5) GitHub Pages subpath,
(6) long-term maintenance, (7) migration cost from v1.

| Criterion | **Docusaurus 3** (recommended) | VitePress 1.x | Astro + Starlight | MkDocs Material |
|---|---|---|---|---|
| Versioning (11 versions) | **Built-in**, config-driven, dropdown + versions page | No built-in; community plugins/patterns, manual nav wiring | Not built-in; per-version collections pattern, custom badge/dropdown work | Built-in via **mike** plugin (separate branch deploy) |
| Raw-HTML markdown | `markdown.format: 'md'` (CommonMark; experimental but fits us exactly) | ✔ markdown-it `html: true` — plugins (`include`/`refs`/`list`) could port nearly verbatim | ✔ plain `.md` passthrough | ✔ via `mdx`/html, mostly works |
| Custom inline syntax | remark plugins (first-class) | markdown-it plugins (near 1:1 reuse) | remark/rehype plugins | Python plugins; some HTML hacks |
| Framework language | React (site already React; liveapi React) | Vue (pages = Vue SFCs) | Astro/Islands; React islands OK | Python/Jinja |
| Pages/theme port | Small (React → React) | Medium (rewrite in Vue) | Medium | Large (rewrite in Jinja) |
| GH Pages subpath | ✔ `base` | ✔ `base` | ✔ `base` | ✔ via mike |
| Maintainership | Active (3.x, Node 18+), clear v1→v3 guide | Active (1.6.x) | Active | Active |
| Migration cost from v1 | **Lowest** — same product family, documented path | Medium (markdown wins, versioning loses) | Medium-High | High (toolchain change) |

**Verdict:** VitePress is the only serious challenger (markdown-it plugin reuse is
attractive), but it still loses on the decisive axes for this site: raw-HTML-heavy
markdown + custom inline syntax that ports cleanly to remark/rehype, React-native
pages (the site and its playground are React), and **future-ready versioning** (D5:
12 archived versions retained, one-command snapshots later). Docusaurus 3 remains the
lowest-cost, lowest-risk path.

---

## 5. Target Architecture

```
repo root/
├── docs/                        # current + only published docs (UNCHANGED location —
│                                #   docgen, refs, crossref all assume repo-root/docs)
├── website/
│   ├── docusaurus.config.js     # NEW — replaces siteConfig.js + languages.js
│   ├── sidebars.json            # unchanged (v3 compatible shape)
│   ├── src/
│   │   ├── pages/index.js       # port of pages/en/index.js (help/users dropped)
│   │   ├── css/custom.css       # content-level styles (pre.syntax, .list, …)
│   │   └── (versions page/dropdown: v3 built-in)
│   ├── remark/                  # remark-plugin-{refs,include,list-class,html-links}
│   ├── versioned_docs/          # materialized full snapshots (12 versions, Phase 4)
│   ├── versioned_sidebars/      # normalized + generated per-version sidebars
│   ├── docgen/ … src/liveapi/ … webpack.config.js   # kept (docgen = prebuild; liveapi → Phase 9)
│   ├── static/                  # UNCHANGED (img, css; liveapi output lands here in Phase 9)
├── scripts/                     # gencrossref.js, materialize-versions.js, html-aliases, scan404
└── .github/workflows/deploy.yml # NEW — replaces docusaurus-publish
```

Key config decisions (taken in `docusaurus.config.js`):

- `baseUrl: '/cldr-engine/'`, `trailingSlash` left default (clean URLs).
- Docs plugin: `path: path.resolve(__dirname, '../docs')` (keep repo-root `docs/`
  so docgen/crossref/scan404 need no re-pointing), id: `default`.
- `markdown.format: 'md'` (or `'detect'`) — CommonMark for all `.md` (C10).
- Versions (D5-rev): **12 archived versions + current**. Full snapshots materialized
  from v1 deltas (Phase 4); config keys `1.12.0` → `1.0.9` (incl. `1.4.1`),
  `lastVersion: 'current'`. `/docs/1.12.1/*` intentionally absent — matches v1, where
  versions[0] (1.12.1) is current with no versioned path.
- Theme: `colorMode: { defaultMode: 'light', disableSwitch: true }` (no dark mode
  in v1 site), navbar items per C9, footer per C8.
- Analytics: **none** (D1) — the UA tag is not carried over.

---

## 6. Phased Migration Plan

Work on the existing `migration` branch (currently empty). Keep the old site buildable
until the cutover commit. **Build the old site first** (with a pinned legacy Node via
`nvm`/`.nvmrc` + `engines`) to serve as the render/URL oracle for parity testing.

### Phase 0 — Baseline & environment (0.5 day)
- [ ] Install deps for the current site (pinned Node for v1; likely 14/16 for the old
      toolchain; verify `yarn && yarn build` reproduces the live site locally).
- [ ] Crawl the live site: full URL inventory (pages, docs, **all 12 archived
      versions incl. 1.4.1**, static assets, both `.html` and clean forms) — this
      becomes the parity checklist; versioned URLs join the 200 set (D5-rev);
      help/users + `/en/`-prefixed URLs are tagged for the expected-404 set (D4).
- [ ] Screenshot key pages (home, a doc, an API doc, the rounding-table doc, a
      404) as a reference record of the old site.
- [ ] Add `.nvmrc`/`engines` commitments in the new setup (Node 20/22 LTS for v3).

### Phase 1 — Scaffold Docusaurus 3 (0.5 day)
- [ ] Replace `website/package.json` deps with `@docusaurus/core@3.x`,
      `@docusaurus/preset-classic@3.x`, `react@18/19`, `typescript`, `ts-node`,
      `webpack@5` (kept for the Phase-9 playground), `js-yaml`, `concurrently`;
      remove `docusaurus@1.14.7` + the rest of the v1-only deps.
- [ ] Switch to **pnpm** (D6): remove `yarn.lock`, install with `pnpm`
      (`pnpm-lock.yaml`); convert `yarn`-based scripts; port or drop the
      `link-all`/`unlink-all` yarn-link helpers.
- [ ] Create `docusaurus.config.js` (site metadata, baseUrl, navbar, footer, GA,
      prism theme, markdown format, docs plugin path, versions).
- [ ] Port `sidebars.json` unchanged; wire `docs` and `reference` sidebar sections.
- [ ] **Exit:** `pnpm build` produces `build/` with home, docs, versions.

### Phase 2 — Theme & pages (0.5–1 day)

*Owner decision: adopt a clean, professional v3 template look (no v1 look preservation).*

- [ ] Navbar items from `src/data.js` (Docs, API, Demo, GitHub, Yarn, NPM) incl. i18n-free
      labels; keep the disabled Live API entry commented with the same TODO.
- [ ] Footer via `themeConfig.footer` (link columns + GitHub); homepage splash
      (logo, tagline, Docs button) ported to `src/pages/index.js` on the default
      template.
- [ ] Brand styling on the v3 theme: `--ifm-color-primary: #2c2c2e`, Source Sans Pro
      font stack, header/footer icons, favicon, og/twitter images.
- [ ] Port **content-level CSS only** (C12): `pre.syntax`, `pre.output`, `li.list`,
      `table.rounding` / `.mode-*` cell colors, iframe sizing — all content-critical
      hooks that would otherwise render unstyled in every API doc.
- [ ] **Exit:** home/docs render on a clean template with brand colors; all
      content-level hooks (syntax/output blocks, lists, rounding table) styled;
      key-page screenshots reviewed for sanity (no diff-vs-old gate).

### Phase 3 — Markdown pipeline (1.5–2 days) ← the critical path
- [ ] `remark-plugin-refs`: scan text nodes for `{%refs Type [level]}`; replace with
      generated mdast (heading + nested bullet lists + links) from
      `crossref.json`.
- [ ] `remark-plugin-include`: `{> path}` → inline mdast (`.md` rendered; `.ts` →
      ` ```typescript ` block).
- [ ] `rehype-plugin-list-class`: mark `<li class="list">` for `*` lists, preserving
      `-`/`+` behavior (C3). (Alternative: match on `ul` sibling structure — fallback
      if the bullet char isn't recoverable from the mdast `ordered`/`spread` props —
      decide in the spike.)
- [ ] `remark-plugin-html-links` (or unified `remark` transform): rewrite intra-site
      `.html` links (`api-foo.html`, `api-foo.html#anchor`) → clean URLs. Run across
      all current docs.
- [ ] **Spike first:** port one API doc + the rounding-table doc and diff rendered
      HTML against the v1 build of the same doc. Lock the diff to zero on the
      `<pre>`/table/refs regions.
- [ ] **Exit:** all 73 `{%refs` usages render identical "References" sections; all
      syntax/output blocks render byte-identical for a 10-doc sample; links resolve
      to 200s.

### Phase 4 — Versioned docs: materialize v1 snapshots (1–1.5 days)

*Owner decision D5-rev: retain all archived versions so URLs keep working.*

v1 model to replicate: `versioned_docs/version-X/` holds only docs that *differ*
(verified: all 14 docs shared by 1.0.9/1.1.2 differ); `versionFallback.js` resolves
each doc id for a requested version by walking `versions.json` (newest → oldest) from
that version and using the **first snapshot containing the id**, else the current
`docs/` file. It also requires `original_id` in every versioned file and throws
without it.

**Correctness contract (verified against repo data, D8):** resolving every doc id
per-version with the v1 walk gives 100% snapshot resolution for 11 of 13 versions.
The exceptions are *postdating* docs — first snapshotted after the version existed —
which v1 shows with **current** content under the old version's URL (misleading):
`1.1.2`: 1 doc; `1.0.9`: 5 docs (`api-dateformataltoptions`, `api-datewrapperformatoptions`,
`api-dayperiodalttype`, `api-eraalttype`, `doc-resource-patching`). These 6 are
**excluded** from their versions' materialized sets (per owner: each version shows
only content correct for that version); they are already absent from those versions'
sidebars and nothing links to them → their URLs stop existing (expected-404 set).

- [ ] Write `scripts/materialize-versions.js` — a faithful port of the v1
      resolution (~30 lines of logic): for each archived version V in [1.12.0,
      1.10.2, 1.10.1, 1.8.0, 1.7.3, 1.6.5, 1.5.1, 1.4.1, 1.3.3, 1.2.10, 1.1.2,
      1.0.9], for every doc id in the union of versioned files + current `docs/`,
      copy the resolved source into `versioned_docs/version-V/`.
- [ ] Normalize front matter: `id: version-V-<name>` → `<name>` (the dir name
      carries the version in v3); drop `original_id` and v1-only cruft.
- [ ] Sidebars: normalize the 3 legacy files (strip `version-X-` prefixes from
      sidebar keys `version-X-docs` → `docs`/`reference` and from item ids);
      generate the other 9 from current `sidebars.json` filtered to each version's
      materialized doc set (v1's inherited-sidebar behavior); drop unresolvable
      items (Phase-6 crawl confirms no internal 404s).
- [ ] Configure `docusaurus.config.js` `versions`: 12 keys + current; labels =
      version strings; built-in `/versions` page + dropdown render all of them.
- [ ] Facts locked by live checks: `/docs/1.4.1/*` 200 (fallback) — the "phantom"
      gets real content; `/docs/1.12.1/*` 404 in v1 — the current release has no
      versioned path, and v3 matches (current = `docs/`).
- [ ] Storage note: full snapshots ≈ 12 × ~100 files (~7–8 MB; much content is
      identical across versions — git handles it; pruning later stays trivial).
- [ ] **Exit:** every archived URL from the Phase-0 crawl returns 200 on the new
      build, except the 6 postdating URLs (D8, expected-404); a `docs:version`
      dry-run on a scratch clone succeeds.

### Phase 5 — Build pipeline integration (0.5–1 day)
- [ ] Prebuild chain in `package.json`:
      `prebuild` → `node gencrossref.js` → `docusaurus build`.
      **Live API and packs are excluded from the chain** (owner decision, Phase 9);
      keep `pnpm packs` / `pnpm build:liveapi` as optional scripts.
- [ ] `yarn generate` (docgen) unchanged; `gencrossref.js` unchanged; verify
      regeneration is idempotent w.r.t. committed `crossref.json`.
- [ ] Verify no current page references `/liveapi/` or `/packs/` assets before
      finalizing the deferred scope (checked: none in nav/docs — re-confirm post-port).
- [ ] Post-build step `scripts/html-aliases.js`: for each `build/docs/**/index.html`
      (current **and** versioned pages), emit sibling `.html` so inbound `.html`
      URLs keep 200 (C15).
- [ ] Port `scan404.js` to crawl the v3 build (or adopt `linkinator`/`lychee` in CI —
      pick one).
- [ ] Update `scripts/check-sidebars.js` if v3 schema requires (likely unchanged).
- [ ] **Exit:** a fresh clone builds cleanly with `pnpm && pnpm build`.

### Phase 6 — QA & parity gate (1 day)
- [ ] URL parity: every URL from the Phase-0 crawl → 200 on the new build, **incl.
      all 12 archived versions** (scripted, zero regressions). Expected-404 set:
      help/users + `/en/`-prefixed URLs (D4) + the 6 postdating version URLs (D8).
- [ ] Versioned-content spot-checks (the fallback mix): a doc served from an older
      snapshot (e.g. `/docs/1.12.0/doc-index` ≡ version-1.0.9 content), a doc with
      its own delta, and a doc new enough to fall back to current content — diff
      old vs new rendered text for each.
- [ ] Visual sanity: screenshots of the new key pages (desktop + mobile) reviewed
      for broken layout / unstyled content hooks (no diff-vs-old gate — new look is
      the baseline).
- [ ] Content spot-check: rendered text diff (extract text from old vs new HTML for
      the 102 current docs; diff normalized — catches silent renderer drift).
- [ ] Broken-link scan of the built site (internal + external).
- [ ] Manual review: versions page (12 archived + current), footer, 404 page, code sandbox
      iframe, the giant rounding table, `pre.output` blocks.
- [ ] **Exit:** parity gate green; sign-off from owner.

### Phase 7 — Deployment & cleanup (0.5 day)
- [ ] `.github/workflows/deploy.yml`: on push to `main`, `pnpm build`, deploy `build/`
      to the `gh-pages` branch (actions/deploy-pages pattern or
      `peaceiris/actions-gh-pages`). Remove `docusaurus-publish` from scripts.
- [ ] Delete v1-only artifacts: `pages/en/` (index ported; **help/users dropped —
      D4**), `core/`, `languages.js`, `versions.json` (replaced by config),
      `markdown/` (replaced by `remark/`), `siteConfig.js`, `static/js/sidenav.js`
      (v3 scrolls the sidebar natively), `.siteConfig.js.swp` (stray swap file),
      `yarn.lock` (pnpm, D6). `versioned_docs/` + `versioned_sidebars/` are
      **retained** (materialized, D5-rev).
- [ ] Update README (build/deploy instructions), add `.nvmrc` (Node 20/22 LTS),
      pnpm usage notes, and the future `docs:version` workflow.
- [ ] Swap `gh-pages` branch contents at cutover; DNS/redirects not needed (same URL).
- [ ] Analytics: **remove entirely** (owner decision) — delete `gaTrackingId`,
      install no analytics plugin; no GA4 replacement.

### Phase 8 — Post-cutover (0.5 day, spaced)
- [ ] Monitor GitHub Actions deploy; re-run parity crawl against the live domain.

### Phase 9 — Optional follow-up: rebuild the Live API playground

*Owner decisions D2 + D7: the playground was never finished originally — separate it
from the main migration and rebuild it properly once the site is live.*

- [ ] React re-write: drop the CDN 16.4.1 UMD externals and bundle React 18 with the
      app (remove `externals` from `webpack.config.js`); refresh `src/liveapi.html`
      (uncomment manifest/CSS links, resolve the `wretch` TODO).
- [ ] Finish the app: complete the locale/currency/units/zones examples that were
      incomplete at last commit; wire the locale packs (`pnpm packs` →
      `static/packs/`).
- [ ] Re-integrate into the build: `prebuild` gains `packs` + `build:liveapi`;
      confirm v3 copies `static/liveapi/*` verbatim; enable the "Live" navbar item
      (uncomment the entry in `src/data.js`).
- [ ] Style the app UI to match the new Docusaurus theme (brand colors, Source Sans
      Pro).
- [ ] **Exit:** playground builds, loads at `/cldr-engine/liveapi/`, examples run;
      source (`src/liveapi`, `webpack.config.js`) stays committed until then.

**Total: ~5–7 working days** (main site), of which ~2 are the markdown-plugin port
+ spike, ~1–1.5 are version materialization, and ~1.5 are parity QA. Phase 9 is
additional and optional.

---

## 7. Risks & Mitigations

| # | Risk | Likelihood | Mitigation |
|---|---|---|---|
| R1 | **MDX breaks raw-HTML docs** (524 `<pre>` blocks, giant table, `<style>`, `Promise<X>`-style generics in code) | High if default MDX format used | `markdown.format: 'md'` / `'detect'` — CommonMark format. Phase-3 spike validates on the worst files *before* committing to the config. CommonMark is labeled experimental in v3 → check upstream issue list at pin time |
| R2 | Rendering drift in custom syntax (refs/include/list) | Medium | Remark/rehype are the v3-native extension points; the Phase-3 spike locks HTML diffs to zero on a 10-doc sample; Phase-6 content-diff gate guards the rest |
| R3 | URL regressions (`.html` links, anchors, clean URLs, versioned paths, trailing slashes) | Medium | Phase-0 full crawl → Phase-6 scripted parity; `.html` alias emission for inbound links; anchor slugs: verify v3 slug algorithm against the 191 refs-generated anchors (camelCase headings → unchanged; watch multi-word headings) |
| R4 | Old toolchain can't run on modern Node (v1 build needed as oracle) | Certain-ish | Pin legacy Node in `.nvmrc` for the baseline build; only needed during Phases 0–6 |
| R5 | v1 versioned model (delta dirs, `version-X-` id prefixes, required `original_id`, fallback chain) vs v3's full-snapshot expectation | Certain unless handled | Phase-4 `materialize-versions.js` (port of v1 `versionFallback.js`) + front-matter/sidebar normalization; scripted id-resolution check; Phase-6 content diff |
| R6 | Content-hook styling lost in the theme change (`pre.syntax`, `pre.output`, `li.list`, rounding table) | Medium | Port content-level CSS (not theme chrome) in Phase 2; spot-check an API doc + rounding-table doc visually before parity gate |
| R7 | Dead Google Analytics (UA) left in place | Certain today | **Removed entirely** (owner decision) — no GA4 replacement planned |
| R8 | Live API app bit-rot (React 16.4.1 UMD CDN pinned, React 18 in lockfile — externals mismatch) | Medium | Deferred to Phase 9 by owner decision; source stays committed, excluded from build chain; risk is limited to a stale, unlinked artifact |
| R9 | ~~Phantom versions~~ — **resolved by D5-rev**: 1.4.1 serves real content via materialized fallback (matching today's 200s); 1.12.1 has no versioned path in v1 or v3 (current = `docs/`) | — | — |
| R10 | Hugely commented-out homepage code (index.js) hides intent | Low | Port only the active splash; delete the dead template blocks |
| R11 | Materialized snapshots drift from live v1 output (fallback edge cases, sidebar filtering) | Medium | Port the exact `versionFallback.js` walk (not a reimplementation from memory); Phase-6 spot-diffs on representative pages (own-delta / fallback-to-old / fallback-to-current) |

---

## 8. Long-Term Maintenance Wins (beyond parity)

- **Supported toolchain**: Node 20/22 LTS, v3 patch releases; webpack usage is
  isolated to the (deferred) liveapi build.
- **Config-driven chrome**: navbar/footer/socials become data in
  `docusaurus.config.js` instead of JSX template files.
- **Built-in versions page & dropdown** replace the custom `versions.js` page;
  all 12 archived versions retained with URL parity (D5-rev), `docs:version` ready
  for future releases.
- **pnpm** (D6): reproducible installs, no yarn v1 legacy.
- **Search**: Algolia config can be re-enabled in v3 (`algolia` themeConfig) when
  desired; DocSearch free tier applies to open-source.
- **CI deploy** replaces the manual `USE_SSH=true docusaurus-publish` flow.
- **No analytics to maintain** — the dead UA tag disappears with the migration.

---

## 9. Decisions & Open Questions

### Decisions (owner, recorded)

| # | Decision | Effect on plan |
|---|---|---|
| D1 | **Drop analytics entirely** — no GA4 replacement | §6 Phase 7: delete `gaTrackingId`, install no analytics plugin; risk R7 resolved |
| D2 | **Live API playground → separate optional phase** after the main site works | Scope moved out of the build chain (C6); new §6 Phase 9 (optional); `src/liveapi` + webpack config stay committed; risks R8/R10 adjusted |
| D3 | **Adopt v3's clean, professional template look** — no v1 look preservation | §6 Phase 2: default theme + brand colors + content-level CSS only; C11/C12 updated; visual-diff-vs-old gate dropped (replaced by sanity review + URL/text parity) |
| D4 | **Drop Help/Users pages** (unreachable today from nav/footer) | §6 Phase 7: deleted; §6 Phase 6: added to expected-404 set; risk none |
| D5 (revised) | **Retain all archived versions** — publish the latest's docs as current AND keep every old version URL working | §6 Phase 4: full snapshots materialized from v1 deltas (port of v1 `versionFallback.js`), front matter + sidebars normalized, 12 archived versions configured; `versioned_docs/`/`versioned_sidebars/` retained; versioned URLs join the 200-parity set; R5 revived (handled), R9/R11 added |
| D8 | **Per-version content correctness**: each version shows only docs/content that existed in that version — 6 postdating URLs (docs introduced after 1.0.9/1.1.2) are excluded instead of showing today's content on old-version URLs | §6 Phase 4 correctness contract + §6 Phase 6 expected-404 set; verified: 11/13 versions fully snapshot-resolved; 1.1.2 excludes 1 doc, 1.0.9 excludes 5 |
| D6 | **Move to pnpm** | §6 Phase 1: `yarn.lock` → `pnpm-lock.yaml`; scripts converted; README updated |
| D7 | **Playground: OK to rebuild it** (it was never finished originally) — but only in the optional Phase 9 | §6 Phase 9: bundle React 18, finish the examples, re-enable "Live" link |

### Remaining questions

**None — all decisions are recorded (D1–D7). The plan's assumptions and defaults are
locked in; proceed to implementation when ready.**
