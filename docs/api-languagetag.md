---
id: api-languagetag
title: LanguageTag
---

An object representing a resolved [BCP 47](https://en.wikipedia.org/wiki/IETF_language_tag) language tag.

## new

Constructs a language tag object directly.

**Note:** This type's constuctor should not be used in most cases. It does basic canonicalization of each subtag but no validation, so it is possible to construct invalid language tags. Use with caution.

Recommendation is to use [CLDRFramework.parseLanguageTag](api-cldrframework.html#parselanguagetag) or [CLDRFramework.resolveLocale](api-cldrframework.html#resolvelocale) instead.

#### Syntax

<pre class="syntax">
new LanguageTag(
  language?,
  script?,
  region?,
  variant?,
  extensions?,
  privateUse?
)
</pre>

#### Properties
  - <code class="def">language?: <span>string</span></code>
    - ISO-639 language code
  - <code class="def">script?: <span>string</span></code>
    - ISO 15924 script code
  - <code class="def">region?: <span>string</span></code>
    - ISO 3166-1 or UN M.49 code
  - <code class="def">variant?: <span>string</span></code>
    - IETF registered variant
  - <code class="def">extensions?: <span>{ [x: string]: string[] }</span></code>
    - Mapping of extension prefixes to subtags
  - <code class="def">privateUse?: <span>string</span></code>
    - Private use subtags, as a string

#### Example

```typescript
const tag = new LanguageTag(undefined, 'Latn', undefined);
console.log(tag.compact());
console.log(tag.expanded());
```

<pre class="output">
und-Latn
und-Latn-ZZ
</pre>

## compact

Returns the most compact representation of the language tag, omitting any undefined subtags while ensuring the structure of the language tag is valid.

#### Syntax

<pre class="syntax">
compact(): string
</pre>

#### Example

```typescript
const tag = new LanguageTag(undefined, undefined, 'US');
console.log(tag.compact());
```

<pre class="output">
und-US
</pre>


## expanded

Returns the expanded representation of the language tag, including the string representations for undefined subtags. The result always includes language, script, and region subtags.

#### Syntax

<pre class="syntax">
expanded(): string
</pre>

#### Example

```typescript
const tag = new LanguageTag(undefined, undefined, 'US');
console.log(tag.expanded());
```

<pre class="output">
und-Zzzz-US
</pre>


## extensions

Returns a map containing the extension subtags.

#### Syntax

<pre class="syntax">
extensions(): { [x: string]: string[] }
</pre>

#### Example

```typescript
const tag = new LanguageTag('en', '', 'US', '', { u: ['ca-gregory'] });
console.log(tag.expanded());
console.log(tag.extensions());
```

<pre class="output">
en-Zzzz-US-u-ca-gregory
{ u: [ 'ca-gregory' ] }
</pre>


## hasLanguage

Indicates the language subtag is defined.

#### Syntax

<pre class="syntax">
hasLanguage(): boolean
</pre>

#### Example

```typescript
let tag = new LanguageTag('und');
console.log(tag.hasLanguage());

tag = new LanguageTag();
console.log(tag.hasLanguage());

tag = new LanguageTag('zh');
console.log(tag.hasLanguage());
```

<pre class="output">
false
false
true
</pre>


## hasRegion

Indicates the region subtag is defined.

#### Syntax

<pre class="syntax">
hasRegion(): boolean
</pre>

## hasScript

Indicates the script subtag is defined.

#### Syntax

<pre class="syntax">
hasScript(): boolean
</pre>

## language

Returns the language subtag.

#### Syntax

<pre class="syntax">
language(): string
</pre>

#### Example

```typescript
let tag = new LanguageTag();
console.log(tag.language());

tag = new LanguageTag('en');
console.log(tag.language());
```

<pre class="output">
und
en
</pre>

## privateUse

Returns the private use subtags.

#### Syntax

<pre class="syntax">
privateUse(): string
</pre>

#### Example

```typescript
const tag = new LanguageTag('en', 'Latn', 'US', undefined, undefined, 'x-nothing');
console.log(tag.expanded());
console.log(tag.privateUse());
```

<pre class="output">
en-Latn-US-x-nothing
x-nothing
</pre>

## region

Returns the region subtag.

#### Syntax

<pre class="syntax">
region(): string
</pre>

#### Example

```typescript
let tag = new LanguageTag('en', 'Latn');
console.log(tag.region());

tag = new LanguageTag('en', 'Latn', 'US');
console.log(tag.region());
```

<pre class="output">
ZZ
US
</pre>

## script

Returns the script subtag.

#### Syntax

<pre class="syntax">
script(): string
</pre>

#### Example

```typescript
let tag = new LanguageTag('en');
console.log(tag.script());

tag = new LanguageTag('en', 'latn');
console.log(tag.script());
```

<pre class="output">
Zzzz
Latn
</pre>


## toString

Equivalent of [compact()](#compact).

{%refs LanguageTag}
