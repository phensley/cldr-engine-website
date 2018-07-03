---
id: api-languagetag
title: LanguageTag
---

An object representing a resolved [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) language tag.

#### Syntax

<pre class="syntax">
new LanguageTag(
  language?, script?, region?, variant?, extensions?, privateUse?)
</pre>

#### Properties
  - <code class="def">language?: <span>string</span></code>
    - ISO-639 language code
  - <code class="def">script?: <span>string</span></code>
    - ISO 15924 script code
  - <code class="def">region?: <span>string</span></code>
    - ISO 3166-1 or UN M.49 code
  - <code class="def">variant?: <span>string</span></code>
    - IETF registered variant
  - <code class="def">extensions?: <span>object</span></code>
    - Mapping of extension prefix to subtags
  - <code class="def">privateUse?: <span>string</span></code>
    - Private use subtag

#### Example

```typescript
const tag = new LanguageTag(undefined, 'Latn', undefined);
console.log(tag.compact());
console.log(tag.expanded());
```

<pre class="output">
und-Latn
und-Latn-ZZ
</pre>
