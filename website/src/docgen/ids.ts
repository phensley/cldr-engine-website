import { LanguageIdType, RegionIdType, ScriptIdType } from '@phensley/cldr';
import { config } from '@phensley/cldr/lib-es/config';
// import { LanguageIdValues, RegionIdValues, ScriptIdValues } from '@phensley/cldr-schema';
import { getCLDR, typeSlice } from './utils';

const cldr = getCLDR();

const LANGUAGE_CODES = config['language-id']!.sort();
const LANGUAGE_DESC = LANGUAGE_CODES!
  .map(l => `  - '${l}'\n    - ${cldr.General.getLanguageDisplayName(l as LanguageIdType)}`);

const LANGUAGE_ID_TYPE = `

An [ISO 639](https://en.wikipedia.org/wiki/ISO_639) identifier for a language.

### Syntax

<pre class="syntax">
${typeSlice(LANGUAGE_CODES, 3)}
</pre>

### Values

${LANGUAGE_DESC.join('\n')}
`;

const REGION_CODES = config['region-id']!.sort();
const REGION_DESC = REGION_CODES
  .map(l => `  - '${l}'\n    - ${cldr.General.getRegionDisplayName(l as RegionIdType)}`);

const REGION_ID_TYPE = `

An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
or [UN M.49](https://en.wikipedia.org/wiki/UN_M.49) identifier for a region.

### Syntax

<pre class="syntax">
${typeSlice(REGION_CODES, 3)}
</pre>

### Values

${REGION_DESC.join('\n')}
`;

const SCRIPT_CODES = config['script-id']!.sort();
const SCRIPT_DESC = SCRIPT_CODES
  .map(l => `  - '${l}'\n    - ${cldr.General.getScriptDisplayName(l as ScriptIdType)}`);

const SCRIPT_ID_TYPE = `

An [ISO 15924](https://en.wikipedia.org/wiki/ISO_15924) identifier for a script.

### Syntax

<pre class="syntax">
${typeSlice(SCRIPT_CODES, 3)}
</pre>

### Values

${SCRIPT_DESC.join('\n')}
`;

const MAP = {
  'LanguageIdType': LANGUAGE_ID_TYPE,
  'RegionIdType': REGION_ID_TYPE,
  'ScriptIdType': SCRIPT_ID_TYPE
};

export default MAP;
