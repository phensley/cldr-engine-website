---
id: api-cldr-numbers
title: CLDR.Numbers
---

The `CLDR.Numbers` namespace allows you to:
  * Format decimal numbers and currencies
  * Compute the plural category for cardinal and ordinal numbers
  * Get currency symbols, display name, pluralized name and fraction info.

## adjustDecimal

Adjust a decimal numbers integer, significant and fraction digits, and apply the given
rounding mode.

#### Syntax

<pre class="syntax">
adjustDecimal(num, options?): Decimal
</pre>

#### Parameters
  - <code class="def">num: <span>number | string | [Decimal](api-decimal.html)</span></code>
    - The number to adjust.
  - <code class="def">options?: <span>[DecimalAdjustOptions](api-decimaladjustoptions.html)</span></code>
    - Options to control the decimal number adjustment.

#### Examples

```typescript
const cldr = framework.get('en');
log(cldr.Numbers.adjustDecimal('1.5', { maximumFractionDigits: 0 }));
log(cldr.Numbers.adjustDecimal('1.5', { maximumFractionDigits: 0, round: 'down' }));
```
<pre class="output">
2
1
</pre>



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
const cldr = framework.get('en');
log(cldr.Numbers.formatCurrency('12345.6789', 'EUR'));
```
<pre class="output">
€12,345.68
</pre>


Using a compact style with an explicit fixed divisor.

```typescript
const cldr = framework.get('en');
const opts = { style: 'short', divisor: 1000 };
log(cldr.Numbers.formatCurrency('100', 'USD', opts));
log(cldr.Numbers.formatCurrency('1234567', 'USD', opts));
```
<pre class="output">
$0.1K
$1,235K
</pre>


The `cash` option activates rounding to the smallest cash unit available for the given currency. For example, if the penny were eliminated in the United States, the nickel (`$0.05`) would become the smallest cash unit available. See [the CLDR currency data](https://github.com/unicode-cldr/cldr-core/blob/master/supplemental/currencyData.json) for the most recent list.

Note: the `round` rounding mode still takes effect; only the rounding increment is changed.

```typescript
const cldr = framework.get('en');
const opts = { cash: true };

// The smallest cash unit for the Danish Krone is 0.50
log(cldr.Numbers.formatCurrency('345.67', 'DKK', opts));
log(cldr.Numbers.formatCurrency('345.76', 'DKK', opts));

// The smallest cash unit for the Canadian Dollar is 0.05
log(cldr.Numbers.formatCurrency('345.67', 'CAD', opts));
log(cldr.Numbers.formatCurrency('345.76', 'CAD', opts));
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
const cldr = framework.get('en');
log(cldr.Numbers.formatCurrencyToParts('12345.6789', 'EUR'));
```
<pre class="output">
[ { type: 'currency', value: '€' },
  { type: 'integer', value: '12' },
  { type: 'group', value: ',' },
  { type: 'integer', value: '345' },
  { type: 'decimal', value: '.' },
  { type: 'fraction', value: '68' } ]
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
const cldr = framework.get('en');
log(cldr.Numbers.formatDecimal('12345.6789', { group: true }));
```
<pre class="output">
12,345.679
</pre>


Using a compact style with an explicit fixed divisor.

```typescript
const cldr = framework.get('en');
const opts = { style: 'long', divisor: 1000 };
log(cldr.Numbers.formatDecimal('100', opts));
log(cldr.Numbers.formatDecimal('1234567', opts));
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
const cldr = framework.get('en');
log(cldr.Numbers.formatDecimalToParts('12345.6789', { group: true }));
```
<pre class="output">
[ { type: 'integer', value: '12' },
  { type: 'group', value: ',' },
  { type: 'integer', value: '345' },
  { type: 'decimal', value: '.' },
  { type: 'fraction', value: '679' } ]
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
const cldr = framework.get('en');
log(cldr.Numbers.getCurrencySymbol('GBP'));
```
<pre class="output">
£
</pre>




## getCurrencyDisplayName

Get the display name for a given currency.

#### Syntax

<pre class="syntax">
getCurrencyDisplayName(code, options?): string
</pre>

#### Parameters
  - <code class="def">code: <span>[CurrencyType](api-currencytype.html)</span></code>
    - The 3-letter [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code for the currency.
  - <code class="def">options?: <span>[DisplayNameOptions](api-displaynameoptions.html)</span></code>
    - Options to adjust the display name

#### Example

```typescript
const cldr = framework.get('en');
log(cldr.Numbers.getCurrencyDisplayName('MXN'));
```
<pre class="output">
Mexican Peso
</pre>



## getCurrencyPluralName

Get the pluralized name for a given currency.

#### Syntax

<pre class="syntax">
getCurrencyPluralName(num, code, options?): string
</pre>

#### Parameters
  - <code class="def">num: <span>number | string | [Decimal](api-decimal.html)</span></code>
    - The number to use to compute the plural category. Note that you may want to [adjustDecimal](api-cldr-numbers.html#adjustdecimal) the number first, to ensure the number has the expected number of fraction digits, since the plural categories for `1` and `1.0` can differ.
  - <code class="def">code: <span>[CurrencyType](api-currencytype.html)</span></code>
    - The 3-letter [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) code for the currency.
  - <code class="def">options?: <span>[DisplayNameOptions](api-displaynameoptions.html)</span></code>
    - Options to adjust the display name

#### Example

```typescript
const cldr = framework.get('en');
log(cldr.Numbers.getCurrencyPluralName('1', 'USD'));
log(cldr.Numbers.getCurrencyPluralName('17', 'USD'));
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
const cldr = framework.get('en');
log(cldr.Numbers.getCurrencyFractions('USD'));
log(cldr.Numbers.getCurrencyFractions('JPY'));
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

#### Return value
  - A [CurrencyType](api-currencytype.html) value

#### Example

```typescript
const cldr = framework.get('en');
log(cldr.Numbers.getCurrencyForRegion('ME'));
log(cldr.Numbers.getCurrencyForRegion('CH'));
```
<pre class="output">
EUR
CHF
</pre>




## getPluralCardinal

Get the plural category for a cardinal number.

#### Syntax

<pre class="syntax">
getPluralCardinal(num, options?): string
</pre>

#### Parameters
  - <code class="def">num: <span>number | string | [Decimal](api-decimal.html)</span></code>
    - The cardinal number
  - <code class="def">options?: <span>[DecimalAdjustOptions](api-decimaladjustoptions.html)</span></code>
    - Options to control the decimal number adjustment.

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
  log(`${' '.repeat(4 - n.length)}${n}   ${res}`);
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
getPluralOrdinal(num, options?): string
</pre>

#### Parameters
  - <code class="def">num: <span>number | string | [Decimal](api-decimal.html)</span></code>
    - The cardinal number
  - <code class="def">options?: <span>[DecimalAdjustOptions](api-decimaladjustoptions.html)</span></code>
    - Options to control the decimal number adjustment.

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
  log(`${id}: ${res}`);
});
````
<pre class="output">
fr: 1re 2e 3e 4e 5e
en: 1st 2nd 3rd 4th 5th
</pre>

