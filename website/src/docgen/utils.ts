import { CLDRFramework } from '@phensley/cldr';
import * as EnglishPack from '@phensley/cldr/packs/en.json';

export const getCLDR = () => {
  const framework = new CLDRFramework({
    loader: (lang: string) => EnglishPack
  })
  return framework.get('en');
};

export const typeSlice = (t: string[], n: number = 4) => {
  const wrap = (s: string[]) => s.map(e => `'${e}'`).join(' | ');
  return `${wrap(t.slice(0, n))} ... ${wrap(t.slice(t.length - n))}`;
};
