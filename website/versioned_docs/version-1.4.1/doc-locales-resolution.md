---
id: doc-locales-resolution
title: Locale resolution
---

Resolution is the process of filling in any undefined subtags, and replacing subtag aliases with a preferred value.

The function [CLDRFramework.resolveLocale](api-cldrframework.html#resolvelocale) performs both parsing and resolution, returning a [Locale](api-locale.html) object.

A [Locale](api-locale.html) object has two properties: `id` is the original unaltered identifier, and `tag` is the [LanguageTag](api-languagetag.html) object with its subtags resolved and normalized.

The resolution process and the [Locale](api-locale.html) object are important since there are parts of the library which require the value for a specific subtag. For example, pluralization uses the language subtag, and selecting a measurement system (US, UK, Metric) uses the region subtag. The resolution process ensures these subtags are populated.

In the example below, the identifier `"und-US"` uses the undefined language subtag, and its script subtag is missing. The resolution process will apply ["likely subtags"](https://www.unicode.org/reports/tr35/tr35.html#Likely_Subtags) data to fill in these undefined values.

```typescript
import { CLDRFramework } from '@phensley/cldr';

let { id, tag } = CLDRFramework.resolveLocale('und-US');
log(id);
log(tag.expanded());
```
<pre class="output">
und-US
en-Latn-US
</pre>

In other cases a subtag is aliased to a preferred value that should be used. Resolution will perform language and region alias substitution.

```typescript
const { id, tag } = CLDRFramework.resolveLocale('cmn-TW');
log(tag.compact());
```
<pre class="output">
zh-Hant-TW
</pre>

Irregular or grandfathered tags are mapped directly to a replacement value.

```typescript
const { id, tag } = CLDRFramework.resolveLocale('i-klingon');
log(tag.language());
```
<pre class="output">
tlh
</pre>

If all subtags are undefined, as in `"und-Zzzz-ZZ"` the library currently resolves this to `"en-Latn-US"`. Language resolution alone should not be relied on to perform quasi-language matching or defaulting. See the [language matching](doc-locales-matching.html) section for more on this.


#### See Also
  * [LocaleMatcher](api-localematcher.html)
