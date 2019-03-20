---
id: version-0.8.17-api-quantity
title: Quantity
original_id: api-quantity
---

A number representing a quantity of a given unit.

### Syntax

<pre class="syntax">
object {
  value,
  unit?,
  per?
}
</pre>

### Properties
  - <code class="def">value: <span>number | string | [Decimal](api-decimal.html)</span></code>
    - Scalar value
  - <code class="def">unit?: <span>[UnitType](api-unittype.html)</span></code>
    - Units the quantity is measured in
  - <code class="def">per?: <span>[UnitType](api-unittype.html)</span></code>
    - Optional denominator unit

### Example

```typescript
let qty: Quantity = { value: '123.57399', unit: 'meter-per-second' };
cldr.Units.formatQuantity(qty, { length: 'narrow' });

qty = { value: '17.9887', unit: 'terabit', per: 'minute' };
cldr.Units.formatQuantity(qty);
cldr.Units.formatQuantity(qrt, { length: 'narrow' });

qty = { value: '30.7899', unit: 'kilogram', per: 'lux' };
cldr.Units.formatQuantity(qty);
```

<pre class="output">
123.574m/s
17.989 terabits per minute
17.989Tb/min
30.79 kilograms per lux
</pre>
