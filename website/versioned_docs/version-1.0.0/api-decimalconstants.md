---
id: version-1.0.0-api-decimalconstants
title: DecimalConstants
original_id: api-decimalconstants
---

Instances of `Decimal` for frequently-used constants.


### Syntax

<pre class="syntax">
object {
  ZERO,
  ONE,
  TWO,
  PI,
  E,
  NAN,
  POSITIVE_INFINITY,
  NEGATIVE_INFINITY
}
</pre>

### Values

  - <code class="def">ZERO: <span>Decimal</span></code>
    - `new Decimal('0')`
  - <code class="def">ONE: <span>Decimal</span></code>
    - `new Decimal('1')`
  - <code class="def">TWO: <span>Decimal</span></code>
    - `new Decimal('2')`
  - <code class="def">PI: <span>Decimal</span></code>
    - [first 105 digits of pi](https://oeis.org/A000796/constant)
  - <code class="def">E: <span>Decimal</span></code>
    - [first 105 digits of e](https://oeis.org/A001113/constant)
  - <code class="def">NAN: <span>Decimal</span></code>
    - IEEE 754-2008 NaN
  - <code class="def">POSITIVE_INFINITY: <span>Decimal</span></code>
    - IEEE 754-2008 infinity
  - <code class="def">NEGATIVE_INFINITY: <span>Decimal</span></code>
    - IEEE 754-2008 negative infinity

{%refs DecimalConstants}