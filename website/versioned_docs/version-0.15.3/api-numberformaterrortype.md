---
id: version-0.15.3-api-numberformaterrortype
title: NumberFormatErrorType
original_id: api-numberformaterrortype
---

### Syntax

<pre class="syntax">
'nan' | 'infinity'
</pre>

### Example

```typescript
cldr.Numbers.formatDecimal(NaN);
cldr.Numbers.formatDecimal(Infinity);
```
<pre class="output">
nan
∞
</pre>

```typescript
cldr.Numbers.formatDecimal(NaN, { errors: ['nan'] });
cldr.Numbers.formatDecimal(Infinity, { errors: ['infinity'] });
```

<pre class="output">
&lt;Error: Invalid argument: NaN&gt;
&lt;Error: Invalid argument: Infinity&gt;
</pre>

{%refs NumberFormatErrorType}
