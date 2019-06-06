import { UnitType } from '@phensley/cldr-schema';
import { config } from '@phensley/cldr/lib/config';
import { typeSlice } from './utils';

const UNIT_CODES = config['unit-id']!.sort();
const UNITS_DESC = UNIT_CODES.map(u => `  - '${u}'`).join('\n');

const UNIT_TYPE = `

The name of a unit like '\`kilogram\`' or '\`terabyte\`'.

### Syntax

<pre class="syntax">
${typeSlice(UNIT_CODES, 3)}
</pre>

### Values

${UNITS_DESC}

{%refs UnitType}
`;

const MAP = {
  'UnitType': UNIT_TYPE
};

export default MAP;
