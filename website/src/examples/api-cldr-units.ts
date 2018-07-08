import { framework } from './helpers';
import { Quantity, UnitFormatOptions, UnitType } from '@phensley/cldr';

const SEP = '\n--------------------------------\n\n';


(() => {
  const cldr = framework.get('en');
  const qty: Quantity = { value: '123.3799', unit: 'meter-per-second-squared' };
  const result = cldr.Units.formatQuantity(qty, { length: 'narrow', maximumFractionDigits: 2 });
  console.log(result);

  console.log(SEP);
})();


(() => {
  const cldr = framework.get('en');
  const qty: Quantity = { value: '1353.75999', unit: 'mile-per-hour' };
  const result = cldr.Units.formatQuantityToParts(qty, { length: 'long' });

  console.log(result);
})();

(() => {
  const cldr = framework.get('en');
  const qty: Quantity[] = [
    { value: 3, unit: 'mile' },
    { value: 1, unit: 'yard' },
    { value: 23, unit: 'foot' },
    { value: 9.6, unit: 'inch' }
  ];
  const options: UnitFormatOptions[] = [
    { length: 'long' },
    { length: 'short' },
    { length: 'narrow' }
  ];
  for (const opt of options) {
    const result = cldr.Units.formatQuantitySequence(qty, opt);
    console.log(result);
  }

  console.log(SEP);
})();

(() => {
  const cldr = framework.get('en');
  const qty: Quantity[] = [
    { value: 3, unit: 'mile' },
    { value: 1, unit: 'yard' },
    { value: 23, unit: 'foot' },
    { value: 9.6, unit: 'inch' }
  ];
  const result = cldr.Units.formatQuantitySequenceToParts(qty, { length: 'short' });
  console.log(result);

  console.log(SEP);
})();

(() => {
  const w = (s: string) => `${s}${' '.repeat(15 - s.length)}`;

  const en = framework.get('en');
  const de = framework.get('de');
  const zh = framework.get('zh');

  const units: UnitType[] = [
    'light-year',
    'kilogram',
    'meter',
    'kilowatt',
    'hertz'
  ];
  for (const unit of units) {
    const a = en.Units.getUnitDisplayName(unit);
    const b = de.Units.getUnitDisplayName(unit);
    const c = zh.Units.getUnitDisplayName(unit);
    console.log(`en=${w(a)}  de=${w(b)}  zh=${w(c)}`);
  }
})();
