---
id: version-0.25.20-api-dateskeleton
title: DateSkeleton
original_id: api-dateskeleton
---

A date skeleton is a string containing fields that should appear in a formatted date. It acts like a query, selecting the best-fit pattern among the available patterns for a given locale. It is also used to adjust a pattern to have the desired field width.

To create a skeleton simply create a string containing the date and time fields you want to appear, repeating the field character multiple times to set the field "width".

For example, using the locale `en-US`:

  1. Skeleton `"yMMMEEEEd"` selects the pattern [`"E, MMM d, y"`](https://github.com/unicode-cldr/cldr-dates-modern/blob/32.0.0/main/en/ca-gregorian.json#L382) by distance
  2. The weekday field "E" has width 4, so the final pattern is altered to: `"EEEE, MMM d, y"`
  3. The pattern is used to format the date: `"Wednesday, Jun 27, 2018"`

### Example

```typescript
const date = 1530087780000;
const zoneId = 'America/New_York';

const pad = (s: string) => ' '.repeat(10 - s.length) + s;
const skeletons = [
  'y', 'yM', 'yMM', 'yMMM', 'yMMMM', 'GyMMMM',
  'yMdE', 'yMMdEE', 'yMMMdEEE', 'yMMMdEEEE',
  'Bh', 'Bhm', 'EBhm', 'Hms', 'Hmsv', 'Hmsvvvv', 'Hmsz', 'Hmszzzz',
  'yMMMMEdB',
];

const locales = ['en', 'de', 'es'];
for (const locale of locales) {
  const cldr = framework.get(locale);
  const format = (skeleton: string) =>
    cldr.Calendars.formatDate({ date, zoneId },
      { context: 'standalone', skeleton });

  log(`Locale: ${locale}`);
  log();

  for (const skeleton of skeletons) {
    const res = format(skeleton);
    log(`${pad(skeleton)}  ${res}`);
  }
  log();
}
```
<pre class="output">
Locale: en
&nbsp;
         y  2018
        yM  6/2018
       yMM  06/2018
      yMMM  Jun 2018
     yMMMM  June 2018
    GyMMMM  June 2018 AD
      yMdE  Wed, 6/27/2018
    yMMdEE  Wed, 06/27/2018
  yMMMdEEE  Wed, Jun 27, 2018
 yMMMdEEEE  Wednesday, Jun 27, 2018
        Bh  4 at night
       Bhm  4:23 at night
      EBhm  Wed, 4:23 at night
       Hms  04:23:00
      Hmsv  04:23:00 ET
   Hmsvvvv  04:23:00 Eastern Time
      Hmsz  04:23:00 EDT
   Hmszzzz  04:23:00 Eastern Daylight Time
  yMMMMEdB  Wed, June 27, 2018 at 4 at night
&nbsp;
Locale: de
&nbsp;
         y  2018
        yM  6.2018
       yMM  06.2018
      yMMM  Juni 2018
     yMMMM  Juni 2018
    GyMMMM  Juni 2018 n. Chr.
      yMdE  Mi., 27.6.2018
    yMMdEE  Mi., 27.06.2018
  yMMMdEEE  Mi., 27. Juni 2018
 yMMMdEEEE  Mittwoch, 27. Juni 2018
        Bh  4 nachts
       Bhm  4:23 nachts
      EBhm  Mi., 4:23 nachts
       Hms  04:23:00
      Hmsv  04:23:00 GMT-4
   Hmsvvvv  04:23:00 Nordamerikanische Ostküstenzeit
      Hmsz  04:23:00 GMT-4
   Hmszzzz  04:23:00 Nordamerikanische Ostküsten-Sommerzeit
  yMMMMEdB  Mi., 27. Juni 2018 um 4 nachts
&nbsp;
Locale: es
&nbsp;
         y  2018
        yM  6/2018
       yMM  06/2018
      yMMM  Jun. 2018
     yMMMM  Junio de 2018
    GyMMMM  Junio de 2018 d. C.
      yMdE  Mié., 27/6/2018
    yMMdEE  Mié., 27/06/2018
  yMMMdEEE  Mié., 27 jun. 2018
 yMMMdEEEE  Miércoles, 27 de jun. de 2018
        Bh  4 de la madrugada
       Bhm  4:23 de la madrugada
      EBhm  Mié. 4:23 de la madrugada
       Hms  4:23:00
      Hmsv  4:23:00 GMT-4
   Hmsvvvv  4:23:00 (hora oriental)
      Hmsz  4:23:00 GMT-4
   Hmszzzz  4:23:00 hora de verano oriental
  yMMMMEdB  Mié., 27 de junio de 2018, 4 de la madrugada
&nbsp;
</pre>


{%refs DateSkeleton}
