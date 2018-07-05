import { inspect } from 'util';
import { parseLanguageTag, resolveLocale } from '@phensley/cldr';

const SEP = '------------------------\n';

(() => {
  const ids = [
    'en-US',
    'und-Latn-ZZ',
    'fr_CA',
    'no-GB-u-ca-gregory-u-nu-mathmono'
  ];

  for (const id of ids) {
    const tag = parseLanguageTag(id);

    console.log(tag.language());
    console.log(tag.script());
    console.log(tag.region());
    console.log(tag.compact());
    console.log(tag.expanded());
    console.log(inspect(tag.extensions()));
    console.log();
  }

  console.log(SEP);
})();

(() => {
  const { id, tag } = resolveLocale('cmn-TW');
  console.log(tag.compact());
})();

(() => {
  const { id, tag } = resolveLocale('i-klingon');
  console.log(tag.language());
})();
