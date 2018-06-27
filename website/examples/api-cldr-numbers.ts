import { framework } from './helpers';

const SEP = '\n--------------------------------\n\n';

// formatCurrency
(() => {
  const cldr = framework.get('en');
  const result = cldr.Numbers.formatCurrency('12345.6789', 'EUR', { group: true });
  console.log(result, SEP);
})();

// formatCurrencyToParts
(() => {
  const cldr = framework.get('en');
  const result = cldr.Numbers.formatCurrencyToParts('12345.6789', 'EUR', { group: true });
  console.log(result);
  console.log(SEP);
})();

// formatDecimal
(() => {
  const cldr = framework.get('en');
  const result = cldr.Numbers.formatDecimal('12345.6789', { group: true });
  console.log(result, SEP);
})();

// formatDecimalToParts
(() => {
  const cldr = framework.get('en');
  const result = cldr.Numbers.formatDecimalToParts('12345.6789', { group: true });
  console.log(result);

  console.log(SEP);
})();


// getCurrencySymbol
(() => {
  const cldr = framework.get('en');
  const result = cldr.Numbers.getCurrencySymbol('GBP');
  console.log(result, SEP);
})();

// getCurrencyDisplayName
(() => {
  const cldr = framework.get('en');
  const result = cldr.Numbers.getCurrencyDisplayName('MXN');
  console.log(result, SEP);
})();


(() => {
  const cldr = framework.get('en');

  let plural = cldr.Numbers.getPluralCardinal('1');
  let result = cldr.Numbers.getCurrencyPluralName('USD', plural);
  console.log(result);

  plural = cldr.Numbers.getPluralCardinal('17');
  result = cldr.Numbers.getCurrencyPluralName('USD', plural);
  console.log(result);

  console.log(SEP);
})();


(() => {
  const cldr = framework.get('en');

  let fractions = cldr.Numbers.getCurrencyFractions('USD');
  console.log(fractions);

  fractions = cldr.Numbers.getCurrencyFractions('JPY');
  console.log(fractions);

  console.log(SEP);
})();


(() => {
  const w = (s: string) => `${s}${' '.repeat(12 - s.length)}`;

  const nums = ['0', '1', '1.0', '2', '6'];
  const locales = ['en-US', 'fr-FR', 'pl-PL', 'lt-LT'];

  for (const n of nums) {
    const res = locales.map(id => {
      const cldr = framework.get(id);
      return `${id}=${cldr.Numbers.getPluralCardinal(n)}`;
    }).map(w).join(' ');
    console.log(`${' '.repeat(4 - n.length)}${n}   ${res}`);
  }
  console.log(SEP);
})();

(() => {
  const endings = {
    fr: { one: 're', other: 'e' },
    en: { one: 'st', two: 'nd', few: 'rd', other: 'th' }
  };

  const nums = ['1', '2', '3', '4', '5'];

  Object.keys(endings).forEach(id => {
    const cldr = framework.get(id);
    const res = nums.map(n => {
      const cat = cldr.Numbers.getPluralOrdinal(n);
      return `${n}${endings[id][cat]}`;
    }).join(' ');
    console.log(`${id}: ${res}`);
  });
  console.log(SEP);
})();
