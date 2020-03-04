---
id: version-1.0.2-doc-locales-parsing
title: Locale parsing
original_id: doc-locales-parsing
---

[IETF language tags](https://en.wikipedia.org/wiki/IETF_language_tag) are used to identify locales, specifying one or more of the following:
  * [ISO 639](https://en.wikipedia.org/wiki/ISO_639) code indicating the language
  * [ISO 15924](https://en.wikipedia.org/wiki/ISO_15924) code indicating the script or writing system
  * [ISO 3166-1](https://en.wikipedia.org/wiki/ISO_3166-1) or [UN M.49](https://en.wikipedia.org/wiki/UN_M.49) code indicating the territory or world region
  * [IANA variant](https://www.iana.org/assignments/lang-subtags-templates/lang-subtags-templates.xhtml) subtag
  * [Extension subtags](https://en.wikipedia.org/wiki/IETF_language_tag#Extensions) used for indicating the numbering system, calendar, collation, etc.
  * [BCP 47 Private use subtag](https://tools.ietf.org/html/bcp47#section-2.2.7) which uses the `'x'` extension, for an application's own purposes

This library supports parsing of language tags, and what we refer to as "resolution" which fills in any missing subtags with the most likely value.

## Parsing

Parsing converts a locale identifier like `"en-US"` into an language tag object, according to the validation rules of [IETF language tags](https://en.wikipedia.org/wiki/IETF_language_tag).

The parser will also accept underscores, which appear in locale identifiers in some languages, as with Java's Locale object.

In the example below we use the [`CLDRFramework.parseLanguageTag`](api-cldrframework.html#parselanguagetag) function to parse several identifiers into [`LanguageTag`](api-languagetag.html) objects, and calling several methods on them.

```typescript
import { CLDRFramework } from '@phensley/cldr';

const { parseLanguageTag } = CLDRFramework;

const ids = [
  'en-US',
  'und-Latn-ZZ',
  'fr_CA',
  'no-GB-u-ca-gregory-u-nu-mathmono'
];

for (const id of ids) {
  const tag = parseLanguageTag(id);

  log(tag.language());
  log(tag.script());
  log(tag.region());
  log(tag.compact());
  log(tag.expanded());
  log(tag.extensions());
  log();
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
&nbsp;
</pre>

