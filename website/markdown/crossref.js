const fs = require('fs');
const filepath = require('path');

// const WAITERS = {};

const CROSSREF = {};
;
const HEAD_RE = /^(#+)\s*(.+)$/;

const IGNORED = new Set([
  'Syntax', 'Properties', 'Examples'
]);

const cmp = (a, b) => a < b ? -1 : a === b ? 0 : 1;

const read = (dir, filename) =>
  fs.readFileSync(filepath.join(dir, filename), { encoding: 'utf-8' })
  .split('\n');

const accept = (f) =>
  f.startsWith('api-') && f.endsWith('.md');

const extracttypes = (dir, files) => {
  const types = new Set();
  for (const filename of files) {
    if (!accept(filename)) {
      continue;
    }

    const lines = read(dir, filename);
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('title:')) {
        const type = lines[i].split(':')[1].trim();
        types.add(type);
        break;
      }
    }
  }
  return types;
};

const process = (filename, lines, types) => {
  const base = filepath.basename(filename, '.md');

  let thistype = '';
  const len = lines.length;
  for (let i = 0; i < len; i++) {
    if (lines[i].startsWith('title:')) {
      thistype = lines[i].split(':')[1].trim();
    }

    let m = null;
    const ref_re = /\[(.+(\[\])?)\]\(([^\)]+)\)/g
    while (m = ref_re.exec(lines[i])) {
      const typepath = filepath.basename(m[3], '.html');
      if (typepath === base) {
        continue;
      }

      let type = m[1];
      if (type.endsWith('[]')) {
        type = type.substring(0, type.length - 2);
      }
      if (!types.has(type)) {
        console.log('skipping', base, type);
        continue;
      }

      // Locate nearest heading that has the highest level
      let level = 10;
      let heading = '';
      for (let j = i; j >= 0; j--) {

        const m = HEAD_RE.exec(lines[j]);
        if (!m) {
          continue;
        }
        const headlvl = m[1].length;
        if (heading && headlvl > level) {
          break;
        }
        if (headlvl < level) {
          heading = m[2];
          level = headlvl;
        }
      }

      if (IGNORED.has(heading)) {
        heading = '';
      }

      const refs = CROSSREF[type] || [];
      const key = thistype + '#' + heading.toLowerCase();
      if (refs.filter(e => e.key === key).length) {
        continue;
      }
      refs.push({
        key,
        type: thistype,
        base,
        method: heading,
        id: heading.toLowerCase()
      });
      CROSSREF[type] = refs;
    }
  }
};

function generate(dir, outpath) {
  const files = fs.readdirSync(dir);
  const types = extracttypes(dir, files);
  for (const filename of files) {
    if (accept(filename)) {
      const data = read(dir, filename);
      process(filename, data, types);
    }
  }
  for (const key of Object.keys(CROSSREF)) {
    CROSSREF[key] = CROSSREF[key].sort((a, b) => cmp(a.key, b.key));
  }
  fs.writeFileSync(outpath, JSON.stringify(CROSSREF), { encoding: 'utf-8' });
}

// function watchCrossRef(dir) {
//   fs.watch(dir, (event, filename) => {
//     if (filename && accept(filename)) {
//       if (WAITERS[filename]) {
//         return;
//       }
//       WAITERS[filename] = setTimeout(() => {
//         delete WAITERS[filename];
//         const data = read(dir, filename);
//         process(filename, data);
//       }, 300);
//     }
//   });
// }

module.exports = {
  generate,
  // watchCrossRef
};
