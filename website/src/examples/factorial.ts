import { Decimal } from '@phensley/cldr';
const INTEGER_CTX = { scale: 0 };
const factorial = (n: number): Decimal => {
  const r = new Decimal(n);
  return n < 2 ? r : r.multiply(factorial(n - 1), INTEGER_CTX);
};
for (let n = 1; n <= 50; n++) {
  console.log(factorial(n).toString());
}

//
