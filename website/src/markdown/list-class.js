/**
 * Remark plugin: mark <li class="list"> on *-bullet lists.
 *
 * Port of the v1 behavior (website/markdown/list.js): the v1 markdown-it fork
 * recorded the bullet char on list_item_open tokens, and the renderer emitted
 * <li class="list"> only for `*` lists. The site CSS relies on this:
 *   ul li { list-style-type: none } and ul li.list { list-style-type: unset }
 * (plain markdown `-` lists render without bullets; `*` lists keep them).
 *
 * mdast does not record the bullet character, so we recover it from the
 * source text via node positions.
 */
'use strict';

const visitMod = require('unist-util-visit');
const visit = (visitMod.default && visitMod.default.visit) || visitMod.visit || visitMod;

module.exports = function remarkListClass() {
  return function transformer(tree, file) {
    const src = String(file.value);
    if (!src) return;
    visit(tree, 'list', node => {
      if (node.ordered) return;
      if (!node.position || node.position.start.offset === undefined) return;
      const marker = src.slice(node.position.start.offset, node.position.start.offset + 1);
      if (marker !== '*') return;
      for (const item of node.children) {
        if (item.type !== 'listItem') continue;
        const props = (item.data && item.data.hProperties) || {};
        item.data = { ...(item.data || {}), hProperties: { ...props, className: 'list' } };
      }
    });
  };
};
