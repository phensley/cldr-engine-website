import { TZ } from '@phensley/timezone';
import { typeSlice } from './utils';

const TIMEZONE_CODES = TZ.zoneIds().sort();
const TIMEZONES_DESC = TIMEZONE_CODES.map(t => `  - '${t}'`);

const TIMEZONE_TYPE = `

The identifier for a timezone, e.g. '\`America/New_York\`'.

### Syntax

<pre class="syntax">
${typeSlice(TIMEZONE_CODES, 2)}
</pre>


### Values

${TIMEZONES_DESC.join('\n')}
`

const MAP = {
  'TimeZoneType': TIMEZONE_TYPE
}

export default MAP;