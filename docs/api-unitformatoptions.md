---
id: api-unitformatoptions
title: UnitFormatOptions
---

### Syntax

<pre class="syntax">
object {
  length?,
  style?,
  nu?,
  round?,
  group?,
  minimumIntegerDigits?,
  maximumFractionDigits?,
  minimumFractionDigits?,
  maximumSignificantDigits?,
  minimumSignificantDigits?
}
</pre>

### Properties
  - <code class="def">length?: <span>[UnitLength](api-unitlength.html)</span></code>
    - Length of the unit indicator
  - <code class="def">style?: <span>[DecimalFormatStyleType](api-decimalformatstyletype.html)</span></code>
    - Style used to format the number.
  - <code class="def">nu?: <span>NumberSystemType</span></code>
    - Override the number system used to format the digits.
  - <code class="def">round?: <span>RoundingModeType</span></code>
    - Mode used to round numbers during formatting.
  - <code class="def">group?: <span>boolean</span></code>
    - Enable grouping of digits.
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


### Example

```typescript
const qty: Quantity = { value: '17', unit: 'inch' };
const opts: UnitFormatOptions[] = [
  { length: 'long' },
  { length: 'short' },
  { length: 'narrow' }
];
for (const opt of opts) {
  const result = cldr.Units.formatQuantity(qty, opt);
  console.log(result);
}
```
<pre class="output">
17 inches
17 in
17″
</pre>
