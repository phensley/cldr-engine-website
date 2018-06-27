---
id: api-quantity
title: Quantity
---

A number representing a quantity of a given unit.

### Syntax

<pre class="syntax">
object {
  value,
  unit
}
</pre>

### Properties
  - <code class="def">value: <span>number | string | [Decimal](api-decimal.html)</span></code>
    - Scalar value
  - <code class="def">unit?: <span>[UnitType](api-unittype.html)</span></code>
    - Units the quantity is measured in

### Example

```typescript
const qty: Quantity = { value: '123.57399', unit: 'meter-per-second' };
cldr.Units.formatQuantity(qty, { length: 'narrow' });
```

<pre class="output">
123.574m/s
</pre>
