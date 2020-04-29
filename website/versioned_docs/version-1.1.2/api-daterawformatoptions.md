---
id: version-1.1.2-api-daterawformatoptions
title: DateRawFormatOptions
original_id: api-daterawformatoptions
---

Format a date directly using a raw format.

**WARNING:** For date formatting, consider this this only as last resort. Try [formatDate](api-cldr-calendars#formatdate) with a skeleton.

### Syntax

<pre class="syntax">
object {
  pattern,
  ca?,
  nu?,
  context?,
  alt?
}
</pre>

### Properties

- <code class="def">pattern: <span>string</span></code>
  - A date time pattern string, specifying the fields to format
- <code class="def">ca?: <span>[CalendarType](api-calendartype)</span></code>
  - Override the calendar. The argument will be converted to the requested calendar before formatting.
- <code class="def">nu?: <span>[NumberSystemType](api-numbersystemtype)</span></code>
  - Override the numbering system.
- <code class="def">context?: <span>[ContextType](api-contexttype)</span></code>
  - Specify the context in which the string will be display
- <code class="def">alt?: <span>[DateFormatAltOptions](api-dateformataltoptions)</span></code>
  - Specify options for alternate field values.

### Defaults

```javascript
{
  pattern: '';
}
```

- Numbering system default is determined by the locale.
- Calendar system default is determined by the locale.

### Example

```typescript
const cldr = framework.get('en');
// June 27, 2018 4:23:00 AM
const date = 1530087780000;
const zoneId = 'America/New_York';

const s = cldr.Calendars.formatDateRaw(
  { date, zoneId },
  { pattern: 'EEE MMM y, d GGGG', alt: { era: 'sensitive' } }
);
log(s);
```
<pre class="output">
Wed Jun 2018, 27 Common Era
</pre>


{%refs DateRawFormatOptions}
