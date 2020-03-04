---
id: version-1.0.2-doc-math-example-rational-approx
title: Math: rational approximation
original_id: doc-math-example-rational-approx
---

Best rational approximation of N with denominator below a given limit.

See [best rational approximation](https://www.johndcook.com/blog/2010/10/20/best-rational-approximation/)


```typescript
import { Decimal, DecimalConstants, MathContext, Rational } from '@phensley/cldr';

const { ZERO, ONE } = DecimalConstants;

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

log(`                N  =  ${N}\n`);

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
  log(`  ${pad(rat.toString())}  =  ${str}`);
  log(` ${' '.repeat(21)}${' '.repeat(pos)}^`);
  prev = d;
};
```
<pre class="output">
                N  =  0.58496250072

            3 / 5  =  0.600000000000
                        ^
           7 / 12  =  0.583333333333
                          ^
          24 / 41  =  0.585365853659
                          ^
          31 / 53  =  0.584905660377
                            ^
        179 / 306  =  0.584967320261
                             ^
        210 / 359  =  0.584958217270
                            ^
        389 / 665  =  0.584962406015
                              ^
     9126 / 15601  =  0.584962502404
                                ^
    18641 / 31867  =  0.584962500392
                                 ^
    46408 / 79335  =  0.584962500788
                                  ^
</pre>
