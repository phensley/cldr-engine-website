---
id: version-1.6.5-api-datewrapperformatoptions
title: DateWrapperFormatOptions
original_id: api-datewrapperformatoptions
---

Options for formatting a date and time together.

### Syntax

<pre class="syntax">
object {
  ca?,
  width?,
  atTime?
}
</pre>

### Properties

- <code class="def">ca?: <span>[CalendarType](api-calendartype)</span></code>
  - Optional calendar to use.
- <code class="def">width?: <span>[FormatWidthType](api-formatwidthtype)</span></code>
  - Width of the wrapper format to use.
- <code class="def">atTime?: <span>boolean</span></code>
  - Specify use of the "DATE at TIME" format (default `true`).

{%refs DateWrapperFormatOptions}
