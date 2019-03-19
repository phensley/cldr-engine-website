---
id: api-decimalformatoptions
title: DecimalFormatOptions
---

Object expressing options for decimal formatting methods.

### Syntax

<pre class="syntax">
object {
  style?,
  group?,
  round?,
  minimumIntegerDigits?,
  maximumFractionDigits?,
  minimumFractionDigits?,
  maximumSignificantDigits?,
  minimumSignificantDigits?,
  nu?,
  errors?: NumberFormatErrorType[]
}
</pre>

### Properties

  - <code class="def">style?: <span>[DecimalFormatStyleType](api-decimalformatstyletype.html)</span></code>
    - Style used to format the number.
  - <code class="def">group?: <span>boolean</span></code>
    - Enable grouping of digits.
  - <code class="def">round?: <span>RoundingModeType</span></code>
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
  - <code class="def">nu?: <span>NumberSystemType</span></code>
    - Override the number system used to format the digits.
  - <code class="def">errors?: <span>[NumberFormatErrorType](api-numberformaterrortype.html)</span></code>
    - Optional flags controlling when formatting a `NaN` or `Infinity` will raise an error

### Defaults

```typescript
{
  style: 'decimal',
  group: false,
  round: 'half-even'
}
```
* Integer and fraction option defaults are determined by the selected number pattern.
* Options for significant digits default to `undefined`.
* Numbering system default is determined by the locale.
* By default values `NaN` and `Infinity` are formatted

### See Also
  - [CLDR.Numbers.formatDecimal](api-cldr-numbers#formatdecimal)
  - [CLDR.Numbers.formatDecimalToParts](api-cldr-numbers#formatdecimaltoparts)
