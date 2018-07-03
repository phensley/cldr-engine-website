---
id: api-dateintervalformatoptions
title: DateIntervalFormatOptions
---

Options used for date interval formatting.

### Syntax

<pre class="syntax">
object {
  skeleton?,
  ca?,
  nu?
}
</pre>

### Properties
  - <code class="def">skeleton: <span>string ([date time skeleton](api-date-time-skeleton.html))</span></code>
    - Skeleton used to build the interval format pattern
  - <code class="def">ca: <span>[CalendarType](api-calendartype.html)</span></code>
    - Override the calendar to use
  - <code class="def">nu: <span>[NumberSystemType](api-numbersystemtype.html)</span></code>
    - Override the numbering system

### Example

```typescript

```

<pre class="output">

</pre>

### See Also
 - [CLDR.Calendars.formatDateInterval](api-cldr-calendars.html#formatdateinterval)
 - [CLDR.Calendars.formatDateIntervalToParts](api-cldr-calendars.html#formatdateintervaltoparts)
