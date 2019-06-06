---
id: api-timezoneinfo
title: TimeZoneInfo
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
for (const info of en.Calendars.timeZoneInfo()) {
  console.log(info);
}
```

<pre class="output">
{ id: 'Africa/Abidjan', city: { name: 'Abidjan' } }
{ id: 'Africa/Accra', city: { name: 'Accra' } }
{ id: 'Africa/Addis_Ababa', city: { name: 'Addis Ababa' } }
{ id: 'Africa/Algiers', city: { name: 'Algiers' } }
{ id: 'Africa/Asmera', city: { name: 'Asmara' } }
{ id: 'Africa/Bamako', city: { name: 'Bamako' } }
{ id: 'Africa/Bangui', city: { name: 'Bangui' } }
{ id: 'Africa/Banjul', city: { name: 'Banjul' } }
{ id: 'Africa/Bissau', city: { name: 'Bissau' } }
...
</pre>

{%refs TimeZoneInfo}
