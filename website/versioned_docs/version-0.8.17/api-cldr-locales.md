---
id: version-0.8.17-api-cldr-locales
title: CLDR.Locales
original_id: api-cldr-locales
---

## bundle

Returns a reference to the [Bundle](api-bundle.html) for this [CLDR](api-cldr.html) instance.

#### Syntax

<pre class="syntax">
bundle(): Bundle
</pre>

#### Example

```typescript
for (const locale of ['en', 'fr', 'ja', 'ar']) {
  const cldr = framework.get(locale);
  const b = cldr.Locales.bundle();
  console.log(`${b.id()}  ${b.language()}  ${b.region()}`);
}
```

<pre class="output">
en-Latn-US  en  US
fr-Latn-FR  fr  FR
ja-Jpan-JP  ja  JP
ar-Arab-EG  ar  EG
</pre>


## current

Returns the [Locale](api-locale.html) for this [CLDR](api-cldr.html) instance.

#### Syntax

<pre class="syntax">
current(): Locale
</pre>

#### Example

```typescript
for (const locale of ['en', 'fr', 'ja', 'ar']) {
  const cldr = framework.get(locale);
  const { tag } = cldr.Locales.current();
  console.log(tag.expanded());
}
```

<pre class="output">
en-Latn-US
fr-Latn-FR
ja-Jpan-JP
ar-Arab-EG
</pre>


## resolve

Parses and resolves a locale identifer or language tag into a [Locale](api-locale.html) object.

Resolution involves:
 * Replace language and region aliases
 * Remap grandfathered tags
 * Add likely subtags

#### Syntax

<pre class="syntax">
resolve(tag): Locale
</pre>

#### Parameters
  - <code class="def">tag: <span>string</span></code>
    - String to parse into a [Locale](api-locale.html) object

#### Example

```typescript
const ids = [
  'en_CA',
  'ko',
  'und-Cyrl',
  'fr-u-ca-persian-u-nu-mathmono',
  'und-CN'
];
for (const id of ids) {
  const { tag } = cldr.Locales.resolve(id);
  console.log(`${tag.language()}  ${tag.script()}  ${tag.region()}`);
}
```

<pre class="output">
en  Latn  CA
ko  Kore  KR
ru  Cyrl  RU
fr  Latn  FR
zh  Hans  CN
</pre>
