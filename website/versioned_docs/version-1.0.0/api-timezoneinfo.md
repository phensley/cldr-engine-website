---
id: version-1.0.0-api-timezoneinfo
title: TimeZoneInfo
original_id: api-timezoneinfo
---

Information about a time zone.

### Syntax

<pre class="syntax">
object {
  id,
  city
}
</pre>


### Properties

 - <code class="def">id: <span>[TimeZoneType](api-timezonetype.html)</span></code>
   - Time zone identifier
 - <code class="def">city: <span>[ExemplarCity](api-exemplarcity.html)</span></code>
   - Info about the time zone's exemplar city

#### Example

```typescript
const en = framework.get('en');
const ids = en.Calendars.timeZoneIds();
for (const id of ids.slice(0, 10)) {
  const info = en.Calendars.timeZoneInfo(id);
  log(info);
}
log('...');
```
<pre class="output">
{ id: 'Africa/Abidjan', city: { name: 'Abidjan' } }
{ id: 'Africa/Accra', city: { name: 'Accra' } }
{ id: 'Africa/Algiers', city: { name: 'Algiers' } }
{ id: 'Africa/Bissau', city: { name: 'Bissau' } }
{ id: 'Africa/Cairo', city: { name: 'Cairo' } }
{ id: 'Africa/Casablanca', city: { name: 'Casablanca' } }
{ id: 'Africa/Ceuta', city: { name: 'Ceuta' } }
{ id: 'Africa/El_Aaiun', city: { name: 'El Aaiun' } }
{ id: 'Africa/Johannesburg', city: { name: 'Johannesburg' } }
{ id: 'Africa/Juba', city: { name: 'Juba' } }
...
</pre>


{%refs TimeZoneInfo}
