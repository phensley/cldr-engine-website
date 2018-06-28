const fs = require('fs');
const { join } = require('path');

const INCLUDE_RE = /\{\>\s*([\w\._-]+)\s*\}/;

var parse = function(includeDir) {
  return function(state) {
    var pos = state.pos;
    var match = state.src.slice(pos).match(INCLUDE_RE);
    if (!match) {
      return false;
    }

    const path = join(includeDir, match[1]);
    const data = fs.readFileSync(path, 'utf-8');

    state.push({
      type: 'include',
      data: data,
      level: state.level
    });
    state.pos += match[0].length;
    return true;
  };
};

var render = function(md) {
  return function(tokens, idx, options) {
    const { data } = tokens[idx];
    return md.render(data);
  };
};

module.exports = {
  parse: parse,
  render: render
};
