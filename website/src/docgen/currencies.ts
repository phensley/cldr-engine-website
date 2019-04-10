import { CurrencyType } from '@phensley/cldr-schema';
import { config } from '@phensley/cldr/lib-es/config';
import { getCLDR, typeSlice } from './utils';

const cldr = getCLDR();

const CURRENCY_CODES = config['currency-id']!.sort();
const CURRENCIES_DESC = CURRENCY_CODES.map(c => {
  const name = cldr.Numbers.getCurrencyDisplayName(c as CurrencyType);
  let r = '';
  r += `  - '${c}'\n`;
  r += `    - ${name}\n`;
  return r;
});

const CURRENCY_TYPE = `
A 3-letter [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code for a currency.

### Syntax

<pre class="syntax">
${typeSlice(CURRENCY_CODES.sort())}
</pre>


### Values

${CURRENCIES_DESC.join('')}
`;

const MAP = {
  'CurrencyType': CURRENCY_TYPE
};

export default MAP;
