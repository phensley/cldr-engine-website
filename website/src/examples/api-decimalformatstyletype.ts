import { framework } from './helpers';
import { DecimalFormatOptions } from '@phensley/cldr';

const SEP = '\n--------------------------------\n\n';

// formatDecimal
(() => {
  const cldr = framework.get('en');
  let result = cldr.Numbers.formatDecimal('123456.6789', { style: 'decimal' });
  console.log(result, SEP);

  result = cldr.Numbers.formatDecimal('123456.6789', { style: 'decimal', group: false });
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

(() => {
  const cldr = framework.get('de');
  console.log(cldr.Numbers.formatCurrency('12345.678', 'CAD', { group: true }));

  console.log(cldr.Numbers.formatCurrency('12345.678', 'CAD', { group: false }));

  framework.getAsync('und-CA').then((cldr) => {
    console.log(cldr.Numbers.formatCurrency('12345.678', 'CAD', { group: true }));
  });
})();
