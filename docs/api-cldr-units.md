---
id: api-cldr-units
title: CLDR.Units
---

## formatQuantity

Format a given unit quantity to string.

#### Syntax
<pre class="syntax">
formatQuantity(qty [, options]): string
</pre>

#### Parameters
  - <code class="def">qty: <span>[Quantity](api-quantity.html)</span></code>
    - Value to be formatted
  - <code class="def">options?: <span>[UnitFormatOptions](api-unitformatoptions.html)</span></code>
    - Options to control unit formatting

#### Example

```typescript
const qty: Quantity = { value: '123.57399', unit: 'meter-per-second-squared' };
cldr.Units.formatQuantity(qty, { length: 'narrow', maximumFractionDigits: 1 });
```

<pre class="output">
124m/s
</pre>


## formatQuantityToParts

Format a given unit quantity to an array of parts.

#### Syntax
<pre class="syntax">
formatQuantity(qty [, options]): Part[]
</pre>

#### Parameters
  - <code class="def">qty: <span>[Quantity](api-quantity.html)</span></code>
    - Value to be formatted
  - <code class="def">options?: <span>[UnitFormatOptions](api-unitformatoptions.html)</span></code>
    - Options to control unit formatting

#### Example

```typescript
const qty: Quantity = { value: '1353.75999', unit: 'mile-per-hour' };
cldr.Units.formatQuantityToParts(qty, { length: 'long' });
```

<pre class="output">
[
  { type: 'digits', value: '1353' },
  { type: 'decimal', value: '.' },
  { type: 'digits', value: '76' },
  { type: 'literal', value: ' miles per hour' }
]
</pre>


## formatQuantitySequence

## formatQuantitySequenceToParts

## getUnitDisplayName

