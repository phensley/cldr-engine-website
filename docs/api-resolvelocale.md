---
id: api-resolvelocale
title: resolveLocale
---

Parses a BCP 47 language tag or Java locale identifier and [resolves it](doc-locales-parsing.html#resolution), returning a [Locale](api-locale.html) object.

### Syntax

<pre class="syntax">
resolveLocale(id): Locale
</pre>

### Parameters
  - <code class="def">id: <span>string | [LanguageTag](api-languagetag.html)</span></code>
    - Identifier or language tag to resolve

### Examples

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

```typescript
for (const s of ['und-US', 'fr']) {
  const parsed = parseLanguageTag(s);
  const resolved = resolveLocale(parsed);
  console.log(`${parsed.expanded()}  ${resolved.tag.compact()}`);
}
```

<pre class="output">
und-Zzzz-US  en-Latn-US
fr-Zzzz-ZZ  fr-Latn-FR
</pre>

### See Also
  - [Locale](api-locale.html)
  - [parseLanguageTag](api-parselanguagetag.html)
