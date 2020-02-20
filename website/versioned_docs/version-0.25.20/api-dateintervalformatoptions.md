---
id: version-0.25.20-api-dateintervalformatoptions
title: DateIntervalFormatOptions
original_id: api-dateintervalformatoptions
---

Options used for date interval formatting.

### Syntax

<pre class="syntax">
object {
  skeleton?,
  date?,
  time?,
  ca?,
  nu?,
  context?
}
</pre>

### Properties
  - <code class="def">skeleton: <span>string ([DateSkeleton](api-dateskeleton.html))</span></code>
    - Skeleton used to build the interval format pattern
  - <code class="def">date: <span>string ([DateSkeleton](api-dateskeleton.html))</span></code>
    - Skeleton to use when difference between start and end dates is >= 1 day
  - <code class="def">time: <span>string ([DateSkeleton](api-dateskeleton.html))</span></code>
    - Skeleton to use when difference between start and end dates is < 1 day
  - <code class="def">ca: <span>[CalendarType](api-calendartype.html)</span></code>
    - Override the calendar to use
  - <code class="def">nu: <span>[NumberSystemType](api-numbersystemtype.html)</span></code>
    - Override the numbering system
  - <code class="def">context?: <span>[ContextType](api-contexttype.html)</span></code>
    - Specify the context in which the string will be displayed

### Defaults

```javascript
{
  context: 'middle-of-text'
}
```

* If no skeleton is provided, a reasonable default will be automatically selected based on whether the interval is greater- or less-than one day.
* Numbering system default is determined by the locale.
* Calendar system default is determined by the locale.

### Example

```typescript
// June 27, 2018 4:23:00 AM
const epoch = 1530087780000;
const zoneId = 'America/New_York';

const day = 86400000;
const start = { date: epoch, zoneId };

for (const locale of ['en', 'de', 'zh']) {
  const cldr = framework.get(locale);
  for (const days of [1.2, 3, 17, 73, 1000]) {
    const end = { date: epoch + (days * day), zoneId };
    const result = cldr.Calendars.formatDateInterval(start, end, { skeleton: 'yMMMMd' });
    log(`${locale}  ${result}`);
  }
  log();
}
```
<pre class="output">
en  June 27 – 28, 2018
en  June 27 – 30, 2018
en  June 27 – July 14, 2018
en  June 27 – September 8, 2018
en  June 27, 2018 – March 23, 2021
&nbsp;
de  27.–28. Juni 2018
de  27.–30. Juni 2018
de  27. Juni – 14. Juli 2018
de  27. Juni – 8. September 2018
de  27. Juni 2018 – 23. März 2021
&nbsp;
zh  2018年6月27日至28日
zh  2018年6月27日至30日
zh  2018年6月27日至7月14日
zh  2018年6月27日至9月8日
zh  2018年6月27日至2021年3月23日
&nbsp;
</pre>

Provide 2 skeletons, one to use if the field of visual difference is greater-
 or less-than one day:

```typescript
const cldr = framework.get('en');
// June 27, 2018 4:23:00 AM
const epoch = 1530087780000;
const zoneId = 'America/New_York';
const start = cldr.Calendars.toGregorianDate({ date: epoch, zoneId });

// Two different skeletons to use, if the difference between start
// and end dates is greater or less than one day
const opts = { date: 'EEEyMMMd', time: 'hmsa' };

const fmt = (d: CalendarDate) =>
  log(cldr.Calendars.formatDateInterval(start, d, opts));

fmt(start.add({ minute: 1.5 }));
fmt(start.add({ hour: 1.5 }));
fmt(start.add({ hour: 13.5 }));
fmt(start.add({ day: 1.5 }));
fmt(start.add({ week: 1.5 });
fmt(start.add({ month: 1.5 }));
```
<pre class="output">
4:23 – 4:24 AM
4:23 – 5:53 AM
4:23 AM – 5:53 PM
Wed, Jun 27 – Thu, Jun 28, 2018
Wed, Jun 27 – Sat, Jul 7, 2018
Wed, Jun 27 – Sat, Aug 11, 2018
</pre>

{%refs DateIntervalFormatOptions}