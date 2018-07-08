import { framework } from './helpers';
import { Quantity } from '@phensley/cldr';

(() => {
  const cldr = framework.get('en');
  const qty: Quantity = { value: '123.57399', unit: 'meter-per-second' };
  const result = cldr.Units.formatQuantity(qty, { length: 'narrow' });

  console.log(result);
})();
