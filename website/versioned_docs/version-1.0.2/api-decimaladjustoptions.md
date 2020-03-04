---
id: version-1.0.2-api-decimaladjustoptions
title: DecimalAdjustOptions
original_id: api-decimaladjustoptions
---

Specifies options for adjusting a decimal number, specifing min/max fractions, rounding, etc.

<pre class="syntax">
object {
  round?,
  minimumIntegerDigits?,
  maximumFractionDigits?,
  minimumFractionDigits?,
  maximumSignificantDigits?,
  minimumSignificantDigits?
}
</pre>

### Properties

  - <code class="def">round?: <span>[RoundingModeType](api-roundingmodetype.html)</span></code>
    - Mode used to round numbers during formatting.
  - <code class="def">minimumIntegerDigits?: <span>number</span></code>
    - Minimum integer digits to display.
  - <code class="def">maximumFractionDigits?: <span>number</span></code>
    - Maximum fraction digits to display.
  - <code class="def">minimumFractionDigits?: <span>number</span></code>
    - Minimum fraction digits to display.
  - <code class="def">maximumSignificantDigits?: <span>number</span></code>
    - Maximum significant digits to display.
  - <code class="def">minimumSignificantDigits?: <span>number</span></code>
    - Minimum significant digits to display.

### Defaults

```javascript
{
  round: 'half-even',
  minimumIntegerDigits: 1,
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}
```

### Examples

```typescript
const cldr = framework.get('en');
log(cldr.Numbers.adjustDecimal('1.5', { maximumFractionDigits: 0 }));
log(cldr.Numbers.adjustDecimal('1.5', { maximumFractionDigits: 0, round: 'down' }));
```
<pre class="output">
2
1
</pre>


{%refs DecimalAdjustOptions}
