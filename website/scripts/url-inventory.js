/**
 * Phase 0/6 artifact: live-site URL inventory with post-migration expected
 * statuses. Sources the same version resolution as materialize-versions.js.
 *
 * Usage:
 *   node scripts/url-inventory.js            # derive expected statuses (no network)
 *   node scripts/url-inventory.js --live     # + HEAD-check every URL on the live site
 *
 * Output: website/scripts/data/inventory.json
 */
'use strict';

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { load, resolveVersion } = require('./version-resolve');

const BASE = 'https://phensley.github.io/cldr-engine';
const OUT = path.join(__dirname, 'data', 'inventory.json');

const urls = [];
const add = (pathname, expected, cls, extra = {}) => {
  urls.push({ path: pathname, expected, class: cls, ...extra });
};

// --- static assets (served at site root in both v1 and v3) ---
for (const f of ['img/favicon.ico', 'img/cldr-engine-logo-bw.png', 'img/cldr-engine-logo-bw.svg',
  'img/cldr-engine-logo-w.svg', 'img/factorial.png', 'liveapi-css/min.css']) {
  add('/' + f, 200, 'static');
}
// sidenav.js: v1-only (v3 scrolls the sidebar natively) — dropped by design
add('/js/sidenav.js', 404, 'static-dropped', { note: 'v1-only; v3 handles sidebar scroll' });

// --- pages ---
add('/', 200, 'page', { id: 'index' });
add('/index.html', 200, 'page', { id: 'index' });
add('/versions', 200, 'page', { id: 'versions' });
add('/versions.html', 200, 'page', { id: 'versions' });
add('/help.html', 404, 'page-dropped', { id: 'help', note: 'D4: dropped, unreachable' });
add('/users.html', 404, 'page-dropped', { id: 'users', note: 'D4: dropped, unreachable' });

// /en/ mirror exists on the live v1 site; dropped wholesale (D4).
for (const p of ['/en/', '/en/index.html', '/en/help.html', '/en/users.html', '/en/versions.html',
  '/en/docs/doc-index', '/en/docs/doc-index.html', '/en/docs/1.12.0/api-bundle',
  '/en/docs/1.12.0/api-bundle.html']) {
  add(p, 404, 'page-dropped', { note: 'D4: /en/ locale mirror dropped', live: 200 });
}

// 404.html: emitted by v3 build and served as the site's custom 404 (HTTP 404).
add('/404.html', 404, 'page', { id: '404' });

// --- current docs ---
const { current } = load();
for (const id of Object.keys(current)) {
  add(`/docs/${id}`, 200, 'docs', { id });
  add(`/docs/${id}.html`, 200, 'docs', { id });
}

// --- archived versions (all 12; excludes current release 1.12.1 — no versioned path) ---
const versions = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'versions.json'), 'utf-8'));
for (const version of versions) {
  const docs = resolveVersion(version);
  for (const [id, { origin, snapshotVersion }] of docs) {
    add(`/docs/${version}/${id}`, 200, 'docs', { id, version, origin, snapshotVersion });
    add(`/docs/${version}/${id}.html`, 200, 'docs', { id, version, origin, snapshotVersion });
  }
  // postdating docs (D8): exist live with misleading current content; excluded in new site
  for (const id of Object.keys(current)) {
    if (docs.has(id)) continue;
    add(`/docs/${version}/${id}`, 404, 'docs-d8', { id, version, note: 'D8: postdating doc excluded' });
    add(`/docs/${version}/${id}.html`, 404, 'docs-d8', { id, version, note: 'D8: postdating doc excluded' });
  }
}

const summary = { urls: urls.length, byExpected: {} };
for (const u of urls) summary.byExpected[u.expected] = (summary.byExpected[u.expected] || 0) + 1;
console.log('inventory:', JSON.stringify(summary));

let live = null;
if (process.argv.includes('--live')) {
  console.log(`checking ${urls.length} URLs against ${BASE} …`);
  const tmp = path.join(__dirname, 'data');
  fs.mkdirSync(tmp, { recursive: true });
  const listFile = path.join(tmp, 'urls.txt');
  fs.writeFileSync(listFile, urls.map(u => BASE + u.path).join('\n'));
  const outFile = path.join(tmp, 'statuses.txt');
  // parallel curl HEAD, one line per URL: "<code> <url>"
  const script = `while read u; do code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -I "$u"); echo "$code $u"; done`;
  const sh = `cat ${listFile} | xargs -P 24 -n 1 sh -c 'code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -I "$0"); echo "$code $0"' > ${outFile} 2>/dev/null`;
  execFileSync('bash', ['-c', sh], { stdio: 'inherit' });
  const statuses = new Map();
  for (const line of fs.readFileSync(outFile, 'utf-8').split('\n')) {
    const m = /^(\d{3}) (.+)$/.exec(line);
    if (m) statuses.set(m[1], (statuses.get(m[1]) || 0) + 1);
  }
  live = { total: urls.length, got: [...statuses.entries()].map(([code, n]) => ({ code: Number(code), n })) };
  console.log('live statuses:', JSON.stringify(live.got));

  // reconcile: flag URLs where live != expected (informational — many are by design)
  const byDesign = ['page-dropped', 'docs-d8'].map(c => c);
  const mismatches = [];
  for (const u of urls) {
    if (u.live !== undefined) continue; // declared
    const line = fs.readFileSync(outFile, 'utf-8').split('\n').find(l => l.endsWith(BASE + u.path));
    if (!line) continue;
    const liveCode = Number(line.split(' ')[0]);
    if (liveCode !== u.expected) {
      mismatches.push({ path: u.path, expected: u.expected, live: liveCode, class: u.class });
    }
  }
  if (mismatches.length) {
    console.log('UNEXPECTED live mismatches (need investigation):');
    for (const m of mismatches.slice(0, 40)) console.log(' ', JSON.stringify(m));
  } else {
    console.log('no unexpected live mismatches');
  }
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ generatedAt: new Date().toISOString(), base: BASE, summary, live, urls }, null, 2));
console.log('wrote', OUT);
