---
id: version-1.0.4-api-unitformatoptions
title: UnitFormatOptions
original_id: api-unitformatoptions
---

### Syntax

<pre class="syntax">
object {
  length?,
  style?,
  group?,
  round?,
  divisor?,
  minimumIntegerDigits?,
  maximumFractionDigits?,
  minimumFractionDigits?,
  maximumSignificantDigits?,
  minimumSignificantDigits?,
  nu?
}
</pre>

### Properties
  - <code class="def">length?: <span>[UnitLength](api-unitlength.html)</span></code>
    - Length of the unit indicator
  - <code class="def">style?: <span>[UnitFormatStyleType](api-unitformatstyletype.html)</span></code>
    - Style used to format the number.
  - <code class="def">group?: <span>boolean</span></code>
    - Enable grouping of digits.
  - <code class="def">round?: <span>[RoundingModeType](api-roundingmodetype.html)</span></code>
    - Mode used to round numbers during formatting.
  - <code class="def">divisor?: <span>number</span></code>
    - Specify an explicit divisor when formatting a compact style. Should be a round power of 10, e.g. `1000`, `10000`, etc.
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
  - <code class="def">nu?: <span>[NumberSystemType](api-numbersystemtype.html)</span></code>
    - Override the number system used to format the digits.


### Example

```typescript
const cldr = framework.get('en');
const qty: Quantity = { value: '17', unit: 'inch' };
const opts: UnitFormatOptions[] = [
  { length: 'long' },
  { length: 'short' },
  { length: 'narrow' }
];
for (const opt of opts) {
  const result = cldr.Units.formatQuantity(qty, opt);
  log(result);
}
```
<pre class="output">
17 inches
17 in
17″
</pre>

{%refs UnitFormatOptions}
