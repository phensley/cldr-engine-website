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

## dayOfYear

## era

## extendedYear

## fieldOfGreatestDifference

## firstDayOfWeek

## hour

## hourOfDay

## isDaylightSavings

## isAM

## isLeapYear

## julianDay

## metaZoneId

## milliseconds

## millisecondsInDay

## minDaysInFirstWeek

## minute

## modifiedJulianDay

## month

## ordinalDayofWeek

## second

## timeZoneId

## timeZoneOffset

## type

## unixEpoch

## weekOfMonth

## weekOfYear

## year

## yearOfWeekofYear
