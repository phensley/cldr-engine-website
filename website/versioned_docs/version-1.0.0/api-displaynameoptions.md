---
id: version-1.0.0-api-displaynameoptions
title: DisplayNameOptions
original_id: api-displaynameoptions
---

### Syntax

<pre class="syntax">
object {
  type?,
  context?
}
</pre>

### Properties

 - <code class="def">type?: <span>AltType</span></code>
   - String to select a CLDR alternate form
 - <code class="def">context?: <span>[ContextType](api-contexttype.html)</span></code>
   - Specify the context in which the string will be displayed

### Defaults

```javascript
{
  type: 'none',
  context: 'begin-sentence'
}
```

{%refs DisplayNameOptions}
