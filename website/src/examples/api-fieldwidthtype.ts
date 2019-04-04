import { framework } from './helpers';

{
  const cldr = framework.get('en');
  console.log(cldr.Calendars.weekdays({ width: 'wide' }));
  console.log(cldr.Calendars.weekdays({ width: 'abbreviated' }));
  console.log(cldr.Calendars.weekdays({ width: 'short' }));
  console.log(cldr.Calendars.weekdays({ width: 'narrow' }));
}
