import { framework } from './helpers';
import { Decimal } from '@phensley/cldr';

const SEP = '\n--------------------------------\n\n';

// fieldOfGreatestDifference
(() => {
  const cldr = framework.get('en');

  // June 27, 2018 4:23:00 AM
  const epoch = 1530087780000;
  const zone = 'America/New_York';
  const d1 = cldr.Calendars.newGregorianDate(epoch, zone);

  const factors = [0.0002, 0.005, 0.25, .75, 3, 50, 425, 1000];
  factors.forEach(f => {
    const days = f * 86400 * 1000;
    const d2 = cldr.Calendars.newGregorianDate(epoch + days, zone);
    const field = cldr.Calendars.fieldOfGreatestDifference(d1, d2);
    console.log(`${field} ->  ${d2.toString()}`);
  });

  console.log(SEP);
})();

// formatDate
(() => {
  const cldr = framework.get('en');

  // June 27, 2018 4:23:00 AM
  const epoch = 1530087780000;
  const zoneId = 'America/New_York';

  const result = cldr.Calendars.formatDate({ epoch, zoneId }, { datetime: 'full' });
  console.log(result);

  console.log(SEP);
})();

// formatDateToParts
(() => {
  const cldr = framework.get('en');

  // June 27, 2018 4:23:00 AM
  const epoch = 1530087780000;
  const zoneId = 'America/New_York';

  const result = cldr.Calendars.formatDateToParts({ epoch, zoneId }, { datetime: 'short' });
  console.log(result);

  console.log(SEP);
})();

// formatDateInterval
(() => {
  const cldr = framework.get('en');

  // June 27, 2018 4:23:00 AM
  const epoch = 1530087780000;
  const zoneId = 'America/New_York';

  const day = 86400000;
  const start = { epoch, zoneId };
  for (const days of [1.2, 3, 17, 73, 1000]) {
    const end = { epoch: epoch + (days * day), zoneId };
    const result = cldr.Calendars.formatDateInterval(start, end, { skeleton: 'yMMMd' });
    console.log(result);
  }

  console.log(SEP);
})();

// formatDateIntervalToParts
(() => {
  const cldr = framework.get('en');

  // June 27, 2018 4:23:00 AM
  const epoch = 1530087780000;
  const zoneId = 'America/New_York';

  const day = 86400000;
  const start = { epoch, zoneId };
  const end = { epoch: epoch + (day * 10), zoneId };
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


// newBuddhistDate
(() => {
  const cldr = framework.get('en');
  const date = cldr.Calendars.newBuddhistDate(1530124872456, 'America/New_York');
  console.log(date.toString());

  console.log(SEP);
})();


// newGregorianDate
(() => {
  const cldr = framework.get('en');
  const date = cldr.Calendars.newGregorianDate(1530124872456, 'America/New_York');
  console.log(date.toString());

  console.log(SEP);
})();
