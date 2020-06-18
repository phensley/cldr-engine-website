---
id: version-1.2.1-api-cldr-calendars
title: CLDR.Calendars
original_id: api-cldr-calendars
---

The `CLDR.Calendars` namespace allows you to:

- Construct dates in different calendars
- Format dates and times
- Format date-time intervals
- Format relative times
- Obtain weekday and month names for a given calendar
- Calculate the field of greatest difference between two dates

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
  log(s);
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
log(en.Calendars.dayPeriods({ width: 'wide', context: 'begin-sentence' }));
```
<pre class="output">
{
  noon: { none: 'Noon' },
  midnight: { none: 'Midnight' },
  am: { none: 'AM', casing: 'Am' },
  pm: { none: 'PM', casing: 'Pm' },
  morning1: { none: 'Morning' },
  morning2: {},
  afternoon1: { none: 'Afternoon' },
  afternoon2: {},
  evening1: { none: 'Evening' },
  evening2: {},
  night1: { none: 'Night' },
  night2: {}
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
log(en.Calendars.eras({ width: 'names' }));
```
<pre class="output">
{
  '0': { none: 'Before Christ', sensitive: 'Before Common Era' },
  '1': { none: 'Anno Domini', sensitive: 'Common Era' }
}
</pre>


## fieldOfVisualDifference

Computes the "first field of visual difference" between two dates. Date arguments can be [CalendarDate](api-calendardate.html), [ZonedDateTime](api-zoneddatetime.html) instances, or a bare JavaScript `Date`.

#### Syntax

<pre class="syntax">
fieldOfVisualDifference(a, b): DateTimePatternFieldType
</pre>

#### Parameters

- <code class="def">a: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
  - First date to compare
- <code class="def">b: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
  - Second date to compare

#### Return value

- A [DateTimePatternFieldType](api-datetimepatternfieldtype.html) indicating the first field of visual difference

#### Example

```typescript
const cldr = framework.get('en');

// June 27, 2018 4:23:00 AM
const date = 1530087780000;
const zoneId = 'America/New_York';
const d1 = cldr.Calendars.toGregorianDate({ date, zoneId });

const factors = [0.0002, 0.005, 0.25, 0.75, 3, 50, 425, 1000];
factors.forEach((f) => {
  const days = f * 86400 * 1000;
  const d2 = cldr.Calendars.toGregorianDate({ date: date + days, zoneId });
  const field = cldr.Calendars.fieldOfVisualDifference(d1, d2);
  log(`${field} ->  ${d2.toString()}`);
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


## firstDayOfWeek

Returns the weekday that starts the week in the date's locale, where 1 = SUNDAY, 2 = MONDAY, ..., 7 = SATURDAY

#### Syntax

<pre class="syntax">
firstDayOfWeek(): number
</pre>

#### Example

```typescript
let cldr = framework.get('en-US');
log(cldr.Calendars.firstDayOfWeek());

cldr = framework.get('und-EG');
log(cldr.Calendars.firstDayOfWeek());
```
<pre class="output">
1
7
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
const cldr = framework.get('en');
const date = 1530087780000;
const zoneId = 'America/New_York';
log(cldr.Calendars.formatDate({ date, zoneId }, { datetime: 'full' }));
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
const cldr = framework.get('en');
// June 27, 2018 4:23:00 AM
const date = 1530087780000;
const zoneId = 'America/New_York';
log(cldr.Calendars.formatDateToParts({ date, zoneId }, { datetime: 'short' }));
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
const cldr = framework.get('en');

// June 27, 2018 4:23:00 AM
const epoch = 1530087780000;
const zoneId = 'America/New_York';

const day = 86400000;
const start = { date: epoch, zoneId };
for (const days of [1.2, 3, 17, 73, 1000]) {
  const end = { date: epoch + days * day, zoneId };
  const result = cldr.Calendars.formatDateInterval(start, end, {
    skeleton: 'yMMMd',
  });
  log(result);
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
const cldr = framework.get('en');

// June 27, 2018 4:23:00 AM
const epoch = 1530087780000;
const zoneId = 'America/New_York';

const day = 86400000;
const start = { date: epoch, zoneId };
const end = { date: epoch + day * 10, zoneId };
log(
  cldr.Calendars.formatDateIntervalToParts(start, end, { skeleton: 'yMMMd' })
);
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
const cldr = framework.get('en');

// June 27, 2018 4:23:00 AM
const date = 1530087780000;
const zoneId = 'America/New_York';

const s = cldr.Calendars.formatDateRaw(
  { date, zoneId },
  { pattern: 'EEE MMM y, d' }
);
log(s);
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
const cldr = framework.get('en');

// June 27, 2018 4:23:00 AM
const date = 1530087780000;
const zoneId = 'America/New_York';

const p = cldr.Calendars.formatDateRawToParts(
  { date, zoneId },
  { pattern: 'EEE MMM y, d' }
);
log(p);
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


## formatDateWrapper

Formats a date and time string together using a wrapper format of the given width. This can be
used when you need to format a date and time string separately and join them together.

#### Syntax

<pre class="syntax">
formatDateWrapper(date, time, options?): string
</pre>

#### Parameters

- <code class="def">date: <span>string</span></code>
  - A formatted date string
- <code class="def">time: <span>string</span></code>
  - A formatted time string
- <code class="def">options?: <span>[DateWrapperFormatOptions](api-datewrapperformatoptions)</span></code>
  - Options to control the calendar and width of the format

#### Example

```typescript
const cldr = framework.get('en');
const date = cldr.Calendars.formatRelativeTimeField(1, 'wed', {
  context: 'begin-sentence',
});
const time = cldr.Calendars.formatDate(cldr.Calendars.now(), {
  time: 'medium',
});
log(cldr.Calendars.formatDateWrapper(date, time, { width: 'full' }));
```
<pre class="output">
Next Wednesday at 12:40:22 PM
</pre>


## formatDateWrapperToParts

Formats a date and time `Part[]` together using a wrapper format of the given width. This can be
used when you need to format a date and time string separately and join them together.

#### Syntax

<pre class="syntax">
formatDateWrapper(date, time, options?): Part[]
</pre>

#### Parameters

- <code class="def">date: <span>[Part](api-part)</span></code>
  - A formatted date `Part[]`
- <code class="def">time: <span>[Part](api-part)</span></code>
  - A formatted time `Part[]`
- <code class="def">options?: <span>[DateWrapperFormatOptions](api-datewrapperformatoptions)</span></code>
  - Options to control the calendar and width of the format

#### Example

```typescript
const cldr = framework.get('en');
const date = cldr.Calendars.formatRelativeTimeField(1, 'wed', {
  context: 'begin-sentence',
});
const time = cldr.Calendars.formatDateToParts(cldr.Calendars.now(), {
  time: 'medium',
});
log(
  cldr.Calendars.formatDateWrapperToParts(
    [{ type: 'reldate', value: date }],
    time,
    {
      width: 'full',
    }
  )
);
```
<pre class="output">
[
  { type: 'reldate', value: 'Next Wednesday' },
  { type: 'literal', value: ' at ' },
  { type: 'hour', value: '12' },
  { type: 'literal', value: ':' },
  { type: 'minute', value: '40' },
  { type: 'literal', value: ':' },
  { type: 'second', value: '22' },
  { type: 'literal', value: ' ' },
  { type: 'dayperiod', value: 'PM' }
]
</pre>


## formatRelativeTime

Formats the time period between two dates as a relative time.

#### Syntax

<pre class="syntax">
formatRelativeTime(start, end, options?): string
</pre>

#### Parameters

- <code class="def">start: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
  - Time period start date
- <code class="def">end: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
  - Time period end date
- <code class="def">options?: <span>[RelativeTimeFormatOptions](api-relativetimeformatoptions.html)</span></code>
  - Options for field width, context, etc.

#### Example

```typescript
const cldr = framework.get('en');
const start = cldr.Calendars.toGregorianDate({ date: new Date(2019, 6, 11) });
for (const month of [-2, -1, 0, 1, 3]) {
  const end = start.add({ month });
  const a = cldr.Calendars.formatRelativeTime(start, end);
  const b = cldr.Calendars.formatRelativeTime(start, end, { field: 'day' });
  log(`${a}  (${b})`);
}
```
<pre class="output">
2 months ago  (61 days ago)
last month  (30 days ago)
now  (today)
next month  (in 31 days)
in 3 months  (in 92 days)
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
- <code class="def">options?: <span>[RelativeTimeFieldFormatOptions](api-relativetimefieldformatoptions.html)</span></code>
  - Options to control the format

#### Example

```typescript
import { Decimal } from '@phensley/cldr';
const cldr = framework.get('en');
for (const value of ['-2', -1, '0', 1, 3, new Decimal('12.5')]) {
  const result = cldr.Calendars.formatRelativeTimeField(value, 'month', {});
  log(result);
}
```
<pre class="output">
2 months ago
last month
this month
next month
in 3 months
in 12 months
</pre>


## minDaysInFirstWeek

Minimum number of days in a week to count as the first week of the year.

#### Syntax

<pre class="syntax">
minDaysInFirstWeek(): number
</pre>

#### Example

```typescript
let cldr = framework.get('en');
log(cldr.Calendars.minDaysInFirstWeek());

cldr = framework.get('en-DE');
log(cldr.Calendars.minDaysInFirstWeek());
```
<pre class="output">
1
4
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

log(monthsEN);
log(monthsFR);

const date = en.Calendars.toGregorianDate({
  date: new Date(2018, 5, 11, 12, 1, 12),
  zoneId: 'America/New_York',
});

log(`month is ${monthsEN[date.month()]} / ${monthsFR[date.month()]}`);
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
{
  '1': 'Janvier',
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


## newBuddhistDate

Construct a date in the Buddhist calendar from one or more fields.

#### Syntax

<pre class="syntax">
newBuddhistDate(fields): BuddhistDate
</pre>

#### Parameters

- <code class="def">fields: <span>[CalendarDateFields](api-calendardatefields)</span></code>
  - Date and time fields

## newGregorianDate

Construct a date in the Gregorian calendar from one or more fields.

#### Syntax

<pre class="syntax">
newGregorianDate(fields): GregorianDate
</pre>

#### Parameters

- <code class="def">fields: <span>[CalendarDateFields](api-calendardatefields)</span></code>
  - Date and time fields

#### Example

```typescript
const en = framework.get('en');
log(
  en.Calendars.newGregorianDate({
    year: 2020,
    day: 15,
    hour: 17,
    minute: 45,
    zoneId: 'America/New_York',
  })
);
```
<pre class="output">
Gregorian 2020-01-15 17:45:00.000 America/New_York
</pre>


## newISO8601Date

Construct a date in the ISO8601 calendar from one or more fields.

#### Syntax

<pre class="syntax">
newISO8601Date(fields): ISO8601Date
</pre>

#### Parameters

- <code class="def">fields: <span>[CalendarDateFields](api-calendardatefields)</span></code>
  - Date and time fields

## newJapaneseDate

Construct a date in the Japanese calendar from one or more fields.

#### Syntax

<pre class="syntax">
newJapaneseDate(fields): JapaneseDate
</pre>

#### Parameters

- <code class="def">fields: <span>[CalendarDateFields](api-calendardatefields)</span></code>
  - Date and time fields

## newPersianDate

Construct a date in the Persian calendar from one or more fields.

#### Syntax

<pre class="syntax">
newPersianDate(fields): PersianDate
</pre>

#### Parameters

- <code class="def">fields: <span>[CalendarDateFields](api-calendardatefields)</span></code>
  - Date and time fields

## newISO8601Date

Construct a date in the ISO8601 calendar from one or more fields.

#### Syntax

<pre class="syntax">
newISO8601Date(fields): ISO8601Date
</pre>

## now

Construct a date in the Gregorian calendar representing the current date and time.
Alias for [nowGregorian](#nowgregorian)

#### Syntax

<pre class="syntax">
now(zoneId?): GregorianDate
</pre>

#### Parameters

- <code class="def">zoneId?: <span>string</span></code>
  - Timezone id. Defaults to `'Etc/UTC'`

## nowBuddhist

Construct a date in the Buddhist calendar representing the current date and time.

#### Syntax

<pre class="syntax">
nowBuddhist(zoneId?): BuddhistDate
</pre>

#### Parameters

- <code class="def">zoneId?: <span>string</span></code>
  - Timezone id. Defaults to `'Etc/UTC'`

#### Example

```typescript
const en = framework.get('en');
log(en.Calendars.nowBuddhist());
log(en.Calendars.nowBuddhist('America/Los_Angeles'));
```
<pre class="output">
Buddhist 2020-04-29 12:40:22.300 Etc/UTC
Buddhist 2020-04-29 05:40:22.300 America/Los_Angeles
</pre>


## nowGregorian

Construct a date in the Gregorian calendar representing the current date and time.

#### Syntax

<pre class="syntax">
nowGregorian(zoneId?): GregorianDate
</pre>

#### Parameters

- <code class="def">zoneId?: <span>string</span></code>
  - Timezone id. Defaults to `'Etc/UTC'`

#### Example

```typescript
const en = framework.get('en');
log(en.Calendars.nowGregorian());
log(en.Calendars.nowGregorian('America/Los_Angeles'));
```
<pre class="output">
Gregorian 2020-04-29 12:40:22.306 Etc/UTC
Gregorian 2020-04-29 05:40:22.306 America/Los_Angeles
</pre>


## nowISO8601

Construct a date in the ISO8601 calendar representing the current date and time.

#### Syntax

<pre class="syntax">
nowISO8601(zoneId?): ISO8601Date
</pre>

#### Parameters

- <code class="def">zoneId?: <span>string</span></code>
  - Timezone id. Defaults to `'Etc/UTC'`

#### Example

```typescript
const en = framework.get('en');
log(en.Calendars.nowISO8601());
log(en.Calendars.nowISO8601('America/Los_Angeles'));
```
<pre class="output">
ISO8601 2020-04-29 12:40:22.313 Etc/UTC
ISO8601 2020-04-29 05:40:22.313 America/Los_Angeles
</pre>


## nowJapanese

Construct a date in the Japanese calendar representing the current date and time.

#### Syntax

<pre class="syntax">
nowJapanese(zoneId?): JapaneseDate
</pre>

#### Parameters

- <code class="def">zoneId?: <span>string</span></code>
  - Timezone id. Defaults to `'Etc/UTC'`

#### Example

```typescript
const en = framework.get('en');
log(en.Calendars.nowJapanese());
log(en.Calendars.nowJapanese('America/Los_Angeles'));
```
<pre class="output">
Japanese 2020-04-29 12:40:22.318 Etc/UTC
Japanese 2020-04-29 05:40:22.318 America/Los_Angeles
</pre>


## nowPersian

Construct a date in the Persian calendar representing the current date and time.

#### Syntax

<pre class="syntax">
nowPersian(zoneId?): PersianDate
</pre>

#### Parameters

- <code class="def">zoneId?: <span>string</span></code>
  - Timezone id. Defaults to `'Etc/UTC'`

#### Example

```typescript
const en = framework.get('en');
log(en.Calendars.nowPersian());
log(en.Calendars.nowPersian('America/Los_Angeles'));
```
<pre class="output">
Persian 1399-02-10 12:40:22.322 Etc/UTC
Persian 1399-02-10 05:40:22.323 America/Los_Angeles
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
log(en.Calendars.quarters());
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
log(en.Calendars.resolveTimeZoneId('UTC'));
log(en.Calendars.resolveTimeZoneId('US/East-Indiana'));
log(en.Calendars.resolveTimeZoneId('Antarctica/McMurdo'));
```
<pre class="output">
Etc/UTC
America/Indiana/Indianapolis
Pacific/Auckland
</pre>


## timePeriodToQuantity

Converts a [TimePeriod](api-timeperiod.html) into a [Quantity](api-quantity.html) sequence, suitable for [unit formatting](api-cldr-units.html#formatquantitysequence).

#### Syntax

<pre class="syntax">
timePeriodToQuantity(period): Quantity[]
</pre>

#### Parameters

- <code class="def">date: <span>Partial&lt;[TimePeriod](api-timeperiod.html)&gt;</span></code>
  - Time period to convert

#### Return value

- A [Quantity](api-quantity.html) array containing the unit and value pairs.

#### Example

```typescript
const en = framework.get('en');
const date = en.Calendars.toGregorianDate({ date: 1530124872456 });
const end = date.add({ year: 2, month: 5, day: 20, hour: 12 });
const t = date.difference(end, ['year', 'day']);
const q = en.Calendars.timePeriodToQuantity(t);

let s: string;
s = en.Units.formatQuantitySequence(q);
log(s);

s = en.Units.formatQuantitySequence(q, {
  length: 'short',
  maximumFractionDigits: 0,
});
log(s);

s = en.Units.formatQuantitySequence(q, {
  length: 'narrow',
  maximumFractionDigits: 0,
});
log(s);
```
<pre class="output">
2 years, 173.5 days
2 yrs, 174 days
2y 174d
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
const ids = en.Calendars.timeZoneIds();
for (const id of ids.slice(0, 10)) {
  log(id);
}
log('...');
```
<pre class="output">
Africa/Abidjan
Africa/Accra
Africa/Algiers
Africa/Bissau
Africa/Cairo
Africa/Casablanca
Africa/Ceuta
Africa/El_Aaiun
Africa/Johannesburg
Africa/Juba
...
</pre>


## timeZoneFromUTC

Returns the timezone info in effect for a timezone at a given UTC instant.

<pre class="syntax">
timeZoneFromUTC(timestamp, zoneid): ZoneInfo
</pre>

#### Parameters

- <code class="def">timestamp: <span>number</span></code>
  - UTC timestamp in milliseconds.
- <code class="def">id: <span>string</span></code>
  - Time zone identifier.

#### Example

```typescript
const en = framework.get('en');
const zoneid = 'America/New_York';
// Sun Mar 8 2020 6:59 AM UTC
log(en.Calendars.timeZoneFromUTC(1583650740000, zoneid));
// 1 minute later
log(en.Calendars.timeZoneFromUTC(1583650800000, zoneid));
```
<pre class="output">
{ abbr: 'EST', dst: 0, offset: -18000000, zoneid: 'America/New_York' }
{ abbr: 'EDT', dst: 1, offset: -14400000, zoneid: 'America/New_York' }
</pre>


## timeZoneFromWall

Returns the timezone info in effect for a timezone at a given local "wall clock" instant. It returns a pair containing the adjusted UTC timestamp for the instant, and the timezone info.

#### Syntax

<pre class="syntax">
timeZoneFromWall(timestamp, zoneid): [number, ZoneInfo]
</pre>

#### Parameters

- <code class="def">timestamp: <span>number</span></code>
  - Local "wall clock" timestamp in milliseconds.
- <code class="def">id: <span>string</span></code>
  - Time zone identifier.

#### Example

```typescript
const en = framework.get('en');
const zoneid = 'America/New_York';
// Sun Mar 8 2020 1:59 AM NY time
log(en.Calendars.timeZoneFromWall(1583632740000, zoneid));
// 1 minute later
log(en.Calendars.timeZoneFromWall(1583632800000, zoneid));
```
<pre class="output">
[
  1583650740000,
  {
    abbr: 'EST',
    dst: 0,
    offset: -18000000,
    zoneid: 'America/New_York'
  }
]
[
  1583650800000,
  {
    abbr: 'EDT',
    dst: 1,
    offset: -14400000,
    zoneid: 'America/New_York'
  }
]
</pre>


## timeZoneInfo

Returns an array of `TimeZoneInfo` objects, including the exemplar city for each.

#### Syntax

<pre class="syntax">
timeZoneInfo(id): TimeZoneInfo[]
</pre>

#### Parameters

- <code class="def">id: <span>string</span></code>
  - Time zone identifier.

#### Example

```typescript
const en = framework.get('en');
const ids = en.Calendars.timeZoneIds();
for (const id of ids.slice(0, 10)) {
  log(en.Calendars.timeZoneInfo(id));
}
log('...');
```
<pre class="output">
{ id: 'Africa/Abidjan', city: { name: 'Abidjan' } }
{ id: 'Africa/Accra', city: { name: 'Accra' } }
{ id: 'Africa/Algiers', city: { name: 'Algiers' } }
{ id: 'Africa/Bissau', city: { name: 'Bissau' } }
{ id: 'Africa/Cairo', city: { name: 'Cairo' } }
{ id: 'Africa/Casablanca', city: { name: 'Casablanca' } }
{ id: 'Africa/Ceuta', city: { name: 'Ceuta' } }
{ id: 'Africa/El_Aaiun', city: { name: 'El Aaiun' } }
{ id: 'Africa/Johannesburg', city: { name: 'Johannesburg' } }
{ id: 'Africa/Juba', city: { name: 'Juba' } }
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
const cldr = framework.get('en');
log(
  cldr.Calendars.toBuddhistDate({
    date: 1530124872456,
    zoneId: 'America/New_York',
  })
);
```
<pre class="output">
Buddhist 2018-06-27 14:41:12.456 America/New_York
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
const cldr = framework.get('en');
log(
  cldr.Calendars.toGregorianDate({
    date: 1530124872456,
    zoneId: 'America/New_York',
  })
);
```
<pre class="output">
Gregorian 2018-06-27 14:41:12.456 America/New_York
</pre>


```typescript
const cldr = framework.get('en');

// JavaScript Date is interpreted as a UTC date time
let date = new Date(2018, 1, 17, 12, 34, 56, 789);
const zoneId = 'America/New_York';

const d = cldr.Calendars.toGregorianDate({ date, zoneId });
log(d);

date = new Date(2018, 6, 17, 12, 34, 56, 789);
d = cldr.Calendars.toGregorianDate({ date, zoneId });
log(d);
```
<pre class="output">
Gregorian 2018-02-17 12:34:56.789 America/New_York
Gregorian 2018-07-17 12:34:56.789 America/New_York
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

const wk = (d: CalendarDate) =>
  `week starts on ${weekdays[d.firstDayOfWeek()]}`;
const woy = (d: CalendarDate) =>
  `week of year: ${d.yearOfWeekOfYear()}-${d.weekOfYear()}`;

log(`gregorian ${wk(date)}, ${woy(date)}`);
log(` iso-8601 ${wk(iso)}, ${woy(iso)}`);
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
const cldr = framework.get('en');
const date = cldr.Calendars.toJapaneseDate({
  date: 1530124872456,
  zoneId: 'America/New_York',
});
log(date);
log(date.relatedYear());
log(date.year());
```
<pre class="output">
Japanese 2018-06-27 14:41:12.456 America/New_York
2018
30
</pre>


## toPersianDate

Converts a date to a [PersianDate](api-persiandate.html) instance.

<pre class="syntax">
toPersianDate(date): PersianDate
</pre>

#### Parameters

- <code class="def">date: <span>[CalendarDate](api-calendardate.html) | [ZonedDateTime](api-zoneddatetime.html) | Date</span></code>
  - Date or timestamp to convert

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

log(en.Calendars.weekdays({ context }));
log(es.Calendars.weekdays({ context }));
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
{
  '1': 'Domingo',
  '2': 'Lunes',
  '3': 'Martes',
  '4': 'Miércoles',
  '5': 'Jueves',
  '6': 'Viernes',
  '7': 'Sábado'
}
</pre>

