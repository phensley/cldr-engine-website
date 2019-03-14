import { LocaleMatcher, CLDRFramework } from '@phensley/cldr';

// All locales available in the library
const allLocales = CLDRFramework.availableLocales();

const supported = allLocales.sort(
  l => l.tag.expanded() === 'en-Latn-US' ? -1 : 1
).map(l => l.id);

// This ensures we only ever match a valid, available locale.
const cldrMatcher = new LocaleMatcher(supported);

const { distance, locale } = cldrMatcher.match('i-klingon');
console.log(`${locale.tag.expanded()} distance ${distance}`);

// import cldrMatcher from above example

// Locales for which the application has message translations
const appLocales = ['es', 'es-419', 'en', 'en-CA'];
const messageMatcher = new LocaleMatcher(appLocales);

const userLocale = 'es-MX';

const messageMatch = messageMatcher.match(userLocale);
console.log(`messages: ${messageMatch.locale.tag.expanded()} distance ${messageMatch.distance}`);

const cldrMatch = cldrMatcher.match(userLocale);
console.log(`    cldr: ${cldrMatch.locale.tag.expanded()} distance ${cldrMatch.distance}`);
