---
id: api-measurementsystem
title: MeasurementSystem
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
