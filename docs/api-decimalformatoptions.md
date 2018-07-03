---
id: api-decimalformatoptions
title: DecimalFormatOptions
---

Object expressing options for decimal formatting methods.

### Syntax

<pre class="syntax">
object {
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

### See Also
  - [CLDR.Numbers.formatDecimal](api-cldr-numbers#formatdecimal)
  - [CLDR.Numbers.formatDecimalToParts](api-cldr-numbers#formatdecimaltoparts)
