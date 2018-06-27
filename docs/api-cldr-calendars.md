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

## fieldOfGreatestDifference

Computes the field of greatest different between two [CalendarDate](api-calendardate.html) instances.

#### Syntax

<pre class="syntax">
fieldOfGreatestDifference(a, b): DateTimePatternFieldType
</pre>

#### Parameters
  - <code>a: <span>[CalendarDate](api-calendardate.html)</span></code>
    - First date to compare
  - <code>b: <span>[CalendarDate](api-calendardate.html)</span></code>
    - Second date to compare

#### Return value
  - A [DateTimePatternFieldType](api-datetimepatternfieldtype.html) indicating the field with the greatest difference

#### Example

```typescript
// June 27, 2018 4:23:00 AM
const base = 1530087780000;
const zone = 'America/New_York';
const d1 = cldr.Calendars.newGregorianDate(base, zone);

const factors = [0.0002, 0.005, 0.25, .75, 3, 50, 425, 1000];
factors.forEach(f => {
  const days = f * 86400 * 1000;
  const d2 = cldr.Calendars.newGregorianDate(base + days, zone);
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

## formatDateToParts

## formatDateInterval

## formatDateIntervalToParts

## formatRelativeTimeField

## formatDateRaw

## formatDateRawToParts

## months

## newBuddhistDate

Creates a date in the Buddhist calendar, from a Unix epoch timestamp and timezone identifier.

#### Syntax

<pre class="syntax">
newBuddhistDate(epoch, zoneId): BuddhistDate
</pre>

#### Parameters
  - <code class="def">epoch: <span>number</span></code>
    - Unix epoch timestamp in milliseconds.
  - <code class="def">zoneId: <span>string</span></code>
    - IANA Timezone identifier, e.g. `"America/New_York"`

#### Example

```typescript
const date = cldr.Calendars.newBuddhistDate(1530124872456, 'America/New_York');
console.log(date.toString());
```

<pre class="output">
Buddhist 2561-06-27 14:41:12.456 America/New_York
</pre>



## newGregorianDate

Creates a date in the Gregorian calendar, from a Unix epoch timestamp and timezone identifier.

#### Syntax

<pre class="syntax">
newGregorianDate(epoch, zoneId): GregorianDate
</pre>

#### Parameters
  - <code class="def">epoch: <span>number</span></code>
    - Unix epoch timestamp in milliseconds.
  - <code class="def">zoneId: <span>string</span></code>
    - IANA Timezone identifier, e.g. `"America/New_York"`

#### Example

```typescript
const date = cldr.Calendars.newGregorianDate(1530124872456, 'America/New_York');
console.log(date.toString());
```

<pre class="output">
Gregorian 2018-06-27 14:41:12.456 America/New_York
</pre>



## newISO8601Date

## newJapaneseDate

## newPersianDate



## toBuddhistDate

Converts a [CalendarDate](api-calendardate.html) or [UnixEpochTime](api-unixepochtime.html) instance to a [BuddhistDate](api-buddhistdate.html).

#### Syntax

<pre class="syntax">
toBuddhistDate(date): BuddhistDate
</pre>

#### Parameters
  - <code>date: <span>[CalendarDate](api-calendardate.html) | [UnixEpochTime](api-unixepochtime.html)</span></code>
    - Date or timestamp to convert

## toGregorianDate

Converts a [CalendarDate](api-calendardate.html) or [UnixEpochTime](api-unixepochtime.html) instance to a [GregorianDate](api-gregoriandate.html).

#### Syntax

<pre class="syntax">
toGregorianDate(date): GregorianDate
</pre>

#### Parameters
  - <code>date: <span>[CalendarDate](api-calendardate.html) | [UnixEpochTime](api-unixepochtime.html)</span></code>
    - Date or timestamp to convert


## toISO8601Date

## toJapaneseDate

## toPersianDate

## weekdays
