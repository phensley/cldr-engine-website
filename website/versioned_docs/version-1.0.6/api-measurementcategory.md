---
id: version-1.0.6-api-measurementcategory
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
log(cldr.General.measurementSystem());
log(cldr.General.measurementSystem('temperature'));
```
<pre class="output">
metric
us
</pre>


{%refs MeasurementCategory}
