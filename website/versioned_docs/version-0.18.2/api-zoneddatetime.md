---
id: version-0.18.2-api-zoneddatetime
title: ZonedDateTime
original_id: api-zoneddatetime
---

### Syntax
<pre class="syntax">
object {
  date,
  zoneId?
}
</pre>

### Properties
  - <code class="def">date: <span>number | Date</span></code>
    - Timestamp or Date value, representing milliseconds since Jan 1 1970 at midnight UTC.
  - <code class="def">zoneId?: <span>string</span></code>
    - IANA tzdb zone identifier, defaults to `'UTC'`

### Example

```typescript
const cldr = framework.get('en');
let time: ZonedDateTime = { date: -6105991722000, zoneId: 'America/New_York' };
log(cldr.Calendars.formatDate(time, { date: 'full' }));
```
<pre class="output">
Thursday, July 4, 1776
</pre>


```typescript
const cldr = framework.get('en');
const day = 86400 * 1000;
const epoch = -12219223722000;

let time: ZonedDateTime = { date: epoch - day, zoneId: 'Europe/Rome' };
let result = cldr.Calendars.formatDate(time, { date: 'full' });
log(result);

time = { date: epoch, zoneId: 'Europe/Rome' };
result = cldr.Calendars.formatDate(time, { date: 'full' });
log(result);
```
<pre class="output">
Thursday, October 4, 1582
Friday, October 15, 1582
</pre>


{%refs ZonedDateTime}
