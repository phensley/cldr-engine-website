import { framework } from './helpers';

const SEP = '\n--------------------------------\n\n';

// add
(() => {
  const cldr = framework.get('en');
  // Wed June 27 2018 4:23:00 AM UTC
  const date = cldr.Calendars.toGregorianDate({
  epoch: 1530087780000, zoneId: 'America/New_York' });
  console.log(date.toString());
  console.log(date.add({ year: 1, month: 5 }).toString());
  console.log(date.add({ year: -5, day: 7, minute: 22 }).toString());

  console.log(SEP);
})();

(() => {
  const cldr = framework.get('en');
  const epoch = 1530087780000;
  const zoneId = 'America/New_York';

  const w = (s: string, n: number) => `${' '.repeat(n - s.length)}${s}`;

  // Weekday and month names for current locale
  const weekdays = cldr.Calendars.weekdays();
  const months = cldr.Calendars.months();

  for (let day = 0; day < 80; day += 1) {
    const days = day * 86400000;
    const date = cldr.Calendars.toGregorianDate({ epoch: epoch + days, zoneId });
    const dom = date.dayOfMonth();
    const month = date.month();
    const weekday = date.dayOfWeek();
    const s = `${month}/${dom}/${date.year()}`;
    console.log(`${w(s, 10)} is a ${w(weekdays[weekday], 9)} in week-of-month ${date.weekOfMonth()} and in day-of-week-in-month ${date.dayOfWeekInMonth()} of ${months[month]}`);
  }

  console.log(SEP);
})();

(() => {
  const cldr = framework.get('en');
  const epoch = new Date(2018, 0, 1, 12, 34, 56, 789);

  for (const zoneId of ['UTC', 'America/New_York', 'Europe/Paris']) {
    const result = cldr.Calendars.formatDate({ epoch, zoneId }, { datetime: 'full' });
    console.log(result);
  }

  console.log(SEP);
})();
