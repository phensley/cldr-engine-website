/**
 * Phase 6 parity gate: assert the built site matches the Phase-0 inventory.
 *
 * For each inventoried URL, derive the expected build file:
 *   /docs/api-bundle          -> build/docs/api-bundle/index.html
 *   /docs/api-bundle.html     -> build/docs/api-bundle.html   (alias, C15)
 *   /                         -> build/index.html
 *   expected 404              -> file must NOT exist
 *
 * Usage: node scripts/check-build.js
 * Exit: 0 when all URL expectations hold; 1 otherwise.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BUILD = path.join(ROOT, 'build');
const inventory = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'inventory.json'), 'utf-8'));

const toFile = p => {
  if (p === '/') return path.join(BUILD, 'index.html');
  const clean = p.replace(/^\//, '');
  if (p.endsWith('.html')) return path.join(BUILD, clean);
  // static assets carry an extension; docs pages are clean dir paths
  const base = path.basename(clean);
  if (base.includes('.')) return path.join(BUILD, clean);
  return path.join(BUILD, clean, 'index.html');
};

let ok = 0;
let fail = 0;
const failures = [];
for (const u of inventory.urls) {
  const file = toFile(u.path);
  const exists = fs.existsSync(file);
  // /404.html: the v3 build emits a custom 404 page (served with HTTP 404)
  const is404Page = u.path === '/404.html';
  if (u.expected === 200 && exists) ok++;
  else if (u.expected === 404 && (is404Page ? exists : !exists)) ok++;
  else {
    fail++;
    failures.push(`${u.expected === 200 ? 'MISSING' : 'PRESENT-BUT-404'}: ${u.path} (${u.class})`);
  }
}

console.log(`parity: ${ok}/${inventory.urls.length} URLs match expectations (${fail} failures)`);
if (failures.length) {
  for (const f of failures.slice(0, 30)) console.log('  ', f);
  if (failures.length > 30) console.log(`  … and ${failures.length - 30} more`);
}
process.exit(fail ? 1 : 0);
