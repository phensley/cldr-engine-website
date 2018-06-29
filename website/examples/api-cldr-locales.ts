import { framework } from './helpers';

const SEP = '\n--------------------------------\n\n';

(() => {
  for (const locale of ['en', 'fr', 'ja', 'ar']) {
    const cldr = framework.get(locale);
    const b = cldr.Locales.bundle();
    console.log(`${b.id()}  ${b.language()}  ${b.region()}`);
  }

  console.log(SEP);
})();

(() => {
  for (const locale of ['en', 'fr', 'ja', 'ar']) {
    const cldr = framework.get(locale);
    const { tag } = cldr.Locales.current();
    console.log(tag.expanded());
  }

  console.log(SEP);
})();

(() => {
  const cldr = framework.get('en');
  const ids = [
    'en_CA',
    'ko',
    'und-Cyrl',
    'fr-u-ca-persian-u-nu-mathmono',
    'und-CN'
  ];
  for (const id of ids) {
    const { tag } = cldr.Locales.resolve(id);
    console.log(`${tag.language()}  ${tag.script()}  ${tag.region()}`);
  }

  console.log(SEP);
})();
