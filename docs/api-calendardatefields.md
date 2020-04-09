---
id: api-calendardatefields
title: CalendarDateFields
---

Represents the primary date and time fields of a [CalendarDate](api-calendardate). Can be used to set individual fields, or fetch all fields, of a date instance.

### Syntax

<pre class="syntax">
  year,
  month,
  day,
  hour,
  minute,
  second,
  millis,
  zoneId
</pre>

### Properties

- <code class="def">year: <span>number</span></code>
  - Extended year
- <code class="def">month: <span>number</span></code>
  - Month
- <code class="def">day: <span>number</span></code>
  - Day of month
- <code class="def">hour: <span>number</span></code>
  - Hour 0-23
- <code class="def">minute: <span>number</span></code>
  - Minute 0-59
- <code class="def">second: <span>number</span></code>
  - Second 0-59
- <code class="def">millis: <span>number</span></code>
  - Milliseconds 0-999

### Example

```typescript
const cldr = framework.get('en');
const fieldsets: CalendarDateFields = [
  { year: 1994, day: 17, zoneId: 'America/New_York' },
  { year: 2020, hour: 15, second: 33 },
  { zoneId: 'America/Yellowknife' },
  { millis: 555 },
];
let date: CalendarDate;
for (const f of fieldsets) {
  date = cldr.Calendars.newGregorianDate(f);
  log(date);
}

log();
date = cldr.Calendars.newGregorianDate({
  year: 2020,
  month: 7,
  day: 15,
  hour: 17,
  minute: 45,
  second: 10,
  millis: 123,
  zoneId: 'America/New_York',
});
log(date.fields());
```
<pre class="output">
Gregorian 1994-01-17 00:00:00.000 America/New_York
Gregorian 2020-01-01 15:00:33.000 Etc/UTC
Gregorian 1970-01-01 00:00:00.000 America/Yellowknife
Gregorian 1970-01-01 00:00:00.555 Etc/UTC
&nbsp;
{
  year: 2020,
  month: 7,
  day: 15,
  hour: 17,
  minute: 45,
  second: 10,
  millis: 123,
  zoneId: 'America/New_York'
}
</pre>


{%refs CalendarDateFields}
