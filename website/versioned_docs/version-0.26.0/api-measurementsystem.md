---
id: version-0.26.0-api-measurementsystem
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
log(cldr.General.measurementSystem());
log(cldr.General.measurementSystem('temperature'));
```
<pre class="output">
uk
metric
</pre>


{%refs MeasurementSystem}
