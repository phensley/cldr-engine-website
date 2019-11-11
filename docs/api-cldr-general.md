---
id: api-cldr-general
title: CLDR.General
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
  const b = cldr.General.bundle();
  log(`${b.id()}  ${b.language()}  ${b.region()}`);
}
```
<pre class="output">
en-Latn-US  en  US
fr-Latn-FR  fr  FR
ja-Jpan-JP  ja  JP
ar-Arab-EG  ar  EG
</pre>



## characterOrder

Returns the character order for the current locale.

#### Syntax

<pre class="syntax">
characterOrder(): CharacterOrderType
</pre>

#### Return values
  - <code class="def">"ttb"</code>
    - Top to bottom
  - <code class="def">"btt"</code>
    - Bottom to top

## lineOrder

Returns the line order for the current locale.

#### Syntax

<pre class="syntax">
lineOrder(): LineOrderType
</pre>

#### Return values
  - <code class="def">"ltr"</code>
    - Left to right
  - <code class="def">"rtl"</code>
    - Right to left


## locale

Returns the [Locale](api-locale.html) for this [CLDR](api-cldr.html) instance.

#### Syntax

<pre class="syntax">
locale(): Locale
</pre>

#### Example

```typescript
for (const locale of ['en', 'fr', 'ja', 'ar']) {
  const cldr = framework.get(locale);
  const { tag } = cldr.General.locale();
  log(tag.expanded());
}
```
<pre class="output">
en-Latn-US
fr-Latn-FR
ja-Jpan-JP
ar-Arab-EG
</pre>



## formatList

Format a list of items, with a given list type, returning a string.

#### Syntax

<pre class="syntax">
formatList(items, type?): string
</pre>

#### Parameters
  - <code class="def">items: <span>string[]</span></code>
    - Items to join together into a list
  - <code class="def">type?: <span>[ListPatternType](api-listpatterntype.html)</span></code>
    - Type of list to format

#### Example

```typescript
const cldr = framework.get('en');
const items = ['one', 'two', 'three', 'four', 'five'];
log(cldr.General.formatList(items.slice(0, 2), 'and'));
log(cldr.General.formatList(items, 'or'));
```
<pre class="output">
one and two
one, two, three, four, or five
</pre>

## formatListToParts

Format a list of items, with a given list type, returning an array of parts.

#### Syntax

<pre class="syntax">
formatList(items, type?): Part[]
</pre>

#### Parameters
  - <code class="def">items: <span>string[]</span></code>
    - Items to join together into a list
  - <code class="def">type?: <span>[ListPatternType](api-listpatterntype.html)</span></code>
    - Type of list to format

#### Example

```typescript
const cldr = framework.get('en');
const items = ['one', 'two', 'three', 'four', 'five'];
log(cldr.General.formatListToParts(items.slice(0, 2), 'and'));
log(cldr.General.formatListToParts(items, 'or'));
```
<pre class="output">
[ { type: 'item', value: 'one' },
  { type: 'literal', value: ' and ' },
  { type: 'item', value: 'two' } ]
[ { type: 'item', value: 'one' },
  { type: 'literal', value: ', ' },
  { type: 'item', value: 'two' },
  { type: 'literal', value: ', ' },
  { type: 'item', value: 'three' },
  { type: 'literal', value: ', ' },
  { type: 'item', value: 'four' },
  { type: 'literal', value: ', or ' },
  { type: 'item', value: 'five' } ]
</pre>


## getLanguageDisplayName

Return the display name for a given language code.

#### Syntax

<pre class="syntax">
getLanguageDisplayName(languageId, options?): string
</pre>

#### Parameters

  - <code class="def">code: <span>[LanguageIdType](api-languageidtype.html)</span></code>
    - Valid [ISO 639](https://en.wikipedia.org/wiki/ISO_639) language identifier
  - <code class="def">options?: <span>[DisplayNameOptions](api-displaynameoptions.html)</span></code>
    - Options for selecting the display name

#### Example

```typescript
const en = framework.get('en');
log(en.General.getLanguageDisplayName('fr'));
log(en.General.getLanguageDisplayName('ko'));
```
<pre class="output">
French
Korean
</pre>


## getRegionDisplayName

Return the name of a given region.

#### Syntax

<pre class="syntax">
getRegionDisplayName(regionId, options?): string
</pre>

#### Parameters
  - <code class="def">regionId: <span>[RegionIdType](api-regionidtype.html)</span></code>
    - Valid [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or [UN M.49](https://en.wikipedia.org/wiki/UN_M.49) region identifier
  - <code class="def">options?: <span>[DisplayNameOptions](api-displaynameoptions.html)</span></code>
    - Options for selecting the display name

#### Example

```typescript
const en = framework.get('en');
const fr = framework.get('fr');
const ids: RegionIdType[] = ['US', 'CA', 'BE', 'ZA'];
for (const id of ids) {
  const a = en.General.getRegionDisplayName(id);
  const b = fr.General.getRegionDisplayName(id);
  log(`en=${a} fr=${b}`);
}
```
<pre class="output">
en=United States fr=États-Unis
en=Canada fr=Canada
en=Belgium fr=Belgique
en=South Africa fr=Afrique du Sud
</pre>


## getScriptDisplayName

Return the name of a given script.

#### Syntax

<pre class="syntax">
getScriptDisplayName(scriptId, options?): string
</pre>

#### Parameters
  - <code class="def">scriptId: <span>[ScriptIdType](api-scriptidtype.html)</span></code>
    - Valid [ISO 15924](https://en.wikipedia.org/wiki/ISO_15924) script identifier
  - <code class="def">options?: <span>[DisplayNameOptions](api-displaynameoptions.html)</span></code>
    - Options for selecting the display name

#### Example

```typescript
const en = framework.get('en');
log(en.General.getScriptDisplayName('Latn'));
log(en.General.getScriptDisplayName('Egyp'));

const de = framework.get('de');
log(de.General.getScriptDisplayName('Latn'));
```
<pre class="output">
Latin
Egyptian hieroglyphs
Lateinisch
</pre>


## measurementSystem


#### Syntax

<pre class="syntax">
measurementSystem(category?: MeasurementCategory): MeasurementSystem
</pre>

#### Parameters

  - <code class="def">category?: <span>[MeasurementCategory](api-measurementcategory.html)</span></code>
    - Optional category (ex: temperature has special handling for certain regions)

#### Return values
  A [MeasurementSystem](api-measurementsystem.html) value

#### Example

```typescript
const cldr = framework.get('es-PR');
log(cldr.General.measurementSystem());
log(cldr.General.measurementSystem('temperature'));
```
<pre class="output">
metric
us
</pre>


## messageFormatter

Returns an extensible message formatter for the current locale. See [MessageFormatter](api-messageformatter)

#### Syntax

<pre class="syntax">
messageFormatter(options?: MessageFormatterOptions): MessageFormatter
</pre>


## parseLanguageTag

Parses a language tag and canonicalizes its fields, returning a [LanguageTag](api-languagetag.html) object.

#### Syntax

<pre class="syntax">
parseLanguageTag(tag: string): LanguageTag
</pre>

#### Parameters
  - <code class="def">tag: <span>string</span></code>
    - String to parse into a [LanguageTag](api-languagetag.html) object

#### Example

```typescript
const cldr = framework.get('en');
log(cldr.General.parseLanguageTag('fr-AU').expanded());
log(cldr.General.parseLanguageTag('en').expanded());
```
<pre class="output">
fr-Zzzz-AU
en-Zzzz-ZZ
</pre>



## resolveLocale

Parses and resolves a locale identifer or language tag into a [Locale](api-locale.html) object.

Resolution involves:
 * Replace language and region aliases
 * Remap grandfathered tags
 * Add likely subtags

#### Syntax

<pre class="syntax">
resolveLocale(tag): Locale
</pre>

#### Parameters
  - <code class="def">tag: <span>string</span></code>
    - String to parse into a [Locale](api-locale.html) object

#### Example

```typescript
const cldr = framework.get('en');
const ids = [
  'en_CA',
  'ko',
  'und-Cyrl',
  'fr-u-ca-persian-u-nu-mathmono',
  'und-CN'
];
for (const id of ids) {
  const { tag } = cldr.General.resolveLocale(id);
  log(`${tag.language()}  ${tag.script()}  ${tag.region()}`);
}
```
<pre class="output">
en  Latn  CA
ko  Kore  KR
ru  Cyrl  RU
fr  Latn  FR
zh  Hans  CN
</pre>

