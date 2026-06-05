/**
 * Post-build step (C15): emit `.html` alias files so v1-era URLs
 * (/docs/api-bundle.html, /docs/1.12.0/api-bundle.html, /versions.html)
 * keep working on GitHub Pages.
 *
 * For every doc page index.html (current + versioned) and the /versions
 * page, write a sibling `.html` copy at the parent level.
 */
'use strict';

const fs = require('fs');
const path = require('path');

const BUILD = path.join(__dirname, '..', 'build');

let count = 0;
const alias = (dir, name) => {
  const src = path.join(dir, name, 'index.html');
  const dst = path.join(dir, `${name}.html`);
  if (!fs.existsSync(src)) return;
  fs.copyFileSync(src, dst);
  count++;
};

// all doc pages (current + archived versions)
const docsRoot = path.join(BUILD, 'docs');
const walk = dir => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const full = path.join(dir, entry.name);
    if (fs.existsSync(path.join(full, 'index.html'))) {
      alias(dir, entry.name);
    }
    // recurse unconditionally (version dirs have no own index.html)
    walk(full);
  }
};

// versions index pages (current + versioned doc pages) via recursive walk
walk(docsRoot);
// top-level versions page
alias(BUILD, 'versions');

console.log(`html-aliases: wrote ${count} .html alias files`);
