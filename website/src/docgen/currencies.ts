import { CurrencyValues } from '@phensley/cldr-schema';
import { getCLDR, typeSlice } from './utils';

const cldr = getCLDR();

const CURRENCIES_DESC = CurrencyValues.sort().map(c => {
  const name = cldr.Numbers.getCurrencyDisplayName(c);
  let r = '';
  r += `  - '${c}'\n`;
  r += `    - ${name}\n`;
  return r;
});

const CURRENCY_TYPE = `
A 3-letter [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code for a currency.

### Syntax

<pre class="syntax">
${typeSlice(CurrencyValues.sort())}
</pre>


### Values

${CURRENCIES_DESC.join('')}
`;

const MAP = {
  'CurrencyType': CURRENCY_TYPE
};

export default MAP;
