---
id: version-1.0.3-doc-math-example-contd-fractions
title: Math: continued fractions
original_id: doc-math-example-contd-fractions
---

Calculating `sqrt2`, `e`, and `pi` using continued fractions.

See [continued fractions](https://rosettacode.org/wiki/Continued_fraction)

```typescript
import { Decimal, DecimalConstants, MathContext } from '@phensley/cldr';

const { E, PI, ZERO } = DecimalConstants;

type pair = [number, number];
type func = (n: number) => pair;

const sqrt2 = (n: number): pair => [n > 0 ? 2 : 1, 1];

const napier = (n: number): pair => [n > 0 ? n : 2, n > 1 ? n - 1 : 1];

const pi = (n: number): pair => {
  const b = 2 * n - 1;
  return [n > 0 ? 6 : 3, b * b];
};

const calc = (f: func, n: number, c: MathContext): string => {
  let t = ZERO;
  for (let i = n + 1; i > 0; i--) {
    const [a, b] = f(i);
    t = new Decimal(b).divide(t.add(a), c);
  }
  return t.add(f(0)[0]).toString();
};

const diff = (s: string, ref: string): number => {
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== ref[i]) {
      return i;
    }
  }
  return s.length;
};

// A002193
const REAL_SQRT2 = '1.41421356237309504880168872420969807856967187537694807317667973799073247846210704';
const REAL_E = E.setScale(80).toString();
const REAL_PI = PI.setScale(80).toString();

const ITERATIONS = 200000;
const CTX = { precision: 80 };

const FUNCTIONS: [string, string, func][] = [
  ['sqrt2', REAL_SQRT2, sqrt2],
  ['e', REAL_E, napier],
  ['pi', REAL_PI, pi]
];

for (const [name, constant, func] of FUNCTIONS) {
  log(`    Calculating: ${name}`);
  const result = calc(func, ITERATIONS, CTX);
  const pos = diff(result, constant);
  log(`     exact: ${constant}`)
  log(`    approx: ${result}`);
  log(`            ${' '.repeat(pos)}^`);
}
```
<pre class="output">
    Calculating: sqrt2
     exact: 1.41421356237309504880168872420969807856967187537694807317667973799073247846210704
    approx: 1.41421356237309504880168872420969807856967187537694807317667973799073247846210704
                                                                                              ^
    Calculating: e
     exact: 2.71828182845904523536028747135266249775724709369995957496696762772407663035354759
    approx: 2.71828182845904523536028747135266249775724709369995957496696762772407663035354759
                                                                                              ^
    Calculating: pi
     exact: 3.14159265358979323846264338327950288419716939937510582097494459230781640628620900
    approx: 3.14159265358979326971170590105267671561925188267459345415465647776253410533780192
                              ^
</pre>