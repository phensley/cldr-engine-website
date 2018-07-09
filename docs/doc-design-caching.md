---
id: doc-design-caching
title: Caching
---

Inside the library there are several structures that are in a dormant state, only becoming activated when needed.

The CLDR resource bundles also contain many raw patterns that need to be parsed before they can be used to format a result. Since applications may end up repeatedly formatting hundreds of numbers or dates using the same patterns, we want to avoid the overhead of parsing the pattern each time.


## Possible approaches to avoid runtime overhead

There are a few approaches a library can use to avoid certain classes of runtime overhead of functions that use string patterns for formatting, and accept options to adjust the behavior of a formatting function.

Some of these points may seem opinionated and arguable, but they reflect experiences from using other CLDR-based JavaScript libraries, observing some of the impact on application developers over time, as well as being informed by some of the challenges in designing internal routines to correctly implement CLDR spec without sacrificing performance.

#### 1. Extract the patterns at build time and generate the exact code required for formatting

 * If several patterns are needed, the generated code tends to grow large.
 * Each additional locale requires its own generated code leading to rapidly increasing size of the codebase due to the dimensions of locales, patterns, and options.
 * Requires the addition of a potentially-complicated custom build step for each application.
 * The application needs to select its patterns and any other related data in advance.
 * When application needs change developers need to modify their builds.
 * When bugs are found or different patterns are needed the "test, modify, build, release, test" cycle can be tedious.
 * Brittle since some required data might be missed by developers and bugs only discovered at runtime.
 * Requires developers to know things about CLDR structure to correctly extract patterns and related data.
 * May require developers to have some knowledge of low-level CLDR data structures.

#### 2. Using a factory or curried functions to build formatters at runtime

 * Inflexible, since each place where a pattern is used with slightly different options needs to be curried to be efficient.
 * Dimensionality of the patterns, options, and input combinations require the curried functions to load and hold onto more data than is needed for a specific formatting operation.

#### 3. Caching on demand

 * No build steps required; patterns don't need to be known in advance.
 * Opens up some flexibility in the API, allowing more options to be passed through to end users vs. being hard-coded or otherwise precomputed.
 * Applications don't have to curry functions and hold a reference per set of unique options.
 * No generated code required and all localized patterns remain in the resource bundle, where they are stored most compactly.
 * Patterns are only loaded and parsed on demand, or cached in advance when they are known to be required.
 * Least-recently used (LRU) caching scheme is fast and balances memory vs runtime overhead.
 * API simpler as it does not need to handle currying of formatter functions.

## Caching patterns on demand

To achieve performance this library uses aggressive caching at various levels to avoid repeating expensive operations, such as parsing patterns, looking up available patterns, etc.

At the time of writing, the following types of objects are cached:

 * Resource bundles.
 * Parsed number, date, and wrapper patterns.
 * Calendar formatters.
 * Parsed timezone information.

These objects are often relatively expensive to construct, so we use least-recently used (LRU) caches to avoid this overhead.

### Loading a bundle

TBD

