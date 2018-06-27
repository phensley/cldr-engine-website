---
id: api-roundingmodetype
title: RoundingModeType
---

Specifies a rounding mode used in [Decimal](api-decimal.html) operations.

<pre class="syntax">
'up' | 'down' | 'ceiling' | 'floor' | 'half-up' |
'half-down' | 'half-even' | '05up' | 'truncate'
</pre>

### Values

  - `"up"`
    - Round away from zero
  - `"down"`
    - Round towards zero (same as 'truncate')
  - `"ceiling"`
    - Round towards positive infinity
  - `"floor"`
    - Round towards negative infinity
  - `"half-up"`
    - If digit >= 5 round up; otherwise round down
  - `"half-down"`
    - If digit > 5 round up; otherwise round down
  - `"half-even"`
    - If digit = 5 and digit to left is odd, round up; if even round down
  - `"05up"`
    - Round away from zero if digit to left is 0 or 5; otherwise round towards zero
