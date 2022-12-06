---
id: version-1.6.5-api-timezoneinfo
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
{
  id: 'Africa/Abidjan',
  city: { name: 'Abidjan' },
  countries: [
    'CI', 'BF', 'GH',
    'GM', 'GN', 'IS',
    'ML', 'MR', 'SH',
    'SL', 'SN', 'TG'
  ],
  latitude: 5.316667,
  longitude: -4.033333,
  stdoffset: 0,
  metazone: 'GMT',
  names: {
    long: { generic: '', standard: 'Greenwich Mean Time', daylight: '' },
    short: { generic: '', standard: 'GMT', daylight: '' }
  }
}
{
  id: 'Africa/Algiers',
  city: { name: 'Algiers' },
  countries: [ 'DZ' ],
  latitude: 36.783333,
  longitude: 3.05,
  stdoffset: 3600000,
  metazone: 'Europe_Central',
  names: {
    long: {
      generic: 'Central European Time',
      standard: 'Central European Standard Time',
      daylight: 'Central European Summer Time'
    },
    short: { generic: '', standard: '', daylight: '' }
  }
}
{
  id: 'Africa/Bissau',
  city: { name: 'Bissau' },
  countries: [ 'GW' ],
  latitude: 11.85,
  longitude: -15.583333,
  stdoffset: 0,
  metazone: 'GMT',
  names: {
    long: { generic: '', standard: 'Greenwich Mean Time', daylight: '' },
    short: { generic: '', standard: 'GMT', daylight: '' }
  }
}
{
  id: 'Africa/Cairo',
  city: { name: 'Cairo' },
  countries: [ 'EG' ],
  latitude: 30.05,
  longitude: 31.25,
  stdoffset: 7200000,
  metazone: 'Europe_Eastern',
  names: {
    long: {
      generic: 'Eastern European Time',
      standard: 'Eastern European Standard Time',
      daylight: 'Eastern European Summer Time'
    },
    short: { generic: '', standard: '', daylight: '' }
  }
}
{
  id: 'Africa/Casablanca',
  city: { name: 'Casablanca' },
  countries: [ 'MA' ],
  latitude: 33.65,
  longitude: -7.583333,
  stdoffset: 3600000,
  metazone: 'Europe_Western',
  names: {
    long: {
      generic: 'Western European Time',
      standard: 'Western European Standard Time',
      daylight: 'Western European Summer Time'
    },
    short: { generic: '', standard: '', daylight: '' }
  }
}
{
  id: 'Africa/Ceuta',
  city: { name: 'Ceuta' },
  countries: [ 'ES' ],
  latitude: 35.883333,
  longitude: -5.316667,
  stdoffset: 3600000,
  metazone: 'Europe_Central',
  names: {
    long: {
      generic: 'Central European Time',
      standard: 'Central European Standard Time',
      daylight: 'Central European Summer Time'
    },
    short: { generic: '', standard: '', daylight: '' }
  }
}
{
  id: 'Africa/El_Aaiun',
  city: { name: 'El Aaiun' },
  countries: [ 'EH' ],
  latitude: 27.15,
  longitude: -13.2,
  stdoffset: 3600000,
  metazone: 'Europe_Western',
  names: {
    long: {
      generic: 'Western European Time',
      standard: 'Western European Standard Time',
      daylight: 'Western European Summer Time'
    },
    short: { generic: '', standard: '', daylight: '' }
  }
}
{
  id: 'Africa/Johannesburg',
  city: { name: 'Johannesburg' },
  countries: [ 'ZA', 'LS', 'SZ' ],
  latitude: -26.25,
  longitude: 28,
  stdoffset: 7200000,
  metazone: 'Africa_Southern',
  names: {
    long: {
      generic: '',
      standard: 'South Africa Standard Time',
      daylight: ''
    },
    short: { generic: '', standard: '', daylight: '' }
  }
}
{
  id: 'Africa/Juba',
  city: { name: 'Juba' },
  countries: [ 'SS' ],
  latitude: 4.85,
  longitude: 31.616667,
  stdoffset: 7200000,
  metazone: 'Africa_Central',
  names: {
    long: { generic: '', standard: 'Central Africa Time', daylight: '' },
    short: { generic: '', standard: '', daylight: '' }
  }
}
{
  id: 'Africa/Khartoum',
  city: { name: 'Khartoum' },
  countries: [ 'SD' ],
  latitude: 15.6,
  longitude: 32.533333,
  stdoffset: 7200000,
  metazone: 'Africa_Central',
  names: {
    long: { generic: '', standard: 'Central Africa Time', daylight: '' },
    short: { generic: '', standard: '', daylight: '' }
  }
}
...
</pre>


{%refs TimeZoneInfo}
