---
id: version-0.23.0-api-relativetimeformatoptions
title: RelativeTimeFormatOptions
original_id: api-relativetimeformatoptions
---

### Syntax

<pre class="syntax">
object {
  dayOfWeek?,
  width?,
  nu?,
  context?,
  field?,
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
  - <code class="def">numericOnly?: <span>boolean</span></code>
    - Always use a format that includes a number, e.g. `"1 day ago"` instead of `"Yesterday"`.
  - <code class="def">alwaysNow?: <span>boolean</span></code>
    - In `numericOnly` mode, if the value to be formatted is exactly zero, use the "now" format instead of a numeric format, e.g. `"Today"` instead of `"In 0 days"`.
  - <code class="def">width?: <span>RelativeTimeWidthType</span></code>
    - Width of the unit of relative time: `'short' | 'narrow' | 'wide'`
  - <code class="def">nu?: <span>[NumberSystemType](api-numbersystemtype.html)</span></code>
    - Override the numbering system
  - <code class="def">context?: <span>[ContextType](api-contexttype.html)</span></code>
    - Specify the context in which the string will be display
  - <code class="def">field?: <span>[TimePeriodField](api-timeperiodfield)</span></code>
    - Calculate the result in terms of a single time period field
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
const nums = [-5, -2, -1, 0, 1, 2, 5];
for (const n of nums) {
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

```typescript
opts = { numericOnly: true };
for (const n of nums) {
  const end = start.add({ month: n });
  log(cldr.Calendars.formatRelativeTime(start, end, opts));
}
```
<pre class="output">
5 months ago
2 months ago
1 month ago
in 0 seconds
in 1 month
in 2 months
in 5 months
</pre>

```typescript
nums = [-2, -1, 0, 1, 2];
opts = { numericOnly: true, alwaysNow: true };
for (const n of nums) {
  const end = start.add({ month: n });
  log(cldr.Calendars.formatRelativeTime(start, end, opts));
}
```
<pre class="output">
2 months ago
1 month ago
now
in 1 month
in 2 months
</pre>

```typescript
for (const n of nums) {
  const end = start.add({ month: n });
  log(cldr.Calendars.formatRelativeTime(start, end, { ...opts, field: 'day' }));
}
```
<pre class="output">
61 days ago
30 days ago
today
in 31 days
in 62 days
</pre>