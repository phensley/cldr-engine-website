---
id: api-resolvelocale
title: resolveLocale
---

Parse a BCP 47 language tag or Java locale identifier and resolve it, returning a [Locale](api-locale.html) object.

### Syntax

<pre class="syntax">
resolveLocale(id): Locale
</pre>

### Parameters
  - <code class="def">id: <span>string</span></code>
    - Identifier to parse

### Example

```typescript
import { resolveLocale } from '@phensley/cldr';
for (const str of ['en_US', 'zh', 'fr-CA-u-ca-persian-u-nu-mathmono']) {
  const { id, tag } = resolveLocale(str);
  console.log(`${tag.expanded()}`);
}
```

<pre class="output">
en-Latn-US
zh-Hans-CN
fr-Latn-CA-u-ca-persian-nu-mathmono
</pre>

### See Also
  - [Locale](api-locale.html)
