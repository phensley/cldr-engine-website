---
id: version-1.0.9-api-localematcher
title: LocaleMatcher
original_id: api-localematcher
---

Distance-based matching of a user's desired locales against a sorted list of application supported locales.

Matchers are relatively expensive to setup, since it requires parsing and resolving a potentially long list of locale identifiers. Ideally an application will setup one or more matchers on startup and reuse them.

## new

##### Syntax

<pre class="syntax">
new LocaleMatcher(supported, options?)
</pre>

#### Parameters

- <code class="def">supported: <span>string | string[] | [LanguageTag](api-languagetag)[] | [Locale](api-locale)[]</span></code>
  - String / array of space and or comma-separated locale identifiers, or an array of language tags or locales, sorted in order of most- to least-supported. The first identifier will be used as the default.
- <code class="def">options?: <span>[LocaleMatcherOptions](api-localematcheroptions)</span></code>
  - Options to control the matcher behavior.

#### Example

```typescript
import { LocaleMatcher } from '@phensley/cldr';

const localeMatcher = new LocaleMatcher('en, es-419, en-GB, pt-BR, es');
```

## match

Matches on or more desired locales against the list of supported locales, returning the matched locale and the distance.

#### Syntax

<pre class="syntax">
match(desired, options?): LanguageMatch
</pre>

#### Parameters

- <code class="def">desired: <span>string | (Locale | LanguageTag | string)[]</span></code>
  - Array of space and or comma-separated locale identifiers to match, in order of most- to least-desired.
- <code class="def">options: <span>LocaleMatcherOptions</span></code>
  - Options for the matcher

#### Example

```typescript
import { LocaleMatcher } from '@phensley/cldr';

const localeMatcher = new LocaleMatcher('en, es-419, en-GB, pt-BR, es');

let { distance, locale } = localeMatcher.match('pt');
log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('es-MX'));
log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('en-ZA'));
log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('en-ZA, es'));
log(`${locale.id} distance ${distance}`);
```
<pre class="output">
pt-BR distance 0
es-419 distance 4
en-GB distance 3
es distance 0
</pre>


{%refs LocaleMatcher}
