---
id: version-0.17.4-api-dateintervalformatoptions
title: DateIntervalFormatOptions
original_id: api-dateintervalformatoptions
---

Options used for date interval formatting.

### Syntax

<pre class="syntax">
object {
  skeleton?,
  ca?,
  nu?,
  context?
}
</pre>

### Properties
  - <code class="def">skeleton: <span>string ([DateSkeleton](api-dateskeleton.html))</span></code>
    - Skeleton used to build the interval format pattern
  - <code class="def">ca: <span>[CalendarType](api-calendartype.html)</span></code>
    - Override the calendar to use
  - <code class="def">nu: <span>[NumberSystemType](api-numbersystemtype.html)</span></code>
    - Override the numbering system
  - <code class="def">context?: <span>[ContextType](api-contexttype.html)</span></code>
    - Specify the context in which the string will be displayed

### Defaults

```typescript
{
  skeleton: 'yMd',
  context: 'middle-of-text'
}
```

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
    console.log(`${locale}  ${result}`);
  }
  console.log();
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
</pre>

{%refs DateIntervalFormatOptions}