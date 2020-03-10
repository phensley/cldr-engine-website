---
id: version-1.0.4-api-listpatterntype
title: ListPatternType
original_id: api-listpatterntype
---

### Syntax

<pre class="syntax">
'and' | 'and-short' | 'or' | 'unit-long' |
'unit-narrow' | 'unit-short'
</pre>

### Example

```typescript
const cldr = framework.get('en');
log(cldr.General.formatList(['one', 'two', 'three'], 'and'));
```
<pre class="output">
one, two, and three
</pre>


```typescript
const cldr = framework.get('en');
log(cldr.General.formatList(['12ft', '9in'], 'unit-short'));
```
<pre class="output">
12ft, 9in
</pre>



{%refs ListPatternType}
