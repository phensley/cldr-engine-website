---
id: version-0.18.2-api-relativetimefieldformatoptions
title: RelativeTimeFieldFormatOptions
original_id: api-relativetimefieldformatoptions
---

### Syntax

<pre class="syntax">
object {
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
for (const n of [-5, -2, -1, 0, 1, 2, 5]) {
  log(cldr.Calendars.formatRelativeTimeField(n, 'day');
}
log();
for (const n of [3.3, 3.5, 3.8]) {
  log(cldr.Calendars.formatRelativeTimeField(n, 'day');
  log(cldr.Calendars.formatRelativeTimeField(n, 'day', { maximumFractionDigits: 1 });
}
```
<pre class="output">
5 days ago
2 days ago
yesterday
today
tomorrow
in 2 days
in 5 days
&nbsp;
in 3 days
in 3.3 days
in 4 days
in 3.5 days
in 4 days
in 3.8 days
</pre>


{%refs RelativeTimeFieldFormatOptions}