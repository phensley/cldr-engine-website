import { framework } from './helpers';
import { ZonedDateTime } from '@phensley/cldr';

(() => {
  const cldr = framework.get('en');
  let time: ZonedDateTime = { date: -6105991722000, zoneId: 'America/New_York' };
  let result = cldr.Calendars.formatDate(time, { date: 'full' });
  console.log(result);
})();

(() => {
  const cldr = framework.get('en');

  const day = 86400 * 1000;
  const date = -12219223722000;
  let time: ZonedDateTime = { date: date - day, zoneId: 'Europe/Rome' };
  let result = cldr.Calendars.formatDate(time, { date: 'full' });
  console.log(result);

  time = { date, zoneId: 'Europe/Rome' };
  result = cldr.Calendars.formatDate(time, { date: 'full' });
  console.log(result);
})();
