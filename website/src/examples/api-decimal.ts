import { Decimal, DecimalConstants } from '@phensley/cldr';
import { RoundingModeType } from '../../node_modules/@phensley/decimal';

const SEP = '-------------------------------\n';

// constructor
(() => {
  const s = Number.MAX_SAFE_INTEGER;
  const n = new Decimal(`${s}${s}.${s}`);
  console.log(n);

  console.log(SEP);
})();

// abs
(() => {
  const n = new Decimal('-123.456');
  console.log(n.abs().toString());

  console.log(SEP);
})();

// decrement
(() => {
  const n = new Decimal('1.57');
  console.log(n.decrement().toString());

  console.log(SEP);
})();

// divide
(() => {
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
})();

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
(() => {
  for (const n of ['1', '1e-10', '1.2345']) {
    console.log(new Decimal(n).scale());
  }

  console.log(SEP);
})();

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