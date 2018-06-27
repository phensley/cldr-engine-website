import * as fs from 'fs';
import { join } from 'path';
import { CLDR, CLDRFramework } from '@phensley/cldr';

const ROOT = join(__dirname, '../node_modules/@phensley/cldr/packs');

const loader = (language: string): any => {
  const path = join(ROOT, `${language}.json`);
  return fs.readFileSync(path, { encoding: 'utf-8' });
};

export const framework = new CLDRFramework({ loader });
