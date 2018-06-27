---
id: doc-math
title: Arbitrary Precision Math
---

This project supports arbitrary precision decimal math via the `@phensley/cldr` package. This package can be used on its own if desired.

Arbitrary precision means the number of digits in a number is not limited arbitrarily.


In order to construct a decimal number use the [`Decimal`](api-decimal.html) type.

There are a few tradeoffs you need to make when using arbitrary precision:
 * Operations on `Decimal` values are slower than those on floating point.
 * To use it effectively you need to be aware of the necessary precision or scale needed for your application.

There are also benefits:

 * Lets you handle much larger and smaller numbers than JavaScript's `number` type.
 * Provides precise control for math, rounding and formatting. For example `0.1 + 0.1 + 0.1` should equal exactly `0.3` not `0.30000000000000004`.
 * Extra control is especially useful when manipulating currency amounts.
