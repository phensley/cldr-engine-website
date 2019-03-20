---
id: version-0.8.17-doc-goals
title: Goals
original_id: doc-goals
---

#### 1. Support a broad set of CLDR functionality

A key goal is supporting rich single-page applications which make use of a number of different CLDR features simultaneously.

We also want to support the full functionality transitively, so that libraries can be created which expose the full CLDR functionality to their users.
For example, a template engine library that exposes CLDR-based formatters, letting template authors (or even end users) use any of the available options, patterns, units of measure, etc, without restriction.


#### 2. Follow the CLDR specifications

Features should be implemented correctly and as completely as possible.

Some features will require time to implement, but the library should support incremental addition of these features.

For example, the library has 5 calendar implementations (Gregorian, Japanese, Buddhist, Persian and ISO-8601) and there are several others that will need
to be added as time allows, prioritized according to population size or user demand (Chinese, Coptic, Islamic variants, etc).


#### 3. Minimize the overall data and code size

A huge challenge in supporting a broad set of functionality is the potentially large amount of data that must be transferred to a browser.


#### 4. Work in a wide variety of JavaScript environments

Target ES5 to support as many browsers and JavaScript engines as possible, in a consistent way.


#### 5. Add enhancements that are useful in localized applications

Arbitrary precision math is useful anywhere precision is important, as in manipulating currency values safely.


#### 6. No developer knowledge of CLDR or pre-processing of data are required

The API should be at the right level for developers to understand and easily integrate into applications.
No complex build steps should be required.


#### 7. High performance

Performance is a key goal informing both the design and implementation.
