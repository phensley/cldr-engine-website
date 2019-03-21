import { TimeZoneValues } from '@phensley/cldr-schema';
import { typeSlice } from './utils';

const TIMEZONES_DESC = TimeZoneValues.sort().map(t => `  - '${t}'`);

const TIMEZONE_TYPE = `

The identifier for a timezone, e.g. '\`America/New_York\`'.

### Syntax

<pre class="syntax">
${typeSlice(TimeZoneValues.sort(), 2)}
</pre>


### Values

${TIMEZONES_DESC.join('\n')}
`

const MAP = {
  'TimeZoneType': TIMEZONE_TYPE
}

export default MAP;