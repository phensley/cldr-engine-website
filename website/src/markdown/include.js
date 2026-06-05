/**
 * Remark plugin: {> path} include — port of the v1 markdown-it inline rule
 * (website/markdown/include.js, Docusaurus 1.14.7).
 *
 * Inlines a file relative to the include root:
 *   - .md  → parsed markdown (recursively runs refs/include on it)
 *   - .ts  → typescript code block
 *   - else → verbatim text
 *
 * Not currently used by committed docs, but part of the toolchain contract (C2).
 *
 * The sub-pipeline is built ONCE (module scope). It registers `subInclude`
 * (a separate factory that never rebuilds the sub-pipeline) so factory
 * invocation cannot recurse.
 */
'use strict';

const fs = require('fs');
const { join } = require('path');
// interop: unified v11 is ESM-only; require() yields the namespace object
const unifiedMod = require('unified');
const unified = unifiedMod.unified || unifiedMod.default || unifiedMod;
const remarkParseMod = require('remark-parse');
const remarkParse = remarkParseMod.default || remarkParseMod;

const INCLUDE_RE = /\{\>\s*([\w\/\._-]+)\s*\}/;

const refsFactory = require('./refs');

let sub = null;
const getSub = () => sub;

/** Transformer shared by the main pipeline and the sub-pipeline. */
function makeIncludeTransformer(options) {
  return function transformer(tree) {
    const out = [];
    for (const node of tree.children) {
      if (node.type === 'paragraph' && node.children.length === 1 &&
          node.children[0].type === 'text') {
        const m = INCLUDE_RE.exec(node.children[0].value);
        if (m) {
          const filepath = join(options.includeDir, m[1]);
          const data = fs.readFileSync(filepath, 'utf-8');
          if (filepath.endsWith('.md')) {
            const subProc = getSub();
            const parsed = subProc.parse(data);
            const processed = subProc.runSync(parsed);
            out.push(...processed.children);
          } else if (filepath.endsWith('.ts')) {
            const raw = data.endsWith('\n') ? data.trim() : data;
            out.push({
              type: 'code',
              lang: 'typescript',
              value: raw
            });
          } else {
            out.push({ type: 'text', value: data });
          }
          continue;
        }
      }
      out.push(node);
    }
    tree.children = out;
  };
}

/** Factory registered inside the sub-pipeline (no sub rebuild). */
function subInclude(options) {
  return makeIncludeTransformer(options);
}

module.exports = function remarkInclude(options = {}) {
  if (!sub) {
    sub = unified()
      .use(remarkParse)
      .use(subInclude, options)
      .use(refsFactory, options)
      .freeze();
  }
  return makeIncludeTransformer(options);
};
