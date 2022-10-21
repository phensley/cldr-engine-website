---
id: version-1.6.0-api-timeperiod
title: TimePeriod
original_id: api-timeperiod
---

Represents a time period composed of several date and time fields. Can be used to add or subtract an amount from a [CalendarDate](api-calendardate.html), or as the result of [CalendarDate.difference](api-calendardate.html#difference).

### Syntax

<pre class="syntax">
object {
  year,
  month,
  week,
  day,
  hour,
  minute,
  second,
  millis
}
</pre>

### Properties

- <code class="def">year: <span>number</span></code>
  - Positive or negative years
- <code class="def">month: <span>number</span></code>
  - Positive or negative months
- <code class="def">week: <span>number</span></code>
  - Positive or negative weeks
- <code class="def">day: <span>number</span></code>
  - Positive or negative days
- <code class="def">hour: <span>number</span></code>
  - Positive or negative hours
- <code class="def">minute: <span>number</span></code>
  - Positive or negative minutes
- <code class="def">second: <span>number</span></code>
  - Positive or negative seconds
- <code class="def">millis: <span>number</span></code>
  - Positive or negative milliseconds

### Example

```typescript
const cldr = framework.get('en');
const zoneId = 'America/New_York';
const opts: DateFormatOptions = { datetime: 'long' };
const deltas: TimePeriod[] = [
  { year: 1, month: -2 },
  { year: 5, day: 17, hour: -5 },
  { year: -10, month: 2 },
];

const base = { date: new Date(2018, 6, 1, 14, 15, 16), zoneId };
const date = cldr.Calendars.toGregorianDate(base);
log(cldr.Calendars.formatDate(date, opts));
for (const delta of deltas) {
  const result = cldr.Calendars.formatDate(date.add(delta), opts);
  log();
  log(delta);
  log(result);
}
```
<pre class="output">
July 1, 2018 at 2:15:16 PM EDT
&nbsp;
{ year: 1, month: -2 }
May 1, 2019 at 2:15:16 PM EDT
&nbsp;
{ year: 5, day: 17, hour: -5 }
July 18, 2023 at 9:15:16 AM EDT
&nbsp;
{ year: -10, month: 2 }
September 1, 2008 at 2:15:16 PM EDT
</pre>


{%refs TimePeriod}
