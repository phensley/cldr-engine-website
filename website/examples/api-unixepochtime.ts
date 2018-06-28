import { framework } from './helpers';
import { UnixEpochTime } from '@phensley/cldr';

(() => {
  const cldr = framework.get('en');
  let time: UnixEpochTime = { epoch: -6105991722000, zoneId: 'America/New_York' };
  let result = cldr.Calendars.formatDate(time, { date: 'full' });
  console.log(result);
})();

(() => {
  const cldr = framework.get('en');

  const day = 86400 * 1000;
  const epoch = -12219223722000;
  let time: UnixEpochTime = { epoch: epoch - day, zoneId: 'Europe/Rome' };
  let result = cldr.Calendars.formatDate(time, { date: 'full' });
  console.log(result);

  time = { epoch, zoneId: 'Europe/Rome' };
  result = cldr.Calendars.formatDate(time, { date: 'full' });
  console.log(result);
})();
