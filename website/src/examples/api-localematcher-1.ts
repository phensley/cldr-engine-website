import { LocaleMatcher } from '@phensley/cldr';

const localeMatcher = new LocaleMatcher('en, es-419, en-GB, pt-BR, es');

let { distance, locale } = localeMatcher.match('pt');
console.log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('es-MX'));
console.log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('en-ZA'));
console.log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('en-ZA, es'));
console.log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('zh'));
console.log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('und'));
console.log(`${locale.id} distance ${distance}`);

console.log('-----------------------');
for (const id of ['ee']) {
  for (const threshold of [30, 20, 15, 8, 4]) {
    ({ distance, locale } = localeMatcher.match(id, threshold));
    console.log(`(${id} ${threshold}) -> ${locale.id} distance ${distance}`);
  }
  console.log();
}
