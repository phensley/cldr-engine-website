---
id: doc-calendar-overview
title: Calendar Overview
---

This section attempts to provide a complete overview of the features of the calendar-related APIs. The goal is to give a concise description of each feature and let examples speak for themselves.

## Calendars

There are currently 5 calendar systems implemented: [gregorian](api-gregoriandate), [ISO-8601](api-iso8601date), [japanese](api-japanesedate), [buddhist](api-buddhistdate), and [persian](api-persiandate).

## Date instances

[CalendarDate](api-calendardate) instances are created within a given locale, via the [CLDR.Calendars](api-cldr-calendars) namespace. The reason for this is that date instances have methods and properties that depend on [CLDR week data](https://www.unicode.org/reports/tr35/tr35-dates.html#Week_Data).

```typescript
const cldr = framework.get('en');
const a = cldr.Calendars.toGregorianDate({ date: 1568550896000 });
const b = cldr.Calendars.toJapaneseDate({ date: new Date(2019, 8, 15, 12, 34, 56) });
log(a);
log(b);
```
<pre class="output">
Gregorian 2019-09-15 12:34:56.000 Etc/UTC
Japanese 2019-09-15 12:34:56.000 Etc/UTC
</pre>


## Conversion

Conversions of dates from one calendar system to another, or changing of the date's time zone.


```typescript
const cldr = framework.get('en');
const gregorian = cldr.Calendars.toGregorianDate({ date: new Date(2019, 8, 15) });
const japanese = cldr.Calendars.toJapaneseDate(gregorian);
log(japanese.toString());
```
<pre class="output">
Japanese 2019-09-15 00:00:00.000 Etc/UTC
</pre>

#### See
 * [Calendars.toGregorianDate](api-cldr-calendars#togregoriandate)
 * [CalendarDate.withZone](api-calendardate#withzone)

## Date formatting

```typescript
const cldr = framework.get('en');
const utc = cldr.Calendars.toGregorianDate({ date: 1568586645000 });
log(utc.toString());
log();

const ny = utc.withZone('America/New_York');
const tokyo = utc.withZone('Asia/Tokyo');
for (const date of [utc, ny, tokyo]) {
  for (const width of ['short', 'medium', 'long', 'full']) {
    const s = cldr.Calendars.formatDate(date, { datetime: width });
    log(s);
  }
  log();
}
```
<pre class="output">
Gregorian 2019-09-15 22:30:45.000 Etc/UTC
&nbsp;
9/15/19, 10:30 PM
Sep 15, 2019, 10:30:45 PM
September 15, 2019 at 10:30:45 PM GMT
Sunday, September 15, 2019 at 10:30:45 PM Greenwich Mean Time
&nbsp;
9/15/19, 6:30 PM
Sep 15, 2019, 6:30:45 PM
September 15, 2019 at 6:30:45 PM EDT
Sunday, September 15, 2019 at 6:30:45 PM Eastern Daylight Time
&nbsp;
9/16/19, 7:30 AM
Sep 16, 2019, 7:30:45 AM
September 16, 2019 at 7:30:45 AM GMT+9
Monday, September 16, 2019 at 7:30:45 AM Japan Standard Time
&nbsp;
</pre>

#### See
 * [CalendarDate.withZone](api-calendardate#withzone)
 * [Calendars.formatDate](api-cldr-calendars#formatdate)
 * [Calendars.toGregorianDate](api-cldr-calendars#togregoriandate)

## Date interval formatting

```typescript
const cldr = framework.get('en');
const start = cldr.Calendars.toGregorianDate({ date: 1568586645000 });
const options = [
  { },
  { skeleton: 'y' },
  { skeleton: 'yMMMd' },
  { skeleton: 'EyMMMMd' }
];
const periods: TimePeriod[] = [
  { day: 3 },
  { week: 2 },
  { month: 7.9 },
  { year: 3, month: 4 }
];
for (const o of options) {
  for (const p of periods) {
    log(cldr.Calendars.formatDateInterval(start, start.add(p), o));
  }
  log();
}
```
<pre class="output">
9/15/2019 – 9/18/2019
9/15/2019 – 9/29/2019
9/15/2019 – 5/12/2020
9/15/2019 – 1/15/2023
&nbsp;
Sep 15 – 18, 2019
Sep 15 – 29, 2019
2019 – 2020
2019 – 2023
&nbsp;
Sep 15 – 18, 2019
Sep 15 – 29, 2019
Sep 15, 2019 – May 12, 2020
Sep 15, 2019 – Jan 15, 2023
&nbsp;
Sun, September 15 – Wed, September 18, 2019
Sun, September 15 – Sun, September 29, 2019
Sun, September 15, 2019 – Tue, May 12, 2020
Sun, September 15, 2019 – Sun, January 15, 2023
&nbsp;
</pre>

#### See
 * [Calendars.formatDateInterval](api-cldr-calendars#formatdateinterval)

## Calendar math

```typescript
const cldr = framework.get('en');
const start = cldr.Calendars.toGregorianDate({ date: 1568586645000 });
log('baseline:', cldr.Calendars.formatDate(start, { datetime: 'medium' }));
log();

for (const n of [1, 17.5]) {
  for (const field of ['minute', 'hour', 'day', 'week', 'month', 'year']) {
    let s: string;
    const end = start.add({ [field]: n });

    const d = start.difference(end);
    const q = cldr.Calendars.timePeriodToQuantity(d);
    s = cldr.Units.formatQuantitySequence(q);
    log(`+${n} ${field} difference = ${s}`);

    s = cldr.Calendars.formatDate(end, { datetime: 'medium' });
    log(s);
    log();
  }
}
```
<pre class="output">
baseline: Sep 15, 2019, 10:30:45 PM
&nbsp;
+1 minute difference = 1 minute
Sep 15, 2019, 10:31:45 PM
&nbsp;
+1 hour difference = 1 hour
Sep 15, 2019, 11:30:45 PM
&nbsp;
+1 day difference = 1 day
Sep 16, 2019, 10:30:45 PM
&nbsp;
+1 week difference = 1 week
Sep 22, 2019, 10:30:45 PM
&nbsp;
+1 month difference = 1 month
Oct 15, 2019, 10:30:45 PM
&nbsp;
+1 year difference = 1 year
Sep 15, 2020, 10:30:45 PM
&nbsp;
+17.5 minute difference = 17 minutes, 30 seconds
Sep 15, 2019, 10:48:15 PM
&nbsp;
+17.5 hour difference = 17 hours, 30 minutes
Sep 16, 2019, 4:00:45 PM
&nbsp;
+17.5 day difference = 2 weeks, 3 days, 12 hours
Oct 3, 2019, 10:30:45 AM
&nbsp;
+17.5 week difference = 4 months, 12 hours
Jan 16, 2020, 10:30:45 AM
&nbsp;
+17.5 month difference = 1 year, 5 months, 2 weeks
Mar 1, 2021, 10:30:45 PM
&nbsp;
+17.5 year difference = 17 years, 6 months, 2 days
Mar 17, 2037, 10:30:45 PM
&nbsp;
</pre>

#### See
 * [CalendarDate.add](api-calendardate#add)
 * [CalendarDate.difference](api-calendardate#difference)
 * [CalendarDate.subtract](api-calendardate#subtract)

## Relative time formatting

```typescript
const cldr = framework.get('en');
const start = cldr.Calendars.toGregorianDate({ date: 1568586645000 });
const periods: TimePeriod[] = [
  { millis: 100 },
  { hour: 17.5 },
  { day: -3 },
  { week: 2 },
  { month: -7.9 },
  { year: 3, month: 4 }
];
for (const p of periods) {
  log(cldr.Calendars.formatRelativeTime(start, start.add(p)));
  log(cldr.Calendars.formatRelativeTime(start, start.add(p), { maximumFractionDigits: 1 }));
  log(cldr.Calendars.formatRelativeTime(start, start.add(p), { field: 'day' }));
  log();
}
```
<pre class="output">
now
in 0.1 seconds
today
&nbsp;
in 18 hours
in 17.5 hours
tomorrow
&nbsp;
3 days ago
3 days ago
3 days ago
&nbsp;
in 2 weeks
in 2 weeks
in 14 days
&nbsp;
8 months ago
7.9 months ago
240 days ago
&nbsp;
in 3 years
in 3.3 years
in 1218 days
&nbsp;
</pre>

#### See
 * [Calendars.formatRelativeTime](api-cldr-calendars#formatrelativetime)

## Relative time field formatting

```typescript
const cldr = framework.get('en');
for (const n of [0, -2, 5, -17]) {
  log(cldr.Calendars.formatRelativeTimeField(n, 'hour'));
}
```
<pre class="output">
this hour
2 hours ago
in 5 hours
17 hours ago
</pre>

#### See
 * [Calendars.formatRelativeTimeField](api-cldr-calendars#formatrelativetimefield)

## Time period quantities

```typescript
const cldr = framework.get('en');
const start = cldr.Calendars.toGregorianDate({ date: 1568586645000 });
for (const n of [999, 12502, 135138]) {
  const end = start.add({ minute: n });
  const qty = cldr.Calendars.timePeriodToQuantity(start.difference(end));
  for (const length of ['narrow', 'short', 'long']) {
    log(cldr.Units.formatQuantitySequence(qty, { length }));
  }
  log();
}
```
<pre class="output">
16h 39m
16 hr, 39 min
16 hours, 39 minutes
&nbsp;
1w 1d 16h 22m
1 wk, 1 day, 16 hr, 22 min
1 week, 1 day, 16 hours, 22 minutes
&nbsp;
3m 2d 20h 18m
3 mths, 2 days, 20 hr, 18 min
3 months, 2 days, 20 hours, 18 minutes
&nbsp;
</pre>

#### See
 * [CalendarDate.difference](api-calendardate#difference)
 * [Calendars.timePeriodToQuantity](api-cldr-calendars#timeperiodtoquantity)
 * [Units.formatQuantitySequence](api-cldr-units#formatquantitysequence)
