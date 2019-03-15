import wretch from 'wretch';
import { CLDRFramework, CLDROptions } from '@phensley/cldr';

import * as Resource from '@phensley/cldr/packs/resource.json';
import * as EnglishPack from '@phensley/cldr/packs/en.json';

const version = Resource.sha256.substring(0, 10);

const loader = (language: string): any => EnglishPack;

const asyncLoader = (language: string): Promise<any> =>
  new Promise<any>((resolve, reject) => {
    if (language === 'en') {
      return resolve(EnglishPack);
    }
    return wretch(`${process.env.PUBLIC_URL}packs/${language}-${version}.json`)
      .get()
      .json(resolve)
      .catch(reject);
  });

const options: CLDROptions = {
  loader,
  asyncLoader,
  packCacheSize: 8,
  patternCacheSize: 50
};

export const framework = new CLDRFramework(options);

export const English = framework.get('en');
