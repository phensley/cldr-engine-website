---
id: api-availablelocales
title: availableLocales
---

Return an array containing all of the available locales.

### Syntax

<pre class="syntax">
availableLocales(): Locale[]
</pre>

### Example

```typescript
import { availableLocales } from '@phensley/cldr';
for (const locale of availableLocales()) {
  const { id, tag } = locale;
  console.log(`${tag.language()}-${tag.script()}-${tag.region()}    ${id}`);
}
```

<pre class="output">
af-Latn-ZA     af
af-Latn-NA     af-NA
am-Ethi-ET     am
ar-Arab-EG     ar
ar-Arab-AE     ar-AE
ar-Arab-BH     ar-BH
ar-Arab-DJ     ar-DJ
ar-Arab-DZ     ar-DZ
ar-Arab-EG     ar-EG
ar-Arab-EH     ar-EH
...
</pre>

### See Also
  - [Locale](api-locale.html)
