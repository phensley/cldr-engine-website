---
id: version-1.0.4-api-dateformatoptions
title: DateFormatOptions
original_id: api-dateformatoptions
---

### Syntax

<pre class="syntax">
object {
  datetime?,
  date?,
  time?,
  skeleton?,
  wrap?,
  ca?,
  nu?,
  context?
}
</pre>

### Properties
  - <code class="def">datetime?: <span>[FormatWidthType](api-formatwidthtype.html)</span></code>
    - Format the date + time, using the format of the given width.
  - <code class="def">date?: <span>[FormatWidthType](api-formatwidthtype.html)</span></code>
    - Format the date only, using the format of the given width.
  - <code class="def">time?: <span>[FormatWidthType](api-formatwidthtype.html)</span></code>
    - Format the time only, using the format of the given width.
  - <code class="def">skeleton?: <span>string ([DateSkeleton](api-dateskeleton.html)))</span></code>
    - Format using a flexible skeleton that defines which fields should appear in the date.
  - <code class="def">wrap?: <span>[FormatWidthType](api-formatwidthtype.html)</span></code>
    - Override the wrapper used to format date + time.
  - <code class="def">ca?: <span>[CalendarType](api-calendartype.html)</span></code>
    - Override the calendar. The argument will be converted to the requested calendar before formatting.
  - <code class="def">nu?: <span>[NumberSystemType](api-numbersystemtype.html)</span></code>
    - Override the numbering system.
  - <code class="def">context?: <span>[ContextType](api-contexttype.html)</span></code>
    - Specify the context in which the string will be display

### Defaults

```javascript
{
  date: 'full',
  context: 'middle-of-text'
}
```

* Numbering system default is determined by the locale.
* Calendar system default is determined by the locale.

### Example

```typescript
let cldr = framework.get('en');
const date = 1530087780000;
const zoneId = 'America/New_York';
let opts: DateFormatOptions;

opts = { skeleton: 'yMMMEEEEdhm' };
log(cldr.Calendars.formatDate({ date, zoneId }, opts));

opts = { time: 'long' };
log(cldr.Calendars.formatDate({ date, zoneId }, opts));

opts = { date: 'short' };
log(cldr.Calendars.formatDate({ date, zoneId }, opts));

opts = { datetime: 'full', ca: 'japanese' };
log(cldr.Calendars.formatDate({ date, zoneId }, opts));

cldr = framework.get('ar');
opts = { datetime: 'full' };
log(cldr.Calendars.formatDate({ date, zoneId }, opts));

cldr = framework.get('en-u-ca-buddhist');
opts = { date: 'full' };
log(cldr.Calendars.formatDate({ date, zoneId }, opts));
```
<pre class="output">
Wednesday, Jun 27, 2018, 4:23 AM
4:23:00 AM EDT
6/27/18
Wednesday, June 27, 30 Heisei at 4:23:00 AM Eastern Daylight Time
الأربعاء، ٢٧ يونيو ٢٠١٨ ٤:٢٣:٠٠ ص التوقيت الصيفي الشرقي لأمريكا الشمالية
Wednesday, June 27, 2561 BE
</pre>

{%refs DateFormatOptions}
