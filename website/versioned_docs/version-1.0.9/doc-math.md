---
id: version-1.0.9-doc-math
title: Arbitrary Precision
original_id: doc-math
---

This project supports arbitrary precision decimal math via the [@phensley/decimal](https://www.npmjs.com/package/@phensley/decimal) package. This package can be used on its own if desired.

Arbitrary precision means the number of digits in a number is not limited, as it is with the fixed-precision JavaScript `number` type.

In order to construct an arbitrary precision decimal number use the [`Decimal`](api-decimal.html) type.

The benefits of arbitrary precision arithmetic are:
 * Manipulate much larger and smaller numbers without losing precision. For example `0.1 + 0.1 + 0.1` should equal exactly `0.3` not `0.30000000000000004`.
 * Extra control is useful when manipulating currency amounts.

There are a few tradeoffs you need to make when using arbitrary precision:
 * Operations on `Decimal` are slower than those on `number`.
 * To use it effectively you need to be aware of the precision or scale your particular application requires.

### Example

```typescript
import { Decimal, DecimalConstants } from '@phensley/cldr';

let n = new Decimal(10).divide(3, { scale: 10 });
log(n);

n = new Decimal(10).divide(6, { scale: 10 });
log(n);

const { TWO, PI } = DecimalConstants;
for (let scale = 30; scale >= 1; scale--) {
  log(TWO.multiply(PI, { scale }));
}
```
<pre class="output">
3.3333333333
1.6666666667
6.283185307179586476925286766559
6.28318530717958647692528676656
6.2831853071795864769252867666
6.283185307179586476925286767
6.28318530717958647692528677
6.2831853071795864769252868
6.283185307179586476925287
6.28318530717958647692529
6.2831853071795864769253
6.283185307179586476925
6.28318530717958647693
6.2831853071795864769
6.283185307179586477
6.28318530717958648
6.2831853071795865
6.283185307179586
6.28318530717959
6.2831853071796
6.283185307180
6.28318530718
6.2831853072
6.283185307
6.28318531
6.2831853
6.283185
6.28319
6.2832
6.283
6.28
6.3
</pre>


### See Also
  - [Decimal](api-decimal.html)
  - [Rational](api-rational.html)
