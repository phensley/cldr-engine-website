---
id: version-0.18.2-doc-locales-matching
title: Language matching
original_id: doc-locales-matching
---

The CLDR [enhanced language matching](https://www.unicode.org/reports/tr35/tr35.html#EnhancedLanguageMatching) algorithm matches one or more desired locales against a list of supported locales.

An application defines its list of supported locales, sorted in the order of most- to least-supported, with the default locale first. Given a list of a user's desired locales (sorted in a similar way) it returns the best supported locale to use.

## Basics

In the example below the application supports a finite list of locales. These are locales for which it has translations for all of its message strings.

Since the locale `pt` is equivalent to `pt-BR` it matches with a distance of 0.

```typescript
import { LocaleMatcher } from '@phensley/cldr';

const matcher = new LocaleMatcher('en, es-419, en-GB, pt-BR, es');

const match = (s: string) => {
  const { distance, locale } = matcher.match(s);
  log(`${locale.id} distance ${distance}`);
};

match('pt');
```
<pre class="output">
pt-BR distance 0
</pre>

If a user selects `es-MX` there is no supported locale that is an exact match. This is where the distance-based algorithm can provide a better result than simply truncating the locale id to `es`. Using language distance, it finds that `es-419` (Latin American Spanish) is a better match.

```typescript
match('es-MX'));
```
<pre class="output">
es-419 distance 4
</pre>

Similarly the algorithm matches `en-ZA` (South African English) is a closer match to `en-GB` (Great British English) than `en` (American English).

```typescript
match('en-ZA');
```
<pre class="output">
en-GB distance 3
</pre>

If a user speaks both `en-ZA` and `es` the algorithm will return `es` since it is closer.

```typescript
match('en-ZA, es');
```
<pre class="output">
es distance 0
</pre>


A language that has no match within a given threshold will return the default locale with maximum distance of 100.

```typescript
match('zh');
```
<pre class="output">
en distance 100
</pre>

Likewise an undefined tag will match the default locale with maximum distance.

```typescript
match('und');
```
<pre class="output">
en distance 100
</pre>

The default distance threshold is 50. You can pass in your own desired threshold, but make sure you know what you're doing. Consult the documentation on [enhanced language matching](https://www.unicode.org/reports/tr35/tr35.html#EnhancedLanguageMatching) and the [language distance table](https://github.com/phensley/cldr-engine/blob/master/notes/language-distance-table.txt) to better understand how distance works.

## Matching against all available locales

This ensures we always resolve to a valid, best-fit supported locale. We sort English to the front so it becomes the default locale, and will be returned when a match fails to meet the distance threshold.

```typescript
import { CLDRFramework, LocaleMatcher } from '@phensley/cldr';

const allLocales = CLDRFramework.availableLocales();

const supported = allLocales.sort(
  l => l.tag.expanded() === 'en-Latn-US' ? -1 : 1
).map(l => l.id);

const cldrMatcher = new LocaleMatcher(supported);

// We don't support Klingon, unfortunately
const { distance, locale } = cldrMatcher.match('i-klingon');
log(`${locale.id} distance ${distance}`);
```
<pre class="output">
en distance 10
</pre>



## Separate matchers for messages and formats

Applications may use more than one matcher, to handle situations where an application may only have message translations for a few regions for a language, but wants to ensure all number and date formatting is the best fit for the user's desired locale.

In the example below we match `es-419` for messages and `es-MX` for CLDR-based localization.

```typescript
// import cldrMatcher from above example

// Locales for which the application has message translations
const appLocales = ['es', 'es-419', 'en', 'en-CA'];
const messageMatcher = new LocaleMatcher(appLocales);

const userLocale = 'es-MX';

const messageMatch = messageMatcher.match(userLocale);
log(`messages: ${messageMatch.locale.tag.expanded()} distance ${messageMatch.distance}`);

const cldrMatch = cldrMatcher.match(userLocale);
log(`    cldr: ${cldrMatch.locale.tag.expanded()} distance ${cldrMatch.distance}`);
```
<pre class="output">
messages: es-Latn-419 distance 4
    cldr: es-Latn-MX distance 0
</pre>

