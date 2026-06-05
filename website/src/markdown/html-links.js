/**
 * Remark plugin: rewrite intra-site `.html` links to clean URLs.
 *
 * Docs cross-link with v1-era relative links like [Locale](api-locale.html)
 * and [method](api-locale.html#anchor). v3 serves clean URLs only
 * (/docs/api-locale), so strip the extension (keeping fragments). Relative
 * links resolve within the same (current or versioned) docs path.
 */
'use strict';

const visitMod = require('unist-util-visit');
const visit = (visitMod.default && visitMod.default.visit) || visitMod.visit || visitMod;

const ABSOLUTE = /^(https?:)?\/\//;
const SKIP = /^(#|\/|\.\/|\.\.\/|data:|mailto:|tel:|blob:)/;

module.exports = function remarkHtmlLinks() {
  return function transformer(tree) {
    visit(tree, 'link', node => {
      const url = node.url;
      if (!url || ABSOLUTE.test(url) || SKIP.test(url)) return;
      node.url = url.replace(/\.html(?=(#|$))/, '');
    });
  };
};
