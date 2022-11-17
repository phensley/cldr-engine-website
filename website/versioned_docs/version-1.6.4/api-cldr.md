---
id: version-1.6.4-api-cldr
title: CLDR
original_id: api-cldr
---

A `CLDR` instance is an object that has been bound to a locale, and contains functionality grouped into
several namespaces.

- [`CLDR.Calendars`](api-cldr-calendars.html)
  - Creating dates in various calendars, formatting dates, relative times, time intervals, field of greatest difference
- [`CLDR.General`](api-cldr-general.html)
  - Information about the current language bundle, locale, a method for resolving language tags
  - Formatting lists, display names for regions, scripts, locale character and line order
- [`CLDR.Numbers`](api-cldr-numbers.html)
  - Formatting decimal numbers and currencies, plural categories for cardinal and ordinal numbers, currency info
- [`CLDR.Units`](api-cldr-units.html)
  - Formatting unit quantities and unit sequences, getting unit display names
- `CLDR.Schema`
  - Direct access to all raw fields in a resource pack.

In order to make use of any localized functionality you need to obtain a `CLDR` instance from the
framework.

Synchronous:

```typescript
const cldr: CLDR = framework.get("en");
// .. do something with cldr instance
```

Asynchronous:

```typescript
framework.getAsync("en").then((cldr: CLDR) => {
  // .. do something with cldr instance
});
```
