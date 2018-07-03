import { framework } from './helpers';

const SEP = '\n--------------------------------\n\n';

(() => {
  const cldr = framework.get('en');
  for (const n of [-5, -2, -1, 0, 1, 2, 5]) {
    console.log(cldr.Calendars.formatRelativeTimeField(n, 'day', { width: 'wide' }));
  }
})();
