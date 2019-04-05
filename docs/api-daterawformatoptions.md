---
id: api-daterawformatoptions
title: DateRawFormatOptions
---

### Syntax

<pre class="syntax">
object {
  pattern,
  ca?,
  nu?,
  context?
}
</pre>

### Properties
  - <code>pattern: <span>string</span></code>
    - A date time pattern string, specifying the fields to format
  - <code>ca?: <span>[CalendarType](api-calendartype.html)</span></code>
    - Override the calendar. The argument will be converted to the requested calendar before formatting.
  - <code>nu?: <span>[NumberSystemType](api-numbersystemtype.html)</span></code>
    - Override the numbering system.
  - <code>context?: <span>[ContextType](api-contexttype.html)</span></code>
    - Specify the context in which the string will be display


### Defaults

```typescript
{
  pattern: ''
}
```

* Numbering system default is determined by the locale.
* Calendar system default is determined by the locale.

### Example

```typescript
// June 27, 2018 4:23:00 AM
const date = 1530087780000;
const zoneId = 'America/New_York';

const s = cldr.Calendars.formatDateRaw({ date, zoneId }, { pattern: 'EEE MMM y, d' });
console.log(s);
```

<pre class="output">
Wed Jun 2018, 27
</pre>
