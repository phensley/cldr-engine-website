---
id: api-relativetimeformatoptions
title: RelativeTimeFormatOptions
---

### Syntax

<pre class="syntax">
object {
  width?,
  nu?
}
</pre>

### Properties
  - <code class="def">width?: <span>RelativeTimeWidthType</span></code>
    - Width of the unit of relative time: `'short' | 'narrow' | 'wide'`
  - <code class="def">nu?: <span>[NumberSystemType](api-numbersystemtype.html)</span></code>
    - Override the numbering system

### Example

```typescript
const cldr = framework.get('en');
for (const n of [-5, -2, -1, 0, 1, 2, 5]) {
  console.log(cldr.Calendars.formatRelativeTimeField(n, 'day', { width: 'wide' }));
}
```

<pre class="output">
5 days ago
2 days ago
yesterday
today
tomorrow
in 2 days
in 5 days
</pre>
