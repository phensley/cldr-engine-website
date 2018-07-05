
import { availableLocales, resolveLocale } from '@phensley/cldr';

(() => {
  const locales = availableLocales().slice(0, 10);
  for (const locale of locales) {
    const { id, tag } = locale;
    console.log(`${tag.language()}-${tag.script()}-${tag.region()}     ${id}`);
  }
})();

(() => {
  for (const str of ['en_US', 'zh', 'fr-CA-u-ca-persian-u-nu-mathmono']) {
    const { id, tag } = resolveLocale(str);
    console.log(`${tag.expanded()}`);
  }
})();