const fs = require('fs');
const { basename, join } = require('path');
const yaml = require('js-yaml');

const ROOT = join(__dirname, '..');
const DOCS = join(ROOT, '..', 'docs');

const load = (path) => fs.readFileSync(path, 'utf-8');
const loadSidebars = () => JSON.parse(load(join(ROOT, 'sidebars.json')));
const listDocs = () => fs.readdirSync(DOCS);

const loadDoc = (name) => {
  const raw = load(join(DOCS, name));
  const start = raw.indexOf('---') + 3;
  const end = raw.indexOf('---', start);
  return yaml.safeLoad(raw.substring(start, end));
};

const flatten = (obj) => {
  let arr = [];
  if (Array.isArray(obj)) {
    arr = arr.concat(obj);
  } else if (typeof obj === 'object') {
    for (const k of Object.keys(obj)) {
      arr = arr.concat(flatten(obj[k]));
    }
  }
  return arr;
};

const contains = (key, arr) => arr.filter((v) => v === key).length > 0;

const main = () => {
  const sidebars = flatten(loadSidebars());
  const docs = listDocs();

  // Forward
  listDocs().forEach(name => {
    const doc = loadDoc(name);
    if (!contains(doc.id, sidebars)) {
      console.log(`${doc.id} is not in sidebars.json`);
    }
  });

  // Reverse
  const docsSet = new Set(docs);
  sidebars.map(n => `${n}.md`).forEach(name => {
    if (!docsSet.has(name)) {
      console.log(`${name} in sidebars.json but missing from filesystem`);
    }
  });
};

main();
