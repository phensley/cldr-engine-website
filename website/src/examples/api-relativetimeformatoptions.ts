import { framework } from './helpers';
import { RelativeTimeFormatOptions } from '@phensley/cldr';

const SEP = '\n--------------------------------\n\n';

(() => {
  const cldr = framework.get('en');
  const opts: RelativeTimeFormatOptions = { width: 'wide' };
  const start = cldr.Calendars.toGregorianDate(new Date(2019, 6, 11));
  for (const n of [-5, -2, -1, 0, 1, 2, 5]) {
    const end = start.add({ month: n });
    let a = cldr.Calendars.formatRelativeTime(start, end, opts);
    let b = cldr.Calendars.formatRelativeTime(start, end, { field: 'day', ...opts });
    console.log(`${a}  (${b})`);
  }
})();
