---
id: version-1.0.1-api-currencyformatstyletype
title: CurrencyFormatStyleType
original_id: api-currencyformatstyletype
---

Indicates which format style to use when formatting currencies.

<pre class="syntax">
'symbol' | 'accounting' | 'code' | 'name' | 'short'
</pre>

### Values

  - `"symbol"`
    - Use the currency's symbol, if available.
  - `"accounting"`
    - Accounting form. Example in en-US -3.27 USD formats as "($3.27)"
  - `"code"`
    - Currency indicated by its 3-letter code, e.g. USD.
  - `"name"`
    - Currency indicated by its pluralized name, e.g. "US dollars"
  - `"short"`
    - Compact form, using as few digits as needed, and indicating order of magnitude. In en-US K=thousands, M=millions, etc.

### Examples

```typescript
const cldr = framework.get('en');
const nums = ['1.25', '-3456.789', '999900.00', '-12345678.00'];
for (const n of nums) {
  log(cldr.Numbers.formatCurrency(n, 'USD', { style: 'symbol' }));
}
```
<pre class="output">
$1.25
-$3,456.79
$999,900.00
-$12,345,678.00
</pre>


```typescript
const cldr = framework.get('en');
const nums = ['1.25', '-3456.789', '999900.00', '-12345678.00'];
for (const n of nums) {
  log(cldr.Numbers.formatCurrency(n, 'USD', { style: 'symbol', group: false }));
}
```
<pre class="output">
$1.25
-$3456.79
$999900.00
-$12345678.00
</pre>



```typescript
const cldr = framework.get('en');
const nums = ['1.25', '-3456.789', '999900.00', '-12345678.00'];
for (const n of nums) {
  log(cldr.Numbers.formatCurrency(n, 'USD', { style: 'accounting' }));
}
```
<pre class="output">
$1.25
($3,456.79)
$999,900.00
($12,345,678.00)
</pre>


```typescript
const cldr = framework.get('en');
const nums = ['1.25', '-3456.789', '999900.00', '-12345678.00'];
for (const n of nums) {
  log(cldr.Numbers.formatCurrency(n, 'USD', { style: 'code' }));
}
```
<pre class="output">
1.25 USD
-3,456.79 USD
999,900.00 USD
-12,345,678.00 USD
</pre>


```typescript
const cldr = framework.get('en');
const nums = ['1.25', '-3456.789', '999900.00', '-12345678.00'];
for (const n of nums) {
  log(cldr.Numbers.formatCurrency(n, 'USD', { style: 'name' }));
}
```
<pre class="output">
1.25 US dollars
-3,456.79 US dollars
999,900.00 US dollars
-12,345,678.00 US dollars
</pre>


```typescript
const cldr = framework.get('en');
const nums = ['1.25', '-3456.789', '999900.00', '-12345678.00'];
for (const n of nums) {
  log(cldr.Numbers.formatCurrency(n, 'USD', { style: 'name', maximumFractionDigits: 0 }));
}
```
<pre class="output">
1 US dollar
-3,457 US dollars
999,900 US dollars
-12,345,678 US dollars
</pre>


```typescript
const cldr = framework.get('en');
const nums = ['1.25', '-3456.789', '999900.00', '-12345678.00'];
for (const n of nums) {
  log(cldr.Numbers.formatCurrency(n, 'USD', { style: 'short' }));
}
```
<pre class="output">
$1.2
-$3.5K
$1M
-$12M
</pre>


{%refs CurrencyFormatStyleType}