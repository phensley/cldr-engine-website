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

Add a time period to the current date.

#### Syntax

<pre class="syntax">
add(fields): CalendarDate
</pre>

#### Parameters

- <code class="def">fields: <span>Partial&lt;[TimePeriod](api-timeperiod.html)&gt;</span></code>
  - Amounts to add for each field.

#### Example

```typescript
const cldr = framework.get("en");

// Wed June 27 2018 4:23:00 AM UTC
const date = cldr.Calendars.toGregorianDate({
  date: 1530087780000,
  zoneId: "America/New_York",
});

log(date.toString());
log(date.add({ year: 1, month: 5 }).toString());
log(date.add({ year: -5, day: 7, minute: 22 }).toString());
```

<pre class="output">
Gregorian 2018-06-27 04:23:00.000 America/New_York
Gregorian 2019-11-27 03:23:00.000 America/New_York
Gregorian 2013-07-04 04:45:00.000 America/New_York
</pre>

## asJSDate

Converts the date into a JavaScript `Date`.

#### Syntax

<pre class="syntax">
asJSDate(): Date
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.newGregorianDate({
  year: 2020,
  month: 4,
  day: 17,
  hour: 12,
  minute: 34,
  second: 56,
  millis: 123,
  zoneId: "America/Los_Angeles",
});

const jsdate = date.asJSDate();
log(date.toLocalISOString());
log(jsdate);
// This example was generated in the America/New_York timezone
log(jsdate.toString());
```

<pre class="output">
2020-04-17T12:34:56.123-07:00
2020-04-17T19:34:56.123Z
Fri Apr 17 2020 15:34:56 GMT-0400 (Eastern Daylight Time)
</pre>

## compare

Compares two dates, returning an integer indicating the date is less than (`-1`), equal to (`0`), or greater than (`1`) the argument.

#### Syntax

<pre class="syntax">
compare(date): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 2, 11) });
for (const n of [-27, -13, -1, 0, 1, 20]) {
  const end = date.add({ day: n });
  const v = date.compare(end);
  log(`${end.toString()}  ${v}`);
}
```

<pre class="output">
Gregorian 2019-02-12 04:00:00.000 Etc/UTC  1
Gregorian 2019-02-26 04:00:00.000 Etc/UTC  1
Gregorian 2019-03-10 04:00:00.000 Etc/UTC  1
Gregorian 2019-03-11 04:00:00.000 Etc/UTC  0
Gregorian 2019-03-12 04:00:00.000 Etc/UTC  -1
Gregorian 2019-03-31 04:00:00.000 Etc/UTC  -1
</pre>

## dayOfMonth

Returns the day of the month. The first day of the month has value `1`.

#### Syntax

<pre class="syntax">
dayOfMonth(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 2, 11) });

log(cldr.Calendars.formatDate(date, { date: "full" }));
log(date.dayOfMonth());
log(date.add({ day: 3 }).dayOfMonth());
log(date.add({ week: 1 }).dayOfMonth());
```

<pre class="output">
Monday, March 11, 2019
11
14
18
</pre>

## dayOfWeek

Returns the day of the week, where 1 = SUNDAY, 2 = MONDAY, ..., 7 = SATURDAY

#### Syntax

<pre class="syntax">
dayOfWeek(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 2, 11) });
const weekdays = cldr.Calendars.weekdays({ width: "wide" });

log(cldr.Calendars.formatDate(date, { date: "full" }));
log(weekdays[date.dayOfWeek()]);
log(weekdays[date.add({ day: 1 }).dayOfWeek()]);
log(weekdays[date.add({ day: 5 }).dayOfWeek()]);
```

<pre class="output">
Monday, March 11, 2019
Monday
Tuesday
Saturday
</pre>

## dayOfWeekInMonth

Ordinal number indicating the day of the week in the current month.
For example, if the `dayOfWeek` is Sunday, and `dayOfWeekInMonth` is 2,
this could be used to format messages like "`2nd Sunday in August`".

#### Example

```typescript
const cldr = framework.get("en");
// Aug 11 2019 07:08:09 UTC
const zoneId = "America/New_York";
const date = cldr.Calendars.toGregorianDate({ date: 1565550489000, zoneId });

const endings = { one: "st", two: "nd", few: "rd", other: "th" };
const ord = (n: number) => endings[cldr.Numbers.getPluralOrdinal(n)];

const weekdays = cldr.Calendars.weekdays({ ca: date.type() });
const months = cldr.Calendars.months({ ca: date.type() });

const day = date.dayOfMonth();
const weekday = weekdays[date.dayOfWeek()];
const month = months[date.month()];
const year = date.year();
const dayinmonth = date.dayOfWeekInMonth();

log(
  `the ${day}${ord(day)} is the ${dayinmonth}${ord(
    dayinmonth
  )} ${weekday} in ${month}, ${year}`
);
```

<pre class="output">
the 11th is the 2nd Sunday in August, 2019
</pre>

## dayOfYear

Ordinal day of the year, e.g. January 1st is the 1st day of the year.

#### Example

```typescript
const cldr = framework.get("en");
const zoneId = "America/New_York";
const date = cldr.Calendars.toGregorianDate({ date: 1565550489000, zoneId });
const result = cldr.Calendars.formatDate(date, { date: "short" });
const doy = date.dayOfYear();
log(`${result} is the ${doy} day of ${date.year()}`);
```

<pre class="output">
8/11/19 is the 223 day of 2019
</pre>

## difference

Compute the difference between this date and the argument, returning a [TimePeriod](api-timeperiod.html) result.

#### Syntax

<pre class="syntax">
difference(date, fields?): TimePeriod
</pre>

#### Parameters

- <code class="def">date: <span>[CalendarDate](api-calendardate.html)</span></code>
  - Date to compute the difference from
- <code class="def">fields?: <span>[TimePeriodField[]](api-timeperiodfield.html)</span></code>
  - Optional array of fields to compute the difference in terms of. If omitted all fields will be included.

#### Return value

- A <code class="def"><span>[TimePeriod](api-timeperiod.html)</span></code> representing the difference between the two dates.

#### Example

```typescript
const cldr = framework.get("en");
const start = cldr.Calendars.toGregorianDate({
  date: new Date(2019, 2, 11, 12),
  zoneId: "UTC",
});
let end: CalendarDate;
let t: TimePeriod;

end = start.add({ year: 1.5, month: -1, day: 27.5, hour: 3 });

const show = (t: TimePeriod) =>
  Object.keys(t)
    .map((k) => [k, t[k]])
    .filter(([k, v]) => v !== 0)
    .map(([k, v]) => `${k}=${v}`)
    .join(" ");

log(start.toString());
log(end.toString());

t = start.difference(end, ["year", "month", "day"]);
log(show(t));

t = start.difference(end, ["month", "day"]);
log(show(t));

t = start.difference(end, ["day", "hour"]);
log(show(t));

t = start.difference(end, ["day"]);
log(show(t));
```

<pre class="output">
Gregorian 2019-03-11 16:00:00.000 Etc/UTC
Gregorian 2020-09-07 07:00:00.000 Etc/UTC
year=1 month=5 day=26.625
month=17 day=26.625
day=545 hour=15
day=545.625
</pre>

## differenceSigned

Same as [difference](#difference) but fields are signed.

#### Example

```typescript
const cldr = framework.get("en");
const start = cldr.Calendars.newGregorianDate({
  year: 2020,
  month: 6,
  day: 15,
});
const end = start.subtract({ month: 1.5 });
log(start.differenceSigned(end));
```

<pre class="output">
{
  year: 0,
  month: -1,
  week: -2,
  day: -2,
  hour: 0,
  minute: 0,
  second: 0,
  millis: 0
}
</pre>

## endOf

Adjust the date to be at the end of a given field, setting all smaller fields to the maximum of their range. For the date `"2025-03-05 12:15:30.123"` calling `date.endOf("month")` would return the date `"2025-03-31 23:59:59.999"`.

#### Syntax

<pre class="syntax">
endOf(field): CalendarDate
</pre>

#### Parameters

- <code class="def">field: <span>(unexported type)</span></code>
  - Field to adjust

#### Example

```typescript
const cldr = framework.get("en");
let date = cldr.Calendars.toGregorianDate({
  date: 1741230930123,
  zoneId: "America/New_York",
});
log(date.toString());
log(date.endOf("minute").toString());
log(date.endOf("hour").toString());
log(date.endOf("day").toString());
log(date.endOf("month").toString());
log(date.endOf("year").toString());
```

<pre class="output">
Gregorian 2025-03-05 22:15:30.123 America/New_York
Gregorian 2025-03-05 22:15:59.999 America/New_York
Gregorian 2025-03-05 22:59:59.999 America/New_York
Gregorian 2025-03-05 23:59:59.999 America/New_York
Gregorian 2025-03-31 23:59:59.999 America/New_York
Gregorian 2025-12-31 23:59:59.999 America/New_York
</pre>

## era

Ordinal number of the era in the date's calendar, e.g. 0 is BC and 1 is AD in the Gregorian calendar.

#### Syntax

<pre class="syntax">
era(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const eras = cldr.Calendars.eras({ width: "names" });

let date = cldr.Calendars.toGregorianDate({ date: -66222255838000 });
let s = cldr.Calendars.formatDate(date, { date: "full" });
log(`${s} era is ${eras[date.era()]}`);

date = date.add({ year: 2100 });
s = cldr.Calendars.formatDate(date, { date: "full" });
log(`${s} era is ${eras[date.era()]}`);
```

<pre class="output">
Sunday, July 5, 130 era is [object Object]
Monday, July 5, 1971 era is [object Object]
</pre>

## extendedYear

Indicates the year as a positive number for CE years and negative values for BCE years, with
1 BCE being extended year 0. For example the year 50 BCE would be extended year -49.

#### Syntax

<pre class="syntax">
extendedYear(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({ date: new Date(-49, 5, 15) });

log(cldr.Calendars.formatDate(date, { skeleton: "GyMMMd" }));
log(date.extendedYear());
```

<pre class="output">
Jun 17, 50 BC
-49
</pre>

## fieldOfVisualDifference

Compares the current date with another and returns the field of greatest difference.

**Note**: This assumes the dates are of the same type and have the same timezone offset.

#### Syntax

<pre class="syntax">
fieldOfVisualDifference(other): DateTimePatternFieldType | undefined
</pre>

#### Parameters

- <code class="def">other: <span>[CalendarDate](api-calendardate.html)</span></code>
  - Date to compare the this date against.

#### Return value

- A [DateTimePatternFieldType](api-datetimepatternfieldtype.html) indicating the first field of visual difference, or `undefined` if dates are equivalent.

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 4, 15) });

const fmt = (d: CalendarDate) =>
  cldr.Calendars.formatDate(d, { datetime: "long" });
const cmp = (d: CalendarDate, o: CalendarDate) => {
  log(`${fmt(d)}  ~  ${fmt(o)}  => ${d.fieldOfVisualDifference(o)}`);
};

cmp(date, date.add({ minute: 1 }));
cmp(date, date.add({ hour: 3 }));
cmp(date, date.add({ day: 9 }));
cmp(date, date.add({ month: 7 }));
cmp(date, date.add({ year: 23 }));
```

<pre class="output">
May 15, 2019 at 4:00:00 AM GMT  ~  May 15, 2019 at 4:01:00 AM GMT  => m
May 15, 2019 at 4:00:00 AM GMT  ~  May 15, 2019 at 7:00:00 AM GMT  => H
May 15, 2019 at 4:00:00 AM GMT  ~  May 24, 2019 at 4:00:00 AM GMT  => d
May 15, 2019 at 4:00:00 AM GMT  ~  December 15, 2019 at 4:00:00 AM GMT  => M
May 15, 2019 at 4:00:00 AM GMT  ~  May 15, 2042 at 4:00:00 AM GMT  => y
</pre>

## fields

Returns the date and time-related fields as a [`CalendarDateFields`](api-calendardatefields) object.

#### Syntax

<pre class="syntax">
fields(): CalendarDateFields
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.newGregorianDate({
  year: 2020,
  month: 5,
  day: 17,
  hour: 15,
  minute: 43,
  second: 22,
  millis: 123,
  zoneId: "America/New_York",
});
log(date.toString());
log(date.fields());
```

<pre class="output">
Gregorian 2020-05-17 15:43:22.123 America/New_York
{
  year: 2020,
  month: 5,
  day: 17,
  hour: 15,
  minute: 43,
  second: 22,
  millis: 123,
  zoneId: 'America/New_York'
}
</pre>

## firstDayOfWeek

Returns the weekday that starts the week in the date's locale, where 1 = SUNDAY, 2 = MONDAY, ..., 7 = SATURDAY

#### Syntax

<pre class="syntax">
firstDayOfWeek(): number
</pre>

#### Example

```typescript
const us = framework.get("en-US");
const fr = framework.get("fr-FR");
const endate = us.Calendars.toGregorianDate({ date: new Date(-49, 5, 15) });
const frdate = fr.Calendars.toGregorianDate(endate);
const weekdays = us.Calendars.weekdays({ width: "wide" });

log(`en-US first day of week: ${weekdays[endate.firstDayOfWeek()]}`);
log(`fr-FR first day of week: ${weekdays[frdate.firstDayOfWeek()]}`);
```

<pre class="output">
en-US first day of week: Sunday
fr-FR first day of week: Monday
</pre>

## hour

Indicates the hour of the morning or afternoon, used for the 12-hour clock (0 - 11). Noon and midnight are 0 not 12.

#### Syntax

<pre class="syntax">
hour(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({
  date: new Date(2019, 4, 10, 12, 10, 20),
});

log(cldr.Calendars.formatDate(date, { time: "long" }));
log(date.hour());
```

<pre class="output">
4:10:20 PM GMT
4
</pre>

## hourOfDay

Indicates the hour of the day, used for the 24-hour clock (0 - 23). Noon is 12 and midnight is 0.

#### Syntax

<pre class="syntax">
hourOfDay(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({
  date: new Date(2019, 4, 10, 12, 10, 20),
});

log(cldr.Calendars.formatDate(date, { time: "long" }));
log(date.hourOfDay());
```

<pre class="output">
4:10:20 PM GMT
16
</pre>

## isDaylightSavings

Indicates the date is in daylight savings time.

#### Syntax

<pre class="syntax">
isDaylightSavings(): boolean
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const zoneId = "America/New_York";
const date = cldr.Calendars.toGregorianDate({
  date: new Date(2019, 0, 10, 12, 0, 0),
  zoneId,
});

const dst = (d: CalendarDate) =>
  log(
    `${cldr.Calendars.formatDate(d, { datetime: "long" })} ` +
      `daylight savings: ${d.isDaylightSavings()}`
  );

dst(date);
dst(date.add({ day: 58 }));
dst(date.add({ day: 61 }));
```

<pre class="output">
January 10, 2019 at 12:00:00 PM EST daylight savings: false
March 9, 2019 at 12:00:00 PM EST daylight savings: false
March 12, 2019 at 1:00:00 PM EDT daylight savings: true
</pre>

## isAM

Indicates if the time is in the A.M. period.

#### Syntax

<pre class="syntax">
isAM(): boolean
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const zoneId = "America/New_York";
const date = cldr.Calendars.toGregorianDate({
  date: new Date(2019, 0, 10, 8, 0, 0),
  zoneId,
});

const isam = (d: CalendarDate) =>
  log(
    `${cldr.Calendars.formatDate(d, { datetime: "long" })} ` +
      `is AM: ${d.isAM()}`
  );

isam(date);
isam(date.add({ minute: 239 }));
isam(date.add({ minute: 241 }));
```

<pre class="output">
January 10, 2019 at 8:00:00 AM EST is AM: true
January 10, 2019 at 11:59:00 AM EST is AM: true
January 10, 2019 at 12:01:00 PM EST is AM: false
</pre>

## isLeapYear

Indicates the date's year is a leap year, per the date's calendar.

#### Syntax

<pre class="syntax">
isLeapYear(): boolean
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const zoneId = "America/New_York";
const date = cldr.Calendars.toGregorianDate({
  date: new Date(1895, 0, 10, 13, 0, 0),
  zoneId,
});

const isleap = (d: CalendarDate) =>
  log(
    `${cldr.Calendars.formatDate(d, { skeleton: "y" })} ` +
      `is leap year ${d.isLeapYear()}`
  );

for (let y = 0; y < 11; y++) {
  isleap(date.add({ year: y }));
}
```

<pre class="output">
1895 is leap year false
1896 is leap year true
1897 is leap year false
1898 is leap year false
1899 is leap year false
1900 is leap year false
1901 is leap year false
1902 is leap year false
1903 is leap year false
1904 is leap year true
1905 is leap year false
</pre>

## julianDay

Returns the julian day.

Julian day is used by astronomers and in algorithms to compute the difference between two dates.
Julian Day 0 starts at noon on Monday, January 1 4713 BC.

#### Syntax

<pre class="syntax">
julianDay(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({ date: new Date(1970, 0, 1) });

log(date.julianDay());
log(date.add({ year: -10 }).julianDay());
log(date.add({ year: -100 }).julianDay());
```

<pre class="output">
2440587.7083333335
2436934.7083333335
2404063.7083333335
</pre>

## metaZoneId

Returns the CLDR metazone used for time zone display name formatting.

#### Syntax

<pre class="syntax">
metaZoneId(): string
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const zoneId = "America/New_York";
const date = cldr.Calendars.toGregorianDate({
  date: new Date(1990, 0, 1),
  zoneId,
});

log(date.metaZoneId());
```

<pre class="output">
America_Eastern
</pre>

## milliseconds

Returns the milliseconds of the time.

#### Syntax

<pre class="syntax">
milliseconds(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({ date: 1560602096987 });
log(date.milliseconds());
```

<pre class="output">
987
</pre>

## millisecondsInDay

Returns a composite of all time-related fields: hours, minutes, seconds and milliseconds.

#### Syntax

<pre class="syntax">
millisecondsInDay(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const zoneId = "America/New_York";
let date = cldr.Calendars.toGregorianDate({
  date: new Date(2019, 2, 10, 6, 59, 59),
  zoneId,
});

const fmt = (d: CalendarDate) =>
  log(
    `${cldr.Calendars.formatDate(d, {
      datetime: "long",
    })}  ${d.millisecondsInDay()}`
  );

fmt(date);
fmt(date.add({ minute: 1 }));
fmt(date.add({ minute: 2 }));
```

<pre class="output">
March 10, 2019 at 6:59:59 AM EDT  25199000
March 10, 2019 at 7:00:59 AM EDT  25259000
March 10, 2019 at 7:01:59 AM EDT  25319000
</pre>

## minDaysInFirstWeek

Minimum number of days in a week to count as the first week of the year.

#### Syntax

<pre class="syntax">
minDaysInFirstWeek(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");

let date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 5, 1) });
log(date.minDaysInFirstWeek());

date = cldr.Calendars.toISO8601Date(date);
log(date.minDaysInFirstWeek());
```

<pre class="output">
1
4
</pre>

## minute

Indicates the minute of the hour (0 - 59).

#### Syntax

<pre class="syntax">
minute(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({
  date: new Date(2019, 4, 10, 12, 27, 41),
});

log(cldr.Calendars.formatDate(date, { time: "long" }));
log(date.minute());
```

<pre class="output">
4:27:41 PM GMT
27
</pre>

## modifiedJulianDay

Returns the modified julian day.

Modified julian day is used internally for date calculations, and changes it to midnight-based by adding +0.5 to the Julian day.

#### Syntax

<pre class="syntax">
modifiedJulianDay(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({ date: new Date(1970, 0, 1) });

log(date.modifiedJulianDay());
log(date.add({ year: -10 }).modifiedJulianDay());
log(date.add({ year: -100 }).modifiedJulianDay());
```

<pre class="output">
2440588
2436935
2404064
</pre>

## month

Indicates the month of the year, 1-based. Gregorian JANUARY = 1, FEBRUARY = 2, .., DECEMBER = 12.

#### Syntax

<pre class="syntax">
month(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 4, 10) });

log(cldr.Calendars.formatDate(date, { date: "long" }));
log(date.month());
```

<pre class="output">
May 10, 2019
5
</pre>

## ordinalDayOfWeek

Ordinal day of the week. 1 if this is the 1st day of the week, 2 if the 2nd, etc. Depends on the locale's starting day of the week.

#### Syntax

<pre class="syntax">
ordinalDayOfWeek(): number
</pre>

#### Example

```typescript
const us = framework.get("en-US");
const fr = framework.get("fr-FR");

const suffixes = { one: "st", two: "nd", few: "rd", other: "th" };
const usdate = us.Calendars.toGregorianDate({ date: new Date(2019, 4, 7) });
const frdate = fr.Calendars.toGregorianDate(usdate);
let cat: string;

log(us.Calendars.formatDate(usdate));

let day = frdate.ordinalDayOfWeek();
cat = us.Numbers.getPluralOrdinal(day);
log(` .. in fr-FR is the ${day}${suffixes[cat]} day of the week`);

day = usdate.ordinalDayOfWeek();
cat = us.Numbers.getPluralOrdinal(day);
log(` .. in en-US is the ${day}${suffixes[cat]} day of the week`);
```

<pre class="output">
Tuesday, May 7, 2019
 .. in fr-FR is the 2nd day of the week
 .. in en-US is the 3rd day of the week
</pre>

#### See Also

- [firstDayOfWeek](#firstdayofweek)

## relativeTime

Compute the relative time between two dates in terms of a single [TimePeriodField](api-timeperiodfield.html) field.

#### Syntax

<pre class="syntax">
relativeTime(date, field?): [TimePeriodField, number]
</pre>

#### Parameters

- <code class="def">date: <span>[CalendarDate](api-calendardate.html)</span></code>
  - Date to compute the relative time to
- <code class="def">field?: <span>[TimePeriodField](api-timeperiodfield.html)</span></code>
  - Specify field to compute relative time in terms of. If omitted, the first non-zero field will be used (in descending order from `year` down).

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 8, 20) });
let end: CalendarDate;
let field: string;
let value: number;

end = date.add({ month: 2, day: 15 });

[field, value] = date.relativeTime(end);
log(`${value} ${field}`);

[field, value] = date.relativeTime(end, "day");
log(`${value} ${field}`);

[field, value] = date.relativeTime(end, "hour");
log(`${value} ${field}`);
```

<pre class="output">
2.5 month
76 day
1824 hour
</pre>

## second

Indicates the second of the minute (0 - 59).

#### Syntax

<pre class="syntax">
second(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({
  date: new Date(2019, 4, 10, 12, 27, 41),
});

log(cldr.Calendars.formatDate(date, { time: "long" }));
log(date.second());
```

<pre class="output">
4:27:41 PM GMT
41
</pre>

## set

Set one or more fields, returning a new date.

#### Syntax

<pre class="syntax">
set(fields): CalendarDate
</pre>

#### Parameters

- <code class="def">fields: <span>Partial&lt;[CalendarDateFields](api-calendardatefields)&gt;</span></code>
  - Fields to set on this date instance.

#### Example

```typescript
const cldr = framework.get("en");
let date = cldr.Calendars.newGregorianDate({ zoneId: "America/New_York" });
log(date.toString());
date = date.set({
  year: 2020,
  month: 7,
  minute: 33,
  zoneId: "America/Los_Angeles",
});
log(date.toString());
```

<pre class="output">
Gregorian 1970-01-01 00:00:00.000 America/New_York
Gregorian 2020-07-01 00:33:00.000 America/Los_Angeles
</pre>

## startOf

Adjust the date to be at the end of a given field (`month`, `year`, etc), setting all smaller fields to the minimum of their range. For the date `"2025-03-05 12:15:30.123"` calling `date.startOf("month")` would return the date `"2025-03-01 00:00:00.000"`.

#### Syntax

<pre class="syntax">
startOf(field): CalendarDate
</pre>

#### Parameters

- <code class="def">field: <span>(unexported type)</span></code>
  - Field to adjust

#### Example

```typescript
const cldr = framework.get("en");
let date = cldr.Calendars.toGregorianDate({
  date: 1741230930123,
  zoneId: "America/New_York",
});
log(date.toString());
log(date.startOf("minute").toString());
log(date.startOf("hour").toString());
log(date.startOf("day").toString());
log(date.startOf("month").toString());
log(date.startOf("year").toString());
```

<pre class="output">
Gregorian 2025-03-05 22:15:30.123 America/New_York
Gregorian 2025-03-05 22:15:00.000 America/New_York
Gregorian 2025-03-05 22:00:00.000 America/New_York
Gregorian 2025-03-05 00:00:00.000 America/New_York
Gregorian 2025-03-01 00:00:00.000 America/New_York
Gregorian 2025-01-01 00:00:00.000 America/New_York
</pre>

## subtract

Subtract a time period from the current date.

#### Syntax

<pre class="syntax">
subtract(fields): CalendarDate
</pre>

#### Parameters

- <code class="def">fields: <span>Partial&lt;[TimePeriod](api-timeperiod.html)&gt;</span></code>
  - Amounts to subtract from each field.

#### See Also

- [add](#add)

## timeZoneId

The IANA timezone identifier for this date.

#### Syntax

<pre class="syntax">
timeZoneId(): string
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const zoneId = "America/New_York";

let date = cldr.Calendars.toGregorianDate({
  date: new Date(2019, 4, 10, 12, 27, 41),
});
log(date.timeZoneId());

date = cldr.Calendars.toGregorianDate({ date: date.unixEpoch(), zoneId });
log(date.timeZoneId());
```

<pre class="output">
Etc/UTC
America/New_York
</pre>

## timeZoneOffset

The offset of this date's timezone, in milliseconds.

#### Syntax

<pre class="syntax">
timeZoneOffset(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const epoch = new Date(2019, 4, 10, 12, 27, 41);
for (const zoneId of [undefined, "America/New_York", "Europe/Zurich"]) {
  const date = cldr.Calendars.toGregorianDate({ date: epoch, zoneId });
  const s = cldr.Calendars.formatDate(date, { datetime: "full" });
  log(`${s} has offset ${date.timeZoneOffset()}`);
}
```

<pre class="output">
Friday, May 10, 2019 at 4:27:41 PM Greenwich Mean Time has offset 0
Friday, May 10, 2019 at 12:27:41 PM Eastern Daylight Time has offset -14400000
Friday, May 10, 2019 at 6:27:41 PM Central European Summer Time has offset 7200000
</pre>

## toString

Return a string representation of this date. The year field is the "extended year" represented by an integer.
For example the extended year 0 is 1 B.C. in the Gregorian calendar.

#### Syntax

<pre class="syntax">
toString(): string
</pre>

#### Example

```typescript
const cldr = framework.get("en");
log(
  cldr.Calendars.newGregorianDate({
    year: 2020,
    month: 6,
    day: 15,
    hour: 15,
    minute: 20,
    second: 30,
    zoneId: "Europe/Amsterdam",
  })
);
```

<pre class="output">
Gregorian 2020-06-15 15:20:30.000 Europe/Brussels
</pre>

## toISOString

Returns an ISO-8601 standard representation of this date as UTC. Per the standard the calendar will always be Gregorian.

#### Syntax

<pre class="syntax">
toISOString(): string
</pre>

#### Example

```typescript
const cldr = framework.get("en");
log(
  cldr.Calendars.newGregorianDate({
    year: 2020,
    month: 6,
    day: 15,
    hour: 15,
    minute: 20,
    second: 30,
    zoneId: "Europe/Amsterdam",
  }).toISOString()
);
```

<pre class="output">
2020-06-15T13:20:30.000Z
</pre>

## toLocalISOString

Returns an ISO-8601 standard representation of this date local to its timezone. Per the standard the calendar will always be Gregorian.

#### Syntax

<pre class="syntax">
toLocalISOString(): string
</pre>

#### Example

```typescript
const cldr = framework.get("en");
log(
  cldr.Calendars.newGregorianDate({
    year: 2020,
    month: 6,
    day: 15,
    hour: 15,
    minute: 20,
    second: 30,
    zoneId: "Europe/Amsterdam",
  }).toLocalISOString()
);
```

<pre class="output">
2020-06-15T15:20:30.000+02:00
</pre>

## type

Type of calendar this date uses.

#### Syntax

<pre class="syntax">
type(): CalendarType
</pre>

#### Return value

- A <code class="def"><span>[CalendarType](api-calendartype.html)</span></code> indicating the calendar for this date uses.

#### Example

```typescript
const cldr = framework.get("en");

let date = cldr.Calendars.toGregorianDate({ date: new Date() });
log(date.type());

date = cldr.Calendars.toJapaneseDate(date);
log(date.type());
```

<pre class="output">
gregory
japanese
</pre>

## unixEpoch

Unix epoch timestamp with no timezone offset, in milliseconds.

#### Syntax

<pre class="syntax">
unixEpoch(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({ date: 1560602096987 });
log(date.unixEpoch());
```

<pre class="output">
1560602096987
</pre>

## weekOfMonth

Returns the week of the month computed using the locale's [firstDayOfWeek](#firstdayofweek) and [minDaysInFirstWeek](#mindaysinfirstweek).

#### Syntax

<pre class="syntax">
weekOfMonth(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 4, 1) });

const fmt = (d: CalendarDate) =>
  log(
    `${cldr.Calendars.formatDate(d, {
      date: "long",
    })} is in week ${d.weekOfMonth()}`
  );

for (let d = 0; d < 14; d++) {
  fmt(date.add({ day: d }));
}
```

<pre class="output">
May 1, 2019 is in week 1
May 2, 2019 is in week 1
May 3, 2019 is in week 1
May 4, 2019 is in week 1
May 5, 2019 is in week 2
May 6, 2019 is in week 2
May 7, 2019 is in week 2
May 8, 2019 is in week 2
May 9, 2019 is in week 2
May 10, 2019 is in week 2
May 11, 2019 is in week 2
May 12, 2019 is in week 3
May 13, 2019 is in week 3
May 14, 2019 is in week 3
</pre>

## weekOfYear

Indicates the ordinal number of the week of the year. The first week of the month or year,
as defined by [firstDayOfWeek](#firstdayofweek) and [minDaysInFirstWeek](#mindaysinfirstweek) has value 1.

#### Syntax

<pre class="syntax">
weekOfYear(): number
</pre>

#### Example

**Note:** In the following example, the Gregorian date was constructed in the US region, so is using the week rules for the US. The first week of the year is the one containing Jan 1.

```typescript
const cldr = framework.get("en");
const zoneId = "America/New_York";
const opt: DateFormatOptions = { date: "long" };
const base = cldr.Calendars.toGregorianDate({
  date: new Date(2015, 11, 24, 12),
  zoneId,
});
for (let d = 0; d < 13; d++) {
  const date = base.add({ day: d });
  const str = `${cldr.Calendars.formatDate(date, opt)}`;
  log(`${str}  ${date.yearOfWeekOfYear()}-${date.weekOfYear()}`);
}
```

<pre class="output">
December 24, 2015  2015-52
December 25, 2015  2015-52
December 26, 2015  2015-52
December 27, 2015  2016-1
December 28, 2015  2016-1
December 29, 2015  2016-1
December 30, 2015  2016-1
December 31, 2015  2016-1
January 1, 2016  2016-1
January 2, 2016  2016-1
January 3, 2016  2016-2
January 4, 2016  2016-2
January 5, 2016  2016-2
</pre>

## withZone

Returns a copy of this date with the specified time zone.

#### Syntax

<pre class="syntax">
withZone(zoneId): CalendarDate
</pre>

#### Parameters

- <code class="def">zoneId: <span>[TimeZoneType](api-timezonetype.html)</span></code>
  - Identifier for a time zone.

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 4, 1) });

log(date.toString());
log(date.withZone("America/New_York").toString());
log(date.withZone("Europe/Paris").toString());
```

<pre class="output">
Gregorian 2019-05-01 04:00:00.000 Etc/UTC
Gregorian 2019-05-01 00:00:00.000 America/New_York
Gregorian 2019-05-01 06:00:00.000 Europe/Paris
</pre>

## year

Indicates the calendar-specific year for this date.

#### Syntax

<pre class="syntax">
year(): number
</pre>

#### Example

```typescript
const cldr = framework.get("en");
const date = cldr.Calendars.toGregorianDate({ date: new Date(2019, 2, 15) });

log(cldr.Calendars.formatDate(date, { date: "long" }));
log(date.year());
```

<pre class="output">
March 15, 2019
2019
</pre>

## yearOfWeekofYear

Extended year corresponding to the [weekOfYear](#weekofyear).

#### Syntax

<pre class="syntax">
yearOfWeekOfYear(): number
</pre>

#### Example

**Note:** In the following example, the Gregorian date was constructed in the US region, so is using the week rules for the US. The first week of the year is the one containing Jan 1.

```typescript
const cldr = framework.get("en");
const zoneId = "America/New_York";
const opt: DateFormatOptions = { date: "long" };
const base = cldr.Calendars.toGregorianDate({
  date: new Date(2015, 11, 24, 12),
  zoneId,
});
for (let d = 0; d < 13; d++) {
  const date = base.add({ day: d });
  const str = `${cldr.Calendars.formatDate(date, opt)}`;
  log(`${str}  ${date.yearOfWeekOfYear()}-${date.weekOfYear()}`);
}
```

<pre class="output">
December 24, 2015  2015-52
December 25, 2015  2015-52
December 26, 2015  2015-52
December 27, 2015  2016-1
December 28, 2015  2016-1
December 29, 2015  2016-1
December 30, 2015  2016-1
December 31, 2015  2016-1
January 1, 2016  2016-1
January 2, 2016  2016-1
January 3, 2016  2016-2
January 4, 2016  2016-2
January 5, 2016  2016-2
</pre>

{%refs CalendarDate}
