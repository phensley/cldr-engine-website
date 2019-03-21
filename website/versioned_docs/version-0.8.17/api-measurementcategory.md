---
id: version-0.8.17-api-measurementcategory
title: MeasurementCategory
original_id: api-measurementcategory
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