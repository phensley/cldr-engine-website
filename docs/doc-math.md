---
id: doc-math
title: Arbitrary Precision
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

{> src/examples/doc-math.ts }
{> src/examples/doc-math-output.md }

### See Also
  - [Decimal](api-decimal.html)
  - [Rational](api-rational.html)
