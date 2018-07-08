import { framework } from './helpers';
import { Quantity, UnitFormatOptions } from '@phensley/cldr';

const SEP = '\n--------------------------------\n\n';


(() => {
  const cldr = framework.get('en');
  const qty: Quantity = { value: '17', unit: 'inch' };
  const opts: UnitFormatOptions[] = [
    { length: 'long' },
    { length: 'short' },
    { length: 'narrow' }
  ];
  for (const opt of opts) {
    const result = cldr.Units.formatQuantity(qty, opt);
    console.log(result);
  }

  console.log(SEP);
})();
