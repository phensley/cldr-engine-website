---
id: doc-goals
title: Goals
---

#### 1. Support a broad set of CLDR functionality

A key goal is supporting rich single-page applications which may use a large number of CLDR features simultaneously.

We also want to support the full functionality transitively, so that libraries can be created which expose the full functionality to their users. For example, a template engine library that exposes CLDR-based formatters, letting template authors (or even end users) use any of the available options, patterns, units of measure, etc, without restriction.


#### 2. Minimize the overall data and code size

A huge challenge in supporting a broad set of functionality is the potentially large amount of data that must be transferred to a browser.


#### 3. Work in a wide variety of JavaScript environments

Target ES5 to support as many browsers and JavaScript engines as possible, in a consistent way.


#### 4. Add enhancements that are useful in localized applications

Arbitrary precision math is useful anywhere precision is important, as in manipulating currency values safely.


#### 5. No developer knowledge of CLDR or pre-processing of data are required

The API should be at the right level for developers to understand and easily integrate into applications. No complex build steps should be required.


#### 6. High performance

Performance is a key goal informing both the design and implementation.
