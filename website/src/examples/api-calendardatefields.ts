import { framework } from './helpers';
import { DateFormatOptions } from '@phensley/cldr';
// TODO export from top-level package
import { CalendarDateFields } from '@phensley/cldr-core';
import { inspect } from 'util';

(() => {
  const cldr = framework.get('en');
  const zoneId = 'America/New_York';
  const opts: DateFormatOptions = { datetime: 'long' };
  const deltas: CalendarDateFields[] = [
    { year: 1, month: -2 },
    { year: 5, day: 17, hour: -5 },
    { year: -10, month: 2, zoneId: 'Europe/Paris' },
  ];

  const base = { date: new Date(2018, 6, 1, 14, 15, 16), zoneId };
  const date = cldr.Calendars.toGregorianDate(base);
  console.log(cldr.Calendars.formatDate(date, opts));
  for (const delta of deltas) {
    const result = cldr.Calendars.formatDate(date.add(delta), opts);
    console.log(`\n${inspect(delta)}\n${result}`);
  }
})();
