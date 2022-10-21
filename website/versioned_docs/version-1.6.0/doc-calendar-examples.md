---
id: version-1.6.0-doc-calendar-examples
title: Example: date formatting
original_id: doc-calendar-examples
---

All examples below use:

```typescript
// UTC
const date = new Date(2018, 2, 15, 12, 34, 56, 789);

// Formats that include time will use these 3 zones
const zones = [ 'America/New_York', 'Europe/London', 'Asia/Tokyo' ];
```

## Dates

```typescript
const cldr = framework.get('en');

// UTC
const date = new Date(2018, 2, 15, 12, 34, 56, 789);

// Formats that include time will use these 3 zones
const zones = [ 'America/New_York', 'Europe/London', 'Asia/Tokyo' ];
```

```typescript
log(cldr.Calendars.formatDate({ date }, { date: 'short' }));
```
<pre class="output">
3/15/18
</pre>

```typescript
log(cldr.Calendars.formatDate({ date }, { date: 'medium' }));
```
<pre class="output">
Mar 15, 2018
</pre>

```typescript
log(cldr.Calendars.formatDate({ date }, { date: 'long' }));
```
<pre class="output">
March 15, 2018
</pre>

```typescript
log(cldr.Calendars.formatDate({ date }, { date: 'full' }));
```
<pre class="output">
Thursday, March 15, 2018
</pre>

## Times


```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { time: 'short' })));
```
<pre class="output">
12:34 PM
4:34 PM
1:34 AM
</pre>

```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { time: 'medium' })));
```
<pre class="output">
12:34:56 PM
4:34:56 PM
1:34:56 AM
</pre>

```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { time: 'long' })));
```
<pre class="output">
12:34:56 PM EDT
4:34:56 PM GMT
1:34:56 AM GMT+9
</pre>

```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { time: 'full' })));
```
<pre class="output">
12:34:56 PM Eastern Daylight Time
4:34:56 PM Greenwich Mean Time
1:34:56 AM Japan Standard Time
</pre>

## Dates and times


```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { datetime: 'short' )}));
```
<pre class="output">
3/15/18, 12:34 PM
3/15/18, 4:34 PM
3/16/18, 1:34 AM
</pre>

```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { datetime: 'medium' })));
```
<pre class="output">
Mar 15, 2018, 12:34:56 PM
Mar 15, 2018, 4:34:56 PM
Mar 16, 2018, 1:34:56 AM
</pre>

```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { datetime: 'long' })));
```
<pre class="output">
March 15, 2018 at 12:34:56 PM EDT
March 15, 2018 at 4:34:56 PM GMT
March 16, 2018 at 1:34:56 AM GMT+9
</pre>

```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { datetime: 'full' })));
```
<pre class="output">
Thursday, March 15, 2018 at 12:34:56 PM Eastern Daylight Time
Thursday, March 15, 2018 at 4:34:56 PM Greenwich Mean Time
Friday, March 16, 2018 at 1:34:56 AM Japan Standard Time
</pre>

## Date skeletons


```typescript
log(cldr.Calendars.formatDate({ date }, { skeleton: 'yMd' }));
```
<pre class="output">
3/15/2018
</pre>

```typescript
log(cldr.Calendars.formatDate({ date }, { skeleton: 'yMMMd' }));
```
<pre class="output">
Mar 15, 2018
</pre>

```typescript
log(cldr.Calendars.formatDate({ date }, { skeleton: 'yMMMMd' }));
```
<pre class="output">
March 15, 2018
</pre>

```typescript
log(cldr.Calendars.formatDate({ date }, { skeleton: 'EEEEyMMMMd' }));
```
<pre class="output">
Thursday, March 15, 2018
</pre>

## Time skeletons


```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { skeleton: 'hm' })));
```
<pre class="output">
12:34 PM
4:34 PM
1:34 AM
</pre>

```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { skeleton: 'hmsz' })));
```
<pre class="output">
12:34:56 PM EDT
4:34:56 PM GMT
1:34:56 AM GMT+9
</pre>

```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { skeleton: 'hmszzzz' })));
```
<pre class="output">
12:34:56 PM Eastern Daylight Time
4:34:56 PM Greenwich Mean Time
1:34:56 AM Japan Standard Time
</pre>

```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { skeleton: 'hmsVVVV' })));
```
<pre class="output">
12:34:56 PM New York Time
4:34:56 PM London Time
1:34:56 AM Tokyo Time
</pre>

```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { skeleton: 'hmsvvvv' })));
```
<pre class="output">
12:34:56 PM Eastern Time
4:34:56 PM GMT
1:34:56 AM Japan Time
</pre>

## Date time skeletons


```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { skeleton: 'yMdhm' })));
```
<pre class="output">
3/15/2018, 12:34 PM
3/15/2018, 4:34 PM
3/16/2018, 1:34 AM
</pre>

```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { skeleton: 'yMMMdhmsz' })));
```
<pre class="output">
Mar 15, 2018, 12:34:56 PM EDT
Mar 15, 2018, 4:34:56 PM GMT
Mar 16, 2018, 1:34:56 AM GMT+9
</pre>

```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { skeleton: 'EyMMMMdhmszzzz' })));
```
<pre class="output">
Thu, March 15, 2018 at 12:34:56 PM Eastern Daylight Time
Thu, March 15, 2018 at 4:34:56 PM Greenwich Mean Time
Fri, March 16, 2018 at 1:34:56 AM Japan Standard Time
</pre>

```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { skeleton: 'yMMMdhmsVVVV' })));
```
<pre class="output">
Mar 15, 2018, 12:34:56 PM New York Time
Mar 15, 2018, 4:34:56 PM London Time
Mar 16, 2018, 1:34:56 AM Tokyo Time
</pre>

```typescript
zones.forEach(zoneId =>
  log(cldr.Calendars.formatDate({ date, zoneId }, { skeleton: 'yMMMMdhmsvvvv' })));
```
<pre class="output">
March 15, 2018 at 12:34:56 PM Eastern Time
March 15, 2018 at 4:34:56 PM GMT
March 16, 2018 at 1:34:56 AM Japan Time
</pre>

