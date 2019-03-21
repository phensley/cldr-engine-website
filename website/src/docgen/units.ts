import { UnitValues } from '@phensley/cldr-schema';
import { typeSlice } from './utils';

const UNITS_DESC = UnitValues.sort().map(u => `  - '${u}'`).join('\n');

const UNIT_TYPE = `

The name of a unit like '\`kilogram\`' or '\`terabyte\`'.

### Syntax

<pre class="syntax">
${typeSlice( UnitValues.sort(), 3)}
</pre>

### Values

${UNITS_DESC}
`;

const MAP = {
  'UnitType': UNIT_TYPE
};

export default MAP;
