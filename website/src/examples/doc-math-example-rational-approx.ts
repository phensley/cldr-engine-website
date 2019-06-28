import { Decimal, DecimalConstants, MathContext, Rational } from '@phensley/cldr';

const { ZERO, ONE } = DecimalConstants;

// https://www.johndcook.com/blog/2010/10/20/best-rational-approximation/

const approximate = (x: Decimal | number | string, denom: number, ctx?: MathContext): Rational => {
  let a = ZERO;
  let b = ONE;
  let c = ONE;
  let d = ONE;
  if (!(x instanceof Decimal)) {
    x = new Decimal(x);
  }
  while (b.compare(denom) === -1 && d.compare(denom) === -1) {
    const ac = a.add(c);
    const bd = b.add(d);
    const mediant = ac.divide(bd, ctx);
    switch (mediant.compare(x)) {
      case 0:
        if (bd.compare(denom) <= 0) {
          return new Rational(ac, bd);
        } else if (d.compare(b) === 1) {
          return new Rational(c, d);
        }
        return new Rational(a, b);

      case -1:
          a = ac;
          b = bd;
          break;

      case 1:
          c = ac;
          d = bd;
          break;
      }
  }
  return b.compare(denom) === 1 ? new Rational(c, d) : new Rational(a, b);
};

const pad = (s: string) => ' '.repeat(15 - s.length) + s;

const diff = (s: string, ref: string): number => {
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== ref[i]) {
      return i;
    }
  }
  return s.length;
};

const N = '0.58496250072';
const _N = new Decimal(N);

console.log(`                N  =  ${N}\n`);

const ctx: MathContext = { scale: _N.scale() + 1 };
let prev: Decimal | undefined = undefined;

for (let i = 10; i < 100000; i++) {
  const rat = approximate(_N, i, ctx);
  const dec = rat.toDecimal(ctx);
  const d = _N.subtract(dec).abs();
  if (prev && d.compare(prev) !== -1) {
    continue;
  }

  const str = dec.toString();
  const pos = diff(str, N);
  console.log(`  ${pad(rat.toString())}  =  ${str}`);
  console.log(` ${' '.repeat(21)}${' '.repeat(pos)}^`);
  prev = d;
};
