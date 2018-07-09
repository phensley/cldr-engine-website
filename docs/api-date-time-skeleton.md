---
id: api-date-time-skeleton
title: Date and time skeleton
---

A date skeleton is a string containing fields that should appear in a formatted date. The skeleton is used to find an actual pattern that contains all or most of the requested fields and is the best-fit match.

To create a skeleton simply create a string containing the date and time fields you want to appear, repeating the field character multiple times to set the field "width".

For example, using the locale `en-US`:

  1. Skeleton `"yMMMEEEEd"` selects the pattern [`"E, MMM d, y"`](https://github.com/unicode-cldr/cldr-dates-modern/blob/32.0.0/main/en/ca-gregorian.json#L382) by distance
  2. The weekday field "E" has width 4, so the final pattern is altered to: `"EEEE, MMM d, y"`
  3. This would produce the formatted date: `"Wednesday, Jun 27, 2018"`.
