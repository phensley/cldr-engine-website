import { LanguageTag, CLDRFramework } from '@phensley/cldr';

const { parseLanguageTag, resolveLocale } = CLDRFramework;

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

(() => {
  console.log('language tags');

  let tag = new LanguageTag('und');
  console.log(tag.hasLanguage());

  tag = new LanguageTag();
  console.log(tag.hasLanguage());

  tag = new LanguageTag('zh');
  console.log(tag.hasLanguage());

  console.log(SEP);
})();

(() => {
  console.log('extensions');

  const tag = new LanguageTag('en', '', 'US', '', { u: ['ca-gregory'] });
  console.log(tag.expanded());
  console.log(tag.extensions());

  console.log(SEP);
})();

(() => {
  // TODO: merge with other extensions
  console.log('private use');

  const t = parseLanguageTag('en-x-nothing');
  console.log(t.privateUse());

  const tag = new LanguageTag('en', 'Latn', 'US', undefined, undefined, 'x-nothing');
  console.log(tag.expanded());
  console.log(tag.privateUse());

  console.log(SEP);
})();

(() => {
  let tag = new LanguageTag();
  console.log(tag.language());

  tag = new LanguageTag('en');
  console.log(tag.language());

  console.log(SEP);
})();

(() => {
  let tag = new LanguageTag('en', 'Latn');
  console.log(tag.region());

  tag = new LanguageTag('en', 'Latn', 'US');
  console.log(tag.region());

  console.log(SEP);
})();

(() => {
  let tag = new LanguageTag('en');
  console.log(tag.script());

  tag = new LanguageTag('en', 'latn');
  console.log(tag.script());

  console.log(SEP);
})();
