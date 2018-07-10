---
id: api-decimal
title: Decimal
---

Arbitrary precision decimal math. Add, subtract, multiply, divide numbers, shift digits left and right, with control over rounding and precision or scale of the result.

## new

Constructs a new decimal value from a `number` or `string`.

#### Syntax

<pre class="syntax">
new Decimal(num)
</pre>

#### Parameters
  - <code class="def">num: <span>number | string | Decimal</span></code>
    - The number to parse into a `Decimal`

#### Example

```typescript
const s = Number.MAX_SAFE_INTEGER;
const n = new Decimal(`${s}${s}.${s}`);
console.log(n);
```

<pre class="output">
Decimal {
  data: [ 4740991, 719925, 4099190, 1992547, 9919007, 9254740, 900719 ],
  sign: 1,
  exp: -16
}
</pre>

```typescript
console.log(n.toString());
```

<pre class="output">
90071992547409919007199254740991.9007199254740991
</pre>


## abs

Return the absolute value of the number.

#### Syntax

<pre class="syntax">
abs(): Decimal
</pre>

#### Example

```typescript
const n = new Decimal('-123.456');
console.log(n.abs().toString());
```

<pre class="output">
123.456
</pre>

## add

#### Syntax

<pre class="syntax">
</pre>


## alignexp

#### Syntax

<pre class="syntax">
</pre>



## compare

Compare the decimal `u` to `v`, returning a number indicating whether one is larger or they are equal.


#### Syntax

<pre class="syntax">
compare(v [, abs]): number
</pre>

#### Parameters
  - <code>v: <span>number | string | Decimal</span></code>

#### Return value
  - Returns a `number` with one of the following values:

<pre class="plain">
  -1  if u &lt; v
   0  if u = v
   1  if u &gt; v
</pre>


## decrement

Subtracts 1 from the number.

#### Syntax

<pre class="syntax">
decrement(): Decimal
</pre>

#### Example

```typescript
const n = new Decimal('1.57');
console.log(n.decrement().toString());
```

<pre class="output">
0.57
</pre>



## divide

Divides a number by its argument, using the given context.

#### Syntax

<pre class="syntax">
divide(number, context?): Decimal
</pre>

#### Parameters
  - <code class="def">number: <span>number | string | Decimal</span></code>
    - Divisor
  - <code class="def">context?: <span>[MathContext](api-mathcontext.html)</span></code>
    - Context to use for scale, precision, rounding

#### Example

```typescript
const rounding: RoundingModeType[] = ['half-even', 'floor'];
const n = new Decimal('10');

for (const round of rounding) {
  console.log(round);

for (const scale of [5, 10, 15]) {
    const r = n.divide(6, { scale, round });
    console.log(`  ${r.toString()}`);
  }
}
```

<pre class="output">
half-even
  166.66667
  166.6666666667
  166.666666666666667
floor
  166.66666
  166.6666666666
  166.666666666666666
</pre>


## divmod

Divides a number by its argument, returning the quotient and remainder as a pair.

#### Syntax

<pre class="syntax">
divmod(number): [Decimal, Decimal]
</pre>

#### Parameters
  - <code class="def">number: <span>number | string | Decimal</span></code>
    - Divisor

#### Example

```typescript
const n = new Decimal('100');
for (const d of [3, 12, 15.7, 37.82, 90.122]) {
  const [q, r] = n.divmod(d);
  console.log(`(${n.toString()} / ${d}) is ${q.toString()} r ${r.toString()}`);
}
```

<pre class="output">
(100 / 3) is 33 r 1
(100 / 12) is 8 r 4
(100 / 15.7) is 6 r 5.8
(100 / 37.82) is 2 r 24.36
(100 / 90.122) is 1 r 9.878
</pre>



## increment

Adds 1 to a number.

#### Syntax

<pre class="syntax">
increment(): Decimal
</pre>

#### Example

```typescript
const n = new Decimal('-0.57');
console.log(n.increment().toString());
```

<pre class="output">
0.43
</pre>


## integerDigits

Count of the number of integer digits. Always returns a number &gt;= 1.

#### Syntax

<pre class="syntax">
integerDigits(): number
</pre>

#### Example

```typescript
for (const s of ['.123', '12345.9999999', '1e20']) {
  const n = new Decimal(s);
  const d = n.integerDigits();
  console.log(`${n.toString()} has ${d} integer digit${d === 1 ? '' : 's'}`);
}
```

<pre class="output">
0.123 has 1 integer digit
12345.9999999 has 5 integer digits
100000000000000000000 has 21 integer digits
</pre>



## isInteger

Indicates if this number is an integer or has a fractional part.

#### Syntax

<pre class="syntax">
isInteger(): boolean
</pre>

#### Example

```typescript
for (const s of ['0', '5', '1e10', '.123', '12345.9999999', '5.999999999999999999999']) {
  const n = new Decimal(s);
  console.log(`${n.toString()} ${n.isInteger() ? 'yes' : 'no'}`);
}
```

<pre class="output">
0 yes
5 yes
10000000000 yes
0.123 no
12345.9999999 no
5.999999999999999999999 no
</pre>


## isNegative

Indicates if this number is negative.

#### Syntax

<pre class="syntax">
isNegative(): boolean
</pre>



## mod

Divides a numer by an argument and returns the remainder.

#### Syntax

<pre class="syntax">
mod(number): Decimal
</pre>



## movePoint

Move the decimal point left or right `n` places. Does not change precision, it only
affects the exponent.

Moves to the left if `n` is negative, and to the right if positive.

#### Syntax

<pre class="syntax">
movePoint(n): Decimal
</pre>

#### Parameters
  - <code class="def">n: <span>number</span></code>
    - Number of places to move the decimal point left (if negative) or right (if positive)


#### Example

```typescript
const n = new Decimal('12345.6789');
for (const p of [-5, -3, -1, 1, 3, 5]) {
  console.log(n.movePoint(p).toString());
}
```

<pre class="output">
0.123456789
12.3456789
1234.56789
123456.789
12345678.9
1234567890
</pre>



## multiply

Multiply a number by its argument, using the given math context.

#### Syntax

<pre class="syntax">
multiply(number, context?): Decimal
</pre>

#### Parameters
  - <code class="def">number: <span>number | string | Decimal</span></code>
    - Multiplier
  - <code class="def">context?: <span>[MathContext](api-mathcontext.html)</span></code>
    - Context to use for scale, precision, rounding

#### Example

```typescript
const { E, PI } = DecimalConstants;
const n = new Decimal('7');
for (const m of ['12', '1e10', '0.0000004737', '0.9999999', PI, E]) {
  const r = n.multiply(m, { scale: 30 });
  console.log(r.toString());
}
```

<pre class="output">
84.000000000000000000000000000000
70000000000.000000000000000000000000000000
0.000003315900000000000000000000
6.999999300000000000000000000000
21.991148575128552669238503682957
19.027972799213316647522012299469
</pre>



## negate

Inverts the sign of the number.

#### Syntax

<pre class="syntax">
negate(): Decimal
</pre>

#### Example

```typescript
for (const n of ['-5', '3.1415']) {
  console.log(new Decimal(n).negate().toString());
}
```

<pre class="output">
5
-3.1415
</pre>


## precision

Returns the precision in the number. Precision indicates the total digits in the number, independent of the exponent.

For example the number `1e10` has 1 digit of precision.

#### Syntax

<pre class="syntax">
precision(): number
</pre>

#### Example

```typescript
for (const n of ['1', '1e10', '1.2345']) {
  console.log(new Decimal(n).precision());
}
```

<pre class="output">
1
1
5
</pre>


## scale

Returns the scale of the number. Scale indicates the number of decimal places.

#### Syntax

<pre class="syntax">
scale(): number
</pre>

#### Example

```typescript
for (const n of ['1', '1e-10', '1.2345']) {
  console.log(new Decimal(n).scale());
}
```

<pre class="output">
0
10
4
</pre>



## setScale

#### Syntax

<pre class="syntax">
</pre>



## shiftleft

#### Syntax

<pre class="syntax">
</pre>



## shiftright

#### Syntax

<pre class="syntax">
</pre>



## signum

#### Syntax

<pre class="syntax">
</pre>



## stripTrailingZeros

#### Syntax

<pre class="syntax">
</pre>



## subtract

#### Syntax

<pre class="syntax">
</pre>



## toParts

#### Syntax

<pre class="syntax">
</pre>



## toString

#### Syntax

<pre class="syntax">
toString(): string
</pre>

#### Example
```typescript
const s = Number.MAX_SAFE_INTEGER;
const n = new Decimal(`${s}${s}.${s}`);
console.log(n.toString());
```

<pre class="output">
90071992547409919007199254740991.9007199254740991
</pre>


## trailingZeros

#### Syntax

<pre class="syntax">
</pre>
