---
id: api-decimal
title: Decimal
---

## new

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

#### Syntax

<pre class="syntax">
</pre>



## divide

#### Syntax

<pre class="syntax">
</pre>



## divmod

#### Syntax

<pre class="syntax">
</pre>



## increment

#### Syntax

<pre class="syntax">
</pre>



## integerDigits

#### Syntax

<pre class="syntax">
</pre>



## isInteger

#### Syntax

<pre class="syntax">
</pre>



## isNegative

#### Syntax

<pre class="syntax">
</pre>



## mod

#### Syntax

<pre class="syntax">
</pre>



## movePoint

#### Syntax

<pre class="syntax">
</pre>



## multiply

#### Syntax

<pre class="syntax">
</pre>



## negate

#### Syntax

<pre class="syntax">
</pre>



## operands

#### Syntax

<pre class="syntax">
</pre>



## precision

#### Syntax

<pre class="syntax">
</pre>



## scale

#### Syntax

<pre class="syntax">
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
