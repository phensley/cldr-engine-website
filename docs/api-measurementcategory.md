---
id: api-measurementcategory
title: MeasurementCategory
---

### Syntax

<pre class="syntax">
'temperature'
</pre>

### Example

```typescript
const cldr = framework.get('es-PR');
cldr.General.measurementSystem();
cldr.General.measurementSystem('temperature');
```

<pre class="output">
metric
us
</pre>

{%refs MeasurementCategory}
