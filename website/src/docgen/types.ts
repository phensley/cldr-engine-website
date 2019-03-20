import {
  Currency,
  CurrencyValues,
  LanguageIdValues,
  RegionIdValues,
  ScriptIdValues,
  UnitValues,
  TimeZoneValues,
} from '@phensley/cldr-schema';
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
`;

const LANGUAGEIDS = LanguageIdValues.sort();

const LANGUAGEIDS_DESC = LANGUAGEIDS.map(l => `  - '${l}'\n    - ${cldr.General.getLanguageDisplayName(l)}`);

const LANGUAGEID_TYPE = `---
id: api-languageidtype
title: LanguageIdType
---

An [ISO 639](https://en.wikipedia.org/wiki/ISO_639) identifier for a language.

### Syntax

<pre class="syntax">
${typeSlice(LANGUAGEIDS, 3)}
</pre>

### Values

${LANGUAGEIDS_DESC.join('\n')}
`;

const REGIONIDS = RegionIdValues.sort();

const REGIONIDS_DESC = REGIONIDS.map(l => `  - '${l}'\n    - ${cldr.General.getRegionDisplayName(l)}`);

const REGIONID_TYPE = `---
id: api-regionidtype
title: RegionIdType
---

An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or [UN M.49](https://en.wikipedia.org/wiki/UN_M.49) identifier for a region.

### Syntax

<pre class="syntax">
${typeSlice(REGIONIDS, 3)}
</pre>

### Values

${REGIONIDS_DESC.join('\n')}
`;

const SCRIPTIDS = ScriptIdValues.sort();

const SCRIPTIDS_DESC = SCRIPTIDS.map(l => `  - '${l}'\n    - ${cldr.General.getScriptDisplayName(l)}`);

const SCRIPTID_TYPE = `---
id: api-scriptidtype
title: ScriptIdType
---

An [ISO 15924](https://en.wikipedia.org/wiki/ISO_15924) identifier for a script.

### Syntax

<pre class="syntax">
${typeSlice(SCRIPTIDS, 3)}
</pre>

### Values

${SCRIPTIDS_DESC.join('\n')}
`;

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
  writeDoc('api-languageidtype.md', LANGUAGEID_TYPE);
  writeDoc('api-regionidtype.md', REGIONID_TYPE);
  writeDoc('api-scriptidtype.md', SCRIPTID_TYPE);
  writeDoc('api-timezonetype.md', TIMEZONE_TYPE);
  writeDoc('api-unittype.md', UNIT_TYPE);
};
