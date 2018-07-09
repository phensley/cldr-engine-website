import { framework } from './helpers';
import { RelativeTimeFormatOptions } from '@phensley/cldr';

const SEP = '\n--------------------------------\n\n';

(() => {
  const cldr = framework.get('en');
  const opts: RelativeTimeFormatOptions = { width: 'wide' };
  for (const n of [-5, -2, -1, 0, 1, 2, 5]) {
    console.log(cldr.Calendars.formatRelativeTimeField(n, 'day', opts));
  }
})();
