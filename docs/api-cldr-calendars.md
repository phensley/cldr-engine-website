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

## dayPeriods

Returns a mapping of day period key to name for the current locale.

#### Syntax

<pre class="syntax">
dayPeriods([calendar]): { [x: string]: string }
</pre>

#### Parameters
  - <code class="def">calendar? <span>[CalendarType](api-calendartype.html)</span></code>
    - Override the calendar type

#### Example

```typescript
const en = framework.get('en');
en.Calendars.dayPeriods();
```

<pre class="output">
{
  noon: 'noon',
  midnight: 'midnight',
  am: 'AM',
  pm: 'PM',
  morning1: 'morning',
  afternoon1: 'afternoon',
  evening1: 'evening',
  night1: 'night'
}
</pre>



## fieldOfGreatestDifference

Computes the field of greatest different between two [CalendarDate](api-calendardate.html) instances.

#### Syntax

<pre class="syntax">
fieldOfGreatestDifference(a, b): DateTimePatternFieldType
</pre>

#### Parameters
  - <code class="def">a: <span>[CalendarDate](api-calendardate.html)</span></code>
    - First date to compare
  - <code class="def">b: <span>[CalendarDate](api-calendardate.html)</span></code>
    - Second date to compare

#### Return value
  - A [DateTimePatternFieldType](api-datetimepatternfieldtype.html) indicating the field with the greatest difference

#### Example

```typescript
// June 27, 2018 4:23:00 AM
const epoch = 1530087780000;
const zoneId = 'America/New_York';
const d1 = cldr.Calendars.toGregorianDate({ epoch, zoneId });

const factors = [0.0002, 0.005, 0.25, .75, 3, 50, 425, 1000];
factors.forEach(f => {
  const days = f * 86400 * 1000;
  const d2 = cldr.Calendars.toGregorianDate({ epoch: epoch + days, zoneId });
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

Format a [CalendarDate](api-calendardate.html) or [UnixEpochTime](api-unixepochtime.html) instance to a string.

#### Syntax
<pre class="syntax">
formatDate(date [, options]): string
</pre>

#### Parameters
  - <code class="def">date: <span>[CalendarDate](api-calendardate.html) | [UnixEpochTime](api-unixepochtime.html)</span></code>
    - Date or timestamp to format
  - <code class="def">options?: <span>[DateFormatOptions](api-dateformatoptions.html)</span></code>
    - Options to control formatting

#### Example

```typescript
const epoch = 1530087780000;
const zoneId = 'America/New_York';
cldr.Calendars.formatDate({ epoch, zoneId }, { datetime: 'full' });
```

<pre class="output">
Wednesday, June 27, 2018 at 4:23:00 AM Eastern Daylight Time
</pre>



## formatDateToParts

Format a [CalendarDate](api-calendardate.html) or [UnixEpochTime](api-unixepochtime.html) instance to an array of parts.

#### Parameters
  - <code class="def">date: <span>[CalendarDate](api-calendardate.html) | [UnixEpochTime](api-unixepochtime.html)</span></code>
    - Date or timestamp to format
  - <code class="def">options?: <span>[DateFormatOptions](api-dateformatoptions.html)</span></code>
    - Options to control formatting

#### Example
```typescript
// June 27, 2018 4:23:00 AM
const epoch = 1530087780000;
const zoneId = 'America/New_York';

cldr.Calendars.formatDateToParts({ epoch, zoneId }, { datetime: 'short' });
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
formatDateInterval(start, end [, options]): string
</pre>

#### Parameters
  - <code class="def">start: <span>[CalendarDate](api-calendardate.html) | [UnixEpochTime](api-unixepochtime.html)</span></code>
    - Start of the date range
  - <code class="def">end: <span>[CalendarDate](api-calendardate.html) | [UnixEpochTime](api-unixepochtime.html)</span></code>
    - End of the date range
  - <code class="def">options?: <span>[DateIntervalFormatOptions](api-dateintervalformatoptions.html)</span></code>
    - Options to control the format

#### Examples

```typescript
// June 27, 2018 4:23:00 AM
const epoch = 1530087780000;
const zoneId = 'America/New_York';

const day = 86400000;
const start = { epoch, zoneId };
for (const days of [1.2, 3, 17, 73, 1000]) {
  const end = { epoch: epoch + (days * day), zoneId };
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
formatDateInterval(start, end [, options]): Part[]
</pre>

#### Parameters
  - <code class="def">start: <span>[CalendarDate](api-calendardate.html) | [UnixEpochTime](api-unixepochtime.html)</span></code>
    - Start of the date range
  - <code class="def">end: <span>[CalendarDate](api-calendardate.html) | [UnixEpochTime](api-unixepochtime.html)</span></code>
    - End of the date range
  - <code class="def">options?: <span>[DateIntervalFormatOptions](api-dateintervalformatoptions.html)</span></code>
    - Options to control the format

#### Example

```typescript
// June 27, 2018 4:23:00 AM
const epoch = 1530087780000;
const zoneId = 'America/New_York';

const day = 86400000;
const start = { epoch, zoneId };
const end = { epoch: epoch + (day * 10), zoneId };
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



## formatDateRawToParts


## formatRelativeTimeField

Formats a value as a unit of relative time.

#### Syntax
<pre class="syntax">
formatRelativeTimeField(value, field [, options]): string
</pre>

#### Parameters
  - <code class="def">value: <span>number | string | [Decimal](api-decimal.html)</span></code>
    - Number of units
  - <code class="def">field: <span>[DateFieldType](api-datefieldtype.html)</span></code>
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
months([calendar]): { [x: number]: string }
</pre>

#### Parameters
  - <code class="def">calendar? <span>[CalendarType](api-calendartype.html)</span></code>
    - Override the calendar type

#### Example

```typescript
const en = framework.get('en');
const fr = framework.get('fr');

const monthsEN = en.Calendars.months();
console.log(monthsEN);

const monthsFR = fr.Calendars.months();
const date = en.Calendars.toGregorianDate({
  epoch: new Date(2018, 5, 11, 12, 1, 12),
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
month is June / juin
</pre>


## quarters

Return a mapping of quarter ordinal number to name for the current locale.

#### Syntax

<pre class="syntax">
quarters([calendar]): { [x: number]: string }
</pre>

#### Parameters
  - <code class="def">calendar? <span>[CalendarType](api-calendartype.html)</span></code>
    - Override the calendar type

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



## toBuddhistDate

Converts a [CalendarDate](api-calendardate.html) or [UnixEpochTime](api-unixepochtime.html) instance to a [BuddhistDate](api-buddhistdate.html).

#### Syntax

<pre class="syntax">
toBuddhistDate(date): BuddhistDate
</pre>

#### Parameters
  - <code>date: <span>[CalendarDate](api-calendardate.html) | [UnixEpochTime](api-unixepochtime.html)</span></code>
    - Date or timestamp to convert

#### Example

```typescript
cldr.Calendars.toBuddhistDate({ epoch: 1530124872456, zoneId: 'America/New_York'});
```

<pre class="output">
Buddhist 2561-06-27 14:41:12.456 America/New_York
</pre>



## toGregorianDate

Converts a [CalendarDate](api-calendardate.html) or [UnixEpochTime](api-unixepochtime.html) instance to a [GregorianDate](api-gregoriandate.html).

#### Syntax

<pre class="syntax">
toGregorianDate(date): GregorianDate
</pre>

#### Parameters
  - <code>date: <span>[CalendarDate](api-calendardate.html) | [UnixEpochTime](api-unixepochtime.html)</span></code>
    - Date or timestamp to convert

#### Examples

```typescript
cldr.Calendars.toGregorianDate({ epoch: 1530124872456, zoneId: 'America/New_York' });
```

<pre class="output">
Gregorian 2018-06-27 14:41:12.456 America/New_York
</pre>

```typescript
// JavaScript Date is interpreted as a UTC date time
let epoch = new Date(2018, 1, 17, 12, 34, 56, 789);
const date = cldr.Calendars.toGregorianDate({ epoch, zoneId: 'America/New_York' });
console.log(date.toString());

epoch = new Date(2018, 6, 17, 12, 34, 56, 789);
date = cldr.Calendars.toGregorianDate({ epoch, zoneId: 'America/New_York' });
console.log(date.toString());
```

<pre class="output">
Gregorian 2018-02-17 07:34:56.789 America/New_York
Gregorian 2018-07-17 08:34:56.789 America/New_York
</pre>

## toISO8601Date

## toJapaneseDate

## toPersianDate

## weekdays

Return a mapping of weekday ordinal number to name for the current locale.

#### Syntax

<pre class="syntax">
weekdays([calendar]): { [x: number]: string }
</pre>

#### Parameters
  - <code class="def">calendar? <span>[CalendarType](api-calendartype.html)</span></code>
    - Override the calendar type

#### Example

```typescript
const en = framework.get('en');
en.Calendars.weekdays();
```

<pre class="output">
{
  '1': 'Sunday',
  '2': 'Monday',
  '3': 'Tuesday',
  '4': 'Wednesday',
  '5': 'Thursday',
  '6': 'Friday',
  '7': 'Saturday'
}
</pre>