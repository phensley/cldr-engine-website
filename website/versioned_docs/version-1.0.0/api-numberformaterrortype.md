---
id: version-1.0.0-api-numberformaterrortype
title: NumberFormatErrorType
original_id: api-numberformaterrortype
---

### Syntax

<pre class="syntax">
'nan' | 'infinity'
</pre>

### Example

```typescript
const cldr = framework.get('en');
log(cldr.Numbers.formatDecimal(NaN));
log(cldr.Numbers.formatDecimal(Infinity));
```
<pre class="output">
NaN
∞
</pre>

```typescript
const cldr = framework.get('en');
try {
  cldr.Numbers.formatDecimal(NaN, { errors: ['nan'] });
} catch (e) {
  log(e.toString());
}

try {
  cldr.Numbers.formatDecimal(Infinity, { errors: ['infinity'] });
} catch (e) {
  log(e.toString());
}
```
<pre class="output">
Error: Invalid argument: NaN
Error: Invalid argument: Infinity
</pre>


{%refs NumberFormatErrorType}
