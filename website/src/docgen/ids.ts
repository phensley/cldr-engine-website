import { LanguageIdValues, RegionIdValues, ScriptIdValues } from '@phensley/cldr-schema';
import { getCLDR, typeSlice } from './utils';

const cldr = getCLDR();

const LANGUAGEIDS_DESC = LanguageIdValues.sort()
  .map(l => `  - '${l}'\n    - ${cldr.General.getLanguageDisplayName(l)}`);

const LANGUAGE_ID_TYPE = `

An [ISO 639](https://en.wikipedia.org/wiki/ISO_639) identifier for a language.

### Syntax

<pre class="syntax">
${typeSlice(LanguageIdValues.sort(), 3)}
</pre>

### Values

${LANGUAGEIDS_DESC.join('\n')}
`;

const REGIONIDS_DESC = RegionIdValues.sort()
  .map(l => `  - '${l}'\n    - ${cldr.General.getRegionDisplayName(l)}`);

const REGION_ID_TYPE = `

An [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
or [UN M.49](https://en.wikipedia.org/wiki/UN_M.49) identifier for a region.

### Syntax

<pre class="syntax">
${typeSlice(RegionIdValues.sort(), 3)}
</pre>

### Values

${REGIONIDS_DESC.join('\n')}
`;

const SCRIPTIDS_DESC = ScriptIdValues.sort()
  .map(l => `  - '${l}'\n    - ${cldr.General.getScriptDisplayName(l)}`);

const SCRIPT_ID_TYPE = `

An [ISO 15924](https://en.wikipedia.org/wiki/ISO_15924) identifier for a script.

### Syntax

<pre class="syntax">
${typeSlice(ScriptIdValues.sort(), 3)}
</pre>

### Values

${SCRIPTIDS_DESC.join('\n')}
`;

const MAP = {
  'LanguageIdType': LANGUAGE_ID_TYPE,
  'RegionIdType': REGION_ID_TYPE,
  'ScriptIdType': SCRIPT_ID_TYPE
};

export default MAP;
