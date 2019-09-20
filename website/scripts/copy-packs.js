const fs = require('fs');
const { basename, join } = require('path');
const zlib = require('zlib');

const resource = require(join(__dirname, '../node_modules/@phensley/cldr/packs/resource.json'));

const PKGHASH = resource.sha256.substring(0, 10);

const mtime = f => fs.statSync(f).mtimeMs;
const newerThan = (a, b) => mtime(a) > mtime(b);

const main = () => {
  const src = join(__dirname, '../node_modules/@phensley/cldr/packs');
  const dst = join(__dirname, '../static/packs');
  if (!fs.existsSync(dst)) {
    fs.mkdirSync(dst);
  }

  if (!fs.existsSync(src)) {
    console.error('install @phensley/cldr!');
    process.exit(1);
  }

  const names = fs.readdirSync(src)
    .filter(n => n.endsWith('.json'))
    .map(n => join(src, n));

  if (names.length === 0) {
    console.error('no packs are available.. reinstall @phensley/cldr');
    process.exit(1);
  }

  names.forEach(path => {
    const name = basename(path, '.json');
    const outpath = join(dst, `${name}-${PKGHASH}.json`);
    if (fs.existsSync(outpath) && newerThan(outpath, path)) {
      return;
    }

    console.warn(`copying ${outpath}..`);
    const raw = fs.readFileSync(path);
    fs.writeFileSync(outpath, raw);
  });
};

main();
