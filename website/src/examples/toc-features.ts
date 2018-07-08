import { CLDR } from '@phensley/cldr';
import { framework } from './helpers';

(() => {
  const date = new Date(2018, 6, 1, 12, 34, 56);
  const zoneId = 'America/New_York';
  const d = { date, zoneId };
  const f = (cldr: CLDR) => cldr.Calendars.formatDate(d, { datetime: 'full' });
  const res = ['en', 'fr', 'de', 'zh'].map(id => f(framework.get(id)));
  console.log(res.join('\n'));
})();
