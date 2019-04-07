---
id: api-roundingmodetype
title: RoundingModeType
---

Specifies a rounding mode used in [Decimal](api-decimal.html) operations.

<pre class="syntax">
'up' | 'down' | 'ceiling' | 'floor' | 'half-up' |
'half-down' | 'half-even'
</pre>

### Values

  - <code class="def">'up'</code>
    - Round away from zero
  - <code class="def">'down'</code>
    - Round towards zero
  - <code class="def">'ceiling'</code>
    - Round towards positive infinity
  - <code class="def">'floor'</code>
    - Round towards negative infinity
  - <code class="def">'half-up'</code>
    - If digit >= 5 round up; otherwise round down
  - <code class="def">'half-down'</code>
    - If digit > 5 round up; otherwise round down
  - <code class="def">'half-even'</code>
    - If digit = 5 and digit to left is odd, round up; if even round down
