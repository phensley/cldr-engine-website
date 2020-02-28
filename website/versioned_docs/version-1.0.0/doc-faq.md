---
id: version-1.0.0-doc-faq
title: Rationale
original_id: doc-faq
---

### Why create this project?

The main reason was that I ran into limitations using other libraries.

A key limitation was the ability to encapsulate all (or as much as possible) CLDR functionality in a single library and offer this transitively to other libraries and applications, and do this in a way that was compatible across browsers and JavaScript engines.

Other libraries also rely on the built-in JavaScript number type, which has limitations. Arbitrary precision decimal math provides a high degree of control over formatting and rounding, and is useful for manipulating currency values and very large or small numbers. I felt this was an important enhancement.

### What are some things that make localization difficult in the browser?

With browser applications, code and data size are a major concern. Transmitting a few MB of data to the browser to format a few currency values isn't a great tradeoff.

Some CLDR features are complicated to implement, so they are never implemented. The CLDR is complex so the nuances of some features tend to be overlooked. As a result there are many libraries with partial functionality, and having features that are partially or incorrectly implemented. Getting everything together in one library (within the constraints imposed by the browser environment) is challenging.

### Why "batteries included"? Can this library be modularized even further?

I feel that modularization should be informed by the actual dependencies that exist, and these were hard to know in advance. An initial version needed to be built to reveal the dependencies. As the library matures it may be possible to split things up into smaller packages.

However, some functions are interdependent and can't easily be separated from one another.  Calendar formatters need access to numbering systems, number formatters need arbitrary precision, etc. So it may not be possible to achieve a satisfactory level of modularity.

A key goal is simplicity of integration: the ability to import the library and start using it, without worrying about including extra packages based on which functionality the application uses. Splitting things up too much could make integration a bit more complicated.

### Why develop in Typescript?

Typescript is one of the best imperative languages that compile to JavaScript and is particularly suited to developing large projects. As this library grew more complicated Typescript made it easy to maintain and evolve. It also has a nice compilation pipeline that directly targets ES5.
