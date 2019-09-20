import { framework } from './helpers';
import { CalendarDate, DateFormatOptions, TimePeriod } from '@phensley/cldr';

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

// compare
{
  console.log('compare');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 2, 11) });
  for (const n of [-27, -13, -1, 0, 1, 20]) {
    const end = date.add({ day: n });
    const v = date.compare(end);
    console.log(`${end.toString()}  ${v}`);
  }

  console.log(SEP);
}

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

// difference
{
  console.log('difference');

  const cldr = framework.get('en');
  const start = cldr.Calendars.toGregorianDate({ date: new Date(2019, 2, 11, 12), zoneId: 'UTC' });
  let end: CalendarDate;
  let t: TimePeriod;

  end = start.add({ year: 1.5, month: -1, day: 27.5, hour: 3 });

  const show = (t: TimePeriod) => Object.keys(t).map(k => [k, t[k]])
    .filter(([k, v]) => v !== 0)
    .map(([k, v]) => `${k}=${v}`)
    .join(' ');

  console.log(start.toString());
  console.log(end.toString());

  t = start.difference(end, ['year', 'month', 'day']);
  console.log(show(t));

  t = start.difference(end, ['month', 'day']);
  console.log(show(t));

  t = start.difference(end, ['day', 'hour']);
  console.log(show(t));

  t = start.difference(end, ['day']);
  console.log(show(t));

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

// fieldOfVisualDifference
{
  console.log('fieldOfVisualDifference');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 4, 15) });

  const fmt = (d: CalendarDate) => cldr.Calendars.formatDate(d, { datetime: 'long' });
  const cmp = (d: CalendarDate, o: CalendarDate) => {
    console.log(`${fmt(d)}  ~  ${fmt(o)}  => ${d.fieldOfVisualDifference(o)}`);
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

// metaZoneId
{
  console.log('metaZoneId');

  const cldr = framework.get('en');
  const zoneId = 'America/New_York';
  const date = cldr.Calendars.toGregorianDate({ date: new Date(1990, 0, 1), zoneId });

  console.log(date.metaZoneId());

  console.log(SEP);
}

// milliseconds
{
  console.log('milliseconds');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: 1560602096987 });
  console.log(date.milliseconds());

  console.log(SEP);
}

// millisecondsInDay
{
  console.log('millisecondsInDay');

  const cldr = framework.get('en');
  const zoneId = 'America/New_York';
  let date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 2, 10, 6, 59, 59), zoneId });

  const fmt = (d: CalendarDate) =>
    console.log(`${cldr.Calendars.formatDate(d, { datetime: 'long' })}  ${d.millisecondsInDay()}`);

  fmt(date);
  fmt(date.add({ minute: 1 }));
  fmt(date.add({ minute: 2 }));

  console.log(SEP);
}

// minDaysInFirstWeek
{
  console.log('minDaysInFirstWeek');

  const cldr = framework.get('en');

  let date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 5, 1) });
  console.log(date.minDaysInFirstWeek());

  date = cldr.Calendars.toISO8601Date(date);
  console.log(date.minDaysInFirstWeek());

  console.log(SEP);
}

// minute
{
  console.log('minute');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 4, 10, 12, 27, 41) });

  console.log(cldr.Calendars.formatDate(date, { time: 'long' }));
  console.log(date.minute());

  console.log(SEP);
}

// month
{
  console.log('month');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 4, 10) });

  console.log(cldr.Calendars.formatDate(date, { date: 'long' }));
  console.log(date.month());

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

// ordinalDayOfWeek
{
  console.log('ordinalDayOfWeek');

  const us = framework.get('en-US');
  const fr = framework.get('fr-FR');

  const suffixes = { 'one': 'st', 'two': 'nd', 'few': 'rd', 'other': 'th' };
  const usdate = us.Calendars.toGregorianDate({ date: new Date(2019, 4, 7 )});
  const frdate = fr.Calendars.toGregorianDate(usdate);
  let cat: string;

  console.log(us.Calendars.formatDate(usdate));

  let day = frdate.ordinalDayOfWeek();
  cat = us.Numbers.getPluralOrdinal(day);
  console.log(` .. in fr-FR is the ${day}${suffixes[cat]} day of the week`);

  day = usdate.ordinalDayOfWeek();
  cat = us.Numbers.getPluralOrdinal(day);
  console.log(` .. in en-US is the ${day}${suffixes[cat]} day of the week`);

  console.log(SEP);
}

// relativeTime
{
  console.log('relativeTime');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 8, 20) });
  let end: CalendarDate;
  let field: string;
  let value: number;

  end = date.add({ month: 2, day: 15 });

  [field, value] = date.relativeTime(end);
  console.log(`${value} ${field}`);

  [field, value] = date.relativeTime(end, 'day');
  console.log(`${value} ${field}`);

  [field, value] = date.relativeTime(end, 'hour');
  console.log(`${value} ${field}`);

  console.log(SEP);
}

// second
{
  console.log('second')

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 4, 10, 12, 27, 41) });

  console.log(cldr.Calendars.formatDate(date, { time: 'long' }));
  console.log(date.second());

  console.log(SEP);
}

// timeZoneId
{
  console.log('timeZoneId');

  const cldr = framework.get('en');
  const zoneId = 'America/New_York';

  let date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 4, 10, 12, 27, 41) });
  console.log(date.timeZoneId());

  date = cldr.Calendars.toGregorianDate({ date: date.unixEpoch(), zoneId });
  console.log(date.timeZoneId());

  console.log(SEP);
}

// timeZoneOffset
{
  console.log('timeZoneOffset');

  const cldr = framework.get('en');
  const epoch = new Date(2019, 4, 10, 12, 27, 41);
  for (const zoneId of [undefined, 'America/New_York', 'Europe/Zurich']) {
    const date = cldr.Calendars.toGregorianDate({ date: epoch, zoneId });
    const s = cldr.Calendars.formatDate(date, { datetime: 'full' });
    console.log(`${s} has offset ${date.timeZoneOffset()}`);
  }

  console.log(SEP);
}

// type
{
  console.log('type');

  const cldr = framework.get('en');

  let date = cldr.Calendars.toGregorianDate({ date: new Date() });
  console.log(date.type());

  date = cldr.Calendars.toJapaneseDate(date);
  console.log(date.type());

  console.log(SEP);
}

// unixEpoch
{
  console.log('unixEpoch');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: 1560602096987 });
  console.log(date.unixEpoch());

  console.log(SEP);
}

// weekOfMonth
{
  console.log('weekOfMonth');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 4, 1) });

  const fmt = (d: CalendarDate) =>
    console.log(`${cldr.Calendars.formatDate(d, { date: 'long' })} is in week ${d.weekOfMonth()}`);

  for (let d = 0; d < 14; d++) {
    fmt(date.add({ day: d }));
  }

  console.log(SEP);
}

// withZone
{
  console.log('withZone');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 4, 1) });

  console.log(date.toString());
  console.log(date.withZone('America/New_York').toString());
  console.log(date.withZone('Europe/Paris').toString());

  console.log(SEP);
}

// year
{
  console.log('year');

  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 2, 15) });

  console.log(cldr.Calendars.formatDate(date, { date: 'long' }));
  console.log(date.year());

  console.log(SEP);
}

// yearOfWeekOfYear and weekOfYear
{
  console.log('yearOfWeekOfYear  weekOfYear');

  const cldr = framework.get('en');
  const zoneId = 'America/New_York';
  const opt: DateFormatOptions = { date: 'long' };
  const base = cldr.Calendars.toGregorianDate({ date: new Date(2015, 11, 24, 12), zoneId })
  for (let d = 0; d < 13; d++) {
    const date = base.add({ day: d });
    const str = `${cldr.Calendars.formatDate(date, opt)}`;
    console.log(`${str}  ${date.yearOfWeekOfYear()}-${date.weekOfYear()}`);
  }

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
