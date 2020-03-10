---
id: version-1.0.4-doc-design-caching
title: Caching
noeval: true
original_id: doc-design-caching
---

Inside the library there are several structures that are in a dormant state, only becoming activated when needed.

The CLDR resource bundles also contain many raw patterns that need to be parsed before they can be used to format a result. Since applications may end up repeatedly formatting hundreds of numbers or dates using the same patterns, we want to avoid the overhead of parsing the pattern each time.

Some pieces of data need to be computed on the fly every time while others can be computed once and kept around, either inside a curried function's closure or an explicit cache.

The next section discusses ways of dealing with this overhead.

## Possible approaches to avoiding runtime overhead

There are a few approaches a library can use to avoid certain classes of runtime overhead of functions that use string patterns for formatting, and accept options to adjust the behavior of a formatting function.

Some of these points may seem opinionated and arguable, but they reflect experiences from using other CLDR-based JavaScript libraries, observing some of the impact on application developers over time, as well as being informed by some of the challenges in designing internal routines to correctly implement CLDR spec without sacrificing performance.

### 1. Extract the patterns at build time and generate the exact code required for formatting

We would generate JavaScript code at build time and compile this into our app. This binds the locale-specific patterns with our options and writes out JavaScript our application can call directly.

**Build time pseudocode:**

```typescript
for (const locale of locales) {
  let code = '';
  for (const opts of options) {
    code += buildNumberFormatter(opts);
    code += '\n';
  }
  writeGeneratedCode(locale, code);
}
```

**Runtime pseudocode:**

```typescript
import { numberFormatter } from 'my-library';

// Must go upstream to modify build process and cut a new release when
// locales and options change.
const result = numberFormatter(12345);
```

**Limitations:**

 * If several patterns are needed, the generated code tends to grow large.
 * Each additional locale requires its own generated code leading to rapidly increasing size of the codebase due to the dimensions of locales, patterns, and options.
 * Requires the addition of a potentially-complicated custom build step for each application.
 * The application needs to select its patterns and any other related data in advance.
 * When application needs change developers need to modify their builds.
 * When bugs are found or different patterns are needed the "test, modify, build, release, test" cycle can be tedious.
 * Brittle since some required data might be missed by developers and bugs only discovered at runtime.
 * Requires developers to know things about CLDR structure to correctly extract patterns and related data.
 * May require developers to have some knowledge of low-level CLDR data structures.

### 2. Using a factory or curried functions to build formatters at runtime

We do the expensive operations at runtime in the builder function, which returns a formatter function with the patterns and other parameters stored in its closure. Then later we call that formatter function to format a value.

**Runtime pseudocode:**

```typescript
const formatter = library.makeNumberFormatter({ style: 'short' });
const result = formatter(12345);
```

**Limitations:**

 * Inflexible, since each place where a pattern is used with slightly different options needs to be curried to be efficient.
 * Dimensionality of the patterns, options, and input combinations require the curried functions to load and hold onto more data than is needed for a specific formatting operation.
 * Equates to a form of caching, since it keeps results of expensive calculations inside of a closure. But the "cache" is only visible inside that closure, inaccessible to other calls that use the same pattern.
 * To take advantage of this, applications have to separate their calls into 2 types: calls to create a formatter function (to which they must hold references) and execution of the formatter.

### 3. Caching on demand (our chosen solution)

```typescript
// internal caches hold number system params, parsed patterns, etc.
const result = cldr.Numbers.formatDecimal(12345, { style: 'short' });
```

 * No build steps required; patterns don't need to be known in advance.
 * Opens up some flexibility in the API, allowing more options to be passed through to end users vs. being hard-coded or otherwise precomputed.
 * Applications don't have to curry functions and hold a reference per set of unique options.
 * No generated code required and all localized patterns remain in the resource bundle, where they are stored most compactly.
 * Patterns are only loaded and parsed on demand, or cached in advance when they are known to be required.
 * Least-recently used (LRU) caching scheme is fast and balances memory vs runtime overhead.
 * API simpler as it does not need to handle currying of formatter functions.
 * Pattern caches use the string representation as the cache key, so caches can be global and reused across locales.
   * For example the locales `'de'` and `'fr'` both use the standard currency pattern `"#,##0.00 ¤"`, so we only need to parse and cache this once when switching between these locales.

## LRU caching on demand

To achieve performance this library uses aggressive caching at various levels to avoid repeating relatively-expensive operations.

At the time of writing, the following types of objects are cached:

 * Loaded resource packs.
 * Parsed number, date, and wrapper patterns.
 * Calendar formatters.
 * Parsed timezone information.

These objects are often relatively expensive to construct, so we use least-recently used (LRU) caches to avoid this overhead.

## Example where caching comes into play

For example, these bullets list out the pieces of data needed and steps taken during formatting of a currency amount using [cldr.Numbers.formatCurrency](api-cldr-numbers.html#formatcurrency):

**Arguments**
 * The amount to be formatted, e.g. `123.45`
 * The currency code, e.g. `'USD'`
 * The formatting options [CurrencyFormatOptions](api-currencyformatoptions.html), most importantly the name of the formatting style to use (e.g. `'symbol', 'accounting', 'code', 'name', 'short'`).

 **Global data**
 * A mapping of currency to the number of decimal digits it uses. For example `USD = 2 digits` while `JPY = 0 digits`, which tells us the defaults for minimum fraction digits.
 * If a decimal numbering system other than `latn` is selected we need the digits `'0'..'9'` for that system.

 **Locale-specific data**
 * Calling `framework.getAsync(locale)` to load the resource bundle for the user's locale.
 * The numbering system to use, defaulting to `'latn'`.
 * Number system specific parameters and symbols, e.g. grouping and decimal characters.
 * Select the pattern based on the formatting style and possibly aspects of the amount itself, e.g. number of igits.
 * Currency name or symbol, possibly pluralized. Also may need the pattern that wraps an amount together with the currency name or code.
 * Patterns have a negative and positive form, which needs to be selected based on the sign of the amount.
 * Compact format style `'short'` selects the pattern based on the scaled value, after shifting its decimal point based on the number of digits in the number.
   * We need to figure out the right divisor to divide the amount, and then select the pattern based on the number of adjusted digits.
   * We must also handle when the number of digits change after rounding, e.g `'999,999'` rounds up to `'1 million'` or when rounding causes a sign change.
   * Once the amount has been adjusted and the number of digits stable we need to compute the number's plural category to select the pluralized pattern.
   * The pluralized pattern falls back to using the standard currency pattern when the number of digits are below a threshold.

If we had to fetch and recompute all of these on every call to [cldr.Numbers.formatCurrency](api-cldr-numbers.html#formatcurrency) it would impact performance, so we use caching to spread this overhead out across many thousands of calls.
