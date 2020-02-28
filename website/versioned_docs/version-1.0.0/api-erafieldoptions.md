---
id: version-1.0.0-api-erafieldoptions
title: EraFieldOptions
original_id: api-erafieldoptions
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
  - <code class="def">width?: <span>[EraWidthType](api-erawidthtype.html)</span></code>
    - Width of fields to return
  - <code class="def">context?: <span>[ContextType](api-contexttype.html)</span></code>
    - Specify the context in which the string will be display

### Defaults

```javascript
{
  width: 'names',
  context: 'middle-of-text'
}
```

* Calendar system default is determined by the locale.

{%refs EraFieldOptions}