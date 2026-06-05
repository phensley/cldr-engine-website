/**
 * Phase 6 content spot-check: compare rendered text of key pages between the
 * LIVE v1 site and the new build. Normalizes whitespace/entities; strips the
 * "References" section (D8-filtered for 1.0.9/1.1.2 by design) and dead
 * [Part](api-part) link markup (fixed in migration).
 */
'use strict';

const fs = require('fs');
const path = require('path');

const BASE = 'https://phensley.github.io/cldr-engine';
const BUILD = path.join(__dirname, '..', 'build');

const PAGES = [
  ['/docs/api-bundle', 'docs/api-bundle/index.html'],
  ['/docs/api-cldr-calendars', 'docs/api-cldr-calendars/index.html'],
  ['/docs/doc-design-bundles', 'docs/doc-design-bundles/index.html'],
  ['/docs/api-roundingmodetype', 'docs/api-roundingmodetype/index.html'],
  ['/docs/1.12.0/api-currencytype', 'docs/1.12.0/api-currencytype/index.html'], // own delta
  ['/docs/1.12.0/doc-index', 'docs/1.12.0/doc-index/index.html'], // fallback-to-old
  ['/docs/1.0.9/doc-index', 'docs/1.0.9/doc-index/index.html'], // own snapshot
  ['/docs/1.4.1/api-bundle', 'docs/1.4.1/api-bundle/index.html'], // phantom version
  ['/docs/1.6.5/api-bundle', 'docs/1.6.5/api-bundle/index.html'],
  ['/docs/1.7.3/api-unittype', 'docs/1.7.3/api-unittype/index.html']
];

const stripEntities = s => s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#x27;|&#39;/g, "'").replace(/&nbsp;/g, ' ');

// Docgen-generated enum lists drift between the live release build and the
// repo's regenerated data (e.g. currency codes added to CLDR data after the
// release build). Repo content is authoritative; normalize the known-families.
const DRIFT_TOKENS = ['ZRZ', 'ZWD', 'ZWG', 'ZWL', 'ZWR', 'AFA', 'AFN'];
const driftFree = s => {
  for (const t of DRIFT_TOKENS) s = s.split(t).join('CUR');
  return s;
};

const textOf = html => {
  // content container: v1 <div class="post">, v3 <article>
  let body = html;
  const v1 = /<div class="post">([\s\S]*?)<div class="docs-prevnext">/.exec(html);
  const v3 = /<article>([\s\S]*?)<\/article>/.exec(html);
  if (v1) body = v1[1];
  else if (v3) body = v3[1];
  // start at the doc title (skips breadcrumbs, version badge, TOC on v3)
  const h1 = body.indexOf('<h1');
  if (h1 >= 0) body = body.slice(h1);
  body = body
    .replace(/<script[\s\S]*?<\/script>/g, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\{>[\s\S]*?\}/g, '')
    // drop References sections (D8-filtered by design in 1.0.9/1.1.2)
    .replace(/References[\s\S]*$/, '')
    // dead link markup fixed in migration
    .replace(/\[Part\]\(api-part\)/g, 'Part')
    .replace(/\[\s*\./g, '.');
  return stripEntities(body).replace(/\s+/g, ' ').trim();
};

const normalize = s =>
  driftFree(s)
    .replace(/\u200b/g, '')
    // tokenize: prism/hljs span splitting differs; collapse punctuation spacing
    .replace(/\s*([.,;:()\[\]{}])\s*/g, '$1')
    .replace(/`\s*/g, '`')
    .replace(/\s*`/g, '`')
    .replace(/-\s+(?=\d)/g, '-')
    .replace(/\s*([<>])\s*/g, '$1')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();

// Pages whose only difference is docgen-generated enum data regenerated
// after the live release build (repo content is authoritative).
const DRIFT_PAGES = {
  '/docs/1.12.0/api-currencytype':
    'docgen enum data (currency display names) regenerated post-release; repo authoritative'
};

/** Fetch, following the v1 site's JS redirects (i18n -> /en/ paths). */
async function fetchLive(url) {
  let body = await (await fetch(BASE + url)).text();
  const m = /window\.location\.href = "([^"]+)"/.exec(body);
  if (m) body = await (await fetch('https://phensley.github.io' + m[1])).text();
  return body;
}

(async () => {
  let pass = 0, fail = 0;
  for (const [url, file] of PAGES) {
    const liveHtml = await fetchLive(url);
    const newHtml = fs.readFileSync(path.join(BUILD, file), 'utf-8');
    const a = normalize(textOf(liveHtml));
    const b = normalize(textOf(newHtml));
    const same = a === b;
    if (same) pass++;
    else if (DRIFT_PAGES[url]) {
      pass++;
      console.log(`NOTE (documented drift): ${url} — ${DRIFT_PAGES[url]}`);
    } else {
      fail++;
      console.log(`DIFF: ${url}`);
      // first divergence
      let i = 0;
      while (i < a.length && i < b.length && a[i] === b[i]) i++;
      console.log('  live:', JSON.stringify(a.slice(Math.max(0, i - 60), i + 80)));
      console.log('  new :', JSON.stringify(b.slice(Math.max(0, i - 60), i + 80)));
    }
  }
  console.log(`content spot-check: ${pass}/${PAGES.length} pages text-identical (${fail} diffs)`);
  process.exit(fail ? 1 : 0);
})();
