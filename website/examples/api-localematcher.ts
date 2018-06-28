import { availableLocales, LocaleMatcher } from '@phensley/cldr';

const allLocales = availableLocales();

const supported = allLocales.sort(
  l => l.tag.expanded() === 'en-Latn-US' ? -1 : 1
).map(l => l.id);

const localeMatcher = new LocaleMatcher('en, es-419, en-GB, pt-BR, es');

let { distance, locale } = localeMatcher.match('pt');
console.log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('es-MX'));
console.log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('en-ZA'));
console.log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('en-ZA, es'));
console.log(`${locale.id} distance ${distance}`);
