import { Decimal, DecimalConstants, MathContext } from '@phensley/cldr';

type Cache = { [x: number]: Decimal };

class Factorial {

  private cache: Cache = { 1: DecimalConstants.ONE };

  constructor(private mc: MathContext) {}

  calculate(n: number): Decimal {
    let r = this.cache[n];
    if (r) {
      return r;
    }
    r = new Decimal(n);
    if (n > 2) {
      r = r.multiply(this.calculate(n - 1), this.mc);
    }
    this.cache[n] = r;
    return r;
  }
}

const reverse = (s: string) =>
  s.split('').reverse().join('');

const spacer = (s: string): string =>
  s.replace(/\w{5}|\w+/g, (m) => ` ${m}`).trim();

const fac = new Factorial({ precision: 100 });
const results: [number, string][] = [];
let width = 0;

for (let n = 1; n <= 50; n++) {
  const tmp = fac.calculate(n).toString();
  const result = reverse(spacer(reverse(tmp)));
  width = Math.max(result.length, width);
  results.push([n, result]);
}

for (const result of results) {
  const [ n, s ] = result;
  console.log(`${' '.repeat(width - s.length)}${s} = ${n}!`)
}
