import { framework } from './helpers';
import { DecimalFormatOptions } from '@phensley/cldr';

const SEP = '\n--------------------------------\n\n';

// formatDecimal
(() => {
  const cldr = framework.get('en');
  let result = cldr.Numbers.formatDecimal('123456.6789', { style: 'decimal', group: true });
  console.log(result, SEP);

  result = cldr.Numbers.formatDecimal('123456.6789', { style: 'short' });
  console.log(result, SEP);

  result = cldr.Numbers.formatDecimal('123456.6789', { style: 'long' });
  console.log(result, SEP);

  result = cldr.Numbers.formatDecimal('12.3456', { style: 'percent' });
  console.log(result, SEP);

  result = cldr.Numbers.formatDecimal('12.3456', { style: 'percent-scaled' });
  console.log(result, SEP);

  result = cldr.Numbers.formatDecimal('12.3456', { style: 'permille' });
  console.log(result, SEP);

  result = cldr.Numbers.formatDecimal('12.3456', { style: 'permille-scaled' });
  console.log(result, SEP);

})();
