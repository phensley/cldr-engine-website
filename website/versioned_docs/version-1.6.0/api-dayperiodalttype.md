---
id: version-1.6.0-api-dayperiodalttype
title: DayPeriodAltType
original_id: api-dayperiodalttype
---

### Syntax

<pre class="syntax">
'none' | 'casing'
</pre>

### Values

- `'none'`
  - Default. Field will have it's common value, in English `"AM"`.
- `'casing'`
  - Value with alternate case, in English `"am"`. Where not available the defaultvalue is used.

### Example

```typescript
const cldr = framework.get('en');
const date = cldr.Calendars.newGregorianDate({ hour: 12, minute: 23 });
const skeleton = 'hma';
log(cldr.Calendars.formatDate(date, { skeleton }));
log(
  cldr.Calendars.formatDate(date, { skeleton, alt: { dayPeriod: 'casing' } })
);
```
<pre class="output">
12:23 PM
12:23 pm
</pre>


{%refs DayPeriodAltType}
