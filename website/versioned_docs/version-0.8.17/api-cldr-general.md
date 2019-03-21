---
id: version-0.8.17-api-cldr-general
title: CLDR.General
original_id: api-cldr-general
---

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
let cldr = framework.get('es-PR');
cldr.General.measurementSystem();
cldr.General.measurementSystem('temperature');
```

<pre class="output">
metric
us
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
const items = ['one', 'two', 'three', 'four', 'five'];
cldr.General.formatList(items.slice(0, 2), 'and');
```

<pre class="output">
one and two
</pre>

```typescript
cldr.General.formatList(items, 'or');
```

<pre class="output">
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
const items = ['one', 'two', 'three', 'four', 'five'];
cldr.General.formatListToParts(items.slice(0, 2), 'and');
```

<pre class="output">
[
  { type: 'item', value: 'one' },
  { type: 'literal', value: ' and ' },
  { type: 'item', value: 'two' }
]
</pre>

```typescript
cldr.General.formatListToParts(items, 'or');
```

<pre class="output">
[
  { type: 'item', value: 'one' },
  { type: 'literal', value: ', ' },
  { type: 'item', value: 'two' },
  { type: 'literal', value: ', ' },
  { type: 'item', value: 'three' },
  { type: 'literal', value: ', ' },
  { type: 'item', value: 'four' },
  { type: 'literal', value: ', or ' },
  { type: 'item', value: 'five' }
]
</pre>


## getLanguageDisplayName

Return the display name for a given language code.

#### Syntax

<pre class="syntax">
getLanguageDisplayName(languageId): string
</pre>

#### Parameters

  - <code class="def">languageId: <span>[LanguageIdType](api-languageidtype.html)</span></code>
    - Valid [ISO 639](https://en.wikipedia.org/wiki/ISO_639) language identifier

#### Examples

```typescript
const en = framework.get('en');
en.General.getScriptDisplayName('fr');
```
<pre class="output">
French
</pre>

```typescript
en.General.getScriptDisplayName('ko');
```
<pre class="output">
Korean
</pre>


## getRegionDisplayName

Return the name of a given region.

#### Syntax

<pre class="syntax">
getRegionDisplayName(regionId): string
</pre>

#### Parameters
  - <code class="def">regionId: <span>[RegionIdType](api-regionidtype.html)</span></code>
    - Valid [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) or [UN M.49](https://en.wikipedia.org/wiki/UN_M.49) region identifier

#### Examples

```typescript
const en = framework.get('en');
const fr = framework.get('fr');
const ids: RegionIdType[] = ['US', 'CA', 'BE', 'ZA'];
for (const id of ids) {
  const a = en.General.getRegionDisplayName(id);
  const b = fr.General.getRegionDisplayName(id);
  console.log(`en=${a} fr=${b}`);
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
getScriptDisplayName(scriptId): string
</pre>

#### Parameters
  - <code class="def">scriptId: <span>[ScriptIdType](api-scriptidtype.html)</span></code>
    - Valid [ISO 15924](https://en.wikipedia.org/wiki/ISO_15924) script identifier

#### Examples

```typescript
const en = framework.get('en');
en.General.getScriptDisplayName('Latn');
```
<pre class="output">
Latin
</pre>

```typescript
en.General.getScriptDisplayName('Egyp');
```
<pre class="output">
Egyptian hieroglyphs
</pre>

```typescript
const de = framework.get('de');
de.General.getScriptDisplayName('Latn');
```
<pre class="output">
Lateinisch
</pre>
