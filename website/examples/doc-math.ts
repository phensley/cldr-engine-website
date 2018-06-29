import { Decimal, DecimalConstants } from '@phensley/cldr';

let n = new Decimal(10).divide(3, { scale: 10 });
console.log(n.toString());

n = new Decimal(10).divide(6, { scale: 10 });
console.log(n.toString());

const { TWO, PI } = DecimalConstants;
for (let scale = 30; scale >= 1; scale--) {
  console.log(TWO.multiply(PI, { scale }).toString());
}
