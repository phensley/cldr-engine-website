---
id: api-cldr-calendars
title: CLDR.Calendars
---

The `CLDR.Calendars` namespace allows you to:
  * Construct dates in different calendars
  * Format dates and times
  * Format date-time intervals
  * Format relative times
  * Obtain weekday and month names for a given calendar
  * Calculate the field of greatest difference between two dates

## dateField

Formats a date field's name.

#### Syntax

<pre class="syntax">
dateField(type: DateFieldType, options?: DateFieldFormatOptions): string
</pre>

#### Parameters

  - <code class="def">field: <span>[DateFieldType](api-datefieldtype.html)</span></code>
    - Field indicating the field name to be formatter, e.g. `"month"`
  - <code class="def">options?: <span>[DateFieldFormatOptions](api-datefieldformatoptions.html)</span></code>
    - Options for field width, context, etc.

#### Example

```typescript
for (const id of ['en', 'es', 'de', 'fr', 'zh']) {
  const cldr = framework.get(id);
  const s = cldr.Calendars.dateField('year', { context: 'begin-sentence' });
  console.log(s);
}
```

<pre class="output">
Year
Año
Jahr
Année
年
</pre>


## dayPeriods

Returns a mapping of day period key to name for the current locale.

#### Syntax

<pre class="syntax">
dayPeriods(options?): any
</pre>

#### Parameters
  - <code class="def">options?: <span>[CalendarFieldOptions](api-calendarfieldoptions.html)</span></code>
    - Options for field width, context, etc.

#### Example

```typescript
const en = framework.get('en');
en.Calendars.dayPeriods({ width: 'wide', context: 'begin-sentence' });
```

<pre class="output">
{
  noon: 'Noon',
  midnight: 'Midnight',
  am: 'AM',
  pm: 'PM',
  morning1: 'Morning',
  afternoon1: 'Afternoon',
  evening1: 'Evening',
  night1: 'Night'
}
</pre>



## eras

Return a mapping of era key to name for the current locale.

#### Syntax

<pre class="syntax">
eras(options?): any
</pre>

#### Parameters
  - <code class="def">options?: <span>[EraFieldOptions](api-erafieldoptions.html)</span></code>
    - Options for field width, context, etc.

#### Example

```typescript
const en = framework.get('en');
en.Calendars.eras({ width: 'names' });
```

<pre class="output">
{ '0': 'Before Christ', '1': 'Anno Domini' }
</pre>


## fieldOfGreatestDifference

Computes the field of greatest different between two dates. Date arguments can be [CalendarDate](api-calendardate.html), [ZonedDateTime](api-zoneddatetime.html) instances, or a bare JavaScript `Date`.

#### Syntax

<pre class="syntax">
fieldOfGreatestDifference(a, b): DateTimePatternFieldType
</pre>

#### Parameters
  - <code class="def">a: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
    - First date to compare
  - <code class="def">b: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
    - Second date to compare

#### Return value
  - A [DateTimePatternFieldType](api-datetimepatternfieldtype.html) indicating the field with the greatest difference

#### Example

```typescript
// June 27, 2018 4:23:00 AM
const date = 1530087780000;
const zoneId = 'America/New_York';
const d1 = cldr.Calendars.toGregorianDate({ date, zoneId });

const factors = [0.0002, 0.005, 0.25, .75, 3, 50, 425, 1000];
factors.forEach(f => {
  const days = f * 86400 * 1000;
  const d2 = cldr.Calendars.toGregorianDate({ date: epoch + days, zoneId });
  const field = cldr.Calendars.fieldOfGreatestDifference(d1, d2);
  console.log(`${field} ->  ${d2.toString()}`);
});
```

<pre class="output">
s ->  Gregorian 2018-06-27 04:23:17.280 America/New_York
m ->  Gregorian 2018-06-27 04:30:12.000 America/New_York
H ->  Gregorian 2018-06-27 10:23:00.000 America/New_York
a ->  Gregorian 2018-06-27 22:23:00.000 America/New_York
d ->  Gregorian 2018-06-30 04:23:00.000 America/New_York
M ->  Gregorian 2018-08-16 04:23:00.000 America/New_York
y ->  Gregorian 2019-08-26 04:23:00.000 America/New_York
y ->  Gregorian 2021-03-23 04:23:00.000 America/New_York
</pre>


## formatDate

Format a date to a string.

#### Syntax
<pre class="syntax">
formatDate(date, options?): string
</pre>

#### Parameters
  - <code class="def">date: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
    - Date or timestamp to format
  - <code class="def">options?: <span>[DateFormatOptions](api-dateformatoptions.html)</span></code>
    - Options to control formatting

#### Example

```typescript
const date = 1530087780000;
const zoneId = 'America/New_York';
cldr.Calendars.formatDate({ date, zoneId }, { datetime: 'full' });
```

<pre class="output">
Wednesday, June 27, 2018 at 4:23:00 AM Eastern Daylight Time
</pre>



## formatDateToParts

Format a date to an array of parts.

#### Syntax
<pre class="syntax">
formatDateToParts(date, options?): Part[]
</pre>

#### Parameters
  - <code class="def">date: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
    - Date or timestamp to format
  - <code class="def">options?: <span>[DateFormatOptions](api-dateformatoptions.html)</span></code>
    - Options to control formatting

#### Example
```typescript
// June 27, 2018 4:23:00 AM
const date = 1530087780000;
const zoneId = 'America/New_York';

cldr.Calendars.formatDateToParts({ date, zoneId }, { datetime: 'short' });
```
<pre class="output">
[
  { type: 'month', value: '6' },
  { type: 'literal', value: '/' },
  { type: 'day', value: '27' },
  { type: 'literal', value: '/' },
  { type: 'year', value: '18' },
  { type: 'literal', value: ', ' },
  { type: 'hour', value: '4' },
  { type: 'literal', value: ':' },
  { type: 'minute', value: '23' },
  { type: 'literal', value: ' ' },
  { type: 'dayperiod', value: 'AM' }
]
</pre>


## formatDateInterval

Format a start and end date range to a string.

#### Syntax

<pre class="syntax">
formatDateInterval(start, end, options?): string
</pre>

#### Parameters
  - <code class="def">start: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
    - Start of the date range
  - <code class="def">end: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
    - End of the date range
  - <code class="def">options?: <span>[DateIntervalFormatOptions](api-dateintervalformatoptions.html)</span></code>
    - Options to control the format

#### Example

```typescript
// June 27, 2018 4:23:00 AM
const epoch = 1530087780000;
const zoneId = 'America/New_York';

const day = 86400000;
const start = { date: epoch, zoneId };
for (const days of [1.2, 3, 17, 73, 1000]) {
  const end = { date: epoch + (days * day), zoneId };
  const result = cldr.Calendars.formatDateInterval(start, end, { skeleton: 'yMMMd' });
  console.log(result);
}
```

<pre class="output">
Jun 27 – 28, 2018
Jun 27 – 30, 2018
Jun 27 – Jul 14, 2018
Jun 27 – Sep 8, 2018
Jun 27, 2018 – Mar 23, 2021
</pre>



## formatDateIntervalToParts

Format a start and end date range to an array of parts.

#### Syntax
<pre class="syntax">
formatDateIntervalToParts(start, end, options?): Part[]
</pre>

#### Parameters
  - <code class="def">start: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
    - Start of the date range
  - <code class="def">end: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
    - End of the date range
  - <code class="def">options?: <span>[DateIntervalFormatOptions](api-dateintervalformatoptions.html)</span></code>
    - Options to control the format

#### Example

```typescript
// June 27, 2018 4:23:00 AM
const epoch = 1530087780000;
const zoneId = 'America/New_York';

const day = 86400000;
const start = { date: epoch, zoneId };
const end = { date: epoch + (day * 10), zoneId };
cldr.Calendars.formatDateIntervalToParts(start, end, { skeleton: 'yMMMd' });
```

<pre class="output">
[
  { type: 'month', value: 'Jun' },
  { type: 'literal', value: ' ' },
  { type: 'day', value: '27' },
  { type: 'literal', value: ' – ' },
  { type: 'month', value: 'Jul' },
  { type: 'literal', value: ' ' },
  { type: 'day', value: '7' },
  { type: 'literal', value: ', ' },
  { type: 'year', value: '2018' }
]
</pre>



## formatDateRaw

Format a date to a string using a user-supplied pattern.

**Warning**: Only use this if you know what you're doing. Using a pre-defined CLDR format is recommended.

#### Syntax

<pre class="syntax">
formatDateRaw(date, options?): string
</pre>

#### Parameters

  - <code class="def">date: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
    - Date or timestamp to format
  - <code class="def">options?: <span>[DateRawFormatOptions](api-daterawformatoptions.html)</span></code>
    - Options to control formatting

#### Example

```typescript
// June 27, 2018 4:23:00 AM
const date = 1530087780000;
const zoneId = 'America/New_York';

const s = cldr.Calendars.formatDateRaw({ date, zoneId }, { pattern: 'EEE MMM y, d' });
console.log(s);
```

<pre class="output">
Wed Jun 2018, 27
</pre>


## formatDateRawToParts

Format a date to parts using a user-supplied pattern.

**Warning**: Only use this if you know what you're doing. Using a pre-defined CLDR format is recommended.

#### Syntax

<pre class="syntax">
formatDateRawToParts(date, options?): Part[]
</pre>

#### Parameters

  - <code class="def">date: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
    - Date or timestamp to format
  - <code class="def">options?: <span>[DateRawFormatOptions](api-daterawformatoptions.html)</span></code>
    - Options to control formatting

#### Example

```typescript
// June 27, 2018 4:23:00 AM
const date = 1530087780000;
const zoneId = 'America/New_York';

const p = cldr.Calendars.formatDateRawToParts({ date, zoneId }, { pattern: 'EEE MMM y, d' });
console.log(p);
```

<pre class="output">
[
  { type: 'weekday', value: 'Wed' },
  { type: 'literal', value: ' ' },
  { type: 'month', value: 'Jun' },
  { type: 'literal', value: ' ' },
  { type: 'year', value: '2018' },
  { type: 'literal', value: ', ' },
  { type: 'day', value: '27' }
]
</pre>



## formatRelativeTimeField

Formats a value as a unit of relative time.

#### Syntax
<pre class="syntax">
formatRelativeTimeField(value, field, options?): string
</pre>

#### Parameters
  - <code class="def">value: <span>number | string | [Decimal](api-decimal.html)</span></code>
    - Number of units
  - <code class="def">field: <span>[RelativeTimeFieldType](api-relativetimefieldtype.html)</span></code>
    - Field indicating the unit of relative time, e.g. `"month"`
  - <code class="def">options?: <span>[RelativeTimeFormatOptions](api-relativetimeformatoptions.html)</span></code>
    - Options to control the format

#### Example

```typescript
for (const value of ['-2', -1, '0', 1, 3, new Decimal('12.5')]) {
  const result = cldr.Calendars.formatRelativeTimeField(value, 'month', { });
  console.log(result);
}
```

<pre class="output">
2 months ago
last month
this month
next month
in 3 months
in 12.5 months
</pre>


## months

Returns a mapping of month ordinal number to name for the current locale.

#### Syntax

<pre class="syntax">
months(options?): any
</pre>

#### Parameters
  - <code class="def">options?: <span>[CalendarFieldOptions](api-calendarfieldoptions.html)</span></code>
    - Options for field width, context, etc.

#### Example

```typescript
const en = framework.get('en');
const fr = framework.get('fr');

const context = 'begin-sentence';
const monthsEN = en.Calendars.months({ context });
const monthsFR = fr.Calendars.months({ context });

console.log(monthsEN);
console.log(monthsFR);

const date = en.Calendars.toGregorianDate({
  date: new Date(2018, 5, 11, 12, 1, 12),
  zoneId: 'America/New_York'
});

console.log(`month is ${monthsEN[date.month()]} / ${monthsFR[date.month()]}`);
```

<pre class="output">
{
  '1': 'January',
  '2': 'February',
  '3': 'March',
  '4': 'April',
  '5': 'May',
  '6': 'June',
  '7': 'July',
  '8': 'August',
  '9': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
}
{ '1': 'Janvier',
  '2': 'Février',
  '3': 'Mars',
  '4': 'Avril',
  '5': 'Mai',
  '6': 'Juin',
  '7': 'Juillet',
  '8': 'Août',
  '9': 'Septembre',
  '10': 'Octobre',
  '11': 'Novembre',
  '12': 'Décembre'
}
month is June / Juin
</pre>


## quarters

Return a mapping of quarter ordinal number to name for the current locale.

#### Syntax

<pre class="syntax">
quarters(options?): any
</pre>

#### Parameters
  - <code class="def">options?: <span>[CalendarFieldOptions](api-calendarfieldoptions.html)</span></code>
    - Options for field width, context, etc.

#### Example

```typescript
const en = framework.get('en');
en.Calendars.quarters();
```

<pre class="output">
{
  '1': '1st quarter',
  '2': '2nd quarter',
  '3': '3rd quarter',
  '4': '4th quarter'
}
</pre>


## resolveTimeZoneId

Given a timezone id or alias, returns the canonical [tzdb (timezone database)](https://www.iana.org/time-zones) identifier.

#### Syntax

<pre class="syntax">
resolveTimeZoneId(string): string;
</pre>

#### Example

```typescript
const en = framework.get('en');
en.Calendars.resolveTimeZoneId('UTC');
en.Calendars.resolveTimeZoneId('US/East-Indiana');
en.Calendars.resolveTimeZoneId('Antarctica/McMurdo');
```

<pre class="output">
Etc/UTC
America/Indiana/Indianapolis
Pacific/Auckland
</pre>

## timeZoneIds

Returns an array of timezone identifiers from the latest IANA [tzdb (timezone database)](https://www.iana.org/time-zones).

#### Syntax

<pre class="syntax">
timeZoneIds(): string[]
</pre>

#### Example

```typescript
const en = framework.get('en');
for (const id of en.Calendars.timeZoneIds()) {
  console.log(id);
}
```

<pre class="output">
Africa/Abidjan
Africa/Accra
Africa/Algiers
Africa/Bissau
Africa/Cairo
Africa/Casablanca
Africa/Ceuta
...
</pre>


## timeZoneInfo

Returns an array of `TimeZoneInfo` objects, including the exemplar city for each.


#### Syntax

<pre class="syntax">
timeZoneInfo(): TimeZoneInfo[]
</pre>


#### Example

```typescript
const en = framework.get('en');
for (const info of en.Calendars.timeZoneInfo()) {
  console.log(info);
}
```

<pre class="output">
{ id: 'Africa/Abidjan', city: { name: 'Abidjan' } }
{ id: 'Africa/Accra', city: { name: 'Accra' } }
{ id: 'Africa/Addis_Ababa', city: { name: 'Addis Ababa' } }
{ id: 'Africa/Algiers', city: { name: 'Algiers' } }
{ id: 'Africa/Asmera', city: { name: 'Asmara' } }
{ id: 'Africa/Bamako', city: { name: 'Bamako' } }
{ id: 'Africa/Bangui', city: { name: 'Bangui' } }
{ id: 'Africa/Banjul', city: { name: 'Banjul' } }
{ id: 'Africa/Bissau', city: { name: 'Bissau' } }
...
</pre>


## toBuddhistDate

Converts a date to a [BuddhistDate](api-buddhistdate.html) instance.

#### Syntax

<pre class="syntax">
toBuddhistDate(date): BuddhistDate
</pre>

#### Parameters
  - <code class="def">date: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
    - Date or timestamp to convert

#### Example

```typescript
cldr.Calendars.toBuddhistDate({
  date: 1530124872456, zoneId: 'America/New_York'});
```

<pre class="output">
Buddhist 2561-06-27 14:41:12.456 America/New_York
</pre>



## toGregorianDate

Converts a date to a [GregorianDate](api-gregoriandate.html) instance.

#### Syntax

<pre class="syntax">
toGregorianDate(date): GregorianDate
</pre>

#### Parameters
  - <code class="def">date: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
    - Date or timestamp to convert

#### Example

```typescript
cldr.Calendars.toGregorianDate({
  date: 1530124872456, zoneId: 'America/New_York' });
```

<pre class="output">
Gregorian 2018-06-27 14:41:12.456 America/New_York
</pre>

```typescript
// JavaScript Date is interpreted as a UTC date time
let date = new Date(2018, 1, 17, 12, 34, 56, 789);
const zoneId = 'America/New_York';

const d = cldr.Calendars.toGregorianDate({ date, zoneId  });
console.log(d.toString());

date = new Date(2018, 6, 17, 12, 34, 56, 789);
d = cldr.Calendars.toGregorianDate({ date, zoneId });
console.log(d.toString());
```

<pre class="output">
Gregorian 2018-02-17 07:34:56.789 America/New_York
Gregorian 2018-07-17 08:34:56.789 America/New_York
</pre>


## toISO8601Date

Converts a date to a [ISO8601Date](api-iso8601date.html) instance.

<pre class="syntax">
toISO8601Date(date): ISO8601Date
</pre>

#### Parameters
  - <code class="def">date: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
    - Date or timestamp to convert

#### Example

```typescript
const cldr = framework.get('en');
const weekdays = cldr.Calendars.weekdays();
const date = cldr.Calendars.toGregorianDate({ date: new Date(2017, 0, 1) });
const iso = cldr.Calendars.toISO8601Date(date);

const wk = (d: CalendarDate) => `week starts on ${weekdays[d.firstDayOfWeek()]}`;
const woy = (d: CalendarDate) => `week of year: ${d.yearOfWeekOfYear()}-${d.weekOfYear()}`;

console.log(`gregorian ${wk(date)}, ${woy(date)}`);
console.log(` iso-8601 ${wk(iso)}, ${woy(iso)}`);
```

<pre class="output">
gregorian week starts on Sunday, week of year: 2017-1
 iso-8601 week starts on Monday, week of year: 2016-52
</pre>


## toJapaneseDate

Converts a date to a [JapaneseDate](api-japanesedate.html) instance.

<pre class="syntax">
toJapaneseDate(date): JapaneseDate
</pre>

#### Parameters
  - <code class="def">date: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
    - Date or timestamp to convert

#### Example

```typescript
let date: JapaneseDate;
date = cldr.Calendars.toGregorianDate({
  date: 1530124872456, zoneId: 'America/New_York' });
console.log(date.toString());
console.log(date.relatedYear());
console.log(date.year());
```

<pre class="output">
Japanese 2018-06-27 14:41:12.456 America/New_York
2018
30
</pre>


## toPersianDate



## weekdays

Return a mapping of weekday ordinal number to name for the current locale.

#### Syntax

<pre class="syntax">
weekdays(options?): any
</pre>

#### Parameters
  - <code class="def">options?: <span>[CalendarFieldOptions](api-calendarfieldoptions.html)</span></code>
    - Options for field width, context, etc.

#### Example

```typescript
const en = framework.get('en');
const es = framework.get('es');
const context = 'ui-list-or-menu';

console.log(en.Calendars.weekdays({ context }));
console.log(es.Calendars.weekdays({ context }));
```

<pre class="output">
{ '1': 'Sunday',
  '2': 'Monday',
  '3': 'Tuesday',
  '4': 'Wednesday',
  '5': 'Thursday',
  '6': 'Friday',
  '7': 'Saturday'
}
{ '1': 'Domingo',
  '2': 'Lunes',
  '3': 'Martes',
  '4': 'Miércoles',
  '5': 'Jueves',
  '6': 'Viernes',
  '7': 'Sábado'
}
</pre>
