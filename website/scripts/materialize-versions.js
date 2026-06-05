/**
 * Phase 4: materialize full per-version doc snapshots from v1 deltas.
 *
 * v1 stored only DELTAS in versioned_docs/version-X/; the live site resolved
 * every (version, doc) pair at build time via the fallback chain (see
 * scripts/version-resolve.js — port of v1 versionFallback.js). Docusaurus 3
 * requires complete snapshots. This script expands the 12 archived versions
 * (versions.json minus the current release) into full versioned_docs/
 * dirs with v3-normalized front matter, plus generated versioned_sidebars/.
 *
 * D8: docs with no snapshot <= V (postdating docs) are excluded — they did not
 * exist in that version (v1 showed misleading current content for them).
 *
 * Usage: node scripts/materialize-versions.js   (also `pnpm materialize`)
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { load, resolveVersion, ROOT } = require('./version-resolve');

const VDOCS = path.join(ROOT, 'versioned_docs');
const VSIDEBARS = path.join(ROOT, 'versioned_sidebars');
const SIDEBARS_PATH = path.join(ROOT, 'sidebars.json');
const VERSIONS_PATH = path.join(ROOT, 'versions.json');

const LEGACY_SIDEBARS = new Set(['1.0.9', '1.1.2', '1.2.10']);

/* ---------- front matter ---------- */

function normalizeFrontMatter(raw, id) {
  const m = /^---\n([\s\S]*?)\n---/.exec(raw);
  if (!m) throw new Error(`no front matter block: ${raw.slice(0, 60)}`);
  const keep = m[1]
    .split('\n')
    .filter(line => {
      const key = line.split(':')[0].trim();
      return key !== 'id' && key !== 'original_id';
    });
  return `---\nid: ${id}\n${keep.join('\n')}\n---` + raw.slice(m[0].length);
}

/* ---------- sidebars ---------- */

/** Recursively keep only doc ids that exist for the version (D8-aware). */
function filterSidebar(value, keep) {
  if (Array.isArray(value)) {
    const out = [];
    for (const item of value) {
      if (typeof item === 'string') {
        if (keep(item)) out.push(item);
      } else {
        const sub = filterSidebar(item, keep);
        if (sub && Object.keys(sub).length) out.push(sub);
      }
    }
    return out;
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      const sub = filterSidebar(v, keep);
      if (Array.isArray(sub) ? sub.length : Object.keys(sub).length) out[k] = sub;
    }
    return out;
  }
  return value;
}

function normalizeLegacySidebar(raw, version, versionedIds) {
  const obj = JSON.parse(raw);
  const prefix = `version-${version}-`;
  const strip = item => (item.startsWith(prefix) ? item.replace(prefix, '') : item);
  const out = {};
  for (const [sidebarId, categories] of Object.entries(obj)) {
    const id = sidebarId.replace(prefix, '');
    const filtered = filterSidebar(categories, item =>
      versionedIds.has(strip(item))
    );
    const stripped = stripIds(filtered, strip);
    if (Object.keys(stripped).length) out[id] = stripped;
  }
  return out;
}

/** Recursively map item ids through strip() (strings only; structure kept). */
function stripIds(value, strip) {
  if (Array.isArray(value)) {
    return value.map(item => (typeof item === 'string' ? strip(item) : stripIds(item, strip)));
  }
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = stripIds(v, strip);
    return out;
  }
  return value;
}

function generateSidebar(versionedIds) {
  const current = JSON.parse(fs.readFileSync(SIDEBARS_PATH, 'utf-8'));
  const out = {};
  for (const [sidebarId, categories] of Object.entries(current)) {
    const filtered = filterSidebar(categories, item => versionedIds.has(item));
    if (Object.keys(filtered).length) out[sidebarId] = filtered;
  }
  return out;
}

/* ---------- main ---------- */

const versions = JSON.parse(fs.readFileSync(VERSIONS_PATH, 'utf-8'));
const archived = versions; // site versions.json lists the 12 archived versions

const { dirs, current } = load();
const currentIds = Object.keys(current);
const unknown = archived.filter(v => !dirs.includes(v));
if (unknown.length) console.warn('archived versions without delta dirs:', unknown);

fs.mkdirSync(VDOCS, { recursive: true });
fs.mkdirSync(VSIDEBARS, { recursive: true });

// Resolve everything BEFORE writing (resolveVersion re-reads the delta dirs,
// which we overwrite below).
const plan = [];
for (const version of archived) {
  const docs = resolveVersion(version); // Map id -> {file, origin, snapshotVersion}
  const versionedIds = new Set(docs.keys());
  const postdating = currentIds.filter(id => !versionedIds.has(id));

  const legacyPath = path.join(VSIDEBARS, `version-${version}-sidebars.json`);
  const sidebar = fs.existsSync(legacyPath)
    ? normalizeLegacySidebar(fs.readFileSync(legacyPath, 'utf-8'), version, versionedIds)
    : generateSidebar(versionedIds);

  const origins = {};
  const files = [];
  for (const id of docs.keys()) {
    const { file, origin } = docs.get(id);
    const raw = fs.readFileSync(file, 'utf-8');
    files.push([id, normalizeFrontMatter(raw, id)]);
    origins[origin] = (origins[origin] || 0) + 1;
  }
  plan.push({ version, files, origins, postdating, sidebar });
}

let totalFiles = 0;
for (const { version, files, origins, postdating, sidebar } of plan) {
  const dir = path.join(VDOCS, `version-${version}`);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  for (const [id, content] of files) {
    fs.writeFileSync(path.join(dir, `${id}.md`), content);
    totalFiles++;
  }
  fs.writeFileSync(
    path.join(VSIDEBARS, `version-${version}-sidebars.json`),
    JSON.stringify(sidebar, null, 2) + '\n'
  );
  console.log(
    `version-${version}: ${files.length} docs ${JSON.stringify(origins)}` +
      (postdating.length ? `, D8-excluded: ${postdating.join(', ')}` : '')
  );
}
console.log(`\nmaterialized ${totalFiles} files across ${archived.length} versions`);
