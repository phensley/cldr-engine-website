import * as fs from 'fs';
import { join } from 'path';
import { CLDRFramework } from '@phensley/cldr';
import * as EnglishPack from '@phensley/cldr/packs/en.json';

export const writeDoc = (name: string, data: string) => {
  const path = join(__dirname, `../../../docs/${name}`);
  fs.writeFileSync(path, data, { encoding: 'utf-8' });
};

export const getCLDR = () => {
  const framework = new CLDRFramework({
    loader: (lang: string) => EnglishPack
  })
  return framework.get('en');
};
