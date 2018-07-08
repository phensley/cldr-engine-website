import { framework } from './helpers';

(() => {
// June 27, 2018 4:23:00 AM
const date = 1530087780000;
const zoneId = 'America/New_York';

const day = 86400000;
const start = { date, zoneId };

for (const locale of ['en', 'de', 'zh']) {
  const cldr = framework.get(locale);
  for (const days of [1.2, 3, 17, 73, 1000]) {
    const end = { date: date + (days * day), zoneId };
    const result = cldr.Calendars.formatDateInterval(start, end, { skeleton: 'yMMMMd' });
    console.log(`${locale}  ${result}`);
  }
  console.log('');
}
})();
