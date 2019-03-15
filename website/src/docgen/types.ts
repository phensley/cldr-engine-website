import { UnitValues, CurrencyValues, TimeZoneValues } from '@phensley/cldr-schema';
import { getCLDR, writeDoc } from './utils';

const cldr = getCLDR();

const CURRENCIES = CurrencyValues.sort().map(c => {
  const name = cldr.Numbers.getCurrencyDisplayName(c);
  let r = '';
  r += `  - '${c}'\n`;
  r += `    - ${name}\n`;
  return r;
}).join('');

const CURRENCY_TYPE = `---
id: api-currencytype
title: CurrencyType
---

A 3-letter [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code for a currency.

### Values

${CURRENCIES}
`
const TIMEZONES = TimeZoneValues.sort().map(t => `  - '${t}'`).join('\n');

const TIMEZONE_TYPE = `---
id: api-timezonetype
title: TimeZoneType
---

The identifier for a timezone, e.g. '\`America/New_York\`'.

### Values

${TIMEZONES}
`

const UNITS = UnitValues.sort().map(u => `  - '${u}'`).join('\n');

const UNIT_TYPE = `---
id: api-unittype
title: UnitType
---

The name of a unit like '\`kilogram\`' or '\`terabyte\`'.

### Values

${UNITS}
`;

export const generateTypes = () => {
  writeDoc('api-currencytype.md', CURRENCY_TYPE);
  writeDoc('api-timezonetype.md', TIMEZONE_TYPE);
  writeDoc('api-unittype.md', UNIT_TYPE);
};
