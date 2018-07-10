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
    console.log(r.toString());
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

// toString
(() => {
  const s = Number.MAX_SAFE_INTEGER;
  const n = new Decimal(`${s}${s}.${s}`);
  console.log(n.toString());

  console.log(SEP);
})();
