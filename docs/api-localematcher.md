---
id: api-localematcher
title: LocaleMatcher
---

Distance-based matching of a user's desired locales against a sorted list of application supported locales.

Matchers are relatively expensive to setup, since it requires parsing and resolving a potentially long list of locale identifiers. Ideally an application will setup one or more matchers on startup and reuse them.

## new

##### Syntax

<pre class="syntax">
new LocaleMatcher(supported)
</pre>

#### Parameters

  - <code class="def">supported: <span>string | string[]</span></code>
    - Array of space and or comma-separated locale identifiers, in order of most- to least-supported. The first identifier will be used as the default.

#### Example
```typescript
import { LocaleMatcher } from '@phensley/cldr';

const localeMatcher = new LocaleMatcher('en, es-419, en-GB, pt-BR, es');
```


## match

Matches on or more desired locales against the list of supported locales, returning the matched locale and the distance.

#### Syntax

<pre class="syntax">
match(desired): LanguageMatch
</pre>

#### Parameters
  - <code class="def">desired: <span>string | string[]</span></code>
    - Array of space and or comma-separated locale identifiers to match, in order of most- to least-desired.

#### Example

```typescript
import { LocaleMatcher } from '@phensley/cldr';

const localeMatcher = new LocaleMatcher('en, es-419, en-GB, pt-BR, es');

let { distance, locale } = localeMatcher.match('pt');
console.log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('es-MX'));
console.log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('en-ZA'));
console.log(`${locale.id} distance ${distance}`);

({ distance, locale } = localeMatcher.match('en-ZA, es'));
console.log(`${locale.id} distance ${distance}`);
```

<pre class="output">
pt-BR distance 0
es-419 distance 4
en-GB distance 3
es distance 0
</pre>
