---
id: api-calendardate
title: CalendarDate
---

`CalendarDate` is the abstract base class for specific calendar implementations:

  - [BuddhistDate](api-buddhistdate.html)
    - A date in the Buddhist calendar
  - [GregorianDate](api-gregoriandate.html)
    - A date in the Gregorian calendar
  - [ISO8601Date](api-iso8601date.html)
    - A date in the ISO-8601 calendar
  - [PersianDate](api-persiandate.html)
    - A date in the Persian calendar
  - [JapaneseDate](api-japanesedate.html)
    - A date in the Japanese calendar

## add

Add or subtract a quantity from one or more calendar fields.

#### Syntax

<pre class="syntax">
add(fields): CalendarDate
</pre>


#### Parameters
  - <code>fields: <span>[CalendarDateFields](api-calendardatefields.html)</span></code>
    - Amounts to add or subtract from fields.

#### Example

```typescript
// Wed June 27 2018 4:23:00 AM UTC
const date = cldr.Calendars.toGregorianDate({
  date: 1530087780000, zoneId: 'America/New_York' });

console.log(date.toString());
console.log(date.add({ year: 1, month: 5 }).toString());
console.log(date.add({ year: -5, day: 7, minute: 22 }).toString());
```

<pre class="output">
Gregorian 2018-06-27 04:23:00.000 America/New_York
Gregorian 2019-11-27 03:23:00.000 America/New_York
Gregorian 2013-07-04 04:45:00.000 America/New_York
</pre>



## dayOfMonth


## dayOfWeek

## dayOfWeekInMonth

Ordinal number indicating the day of the week in the current month.
For example, if the `dayOfWeek` is Sunday, and `dayOfWeekInMonth` is 2,
this could be used to format messages like "`2nd Sunday in August`".

#### Example

```typescript
const cldr = framework.get('en');
// Aug 11 2019 07:08:09 UTC
const zoneId = 'America/New_York';
const date = cldr.Calendars.toGregorianDate({ date: 1565550489000, zoneId });

const endings = { one: 'st', two: 'nd', few: 'rd', other: 'th' };
const ord = (n: number) => endings[cldr.Numbers.getPluralOrdinal(n)];

const weekdays = cldr.Calendars.weekdays(date.type());
const months = cldr.Calendars.months(date.type());

const day = date.dayOfMonth();
const weekday = weekdays[date.dayOfWeek()];
const month = months[date.month()];
const year = date.year();
const dayinmonth = date.dayOfWeekInMonth();

console.log(`the ${day}${ord(day)} is the ${dayinmonth}${ord(dayinmonth)} ${weekday} in ${month}, ${year}`);
```

<pre class="output">
the 11th is the 2nd Sunday in August, 2019
</pre>

## dayOfYear

Ordinal day of the year, e.g. January 1st is the 1st day of the year.

```typescript
const cldr = framework.get('en');
const zoneId = 'America/New_York';
const date = cldr.Calendars.toGregorianDate({ date: 1565550489000, zoneId });
const result = cldr.Calendars.formatDate(date, { date: 'short' });
const doy = date.dayOfYear();
console.log(`${result} is the ${doy} day of ${date.year()}`);
```

<pre class="output">
8/11/19 is the 223 day of 2019
</pre>

## era

Ordinal number of the era in the date's calendar, e.g. 0 is BC and 1 is AD in the Gregorian calendar.

## extendedYear


## fieldOfGreatestDifference

Compares the current date with another and returns the field of greatest difference.


## firstDayOfWeek



## hour

Indicates the hour of the morning or afternoon, used for the 12-hour clock (0 - 11). Noon and midnight are 0 not 12.

#### Syntax

<pre class="syntax">
hour(): number
</pre>



## hourOfDay

Indicates the hour of the day, used for the 24-hour clock (0 - 23). Noon is 12 and midnight is 0.

#### Syntax

<pre class="syntax">
hourOfDay(): number
</pre>



## isDaylightSavings

## isAM

## isLeapYear

## julianDay

## metaZoneId

## milliseconds

## millisecondsInDay

## minDaysInFirstWeek



## minute

Indicates the minute of the hour (0 - 59).

#### Syntax

<pre class="syntax">
minute(): number
</pre>



## modifiedJulianDay



## month

Indicates the month of the year, 1-based. Gregorian JANUARY = 1.

#### Syntax

<pre class="syntax">
month(): number
</pre>



## ordinalDayofWeek



## second

Indicates the second of the minute (0 - 59).

#### Syntax

<pre class="syntax">
second(): number
</pre>



## timeZoneId

The IANA timezone identifier for this date.

#### Syntax

<pre class="syntax">
timeZoneId(): string
</pre>



## timeZoneOffset

The offset of this date's timezone, in milliseconds.

#### Syntax

<pre class="syntax">
timeZoneOffset(): number
</pre>



## type

Type of calendar this date uses.

#### Syntax

<pre class="syntax">
type(): CalendarType
</pre>

#### Return value
  - A <code class="def"><span>[CalendarType](api-calendartype.html)</span></code> indicating the calendar for this date uses.


## unixEpoch

Unix epoch timestamp with no timezone offset.

## weekOfMonth

## weekOfYear

## year

Indicates the calendar-specific year for this date.


## yearOfWeekofYear
