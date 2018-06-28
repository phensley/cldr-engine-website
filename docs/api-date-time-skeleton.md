---
id: api-date-time-skeleton
title: Date and time skeleton
---

A date skeleton is a string containing fields that should appear in a formatted date. It is used to select a pattern that is nearest.

To create a skeleton simply create a string containing the date and time fields you want to appear, repeating the field character multiple times to set the field "width".

For example, using the locale `en-US`:

  1. Skeleton `"yMMMEEEEd"` selects the pattern [`"E, MMM d, y"`](https://github.com/unicode-cldr/cldr-dates-modern/blob/32.0.0/main/en/ca-gregorian.json#L382) by distance
  2. The weekday field "E" has width 4, altering the pattern to: `"EEEE, MMM d, y"`
