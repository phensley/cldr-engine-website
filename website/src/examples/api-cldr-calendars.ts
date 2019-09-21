import { framework } from './helpers';
import { CalendarDate, Decimal } from '@phensley/cldr';

const SEP = '\n--------------------------------\n\n';

// dateField
{
  for (const id of ['en', 'es', 'de', 'fr', 'zh']) {
    const cldr = framework.get(id);
    const s = cldr.Calendars.dateField('year', { context: 'begin-sentence' });
    console.log(s);
  }

  console.log(SEP);
}

// dayPeriods
{
  const en = framework.get('en');
  const p = en.Calendars.dayPeriods({ width: 'wide', context: 'begin-sentence' });
  console.log(p);

  console.log(SEP);
}

// eras
{
  const en = framework.get('en');
  const p = en.Calendars.eras({ width: 'names' });
  console.log(p);

  console.log(SEP);
}

// fieldOfGreatestDifference
{
  const cldr = framework.get('en');

  // June 27, 2018 4:23:00 AM
  const date = 1530087780000;
  const zoneId = 'America/New_York';
  const d1 = cldr.Calendars.toGregorianDate({ date, zoneId });

  const factors = [0.0002, 0.005, 0.25, .75, 3, 50, 425, 1000];
  factors.forEach(f => {
    const days = f * 86400 * 1000;
    const d2 = cldr.Calendars.toGregorianDate({ date: date + days, zoneId });
    const field = cldr.Calendars.fieldOfVisualDifference(d1, d2);
    console.log(`${field} ->  ${d2.toString()}`);
  });

  console.log(SEP);
}

// formatDate
{
  const cldr = framework.get('en');

  // June 27, 2018 4:23:00 AM
  const date = 1530087780000;
  const zoneId = 'America/New_York';

  const result = cldr.Calendars.formatDate({ date, zoneId }, { datetime: 'full' });
  console.log(result);

  console.log(SEP);
}

// formatDateToParts
{
  const cldr = framework.get('en');

  // June 27, 2018 4:23:00 AM
  const date = 1530087780000;
  const zoneId = 'America/New_York';

  const result = cldr.Calendars.formatDateToParts({ date, zoneId }, { datetime: 'short' });
  console.log(result);

  console.log(SEP);
}

// formatDateInterval
{
  const cldr = framework.get('en');

  // June 27, 2018 4:23:00 AM
  const date = 1530087780000;
  const zoneId = 'America/New_York';

  const day = 86400000;
  const start = { date, zoneId };
  for (const days of [1.2, 3, 17, 73, 1000]) {
    const end = { date: date + (days * day), zoneId };
    const result = cldr.Calendars.formatDateInterval(start, end, { skeleton: 'yMMMd' });
    console.log(result);
  }

  console.log(SEP);
}

// formatDateIntervalToParts
{
  const cldr = framework.get('en');

  // June 27, 2018 4:23:00 AM
  const date = 1530087780000;
  const zoneId = 'America/New_York';

  const day = 86400000;
  const start = { date, zoneId };
  const end = { date: date + (day * 10), zoneId };
  const result = cldr.Calendars.formatDateIntervalToParts(start, end, { skeleton: 'yMMMd' });
  console.log(result);

  console.log(SEP);
}


// formatDateRaw
{
  console.log('formatDateRaw');
  const cldr = framework.get('en');
  // June 27, 2018 4:23:00 AM
  const date = 1530087780000;
  const zoneId = 'America/New_York';

  const s = cldr.Calendars.formatDateRaw({ date, zoneId }, { pattern: 'EEE MMM y, d' });
  console.log(s);

  console.log(SEP);
}

// formatDateRawToParts
{
  console.log('formatDateRaw');
  const cldr = framework.get('en');
  // June 27, 2018 4:23:00 AM
  const date = 1530087780000;
  const zoneId = 'America/New_York';

  const p = cldr.Calendars.formatDateRawToParts({ date, zoneId }, { pattern: 'EEE MMM y, d' });
  console.log(p);

  console.log(SEP);
}

// formatRelativeTime
{
  console.log('formatRelativeTime');

  const cldr = framework.get('en');
  const start = cldr.Calendars.toGregorianDate({ date: new Date(2019, 6, 11) });
  for (const month of [-2, -1, 0, 1, 3 ]) {
    const end = start.add({ month });
    const a = cldr.Calendars.formatRelativeTime(start, end);
    const b = cldr.Calendars.formatRelativeTime(start, end, { field: 'day' });
    console.log(`${a}  (${b})`);
  }

  console.log(SEP);
}

// formatRelativeTimeField
{
  console.log('formatRelativeTimeField');

  const cldr = framework.get('en');
  for (const value of ['-2', -1, '0', 1, 3, new Decimal('12.5')]) {
    const result = cldr.Calendars.formatRelativeTimeField(value, 'month', { });
    console.log(result);
  }

  console.log(SEP);
}

// months
{
  const en = framework.get('en');
  const fr = framework.get('fr');

  const context = 'begin-sentence';
  const monthsEN = en.Calendars.months({ context });
  const monthsFR = fr.Calendars.months({ context });

  console.log(monthsEN);
  console.log(monthsFR);

  const date = en.Calendars.toGregorianDate({
    date: new Date(2018, 5, 11, 12, 1, 12),
    zoneId: 'America/New_York'
  });

  console.log(`\nmonth is ${monthsEN[date.month()]} / ${monthsFR[date.month()]}`);

  console.log(SEP);
}

// quarters
{
  const en = framework.get('en');
  const quarters = en.Calendars.quarters();
  console.log(quarters);

  console.log(SEP);
}

// resolveTimeZoneId
{
  console.log('resolveTimeZoneId');

  let s: string | undefined;
  const en = framework.get('en');
  s = en.Calendars.resolveTimeZoneId('UTC');
  console.log(s);

  s = en.Calendars.resolveTimeZoneId('US/East-Indiana');
  console.log(s);

  s = en.Calendars.resolveTimeZoneId('Antarctica/McMurdo');
  console.log(s);

  console.log(SEP);
}

// timePeriodToQuantity
{
  console.log('timePeriodToQuantity');

  const en = framework.get('en');
  const date = en.Calendars.toGregorianDate({ date: 1530124872456 });
  const end = date.add({ year: 2, month: 5, day: 20, hour: 12 });
  const t = date.difference(end, ['year', 'day']);
  const q = en.Calendars.timePeriodToQuantity(t);

  let s: string;
  s = en.Units.formatQuantitySequence(q)
  console.log(s);

  s = en.Units.formatQuantitySequence(q, { length: 'short', maximumFractionDigits: 0 });
  console.log(s);

  s = en.Units.formatQuantitySequence(q, { length: 'narrow', maximumFractionDigits: 0 });
  console.log(s);

  console.log(SEP);
}

// timeZoneIds
{
  console.log('timeZoneIds');

  const en = framework.get('en');
  for (const id of en.Calendars.timeZoneIds()) {
    console.log(id);
  }

  console.log(SEP);
}

// toBuddhistDate
{
  const cldr = framework.get('en');
  const date = cldr.Calendars.toBuddhistDate({ date: 1530124872456, zoneId: 'America/New_York'});
  console.log(date.toString());

  console.log(SEP);
}

// toGregorianDate
{
  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: 1530124872456, zoneId: 'America/New_York' });
  console.log(date.toString());

  console.log(SEP);
}

// toGregorianDate
{
  const cldr = framework.get('en');
  let date = new Date(2018, 1, 17, 12, 34, 56, 789);
  let gregorian = cldr.Calendars.toGregorianDate({ date, zoneId: 'America/New_York' });
  console.log(date.toString());

  date = new Date(2018, 6, 17, 12, 34, 56, 789);
  gregorian = cldr.Calendars.toGregorianDate({ date, zoneId: 'America/New_York' });
  console.log(date.toString());

  console.log(SEP);
}

// toISO8601Date
{
  const cldr = framework.get('en');
  const weekdays = cldr.Calendars.weekdays();
  const date = cldr.Calendars.toGregorianDate({ date: new Date(2017, 0, 1) });
  const iso = cldr.Calendars.toISO8601Date(date);

  const wk = (d: CalendarDate) => `week starts on ${weekdays[d.firstDayOfWeek()]}`;
  const woy = (d: CalendarDate) => `week of year: ${d.yearOfWeekOfYear()}-${d.weekOfYear()}`;

  console.log(`gregorian ${wk(date)}, ${woy(date)}`);
  console.log(` iso-8601 ${wk(iso)}, ${woy(iso)}`);

  console.log(SEP);
}

// toJapaneseDate
{
  const cldr = framework.get('en');
  const date = cldr.Calendars.toJapaneseDate({ date: 1530124872456, zoneId: 'America/New_York'});
  console.log(date.toString());
  console.log(date.relatedYear());
  console.log(date.year());
  console.log(SEP);
}

// weekdays
{
  const en = framework.get('en');
  const es = framework.get('es');
  const context = 'ui-list-or-menu';
  console.log(en.Calendars.weekdays({ context }));
  console.log(es.Calendars.weekdays({ context }));

  console.log(SEP);
}
