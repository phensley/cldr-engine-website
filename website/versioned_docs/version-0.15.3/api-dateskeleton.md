---
id: version-0.15.3-api-dateskeleton
title: DateSkeleton
original_id: api-dateskeleton
---

A date skeleton is a string containing fields that should appear in a formatted date. It acts like a query, selecting the best-fit pattern among the available patterns for a given locale. It is also used to adjust a pattern to have the desired field width.

To create a skeleton simply create a string containing the date and time fields you want to appear, repeating the field character multiple times to set the field "width".

For example, using the locale `en-US`:

  1. Skeleton `"yMMMEEEEd"` selects the pattern [`"E, MMM d, y"`](https://github.com/unicode-cldr/cldr-dates-modern/blob/32.0.0/main/en/ca-gregorian.json#L382) by distance
  2. The weekday field "E" has width 4, so the final pattern is altered to: `"EEEE, MMM d, y"`
  3. The pattern is used to format the date: `"Wednesday, Jun 27, 2018"`

{%refs DateSkeleton}