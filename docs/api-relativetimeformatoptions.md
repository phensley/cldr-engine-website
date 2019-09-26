---
id: api-relativetimeformatoptions
title: RelativeTimeFormatOptions
---

### Syntax

<pre class="syntax">
object {
  dayOfWeek?,
  width?,
  nu?,
  context?,
  group?,
  round?,
  minimumIntegerDigits?,
  maximumFractionDigits?,
  minimumFractionDigits?,
  maximumSignificantDigits?,
  minimumSignificantDigits?
}
</pre>

### Properties
  - <code class="def">dayOfWeek?: <span>boolean</span></code>
    - Control whether weekday names should be allowed, e.g. "2 Sundays ago". When enabled this will only emit a weekday name when the week field is being formatted and the start and end dates share the same weekday.
  - <code class="def">width?: <span>RelativeTimeWidthType</span></code>
    - Width of the unit of relative time: `'short' | 'narrow' | 'wide'`
  - <code class="def">nu?: <span>[NumberSystemType](api-numbersystemtype.html)</span></code>
    - Override the numbering system
  - <code class="def">context?: <span>[ContextType](api-contexttype.html)</span></code>
    - Specify the context in which the string will be display
  - <code class="def">group?: <span>boolean</span></code>
    - Enable grouping of digits.
  - <code class="def">round?: <span>[RoundingModeType](api-roundingmodetype.html)</span></code>
    - Mode used to round numbers during formatting.
  - <code class="def">minimumIntegerDigits?: <span>number</span></code>
    - Minimum integer digits to display.
  - <code class="def">maximumFractionDigits?: <span>number</span></code>
    - Maximum fraction digits to display.
  - <code class="def">minimumFractionDigits?: <span>number</span></code>
    - Minimum fraction digits to display.
  - <code class="def">maximumSignificantDigits?: <span>number</span></code>
    - Maximum significant digits to display.
  - <code class="def">minimumSignificantDigits?: <span>number</span></code>
    - Minimum significant digits to display.


### Defaults

```javascript
{
  context: 'middle-of-text'
}
```

### Example

```typescript
const cldr = framework.get('en');
const opts: RelativeTimeFormatOptions = { width: 'wide' };
const start = cldr.Calendars.toGregorianDate({ date: new Date(2019, 6, 11) });
for (const n of [-5, -2, -1, 0, 1, 2, 5]) {
  const end = start.add({ month: n });
  let a = cldr.Calendars.formatRelativeTime(start, end, opts);
  let b = cldr.Calendars.formatRelativeTime(start, end, { field: 'day', ...opts });
  log(`${a}  (${b})`);
}
```
<pre class="output">
5 months ago  (150 days ago)
2 months ago  (61 days ago)
last month  (30 days ago)
now  (today)
next month  (in 31 days)
in 2 months  (in 62 days)
in 5 months  (in 153 days)
</pre>


{%refs RelativeTimeFormatOptions}
