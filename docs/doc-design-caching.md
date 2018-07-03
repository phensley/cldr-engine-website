---
id: doc-design-caching
title: Caching
---

To achieve performance this library uses aggressive caching at different levels to avoid repeating some expensive work. At the time of writing, the following objects are cached:

 * Resource bundles.
 * Parsed number, date, and wrapper patterns.
 * Calendar formatters.
 * Parsed timezone information.

These objects are often relatively expensive to construct, so we use least-recently used (LRU caches to avoid this overhead.

### Loading a bundle
