---
id: version-0.25.21-api-mathcontext
title: MathContext
original_id: api-mathcontext
---

Indicates the scale, precision and rounding mode for math operations.

Note: the default context is `{ precision: 28 }` and this cannot currently be set globally, so a context should be provided on each operation.

### Syntax

<pre class="syntax">
object {
  scale?,
  precision?
  round?
}
</pre>

### Properties
  - <code class="def">scale?: <span>number</span></code>
    - Number of decimal digits to preserve in the result.
  - <code class="def">precision?: <span>number</span></code>
    - Number of total digits (integer and decimal) to preserve in the result.
  - <code class="def">round?: <span>[RoundingModeType](api-roundingmodetype.html)</span></code>
    - Rounding mode to use, defaults to `'half-even'`

{%refs MathContext}
