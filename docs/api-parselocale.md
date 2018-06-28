---
id: api-parselocale
title: parseLocale
---

Parse a BCP 47 language tag or Java locale identifier into a [Locale](api-locale.html) object.

### Syntax

<pre class="syntax">
parseLocale(id): Locale
</pre>

### Parameters
  - <code class="def">id: <span>string</span></code>
    - Identifier to parse

### Example

```typescript
import { parseLocale } from '@phensley/cldr';
for (const str of ['en_US', 'zh', 'fr-CA-u-ca-persian-u-nu-mathmono']) {
  const { id, tag } = parseLocale(str);
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
