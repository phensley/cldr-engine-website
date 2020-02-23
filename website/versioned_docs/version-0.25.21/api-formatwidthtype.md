---
id: version-0.25.21-api-formatwidthtype
title: FormatWidthType
original_id: api-formatwidthtype
---

Specifies the width of a date or time format.

For example, a "`short`" date might contain numerals for month, day and year, with a 2-digit year, and omitting the day of the week.

A "`full`" date might contain all relevant date fields in their widest representation, e.g. full-length weekday and month name, 4-digit year, etc.

### Syntax

<pre class="syntax">
'short' | 'medium' | 'long' | 'full'
</pre>

### Example

```typescript
const cldr = framework.get('en');
const date = 1530087780000;
const zoneId = 'America/New_York';
log(cldr.Calendars.formatDate({ date, zoneId }, { date: 'short' }));
```
<pre class="output">
6/27/18
</pre>


```typescript
const cldr = framework.get('en');
const date = 1530087780000;
const zoneId = 'America/New_York';
log(cldr.Calendars.formatDate({ date, zoneId }, { date: 'full' }));
```
<pre class="output">
Wednesday, June 27, 2018
</pre>


{%refs FormatWidthType}
