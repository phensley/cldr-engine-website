---
id: api-parselanguagetag
title: parseLanguageTag
---

Parse a BCP 47 language tag or Java locale identifier, returning a [LanguageTag](api-languagetag.html) object.

### Syntax

<pre class="syntax">
parseLanguageTag(id): LanguageTag
</pre>

### Parameters
  - <code class="def">id: <span>string</span></code>
    - Identifier to parse

### Example

```typescript
import { parseLanguageTag } from '@phensley/cldr';

const ids = [
  'en-US',
  'und-Latn-ZZ',
  'fr_CA',
  'no-GB-u-ca-gregory-u-nu-mathmono'
];

for (const id of ids) {
  const tag = parseLanguageTag(id);

  console.log(tag.language());
  console.log(tag.script());
  console.log(tag.region());
  console.log(tag.compact());
  console.log(tag.expanded());
  console.log(inspect(tag.extensions()));
  console.log();
}
```
<pre class="output">
en
Zzzz
US
en-US
en-Zzzz-US
{}
&nbsp;
und
Latn
ZZ
und-Latn
und-Latn-ZZ
{}
&nbsp;
fr
Zzzz
CA
fr-CA
fr-Zzzz-CA
{}
&nbsp;
no
Zzzz
GB
no-GB-u-ca-gregory-nu-mathmono
no-Zzzz-GB-u-ca-gregory-nu-mathmono
{ u: [ 'ca-gregory', 'nu-mathmono' ] }
</pre>

### See Also
  - [LanguageTag](api-languagetag.html)
  - [resolveLocale](api-resolvelocale.html)
