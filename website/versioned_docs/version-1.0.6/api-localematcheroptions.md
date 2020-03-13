---
id: version-1.0.6-api-localematcheroptions
title: LocaleMatcherOptions
original_id: api-localematcheroptions
---

Options for a [LocaleMatcher](api-localematcher).

**Warning** Only use this to disable language tag resolution in cases where your desired tags have the language, script, and region subtags. This is most easily done by passing them through the [`CLDRFramework.resolveLocale`](api-cldrframework#resolvelocale) function, which substitutes subtag aliases and adds likely subtags.

### Syntax

<pre class="syntax">
{
  resolve?
}
</pre>

### Properties

- <code class="def">resolve?: <span>boolean</span></code>
  - Flag to disable language resolution on the supported language tags. Defaults to `true`. This improves performance when passing in tags that have already been resolved and expanded.

### Example

```typescript
import { CLDRFramework, LocaleMatcher } from '@phensley/cldr';

const supported = ['en', 'es-419', 'es', 'en-GB', 'pt-BR'].map(
  CLDRFramework.resolveLocale
);
let matcher = new LocaleMatcher(supported, { resolve: false });
let { distance, locale } = matcher.match('en-ZA');
log(`${locale.id} distance ${distance}`);
```
<pre class="output">
en-GB distance 3
</pre>


In the case below, resolution is disabled and the supported tags have empty subtags, so the match will fail to calculate correct distances between the supported and supported tags.

```typescript
matcher = new LocaleMatcher(['en', 'es-419', 'es', 'en-GB', 'pt-BR'], {
  resolve: false
});
({ distance, locale } = matcher.match('en-ZA'));
log(`${locale.id} distance ${distance}`);

({ distance, locale } = matcher.match('pt'));
log(`${locale.id} distance ${distance}`);
```
<pre class="output">
en distance 100
en distance 100
</pre>


{%refs LocaleMatcherOptions}
