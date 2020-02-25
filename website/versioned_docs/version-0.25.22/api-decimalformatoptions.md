---
id: version-0.25.22-api-decimalformatoptions
title: DecimalFormatOptions
original_id: api-decimalformatoptions
---

Object expressing options for decimal formatting methods.

### Syntax

<pre class="syntax">
object {
  style?,
  negativeZero?,
  group?,
  round?,
  divisor?,
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
  - <code class="def">negativeZero?: <span>boolean</span></code>
    - Format negative zero.
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
  - <code class="def">errors?: <span>[NumberFormatErrorType](api-numberformaterrortype.html)</span></code>
    - Optional flags controlling when formatting a `NaN` or `Infinity` will raise an error

### Defaults

```javascript
{
  style: 'decimal',
  negativeZero: false,
  group: true,
  round: 'half-even'
}
```

* Integer and fraction option defaults are determined by the selected number pattern.
* Options for significant digits default to `undefined`.
* Numbering system default is determined by the locale.
* By default values `NaN` and `Infinity` are formatted

### Examples

```typescript
const cldr = framework.get('en');
log(cldr.Numbers.formatDecimal('12345.6789', { group: true }));
```
<pre class="output">
12,345.679
</pre>


Using a compact style with an explicit fixed divisor.

```typescript
const opts = { style: 'long', divisor: 1000 };
log(cldr.Numbers.formatDecimal('100', opts));
log(cldr.Numbers.formatDecimal('1234567', opts));
```
<pre class="output">
0.1 thousand
1,235 thousand
</pre>

Formatting negative zero.

```typescript
const opts = { maximumFractionDigits: 0, round: 'down' };
log(cldr.Numbers.formatDecimal('-0.999', opts));
log(cldr.Numbers.formatDecimal('-0.999', { ...opts, negativeZero: true }));
```
<pre class="output">
0
-0
</pre>

{%refs DecimalFormatOptions}
