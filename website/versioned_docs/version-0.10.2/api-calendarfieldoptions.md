---
id: version-0.10.2-api-calendarfieldoptions
title: CalendarFieldOptions
original_id: api-calendarfieldoptions
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

  - <code>ca?: <span>[CalendarType](api-calendartype.html)</span></code>
    - Override the calendar. The argument will be converted to the requested calendar before formatting.
  - <code>width?: <span>[FieldWidthType](api-fieldwidthtype.html)</span></code>
    - Width of fields to return
  - <code>context?: <span>[ContextType](api-contexttype.html)</span></code>
    - Specify the context in which the string will be display

### Defaults

```typescript
{
  width: 'wide',
  context: 'middle-of-text'
}
```

* Calendar system default is determined by the locale.
