import { framework } from './helpers';

const SEP = '\n--------------------------------\n\n';

{
const date = 1530087780000;
const zoneId = 'America/New_York';

const pad = (s: string) => ' '.repeat(10 - s.length) + s;
const skeletons = [
  'y', 'yM', 'yMM', 'yMMM', 'yMMMM', 'GyMMMM',
  'yMdE', 'yMMdEE', 'yMMMdEEE', 'yMMMdEEEE',
  'Bh', 'Bhm', 'EBhm', 'Hms', 'Hmsv', 'Hmsvvvv', 'Hmsz', 'Hmszzzz',
  'yMMMMEdB',
];

const locales = ['en', 'de', 'es'];
for (const locale of locales) {
  const cldr = framework.get(locale);
  const format = (skeleton: string) =>
    cldr.Calendars.formatDate({ date, zoneId },
      { context: 'standalone', skeleton });

  console.log(`Locale: ${locale}\n`);
  for (const skeleton of skeletons) {
    const res = format(skeleton);
    console.log(`${pad(skeleton)}  ${res}`);
  }
  console.log();
}

console.log(SEP);
}
