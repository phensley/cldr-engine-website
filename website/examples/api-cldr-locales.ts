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
  for (const id of ['en_CA', 'zh', 'fr-u-ca-persian-u-nu-mathmono']) {
    const { tag } = cldr.Locales.resolve(id);
    console.log(`${tag.language()}  ${tag.script()}  ${tag.region()}`);
  }

  console.log(SEP);
})();
