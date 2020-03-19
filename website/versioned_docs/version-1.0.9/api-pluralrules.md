---
id: version-1.0.9-api-pluralrules
title: PluralRules
original_id: api-pluralrules
---

A set of pluralization rules.

### Example

#### Example

```typescript
import { PluralRules } from '@phensley/cldr';
let plurals: PluralRules;

for (const id of ['en', 'pt', 'pt-PT']) {
  const cldr = framework.get(id);
  plurals = cldr.General.bundle().plurals();
  const res = [0, 1, '1.0'].map(n => `${n} ${plurals.cardinal(n).padEnd(7)}`);
  log(`${id.padStart(6)}  ${res.join(' ')}`);
}
```
<pre class="output">
    en  0 other   1 one     1.0 other  
    pt  0 one     1 one     1.0 one    
 pt-PT  0 other   1 one     1.0 other  
</pre>

{%refs PluralRules}
