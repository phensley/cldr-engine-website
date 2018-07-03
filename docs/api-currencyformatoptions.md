---
id: api-currencyformatoptions
title: CurrencyFormatOptions
---

Object expressing options for currency formatting methods.

### Syntax

<pre class="syntax">
object {
  style?,
  symbolWidth?,
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

  - <code class="def">style?: <span>[CurrencyFormatStyleType](api-currencyformatstyletype.html)</span></code>
    - Style used to format the currency value.
  - <code class="def">symbolWidth?: <span>CurrencySymbolWidthType</span></code>
    - Hint to use the narrow symbol width if available.
  - <code class="def">nu?: <span>NumberSystemType</span></code>
    - Override the number system used to format the digits.
  - <code class="def">round?: <span>RoundingModeType</span></code>
    - Mode used to round numbers during formatting. Note that this should be used carefully when formatting currencies, as each currency defines the number of decimal digits that should appear in the result.
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

### See Also

  - [CLDR.Numbers.formatCurrency](api-cldr-numbers#formatcurrency)
  - [CLDR.Numbers.formatCurrencyToParts](api-cldr-numbers#formatcurrencytoparts)
