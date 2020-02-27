---
id: version-0.26.0-api-quantity
title: Quantity
original_id: api-quantity
---

A number representing a quantity of a given unit.

### Syntax

<pre class="syntax">
object {
  value,
  unit?,
  per?,
  times?
}
</pre>

### Properties
  - <code class="def">value: <span>number | string | [Decimal](api-decimal.html)</span></code>
    - Scalar value
  - <code class="def">unit?: <span>[UnitType](api-unittype.html)</span></code>
    - Units the quantity is measured in
  - <code class="def">per?: <span>[UnitType](api-unittype.html)</span></code>
    - Optional "per" denominator unit
  - <code class="def">times?: <span>[UnitType](api-unittype.html)</span></code>
    - Optional "times" denominator unit

### Example

```typescript
const cldr = framework.get('en');
let qty: Quantity = { value: '123.57399', unit: 'meter-per-second' };
log(cldr.Units.formatQuantity(qty, { length: 'narrow' }));

qty = { value: '17.9887', unit: 'terabit', per: 'minute' };
log(cldr.Units.formatQuantity(qty));
log(cldr.Units.formatQuantity(qty, { length: 'narrow' }));

qty = { value: '30.7899', unit: 'kilogram', per: 'lux' };
log(cldr.Units.formatQuantity(qty));

qty = { value: '1', unit: 'foot', 'times': 'pound' };
log(cldr.Units.formatQuantity(qty));

qty = { value: '5', unit: 'newton', times: 'meter' };
log(cldr.Units.formatQuantity(qty));
```
<pre class="output">
123.574m/s
17.989 terabits per minute
17.989Tb/min
30.79 kilograms per lux
1 foot⋅pound
5 newton⋅meters
</pre>


{%refs Quantity}
