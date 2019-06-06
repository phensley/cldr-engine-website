---
id: api-listpatterntype
title: ListPatternType
---

### Syntax

<pre class="syntax">
'and' | 'and-short' | 'or' | 'unit-long' |
'unit-narrow' | 'unit-short'
</pre>

### Example

```typescript
cldr.General.formatList(['one', 'two', 'three'], 'and');
```

<pre class="output">
one, two, and three
</pre>

```typescript
cldr.General.formatList(['12ft', '9in'], 'unit-short');
```

<pre class="output">
12ft, 9in
</pre>


{%refs ListPatternType}
