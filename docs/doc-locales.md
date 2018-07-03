---
id: doc-locales
title: Locales
---

## Parsing and resolution

Parsing converts a locale identifier into an object. Resolution fills in any gaps and translate aliases into the preferred value. For our purposes we perform these as a single operation [parseLocale](api-parselocale.html).

The [Locale](api-locale.html) has two properties: `id` is the original unaltered identifier that was parsed, and `tag` is the [LanguageTag](api-languagetag.html) object containing the resolved subtags.

```typescript
let { id, tag } = parseLocale('und-US');
console.log(id);
console.log(tag.expanded());
```
<pre class="output">
und-US
en-Latn-US
</pre>


## Matching

The CLDR [enhanced language matching](https://www.unicode.org/reports/tr35/tr35.html#EnhancedLanguageMatching) algorithm matches one or more desired locales against a list of supported locales.

An application defines its list of supported locales, sorted in the order of most- to least-supported, with the default locale first. Given a list of a user's desired locales (sorted in a similar way) it returns the best supported locale to use.

In the example below the application supports a finite list of locales. These are locales for which it has translations for all of its message strings.

Since the locale `pt` is equivalent to `pt-BR` it matches with a distance of 0.

```typescript
import { LocaleMatcher } from '@phensley/cldr';

const localeMatcher = new LocaleMatcher('en, es-419, en-GB, pt-BR, es');

const { distance, locale } = localeMatcher.match('pt');
console.log(`${locale.id} distance ${distance}`);
```
<pre class="output">
pt-BR distance 0
</pre>

If a user selects `es-MX` there is no supported locale that is an exact match. This is where the distance-based algorithm can provide a better result than simply truncating the locale id to `es`. Using language distance, it finds that `es-419` (Latin American Spanish) is a better match.

```typescript
localeMatcher.match('es-MX');
```
<pre class="output">
es-419 distance 4
</pre>

Similarly the algorithm matches `en-ZA` (South African English) is a closer match to `en-GB` (Great British English) than `en` (American English).

```typescript
localeMatcher.match('en-ZA');
```
<pre class="output">
en-GB distance 3
</pre>

If a user speaks both `en-ZA` and `es` the algorithm will return `es` since it is closer.

```typescript
localeMatcher.match('en-ZA, es');
```

<pre class="output">
es distance 0
</pre>


## Available locales

