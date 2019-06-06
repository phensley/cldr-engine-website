const fs = require('fs');

const REFS_RE = /\{\%refs\s+([^\s]+)(\s+(\d+))?}/;

var parse = function() {
  return function(state) {
    var pos = state.pos;
    var match = state.src.slice(pos).match(REFS_RE);
    if (!match) {
      return false;
    }

    const level = Number(match[3] || '3');
    state.push({
      type: 'refs',
      typename: match[1],
      headlevel: isFinite(level) ? level : 3,
      level: state.level
    });
    state.pos += match[0].length;
    return true;
  };
};

var render = function(md, crossrefpath) {
  return function(tokens, idx) {
    const crossref = JSON.parse(fs.readFileSync(crossrefpath, 'utf-8'));
    const { typename, headlevel } = tokens[idx];
    const refs = crossref[typename] || [];

    let r = '';
    let prevtype = '';
    let prevmethod = '';
    for (const ref of refs) {
      const { type, method, id, base } = ref;
      if (type !== prevtype) {
        r += `* [${type}](${base}.html)\n`;
      }
      if (method && prevmethod !== method) {
        r += `  - .[${method}](${base}.html#${id})\n`;
      }
      prevtype = type;
      prevmethod = method;
    }
    if (r) {
      r = '#'.repeat(headlevel) + ` References\n` + r;
      return md.render(r);
    }
    return '';
  };
};

module.exports = {
  parse: parse,
  render: render
};
