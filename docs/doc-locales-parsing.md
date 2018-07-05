---
id: doc-locales-parsing
title: Parsing and resolution
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

In the example below we use the [parseLanguageTag](api-parselanguagetag.html) function to parse several identifiers into [LanguageTag](api-languagetag.html) objects, and calling several methods on them.

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

## Resolution

Resolution is the process of filling in any undefined subtags, and replacing subtag aliases with a preferred value.

The function [resolveLocale](api-resolvelocale.html) performs both parsing and resolution, returning a [Locale](api-locale.html) object.

A [Locale](api-locale.html) object has two properties: `id` is the original unaltered identifier, and `tag` is the [LanguageTag](api-languagetag.html) object with its subtags resolved and normalized.

The resolution process and the [Locale](api-locale.html) object are important since there are parts of the library which require the value for a specific subtag. For example, pluralization uses the language subtag, and selecting a measurement system (US, UK, Metric) uses the region subtag. The resolution process ensures these subtags are populated.

In the example below, the identifier `"und-US"` uses the undefined language subtag, and its script subtag is missing. The resolution process will apply ["likely subtags"](https://www.unicode.org/reports/tr35/tr35.html#Likely_Subtags) data to fill in these undefined values.

```typescript
import { resolveLocale } from '@phensley/cldr';

let { id, tag } = resolveLocale('und-US');
console.log(id);
console.log(tag.expanded());
```
<pre class="output">
und-US
en-Latn-US
</pre>

In other cases a subtag is aliased to a preferred value that should be used. Resolution will perform language and region alias substitution.

```typescript
const { id, tag } = resolveLocale('cmn-TW');
console.log(tag.compact());
```
<pre class="output">
zh-Hant-TW
</pre>

Irregular or grandfathered tags are mapped directly to a replacement value.

```typescript
const { id, tag } = resolveLocale('i-klingon');
console.log(tag.language());
```
<pre class="output">
tlh
</pre>

If all subtags are undefined, as in `"und-Zzzz-ZZ"` the library currently resolves this to `"en-Latn-US"`. Language resolution alone should not be relied on to perform quasi-language matching or defaulting. See the [language matching](doc-locales-matching.html) section for more on this.
