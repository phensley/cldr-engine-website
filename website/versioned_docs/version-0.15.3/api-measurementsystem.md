---
id: version-0.15.3-api-measurementsystem
title: MeasurementSystem
original_id: api-measurementsystem
---

### Syntax

<pre class="syntax">
'metric' | 'uk' | 'us'
</pre>

### Example

```typescript
const cldr = framework.get('und-GB');
cldr.General.measurementSystem();
cldr.General.measurementSystem('temperature');
```

<pre class="output">
uk
metric
</pre>

{%refs MeasurementSystem}
