import * as fs from 'fs';
import { join } from 'path';
import { CLDR, CLDRFramework } from '@phensley/cldr';

const ROOT = join(__dirname, '../../node_modules/@phensley/cldr/packs');

const loader = (language: string): any => {
  const path = join(ROOT, `${language}.json`);
  return fs.readFileSync(path, { encoding: 'utf-8' });
};

const asyncLoader = (language: string): Promise<any> =>
  new Promise<any>((resolve, reject) => {
    const path = join(ROOT, `${language}.json`);
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });


export const framework = new CLDRFramework({ loader, asyncLoader });
