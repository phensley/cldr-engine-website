---
id: api-dateformatoptions
title: DateFormatOptions
---

### Syntax

<pre class="syntax">
object {
  datetime,
  date,
  time,
  skeleton,
  wrap,
  ca,
  nu
}
</pre>

### Properties
  - <code>datetime?: <span>[FormatWidthType](api-formatwidthtype.html)</span></code>
    - Format the date + time, using the format of the given width.
  - <code>date?: <span>[FormatWidthType](api-formatwidthtype.html)</span></code>
    - Format the date only, using the format of the given width.
  - <code>time?: <span>[FormatWidthType](api-formatwidthtype.html)</span></code>
    - Format the time only, using the format of the given width.
  - <code>skeleton?: <span>string ([date skeleton](api-date-time-skeleton.html)))</span></code>
    - Format using a flexible skeleton that defines which fields should appear in the date.
  - <code>wrap?: <span>[FormatWidthType](api-formatwidthtype.html)</span></code>
    - Override the wrapper used to format date + time.
  - <code>ca?: <span>[CalendarType](api-calendartype.html)</span></code>
    - Override the calendar. The argument will be converted to the requested calendar before formatting.
  - <code>nu?: <span>[NumberSystemType](api-numbersystemtype.html)</span></code>
    - Override the numbering system.

### Examples

```typescript
const epoch = 1530087780000;
const zoneId = 'America/New_York';
const opts: DateFormatOptions = { skeleton: 'yMMMEEEEdhm' };
cldr.Calendars.formatDate({ epoch, zoneId }, opts);
```

<pre class="output">
Wednesday, Jun 27, 2018, 4:23 AM
</pre>

```typescript
const opts: DateFormatOptions = { time: 'long' };
cldr.Calendars.formatDate({ epoch, zoneId }, opts);
```

<pre class="output">
4:23:00 AM EDT
</pre>

```typescript
const opts: DateFormatOptions = { date: 'short' };
cldr.Calendars.formatDate({ epoch, zoneId }, opts);
```

<pre class="output">
6/27/18
</pre>

```typescript
const opts: DateFormatOptions = { datetime: 'full', ca: 'japanese' };
cldr.Calendars.formatDate({ epoch, zoneId }, opts);
```

<pre class="output">
Wednesday, June 27, 30 Heisei at 4:23:00 AM Eastern Daylight Time
</pre>

```typescript
const cldr = framework.get('ar');
const opts: DateFormatOptions = { datetime: 'full' };
cldr.Calendars.formatDate({ epoch, zoneId }, opts);
```

<pre class="output">
الأربعاء، ٢٧ يونيو ٢٠١٨ ٤:٢٣:٠٠ ص التوقيت الصيفي الشرقي لأمريكا الشمالية
</pre>


```typescript
const cldr = framework.get('en-u-ca-buddhist');
const opts: DateFormatOptions = { date: 'full' };
cldr.Calendars.formatDate({ epoch, zoneId }, opts);
```

<pre class="output">
Wednesday, June 27, 2561 BE
</pre>
