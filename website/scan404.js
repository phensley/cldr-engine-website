const fs = require('fs');
const filepath = require('path');

const process = (dir) => {
  const files = fs.readdirSync(dir).filter(n => n.endsWith('.md'));
  const check = new Set(files);
  for (const file of files) {
    const lines = fs.readFileSync(`${dir}/${file}`, { encoding: 'utf-8' }).split('\n');
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const ref_re = /\[([^\]]+)\]\(([^\)]+)\)/g;
      let m = null;
      while (m = ref_re.exec(line)) {
        let base = m[2];
        if (base.startsWith('http') || base.startsWith('#')) {
          continue;
        }
        const j = base.indexOf('#');
        if (j !== -1) {
          base = base.substring(0, j);
        }
        base = filepath.basename(base, '.html');
        const ref = base + '.md';
        if (!check.has(ref)) {
          console.log(`[missing] ${file} ${ref} on line ${i + 1}:\n  ${line}`);
        }
      }
    }
  }

};

process(`${__dirname}/../docs`);
