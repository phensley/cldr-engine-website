---
id: version-0.13.7-api-cldr-numbers
title: CLDR.Numbers
original_id: api-cldr-numbers
---

The `CLDR.Numbers` namespace allows you to:
  * Format decimal numbers and currencies
  * Compute the plural category for cardinal and ordinal numbers
  * Get currency symbols, display name, pluralized name and fraction info.


## formatCurrency

Format a decimal number, representing an amount in a given currency, into a string.

#### Syntax

<pre class="syntax">
formatCurrency(num, code, options?): string
</pre>

#### Parameters
  - <code class="def">num: <span>number | string | [Decimal](api-decimal.html)</span></code>
    - The currency amount to format.
  - <code class="def">code: <span>[CurrencyType](api-currencytype.html)</span></code>
    - The 3-letter [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code for the currency.
  - <code class="def">options?: <span>[CurrencyFormatOptions](api-currencyformatoptions.html)</span></code>
    - Options to control the currency formatting.

#### Return value
  - A <code class="def"><span>string</span></code> containing the formatted currency value.

#### Example

```typescript
cldr.Numbers.formatCurrency('12345.6789', 'EUR', { group: true });
```

<pre class="output">
€12,345.68
</pre>

Using a compact style with an explicit fixed divisor.

```typescript
const opts = { style: 'short', divisor: 1000 };
cldr.Numbers.formatCurrency('100', 'USD', opts);
cldr.Numbers.formatCurrency('1234567', 'USD', opts);
```

<pre class="output">
$0.1K
$1,235K
</pre>

The `cash` option activates rounding to the smallest cash unit available for the given currency. For example, if the penny were eliminated in the United States, the nickel (`$0.05`) would become the smallest cash unit available. See [the CLDR currency data](https://github.com/unicode-cldr/cldr-core/blob/master/supplemental/currencyData.json) for the most recent list.

Note: the `round` rounding mode still takes effect; only the rounding increment is changed.

```typescript
const opts = { cash: true };

// The smallest cash unit for the Danish Krone is 0.50
cldr.Numbers.formatCurrency('345.67', 'DKK', opts);
cldr.Numbers.formatCurrency('345.76', 'DKK', opts);

// The smallest cash unit for the Canadian Dollar is 0.05
cldr.Numbers.formatCurrency('345.67', 'CAD', opts);
cldr.Numbers.formatCurrency('345.76', 'CAD', opts);
```

<pre class="output">
DKK 345.50
DKK 346.00
CA$345.65
CA$345.75
</pre>

## formatCurrencyToParts

Format a decimal number, representing an amount in a given currency, into an array of parts.

#### Syntax

<pre class="syntax">
formatCurrencyToParts(num, code, options?): Part[]
</pre>

#### Parameters
  - <code class="def">num: <span>number | string | [Decimal](api-decimal.html)</span></code>
    - The currency amount to format.
  - <code class="def">code: <span>[CurrencyType](api-currencytype.html)</span></code>
    - The 3-letter [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code for the currency.
  - <code class="def">options?: <span>[CurrencyFormatOptions](api-currencyformatoptions.html)</span></code>
    - Options to control the currency formatting.

#### Return value
  - An array containing the formatted parts.

#### Example

```typescript
cldr.Numbers.formatCurrencyToParts('12345.6789', 'EUR', { group: true });
```

<pre class="output">
[
  { type: 'currency', value: '€' },
  { type: 'integer', value: '12' },
  { type: 'group', value: ',' },
  { type: 'integer', value: '345' },
  { type: 'decimal', value: '.' },
  { type: 'fraction', value: '68' }
]
</pre>

## formatDecimal

Format a decimal number to a string.

#### Syntax

<pre class="syntax">
formatDecimal(num, options?): string
</pre>

#### Parameters
  - <code class="def">num: <span>number | string | [Decimal](api-decimal.html)</span></code>
    - The number to format.
  - <code class="def">options?: <span>[DecimalFormatOptions](api-decimalformatoptions.html)</span></code>
    - Options to control the decimal formatting

#### Return value
  - A string containing the formatted number

#### Example

```typescript
cldr.Numbers.formatDecimal('12345.6789', { group: true });
```

<pre class="output">
12,345.679
</pre>

Using a compact style with an explicit fixed divisor.

```typescript
const opts = { style: 'long', divisor: 1000 };
cldr.Numbers.formatDecimal('100', opts);
cldr.Numbers.formatDecimal('1234567', opts);
```

<pre class="output">
0.1 thousand
1,235 thousand
</pre>

## formatDecimalToParts

Format a decimal number to an array of parts.

#### Syntax

<pre class="syntax">
formatDecimalToParts(num, options?): Part[]
</pre>

#### Parameters
  - <code class="def">num: <span>number | string | [Decimal](api-decimal.html)</span></code>
    - The number to format.
  - <code class="def">options?: <span>[DecimalFormatOptions](api-decimalformatoptions.html)</span></code>
    - Options to control the decimal formatting

#### Return value
  - An array containing a list of the formatted parts.

#### Example

```typescript
cldr.Numbers.formatDecimalToParts('12345.6789', { group: true });
```

<pre class="output">
[
  { type: 'integer', value: '12' },
  { type: 'group', value: ',' },
  { type: 'integer', value: '345' },
  { type: 'decimal', value: '.' },
  { type: 'fraction', value: '679' }
]
</pre>


## getCurrencySymbol

Get the display symbol for a given currency.


#### Syntax

<pre class="syntax">
getCurrencySymbol(code, width?): string
</pre>

#### Parameters
  - <code class="def">code: <span>[CurrencyType](api-currencytype.html)</span></code>
    - The 3-letter [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code for the currency.
  - <code class="def">width: <span>[CurrencySymbolWidthType](api-currencysymbolwidthtype.html)</span></code>
    - Hint indicating you prefer the narrowest symbol.

#### Example

```typescript
cldr.Numbers.getCurrencySymbol('GBP');
```

<pre class="output">
£
</pre>



## getCurrencyDisplayName

Get the display name for a given currency.

#### Syntax

<pre class="syntax">
getCurrencyDisplayName(code): string
</pre>

#### Parameters
  - <code class="def">code: <span>[CurrencyType](api-currencytype.html)</span></code>
    - The 3-letter [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code for the currency.

#### Example

```typescript
cldr.Numbers.getCurrencyDisplayName('MXN');
```

<pre class="output">
Mexican Peso
</pre>


## getCurrencyPluralName

Get the pluralized name for a given currency.

#### Syntax

<pre class="syntax">
getCurrencyPluralName(code, plural): string
</pre>

#### Parameters
  - <code class="def">code: <span>[CurrencyType](api-currencytype.html)</span></code>
    - The 3-letter [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code for the currency.
  - <code class="def">plural: <span>string</span></code>
    - The plural category

#### Example

```typescript
let plural = cldr.Numbers.getPluralCardinal('1');
let result = cldr.Numbers.getCurrencyPluralName('USD', plural);
console.log(result);

plural = cldr.Numbers.getPluralCardinal('17');
result = cldr.Numbers.getCurrencyPluralName('USD', plural);
console.log(result);
```

<pre class="output">
US dollar
US dollars
</pre>


## getCurrencyFractions

Get the fraction info for a given currency.

#### Syntax

<pre class="syntax">
getCurrencyFractions(code): CurrencyFractions
</pre>

#### Parameters
  - <code class="def">code: <span>[CurrencyType](api-currencytype.html)</span></code>
    - The 3-letter [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code for the currency.

#### Return value
  - A `CurrencyFractions` object


#### Example

```typescript
let fractions = cldr.Numbers.getCurrencyFractions('USD');
console.log(fractions);

fractions = cldr.Numbers.getCurrencyFractions('JPY');
console.log(fractions);

```

<pre class="output">
{ digits: 2, rounding: 0, cashDigits: 2, cashRounding: 0 }
{ digits: 0, rounding: 0, cashDigits: 0, cashRounding: 0 }
</pre>


## getCurrencyForRegion

Get the currency code for a given region code.

#### Syntax

<pre class="syntax">
getCurrencyForRegion(region): CurrencyType
</pre>

#### Parameters
  - <code class="def">region: <span>string</span></code>
    - The 2-letter ISO-3166-1 code for a region.

#### REturn value
  - A [CurrencyType](api-currencytype.html) value

#### Example

```typescript
let currency = cldr.Numbers.getCurrencyForRegion('ME');
console.log(currency);

currency = cldr.Numbers.getCurrencyForRegion('CH');
console.log(currency);
```


<pre class="output">
EUR
CHF
</pre>


## getPluralCardinal

Get the plural category for a cardinal number.

#### Syntax

<pre class="syntax">
getPluralCardinal(num): string
</pre>

#### Parameters
  - <code class="def">num: <span>number | string | [Decimal](api-decimal.html)</span></code>
    - The cardinal number

#### Example

```typescript
const w = (s: string) => `${s}${' '.repeat(12 - s.length)}`;

const nums = ['0', '1', '1.0', '2', '6'];
const locales = ['en-US', 'fr-FR', 'pl-PL', 'lt-LT'];

for (const n of nums) {
  const res = locales.map(id => {
    const cldr = framework.get(id);
    return `${id}=${cldr.Numbers.getPluralCardinal(n)}`;
  }).map(w).join(' ');
  console.log(`${' '.repeat(4 - n.length)}${n}   ${res}`);
}
```

<pre class="output">
   0   en-US=other  fr-FR=one    pl-PL=many   lt-LT=other
   1   en-US=one    fr-FR=one    pl-PL=one    lt-LT=one
 1.0   en-US=other  fr-FR=one    pl-PL=other  lt-LT=one
   2   en-US=other  fr-FR=other  pl-PL=few    lt-LT=few
   6   en-US=other  fr-FR=other  pl-PL=many   lt-LT=few
</pre>

## getPluralOrdinal

Get the plural category for an ordinal number.

#### Syntax

<pre class="syntax">
getPluralOrdinal(num): string
</pre>

#### Parameters
  - <code class="def">num: <span>number | string | [Decimal](api-decimal.html)</span></code>
    - The cardinal number

#### Example

```typescript
const endings = {
  fr: { one: 're', other: 'e' },
  en: { one: 'st', two: 'nd', few: 'rd', other: 'th' }
};

const nums = ['1', '2', '3', '4', '5'];

Object.keys(endings).forEach(id => {
  const cldr = framework.get(id);
  const res = nums.map(n => {
    const cat = cldr.Numbers.getPluralOrdinal(n);
    return `${n}${endings[id][cat]}`;
  }).join(' ');
  console.log(`${id}: ${res}`);
});
````

<pre class="output">
fr: 1re 2e 3e 4e 5e
en: 1st 2nd 3rd 4th 5th
</pre>
