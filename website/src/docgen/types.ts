import { UnitValues, CurrencyValues, TimeZoneValues, Currency } from '@phensley/cldr-schema';
import { getCLDR, writeDoc } from './utils';

const cldr = getCLDR();

const typeSlice = (t: string[], n: number = 4) => {
  const wrap = (s: string[]) => s.map(e => `'${e}'`).join(' | ');
  return `${wrap(t.slice(0, n))} ... ${wrap(t.slice(t.length - n))}`;
};


const CURRENCIES = CurrencyValues.sort();

const CURRENCIES_DESC = CURRENCIES.map(c => {
  const name = cldr.Numbers.getCurrencyDisplayName(c);
  let r = '';
  r += `  - '${c}'\n`;
  r += `    - ${name}\n`;
  return r;
});

const CURRENCY_TYPE = `---
id: api-currencytype
title: CurrencyType
---

A 3-letter [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code for a currency.

### Syntax

<pre class="syntax">
${typeSlice(CURRENCIES)}
</pre>


### Values

${CURRENCIES_DESC.join('')}
`
const TIMEZONES = TimeZoneValues.sort();

const TIMEZONES_DESC = TIMEZONES.map(t => `  - '${t}'`);

const TIMEZONE_TYPE = `---
id: api-timezonetype
title: TimeZoneType
---

The identifier for a timezone, e.g. '\`America/New_York\`'.

### Syntax

<pre class="syntax">
${typeSlice(TIMEZONES, 2)}
</pre>


### Values

${TIMEZONES_DESC.join('\n')}
`

const UNITS = UnitValues.sort();

const UNITS_DESC = UNITS.map(u => `  - '${u}'`).join('\n');

const UNIT_TYPE = `---
id: api-unittype
title: UnitType
---

The name of a unit like '\`kilogram\`' or '\`terabyte\`'.

### Syntax

<pre class="syntax">
${typeSlice(UNITS, 3)}
</pre>

### Values

${UNITS_DESC}
`;

export const generateTypes = () => {
  writeDoc('api-currencytype.md', CURRENCY_TYPE);
  writeDoc('api-timezonetype.md', TIMEZONE_TYPE);
  writeDoc('api-unittype.md', UNIT_TYPE);
};
