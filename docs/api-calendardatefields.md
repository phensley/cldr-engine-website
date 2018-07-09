---
id: api-calendardatefields
title: CalendarDateFields
---

Properties to add or subtract an amount from one or more [CalendarDate](api-calendardate.html) fields.

### Syntax

<pre class="syntax">
object {
  year?,
  month?,
  week?,
  day?,
  hour?,
  minute?,
  second?,
  millis?,
  zoneId?
}
</pre>

### Properties

  - <code class="def">year?: <span>number</span></code>
    - Positive or negative years
  - <code class="def">month?: <span>number</span></code>
    - Positive or negative months
  - <code class="def">week?: <span>number</span></code>
    - Positive or negative weeks
  - <code class="def">day?: <span>number</span></code>
    - Positive or negative days
  - <code class="def">hour?: <span>number</span></code>
    - Positive or negative hours
  - <code class="def">minute?: <span>number</span></code>
    - Positive or negative minutes
  - <code class="def">second?: <span>number</span></code>
    - Positive or negative seconds
  - <code class="def">millis?: <span>number</span></code>
    - Positive or negative milliseconds
  - <code class="def">zoneId?: <span>string</span></code>
    - Change the timezone identifier

### Example

```typescript
const zoneId = 'America/New_York';
const opts: DateFormatOptions = { datetime: 'long' };
const deltas: CalendarDateFields[] = [
  { year: 1, month: -2 },
  { year: 5, day: 17, hour: -5 },
  { year: -10, month: 2, zoneId: 'Europe/Paris' }
];

const base = { date: new Date(2018, 6, 1, 14, 15, 16), zoneId };
const date = cldr.Calendars.toGregorianDate(base);
console.log(cldr.Calendars.formatDate(date, opts));
for (const delta of deltas) {
  const result = cldr.Calendars.formatDate(date.add(delta), opts);
  console.log(`\n${inspect(delta)}\n${result}`);
}
```

<pre class="output">
July 1, 2018 at 10:15:16 AM EDT
&nbsp;
{ year: 1, month: -2 }
May 1, 2019 at 10:15:16 AM EDT
&nbsp;
{ year: 5, day: 17, hour: -5 }
July 18, 2023 at 5:15:16 AM EDT
&nbsp;
{ year: -10, month: 2, zoneId: 'Europe/Paris' }
September 1, 2008 at 4:15:16 PM GMT+2
</pre>
