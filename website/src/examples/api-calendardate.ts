import { framework } from './helpers';

const SEP = '\n--------------------------------\n\n';

// add
(() => {
  const cldr = framework.get('en');
  // Wed June 27 2018 4:23:00 AM UTC
  const date = cldr.Calendars.toGregorianDate({ date: 1530087780000, zoneId: 'America/New_York' });
  console.log(date.toString());
  console.log(date.add({ year: 1, month: 5 }).toString());
  console.log(date.add({ year: -5, day: 7, minute: 22 }).toString());

  console.log(SEP);
})();

// dayOfMonth
(() => {
  const cldr = framework.get('en');
  // Aug 11 2019 07:08:09 UTC
  const zoneId = 'America/New_York';
  const date = cldr.Calendars.toGregorianDate({ date: 1565550489000, zoneId });

  const endings = { one: 'st', two: 'nd', few: 'rd', other: 'th' };
  const ord = (n: number) => endings[cldr.Numbers.getPluralOrdinal(n)];

  const weekdays = cldr.Calendars.weekdays({ ca: date.type() });
  const months = cldr.Calendars.months({ ca: date.type() });

  const day = date.dayOfMonth();
  const weekday = weekdays[date.dayOfWeek()];
  const month = months[date.month()];
  const year = date.year();
  const dayinmonth = date.dayOfWeekInMonth();

  console.log(`the ${day}${ord(day)} is the ${dayinmonth}${ord(dayinmonth)} ${weekday} in ${month}, ${year}`);

  console.log(SEP);
})();

// dayOfYear
(() => {
  const cldr = framework.get('en');
  const zoneId = 'America/New_York';
  const date = cldr.Calendars.toGregorianDate({ date: 1565550489000, zoneId });
  const result = cldr.Calendars.formatDate(date, { date: 'short' });
  const doy = date.dayOfYear();
  console.log(`${result} is the ${doy} day of ${date.year()}`);

  console.log(SEP);
})();

// era
(() => {
  const cldr = framework.get('en');
  const zoneId = 'America/New_York';
  const date = cldr.Calendars.toGregorianDate({ date: -66222222200000, zoneId });
  const result = cldr.Calendars.formatDate(date, { date: 'full' });
  console.log(`${result} era is ${date.era()}`);

  console.log(SEP);
})();

false && (() => {
  const cldr = framework.get('en');
  const timestamp = 1530087780000;
  const zoneId = 'America/New_York';

  const w = (s: string, n: number) => `${' '.repeat(n - s.length)}${s}`;

  // Weekday and month names for current locale
  const weekdays = cldr.Calendars.weekdays();
  const months = cldr.Calendars.months();

  for (let day = 0; day < 80; day += 1) {
    const days = day * 86400000;
    const date = cldr.Calendars.toGregorianDate({ date: timestamp + days, zoneId });
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
  const date = new Date(2018, 0, 1, 12, 34, 56, 789);

  for (const zoneId of ['UTC', 'America/New_York', 'Europe/Paris']) {
    const result = cldr.Calendars.formatDate({ date, zoneId }, { datetime: 'full' });
    console.log(result);
  }

  console.log(SEP);
})();
