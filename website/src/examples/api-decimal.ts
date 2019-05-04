import { Decimal, DecimalConstants } from '@phensley/cldr';
import { RoundingModeType } from '../../node_modules/@phensley/decimal';

const SEP = '-------------------------------\n';

// constructor
{
  const s = Number.MAX_SAFE_INTEGER;
  const n = new Decimal(`${s}${s}.${s}`);
  console.log(n);

  for (const num of ['-10', 0, '123', Infinity, -Infinity, NaN]) {
    const d = new Decimal(num);
    console.log(d.toString());
  }
  console.log(SEP);
}

// abs
(() => {
  const n = new Decimal('-123.456');
  console.log(n.abs().toString());

  console.log(SEP);
})();

// add
{
  console.log('add');

  const a = new Decimal('0.003');
  const b = new Decimal('0.0005');
  const c = a.add(b).add(b);
  console.log(c.toString());

  console.log(SEP);
}

// alignexp
{
  console.log('alignexp');

  const nums = [
    '1.2345',
    '123.45',
    '12345.'
  ];
  for (const n of nums) {
    console.log(new Decimal(n).alignexp());
  }

  console.log(SEP);
}

// compare
{
  console.log('compare');

  const w = (s: string) => ' '.repeat(10 - s.length) + s;

  const cmp = (a: string, b: string) =>
    console.log(`${w(a)}   cmp ${w(b)} = ${new Decimal(a).compare(b)}`);

  cmp('1234', '1234');
  cmp('1e10', '1e11');
  cmp('1.23e5', '12e4');
  cmp('12e4', '1.23e5');
  cmp('-12e4', '1.23e5');
  cmp('-1.23e5', '12e4');
  cmp('1.2345e-10', '12e4');

  console.log(SEP);
}

// decrement
(() => {
  const n = new Decimal('1.57');
  console.log(n.decrement().toString());

  console.log(SEP);
})();

// divide
{
  console.log('divide');

  const rounding: RoundingModeType[] = ['half-even', 'floor'];
  const n = new Decimal('10');
  for (const round of rounding) {
    console.log(round);
    for (const scale of [5, 10, 15]) {
      const r = n.divide(6, { scale, round });
      console.log(`  ${r.toString()}`);
    }
  }
  console.log(SEP);
}

// divmod
(() => {
  const n = new Decimal('100');
  for (const d of [3, 12, 15.7, 37.82, 90.122]) {
    const [q, r] = n.divmod(d);
    console.log(`(${n.toString()} / ${d}) is ${q.toString()} r ${r.toString()}`);
  }

  console.log(SEP);
})();

// increment
(() => {
  const n = new Decimal('-0.57');
  console.log(n.increment().toString());

  console.log(SEP);
})();

// integerDigits
(() => {
  for (const s of ['.123', '12345.9999999', '1e20']) {
    const n = new Decimal(s);
    const d = n.integerDigits();
    console.log(`${n.toString()} has ${d} integer digit${d === 1 ? '' : 's'}`);
  }

  console.log(SEP);
})();

// isInteger
(() => {
  for (const s of ['0', '5', '1e10', '.123', '12345.9999999', '5.999999999999999999999']) {
    const n = new Decimal(s);
    console.log(`${n.toString()} ${n.isInteger() ? 'yes' : 'no'}`);
  }

  console.log(SEP);
})();

// isNegative
{
  console.log('isNegative');

  for (const s of ['0', '123', '-15.7']) {
    const neg = new Decimal(s).isNegative();
    console.log(`${s} ${neg ? 'is' : 'is not'} negative`);
  }

  console.log(SEP);
}

// mod
{
  console.log('mod');

  const n = new Decimal(777);
  for (const m of [2, 3, 4, 5, 6]) {
    const a = n.mod(m);
    const b = n.negate().mod(m);
    console.log(`${n.toString()} % ${m} = ${a.toString()}   ` +
      `-${n.toString()} % ${m} = ${b.toString()}`);
  }

  console.log(SEP);
}

// movePoint
(() => {
  const n = new Decimal('12345.6789');
  for (const p of [-5, -3, -1, 1, 3, 5]) {
    console.log(n.movePoint(p).toString());
  }

  console.log(SEP);
})();

// multiply
(() => {
  const { E, PI } = DecimalConstants;
  const n = new Decimal('7');
  for (const m of ['12', '1e10', '0.0000004737', '0.9999999', PI, E]) {
    const r = n.multiply(m, { scale: 30 });
    console.log(`${r.stripTrailingZeros()}`);
  }

  console.log(SEP);
})();

// negate
(() => {
  for (const n of ['-5', '3.1415']) {
    console.log(new Decimal(n).negate().toString());
  }

  console.log(SEP);
})();

// precision
(() => {
  for (const n of ['1', '1e10', '1.2345']) {
    console.log(new Decimal(n).precision());
  }

  console.log(SEP);
})();

// scale
{
console.log('scale\n');

for (const n of ['1', '1e-10', '1e10', '1.2345', '1.234e10']) {
  console.log(`${n} scale ${new Decimal(n).scale()}`);
}

console.log(SEP);
}

// scientific
{
  console.log('scientific\n');

  const n = new Decimal('157.39E10');
  const [coeff, exp] = n.scientific();
  console.log(`${coeff.toString()} x 10^${exp}`);

  console.log(SEP);
}

// setScale
(() => {
  console.log('setScale\n');

  const n = new Decimal('12345.678');
  for (let scale = -5; scale <= 5; scale++) {
    const r = n.setScale(scale);
    console.log(`scale ${scale} = ${r}`);
  }

  console.log(SEP);
})();

// shiftleft
(() => {
  console.log('shiftleft');

  for (const n of ['1', '0.123456789']) {
    console.log(n.toString());
    for (let shift = 1; shift <= 10; shift++) {
      const r = new Decimal(n).shiftleft(shift);
      console.log(`  ${shift} -> ${r}`);
    }
  }

  console.log(SEP);
})();

// shiftright
(() => {
  for (const n of ['12345.67890', '55555.55555']) {
    console.log(n.toString());
    for (let shift = 1; shift <= 10; shift++) {
      const r = new Decimal(n).shiftright(shift);
      console.log(`  ${shift} -> ${r}`);
    }
  }

  console.log(SEP);
})();

// signum
{
  console.log('signum');

  for (const n of ['0', '-1.2', '345', '10e-10', '-10e10']) {
    console.log(`${n} signum is ${new Decimal(n).signum()}`);
  }

  console.log(SEP);
}

// stripTrailingZeros
(() => {
  for (const n of ['1.0', '0.9999900000', '1.57000000', '1e10']) {
    console.log(new Decimal(n).stripTrailingZeros().toString());
  }

  console.log(SEP);
})();

// subtract
(() => {
  const { E } = DecimalConstants;
  const n = new Decimal('1');
  for (const m of ['.999999', '37.79', E]) {
    let r = n.subtract(m);
    if (r.scale() > 20) {
      r = r.setScale(20);
    }
    console.log(r.toString());
  }

  console.log(SEP);
})();

// toParts
(() => {
  for (const n of ['3', '1e10', '3.14159']) {
    console.log(new Decimal(n).toParts());
  }

  console.log(SEP);
})();

// toString
(() => {
  const s = Number.MAX_SAFE_INTEGER;
  const n = new Decimal(`${s}${s}.${s}`);
  console.log(n.toString());

  console.log(SEP);
})();

// trailingZeros
(() => {
  console.log('trailingZeros');

  for (const n of ['1', '1e10', '0.12300000']) {
    console.log(new Decimal(n).trailingZeros());
  }

  console.log(SEP);
})();