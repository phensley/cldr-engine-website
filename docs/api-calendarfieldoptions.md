---
id: api-calendarfieldoptions
title: CalendarFieldOptions
---

### Syntax

<pre class="syntax">
object {
  ca?,
  width?,
  context?
}
</pre>

### Properties

  - <code class="def">ca?: <span>[CalendarType](api-calendartype.html)</span></code>
    - Override the calendar. The argument will be converted to the requested calendar before formatting.
  - <code class="def">width?: <span>[FieldWidthType](api-fieldwidthtype.html)</span></code>
    - Width of fields to return
  - <code class="def">context?: <span>[ContextType](api-contexttype.html)</span></code>
    - Specify the context in which the string will be display

### Defaults

```typescript
{
  width: 'wide',
  context: 'middle-of-text'
}
```

* Calendar system default is determined by the locale.
