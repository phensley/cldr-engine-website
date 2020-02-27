---
id: version-0.26.0-api-fieldwidthtype
title: FieldWidthType
original_id: api-fieldwidthtype
---

### Syntax

<pre class="syntax">
'short' | 'abbreviated' | 'narrow' | 'wide'
</pre>

### Example

```typescript
const cldr = framework.get('en');
log(cldr.Calendars.weekdays({ width: 'wide' }));
log(cldr.Calendars.weekdays({ width: 'abbreviated' }));
log(cldr.Calendars.weekdays({ width: 'short' }));
log(cldr.Calendars.weekdays({ width: 'narrow' }));
```
<pre class="output">
{ '1': 'Sunday',
  '2': 'Monday',
  '3': 'Tuesday',
  '4': 'Wednesday',
  '5': 'Thursday',
  '6': 'Friday',
  '7': 'Saturday' }
{ '1': 'Sun',
  '2': 'Mon',
  '3': 'Tue',
  '4': 'Wed',
  '5': 'Thu',
  '6': 'Fri',
  '7': 'Sat' }
{ '1': 'Su',
  '2': 'Mo',
  '3': 'Tu',
  '4': 'We',
  '5': 'Th',
  '6': 'Fr',
  '7': 'Sa' }
{ '1': 'S',
  '2': 'M',
  '3': 'T',
  '4': 'W',
  '5': 'T',
  '6': 'F',
  '7': 'S' }
</pre>


{%refs FieldWidthType}
