---
id: api-eraalttype
title: EraAltType
---

### Syntax

<pre class="syntax">
'none' | 'sensitive'
</pre>

### Values

- `'none'`
  - Default. Era will have its common value, e.g. Gregorian `"BC"` and `"AD"`.
- `'sensitive'`
  - Era will have its non-religious value, e.g. Gregorian "BCE" and "Before Common Era", "CE" and "Common Era".

### Example

```typescript
const cldr = framework.get('en');
const date = cldr.Calendars.newGregorianDate({ year: 2020, month: 6, day: 12 });
const skeleton = 'GGGGyMMMd';
log(cldr.Calendars.formatDate(date, { skeleton }));
log(cldr.Calendars.formatDate(date, { skeleton, alt: { era: 'sensitive' } }));
```
<pre class="output">
Jun 12, 2020 Anno Domini
Jun 12, 2020 Common Era
</pre>


{%refs EraAltType}
