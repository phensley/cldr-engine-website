---
id: version-0.9.0-api-currencyformatoptions
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
  - <code class="def">round?: <span>RoundingModeType</span></code>
    - Mode used to round numbers during formatting. Note that this should be used carefully when formatting currencies, as each currency defines the number of decimal digits that should appear in the result.
  - <code class="def">symbolWidth?: <span>CurrencySymbolWidthType</span></code>
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
  - <code class="def">nu?: <span>NumberSystemType</span></code>
    - Override the number system used to format the digits.

### Defaults

```typescript
{
  style: 'symbol',
  group: true,
  round: 'half-even',
  symbolWidth: 'default'
}
```

* Integer and fraction option defaults are determined by the selected number pattern.
* Options for significant digits default to `undefined`.
* Numbering system default is determined by the locale.

### See Also

  - [CLDR.Numbers.formatCurrency](api-cldr-numbers#formatcurrency)
  - [CLDR.Numbers.formatCurrencyToParts](api-cldr-numbers#formatcurrencytoparts)
