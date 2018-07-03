---
id: api-localematcher
title: LocaleMatcher
---

Distance-based matching of a user's desired locales against a sorted list of application supported locales.

### Syntax

<pre class="syntax">
new LocaleMatcher(supported)
</pre>

### Parameters

  - <code class="def">supported: <span>string | string[]</span></code>
    - Array of space/comma-separated locale identifiers, in order of most- to least-supported. The first identifier will be used as the default.

### Example

```typescript
import { LocaleMatcher } from '@phensley/cldr';

const localeMatcher = new LocaleMatcher('en, es-419, en-GB, pt-BR, es');

let { distance, locale } = localeMatcher.match('pt');
console.log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('es-MX'));
console.log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('en-ZA'));
console.log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('en-ZA, es'));
console.log(`${locale.id} distance ${distance}`);
```

<pre class="output">
pt-BR distance 0
es-419 distance 4
en-GB distance 3
es distance 0
</pre>
