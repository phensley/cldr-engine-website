import { framework } from './helpers';
import { CalendarDate } from '@phensley/cldr';

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
{
  console.log('dayOfMonth');
  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 2, 11) });
  console.log(cldr.Calendars.formatDate(date, { date: 'full' }));

  console.log(date.dayOfMonth());
  console.log(date.add({ day: 3 }).dayOfMonth());
  console.log(date.add({ week: 1 }).dayOfMonth());

  console.log(SEP);
}

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


// dayOfWeek
{
  console.log('dayOfWeek');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 2, 11) });
  const weekdays = cldr.Calendars.weekdays({ width: 'wide' });
  console.log(cldr.Calendars.formatDate(date, { date: 'full' }));

  console.log(weekdays[date.dayOfWeek()]);
  console.log(weekdays[date.add({ day: 1 }).dayOfWeek()]);
  console.log(weekdays[date.add({ day: 5 }).dayOfWeek()]);

  console.log(SEP);
}

// era
(() => {
  const cldr = framework.get('en');
  const zoneId = 'America/New_York';
  const eras = cldr.Calendars.eras({ width: 'names' });

  let date = cldr.Calendars.toGregorianDate({ date: -66222222200000, zoneId });

  let s = cldr.Calendars.formatDate(date, { date: 'full' });
  console.log(`${s} era is ${eras[date.era()]}`);

  date = date.add({ year: 2100 });
  s = cldr.Calendars.formatDate(date, { date: 'full' });
  console.log(`${s} era is ${eras[date.era()]}`);

  console.log(SEP);
})();

// extendedYear
{
  console.log('extendedYear');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(-49, 5, 15) });

  console.log(cldr.Calendars.formatDate(date, { skeleton: 'GyMMMd' }));
  console.log(date.extendedYear());

  console.log(SEP);
}

// fieldOfGreatestDifference
{
  console.log('fieldOfGreatestDifference');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 4, 15) });

  const fmt = (d: CalendarDate) => cldr.Calendars.formatDate(d, { datetime: 'long' });
  const cmp = (d: CalendarDate, o: CalendarDate) => {
    console.log(`${fmt(d)}  ~  ${fmt(o)}  => ${d.fieldOfGreatestDifference(o)}`);
  };

  cmp(date, date.add({ minute: 1 }));
  cmp(date, date.add({ hour: 3 }));
  cmp(date, date.add({ day: 9 }));
  cmp(date, date.add({ month: 7 }));
  cmp(date, date.add({ year: 23 }));

  console.log(SEP);

}

// firstDayOfWeek
{
  console.log('firstDayOfWeek');

  const us = framework.get('en-US');
  const fr = framework.get('fr-FR');
  const endate = us.Calendars.toGregorianDate({ date: new Date(-49, 5, 15) });
  const frdate = fr.Calendars.toGregorianDate(endate);
  const weekdays = us.Calendars.weekdays({ width: 'wide' });

  console.log(`en-US first day of week: ${weekdays[endate.firstDayOfWeek()]}`);
  console.log(`fr-FR first day of week: ${weekdays[frdate.firstDayOfWeek()]}`);

  console.log(SEP);
}

// hour
{
  console.log('hour');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 4, 10, 12, 10, 20) });

  console.log(cldr.Calendars.formatDate(date, { time: 'long' }));
  console.log(date.hour());

  console.log(SEP);
}

// hour
{
  console.log('hourOfDay');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 4, 10, 12, 10, 20) });

  console.log(cldr.Calendars.formatDate(date, { time: 'long' }));
  console.log(date.hourOfDay());

  console.log(SEP);
}


// isDaylightSavings
{
  console.log('isDaylightSavings');
  const cldr = framework.get('en');
  const zoneId = 'America/New_York';
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 0, 10, 12, 0, 0), zoneId });

  const dst = (d: CalendarDate) =>
    console.log(
      `${cldr.Calendars.formatDate(d, { datetime: 'long' })} ` +
      `daylight savings: ${d.isDaylightSavings()}`);

  dst(date);
  dst(date.add({ day: 58 }));
  dst(date.add({ day: 61 }));

  console.log(SEP);
}

// isAM
{
  console.log('isAM');

  const cldr = framework.get('en');
  const zoneId = 'America/New_York';
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 0, 10, 13, 0, 0), zoneId });

  const isam = (d: CalendarDate) =>
    console.log(
      `${cldr.Calendars.formatDate(d, { datetime: 'long' })} ` +
      `is AM: ${d.isAM()}`);


  isam(date);
  isam(date.add({ minute: 239 }));
  isam(date.add({ minute: 241 }));

  console.log(SEP);
}

// isLeapYear
{
  console.log('isLeapYear');

  const cldr = framework.get('en');
  const zoneId = 'America/New_York';
  const date = cldr.Calendars.toGregorianDate({ date: new Date(1895, 0, 10, 13, 0, 0), zoneId });

  const isleap = (d: CalendarDate) =>
    console.log(
      `${cldr.Calendars.formatDate(d, { skeleton: 'y' })} ` +
      `is leap year ${d.isLeapYear()}`);


  for (let y = 0; y < 11; y++) {
    isleap(date.add({ year: y }));
  }

  console.log(SEP);
}


// julianDay
{
  console.log('julianDay');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(1970, 0, 1 )});

  console.log(date.julianDay());
  console.log(date.add({ year: -10 }).julianDay());
  console.log(date.add({ year: -100 }).julianDay());

  console.log(SEP);
}

// modifiedJulianDay
{
  console.log('modifiedJulianDay');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(1970, 0, 1 )});

  console.log(date.modifiedJulianDay());
  console.log(date.add({ year: -10 }).modifiedJulianDay());
  console.log(date.add({ year: -100 }).modifiedJulianDay());

  console.log(SEP);
}

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
