import { framework } from './helpers';
import { Decimal } from '@phensley/cldr';

const SEP = '\n--------------------------------\n\n';

// dayPeriods
(() => {
  const en = framework.get('en');
  const p = en.Calendars.dayPeriods({ width: 'wide', context: 'begin-sentence' });
  console.log(p);

  console.log(SEP);
})();

// eras
(() => {
  const en = framework.get('en');
  const p = en.Calendars.eras({ width: 'names' });
  console.log(p);

  console.log(SEP);
})();

// fieldOfGreatestDifference
(() => {
  const cldr = framework.get('en');

  // June 27, 2018 4:23:00 AM
  const date = 1530087780000;
  const zoneId = 'America/New_York';
  const d1 = cldr.Calendars.toGregorianDate({ date, zoneId });

  const factors = [0.0002, 0.005, 0.25, .75, 3, 50, 425, 1000];
  factors.forEach(f => {
    const days = f * 86400 * 1000;
    const d2 = cldr.Calendars.toGregorianDate({ date: date + days, zoneId });
    const field = cldr.Calendars.fieldOfGreatestDifference(d1, d2);
    console.log(`${field} ->  ${d2.toString()}`);
  });

  console.log(SEP);
})();

// formatDate
(() => {
  const cldr = framework.get('en');

  // June 27, 2018 4:23:00 AM
  const date = 1530087780000;
  const zoneId = 'America/New_York';

  const result = cldr.Calendars.formatDate({ date, zoneId }, { datetime: 'full' });
  console.log(result);

  console.log(SEP);
})();

// formatDateToParts
(() => {
  const cldr = framework.get('en');

  // June 27, 2018 4:23:00 AM
  const date = 1530087780000;
  const zoneId = 'America/New_York';

  const result = cldr.Calendars.formatDateToParts({ date, zoneId }, { datetime: 'short' });
  console.log(result);

  console.log(SEP);
})();

// formatDateInterval
(() => {
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
})();

// formatDateIntervalToParts
(() => {
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
})();

// formatRelativeTimeField
(() => {
  const cldr = framework.get('en');
  for (const value of ['-2', -1, '0', 1, 3, new Decimal('12.5')]) {
    const result = cldr.Calendars.formatRelativeTimeField(value, 'month', { });
    console.log(result);
  }

  console.log(SEP);
})();

// months
(() => {
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
})();

// quarters
(() => {
  const en = framework.get('en');
  const quarters = en.Calendars.quarters();
  console.log(quarters);

  console.log(SEP);
})();

// toBuddhistDate
(() => {
  const cldr = framework.get('en');
  const date = cldr.Calendars.toBuddhistDate({ date: 1530124872456, zoneId: 'America/New_York'});
  console.log(date.toString());

  console.log(SEP);
})();

// toGregorianDate
(() => {
  const cldr = framework.get('en');
  const date = cldr.Calendars.toGregorianDate({ date: 1530124872456, zoneId: 'America/New_York' });
  console.log(date.toString());

  console.log(SEP);
})();

// toGregorianDate
(() => {
  const cldr = framework.get('en');
  let date = new Date(2018, 1, 17, 12, 34, 56, 789);
  let gregorian = cldr.Calendars.toGregorianDate({ date, zoneId: 'America/New_York' });
  console.log(date.toString());

  date = new Date(2018, 6, 17, 12, 34, 56, 789);
  gregorian = cldr.Calendars.toGregorianDate({ date, zoneId: 'America/New_York' });
  console.log(date.toString());

  console.log(SEP);
})();

// weekdays
(() => {
  const en = framework.get('en');
  const es = framework.get('es');
  const context = 'ui-list-or-menu';
  console.log(en.Calendars.weekdays({ context }));
  console.log(es.Calendars.weekdays({ context }));

  console.log(SEP);
})();
