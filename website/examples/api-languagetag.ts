import { LanguageTag, resolveLocale } from '@phensley/cldr';

const SEP = '--------------------------\n\n';

(() => {
  const tag = new LanguageTag(undefined, 'Latn', undefined);
  console.log(tag.compact());
  console.log(tag.expanded());

  const parsed = resolveLocale(tag.expanded());
  console.log(parsed.tag.compact());

  console.log(SEP);
})();

(() => {
  const tag = new LanguageTag(undefined, undefined, 'US');
  console.log(tag.compact());

  console.log(SEP);
})();

(() => {
  const tag = new LanguageTag(undefined, undefined, 'US');
  console.log(tag.expanded());

  console.log(SEP);
})();
