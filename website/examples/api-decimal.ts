import { Decimal } from '@phensley/cldr';

// constructor
(() => {
  const s = Number.MAX_SAFE_INTEGER;
  const n = new Decimal(`${s}${s}.${s}`);
  console.log(n);
})();

// abs
(() => {
  const n = new Decimal('-123.456');
  console.log(n.abs().toString());
})();

// toString
(() => {
  const s = Number.MAX_SAFE_INTEGER;
  const n = new Decimal(`${s}${s}.${s}`);
  console.log(n.toString());
})();
