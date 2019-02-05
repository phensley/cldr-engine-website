import { framework } from './helpers';

const SEP = '\n--------------------------------\n\n';

(() => {
  const cldr = framework.get('en');
  const date = 1530087780000;
  const zoneId = 'America/New_York';
  let result = cldr.Calendars.formatDate({ date, zoneId }, { date: 'short' });
  console.log(result);

  result = cldr.Calendars.formatDate({ date, zoneId }, { date: 'full' });
  console.log(result);

  console.log(SEP);
})();
