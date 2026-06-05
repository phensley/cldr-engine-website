/**
 * Port of Docusaurus v1's version resolution semantics
 * (lib/server/versionFallback.js, v1.14.7).
 *
 * v1 model: versioned_docs/version-X/ holds only DELTAS (docs that differ).
 * For a requested version V and doc id, resolve the source file by walking
 * versions.json (newest first) from V toward older versions; the first
 * version whose snapshot contains the id wins. If none does, the doc
 * postdates V (v1 would show current content — we exclude it per D8).
 *
 * Shared by: scripts/materialize-versions.js (Phase 4) and
 * scripts/url-inventory.js (Phase 0/6) so both always agree.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..'); // website/
const REPO = path.join(ROOT, '..'); // repo root
const DOCS = path.join(REPO, 'docs');
const VDOCS = path.join(ROOT, 'versioned_docs');

/** Parse minimal front matter for id / original_id. */
const extractMeta = raw => {
  const id = /^id:\s*(.+)$/m.exec(raw);
  const originalId = /^original_id:\s*(.+)$/m.exec(raw);
  const title = /^title:\s*(.+)$/m.exec(raw);
  return {
    id: id ? id[1].trim() : null,
    originalId: originalId ? originalId[1].trim() : null,
    title: title ? title[1].trim() : null
  };
};

const readIds = (dir, prefix) => {
  const out = {};
  for (const f of fs.readdirSync(dir)) {
    if (!f.endsWith('.md')) continue;
    const raw = fs.readFileSync(path.join(dir, f), 'utf-8');
    const meta = extractMeta(raw);
    const id = meta.id && meta.id.startsWith('version-') ? meta.originalId : meta.id;
    if (!id) {
      console.warn(`[version-resolve] no id in ${dir}/${f}`);
      continue;
    }
    out[id] = path.join(dir, f);
  }
  return out;
};

/**
 * @returns {{ versions: string[], dirs: string[], current: Map<string,string>,
 *             deltas: Map<string, Map<string,string>>, available: Map<string, string[]> }}
 *   deltas: id -> (version -> filepath). available: id -> versions containing a delta, in
 *   versions.json walk order (newest first).
 */
function load() {
  const V1_CURRENT = '1.12.1'; // current release = docs/ (site versions.json lists archived only)
const versions = [
  V1_CURRENT,
  ...JSON.parse(fs.readFileSync(path.join(ROOT, 'versions.json'), 'utf-8'))
];
  const current = readIds(DOCS);
  const deltas = new Map(); // id -> Map(version -> filepath)
  const dirs = [];
  for (const dir of fs.readdirSync(VDOCS)) {
    if (!/^version-/.test(dir)) continue;
    const version = dir.replace(/^version-/, '');
    dirs.push(version);
    const ids = readIds(path.join(VDOCS, dir), version);
    for (const [id, file] of Object.entries(ids)) {
      if (!deltas.has(id)) deltas.set(id, new Map());
      deltas.get(id).set(version, file);
    }
  }
  const available = new Map();
  for (const [id, m] of deltas) {
    const list = [];
    for (const v of versions) if (m.has(v)) list.push(v);
    available.set(id, list);
  }
  return { versions, dirs, current, deltas, available };
}

/**
 * v1 docVersion(id, reqVersion): first version <= reqVersion (walking
 * versions.json downward from reqVersion) that has a delta for id, else null.
 */
function docVersion(versions, available, id, reqVersion) {
  if (!available.has(id)) return null;
  const list = available.get(id);
  let started = false;
  for (const v of versions) {
    if (v === reqVersion) started = true;
    if (started && list.includes(v)) return v;
  }
  return null;
}

/**
 * Resolve the full doc set for a requested version.
 * @returns {Map<string, {file: string, origin: 'current'|'snapshot', snapshotVersion?: string}>}
 *   Only docs that existed at V (snapshot <= V), per D8 (postdating docs excluded).
 */
function resolveVersion(version) {
  const { versions, available, deltas, current } = load();
  const result = new Map();
  // A doc exists at V iff it has a snapshot <= V (v1 walk). Postdating docs
  // (only snapshots > V) are excluded — they are NOT this version's content.
  for (const id of available.keys()) {
    const v = docVersion(versions, available, id, version);
    if (v !== null) {
      result.set(id, { file: deltas.get(id).get(v), origin: 'snapshot', snapshotVersion: v });
    }
  }
  // 'current' is only materialized when 'current' is itself the requested version
  // (handled by the site: current docs live in docs/).
  return result;
}

module.exports = { load, docVersion, resolveVersion, DOCS, VDOCS, ROOT, REPO, extractMeta };
