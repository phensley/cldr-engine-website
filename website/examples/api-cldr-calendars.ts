import { framework } from './helpers';

const SEP = '\n--------------------------------\n\n';

// fieldOfGreatestDifference
(() => {
  const cldr = framework.get('en');

  // June 27, 2018 4:23:00 AM
  const base = 1530087780000;
  const zone = 'America/New_York';
  const d1 = cldr.Calendars.newGregorianDate(base, zone);

  const factors = [0.0002, 0.005, 0.25, .75, 3, 50, 425, 1000];
  factors.forEach(f => {
    const days = f * 86400 * 1000;
    const d2 = cldr.Calendars.newGregorianDate(base + days, zone);
    const field = cldr.Calendars.fieldOfGreatestDifference(d1, d2);
    console.log(`${field} ->  ${d2.toString()}`);
  });
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
