import { framework } from './helpers';
import { Quantity } from '@phensley/cldr';

(() => {
const cldr = framework.get('en');
const qty: Quantity = { value: '123.57399', unit: 'meter-per-second-squared' };
const result = cldr.Units.formatQuantity(qty, { length: 'narrow', maximumFractionDigits: 1 });

console.log(result);
})();


(() => {
const cldr = framework.get('en');
const qty: Quantity = { value: '1353.75999', unit: 'mile-per-hour' };
const result = cldr.Units.formatQuantityToParts(qty, { length: 'long' });

console.log(result);
})();
