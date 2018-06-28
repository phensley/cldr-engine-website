import { framework } from './helpers';
import { DateFormatOptions } from '@phensley/cldr';

const SEP = '\n--------------------------------\n\n';

(() => {
  const cldr = framework.get('en');
  const epoch = 1530087780000;
  const zoneId = 'America/New_York';

  const opts: DateFormatOptions = { skeleton: 'yMMMEEEEdhm' };
  const result = cldr.Calendars.formatDate({ epoch, zoneId }, opts);
  console.log(result);

  console.log(SEP);
})();

(() => {
  const cldr = framework.get('en');
  const epoch = 1530087780000;
  const zoneId = 'America/New_York';

  const opts: DateFormatOptions = { time: 'long' };
  const result = cldr.Calendars.formatDate({ epoch, zoneId }, opts);
  console.log(result);

  console.log(SEP);
})();

(() => {
  const epoch = 1530087780000;
  const zoneId = 'America/New_York';

  const cldr = framework.get('en');
  const opts: DateFormatOptions = { date: 'short' };
  const result = cldr.Calendars.formatDate({ epoch, zoneId }, opts);
  console.log(result);

  console.log(SEP);
})();

(() => {
  const cldr = framework.get('en');
  const epoch = 1530087780000;
  const zoneId = 'America/New_York';

  const opts: DateFormatOptions = { datetime: 'full', ca: 'japanese' };
  const result = cldr.Calendars.formatDate({ epoch, zoneId }, opts);
  console.log(result);

  console.log(SEP);
})();

(() => {
  const epoch = 1530087780000;
  const zoneId = 'America/New_York';

  const cldr = framework.get('ar');
  const opts: DateFormatOptions = { datetime: 'full' };
  const result = cldr.Calendars.formatDate({ epoch, zoneId }, opts);
  console.log(result);

  console.log(SEP);
})();


(() => {
  const epoch = 1530087780000;
  const zoneId = 'America/New_York';

  const cldr = framework.get('en-u-ca-buddhist');
  const opts: DateFormatOptions = { date: 'full' };
  const result = cldr.Calendars.formatDate({ epoch, zoneId }, opts);
  console.log(result);

  console.log(SEP);
})();


