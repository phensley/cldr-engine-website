---
id: version-0.18.2-api-currencyformatoptions
title: CurrencyFormatOptions
original_id: api-currencyformatoptions
---

Object expressing options for currency formatting methods.

### Syntax

<pre class="syntax">
object {
  style?,
  group?,
  round?,
  cash?,
  divisor?,
  symbolWidth?,
  minimumIntegerDigits?,
  maximumFractionDigits?,
  minimumFractionDigits?,
  maximumSignificantDigits?,
  minimumSignificantDigits?,
  nu?
}
</pre>


### Properties

  - <code class="def">style?: <span>[CurrencyFormatStyleType](api-currencyformatstyletype.html)</span></code>
    - Style used to format the currency value.
  - <code class="def">group?: <span>boolean</span></code>
    - Enable grouping of digits.
  - <code class="def">round?: <span>[RoundingModeType](api-roundingmodetype.html)</span></code>
    - Mode used to round numbers during formatting. Note that this should be used carefully when formatting currencies, as each currency defines the number of decimal digits that should appear in the result.
  - <code class="def">cash?: <span>boolean</span></code>
    - Activate rounding to nearest cash increment. The Canadian Dollar's eliminated the penny so cash transactions round to the nearest `0.05` increment.
  - <code class="def">divisor?: <span>number</span></code>
    - Specify an explicit divisor when formatting a compact style. Should be a round power of 10, e.g. `1000`, `10000`, etc.
  - <code class="def">symbolWidth?: <span>[CurrencySymbolWidthType](api-currencysymbolwidthtype.html)</span></code>
    - Hint to use the narrow symbol width if available.
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

### Defaults

```javascript
{
  style: 'symbol',
  group: true,
  round: 'half-even',
  cash: false,
  symbolWidth: 'default'
}
```

* Integer and fraction option defaults are determined by the selected number pattern.
* Options for significant digits default to `undefined`.
* Numbering system default is determined by the locale.

### Examples

```typescript
const cldr = framework.get('en');
log(cldr.Numbers.formatCurrency('12345.6789', 'EUR'));
```
<pre class="output">
€12,345.68
</pre>


Using a compact style with an explicit fixed divisor.

```typescript
const cldr = framework.get('en');
const opts = { style: 'short', divisor: 1000 };
log(cldr.Numbers.formatCurrency('100', 'USD', opts));
log(cldr.Numbers.formatCurrency('1234567', 'USD', opts));
```
<pre class="output">
$0.1K
$1,235K
</pre>


The `cash` option activates rounding to the smallest cash unit available for the given currency. For example, if the penny were eliminated in the United States, the nickel (`$0.05`) would become the smallest cash unit available. See [the CLDR currency data](https://github.com/unicode-cldr/cldr-core/blob/master/supplemental/currencyData.json) for the most recent list.

Note: the `round` rounding mode still takes effect; only the rounding increment is changed.

```typescript
const cldr = framework.get('en');
const opts = { cash: true };

// The smallest cash unit for the Danish Krone is 0.50
log(cldr.Numbers.formatCurrency('345.67', 'DKK', opts));
log(cldr.Numbers.formatCurrency('345.76', 'DKK', opts));

// The smallest cash unit for the Canadian Dollar is 0.05
log(cldr.Numbers.formatCurrency('345.67', 'CAD', opts));
log(cldr.Numbers.formatCurrency('345.76', 'CAD', opts));
```
<pre class="output">
DKK 345.50
DKK 346.00
CA$345.65
CA$345.75
</pre>


{%refs CurrencyFormatOptions}
