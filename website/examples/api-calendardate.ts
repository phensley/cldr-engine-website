import { framework } from './helpers';

const SEP = '\n--------------------------------\n\n';

// fieldOfGreatestDifference
(() => {
  const cldr = framework.get('en');
  const date = cldr.Calendars.newGregorianDate(1530087780000, 'America/New_York');
  console.log(date.toString());
  console.log(date.add({ year: 1, month: 5 }).toString());
  console.log(date.add({ year: -5, day: 7, minute: 22 }).toString());
})();
