import { LanguageTag, parseLocale } from '@phensley/cldr';

(() => {
  const tag = new LanguageTag(undefined, 'Latn', undefined);
  console.log(tag.compact());
  console.log(tag.expanded());

  const parsed = parseLocale(tag.expanded());
  console.log(parsed.tag.compact());
})();
