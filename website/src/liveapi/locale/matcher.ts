import { LocaleMatcher, CLDRFramework } from '@phensley/cldr';

export const allLocales = CLDRFramework.availableLocales();

const supported = allLocales.sort(
  l => l.tag.expanded() === 'en-Latn-US' ? -1 : 1
).map(l => l.id);

export const localeMatcher = new LocaleMatcher(supported);
