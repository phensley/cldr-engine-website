---
id: version-0.25.22-api-datefieldformatoptions
title: DateFieldFormatOptions
original_id: api-datefieldformatoptions
---

Options used for date field name formatting.

### Syntax

<pre class="syntax">
object {
  ca?,
  width?,
  context?
}
</pre>

### Properties

  - <code class="def">ca: <span>[CalendarType](api-calendartype.html)</span></code>
    - Override the calendar to use
  - <code class="def">width?: <span>DateFieldWidthType</span></code>
    - Width of the date field: `'short' | 'narrow' | 'wide'`
  - <code class="def">context?: <span>[ContextType](api-contexttype.html)</span></code>
    - Specify the context in which the string will be displayed

{%refs DateFieldFormatOptions}
