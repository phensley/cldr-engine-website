---
id: version-0.11.4-api-currencyformatstyletype
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

### Example

```typescript
const nums = ['1.25', '-3456.789', '999900.00', '-12345678.00'];
nums.map(n =>
  cldr.Numbers.formatCurrency(n, 'USD', { style: 'symbol' })).join('\n');
```

<pre class="output">
$1.25
-$3,456.79
$999,900.00
-$12,345,678.00
</pre>

```typescript
.. { style: 'symbol', group: false })).join('\n');
```

<pre class="output">
$1.25
-$3456.79
$999900.00
-$12345678.00
</pre>


```typescript
.. { style: 'accounting' }
```

<pre class="output">
$1.25
($3,456.79)
$999,900.00
($12,345,678.00)
</pre>

```typescript
.. { style: 'code' }
```

<pre class="output">
1.25 USD
-3,456.79 USD
999,900.00 USD
-12,345,678.00 USD
</pre>

```typescript
.. { style: 'name' }
```

<pre class="output">
1.25 US dollars
-3,456.79 US dollars
999,900.00 US dollars
-12,345,678.00 US dollars
</pre>

```typescript
.. { style: 'name', maximumFractionDigits: 0 }
```

<pre class="output">
1 US dollar
-3,457 US dollars
999,900 US dollars
-12,345,678 US dollars
</pre>

```typescript
.. { style: 'short' }
```

<pre class="output">
$1.2
-$3.5K
$1M
-$12M
</pre>

### See Also

  - [CLDR.Numbers.formatCurrency](api-cldr-numbers#formatcurrency)
  - [CLDR.Numbers.formatCurrencyToParts](api-cldr-numbers#formatcurrencytoparts)
