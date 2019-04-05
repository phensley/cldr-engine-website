---
id: api-cldrframework
title: CLDRFramework
---

Constructs instances of [CLDR](api-cldr.html) for a given locale.

## new

Constructs an instance of the framework with a set of options.

#### Syntax

<pre class="syntax">
new CLDRFramework(options)
</pre>

#### Parameters
  - <code class="def">options: <span>[CLDROptions](api-cldroptions.html)</span></code>
    - Options to configure the framework with a loader

#### Example

```javascript
import { ungzip } from 'pako';
import { CLDRFramework } from '@phensley/cldr';
import pkg from "./package.json";

// Get exact version of @phensley/cldr dependency
const version = pkg.dependencies["@phensley/cldr"];

const asyncLoader = language =>
  fetch(`https://unpkg.com/@phensley/cldr@${version}/packs/${language}.json.gz`)
    .then(r => r.arrayBuffer())
    .then(b => JSON.parse(ungzip(b, { to: "string" })))
    .catch(err => console.log(err));

export const framework = new CLDRFramework({ asyncLoader });
```

## availableLocales

Return an array containing all of the available locales.

#### Syntax
<pre class="syntax">
static availableLocales(): Locale[]
</pre>

#### Example

```typescript
import { CLDRFramework } from '@phensley/cldr';
for (const locale of CLDRFramework.availableLocales()) {
  const { id, tag } = locale;
  console.log(`${tag.language()}-${tag.script()}-${tag.region()}    ${id}`);
}
```

<pre class="output">
af-Latn-ZA     af
af-Latn-NA     af-NA
am-Ethi-ET     am
ar-Arab-EG     ar
ar-Arab-AE     ar-AE
ar-Arab-BH     ar-BH
ar-Arab-DJ     ar-DJ
ar-Arab-DZ     ar-DZ
ar-Arab-EG     ar-EG
ar-Arab-EH     ar-EH
...
</pre>

#### See Also
  - [Locale](api-locale.html)


## get

Uses the synchronous loader to construct a [CLDR](api-cldr.html) instance. Note that this will raise an error if no synchronous loader has been configured.

#### Syntax

<pre class="syntax">
framework.get(locale): CLDR
</pre>

#### Parameters
  - <code class="def">locale: <span>string | [Locale](api-locale.html)</span></code>
    - An identifier for the locale to use

#### Example

```javascript
import { framework } from './framework';

const locale = 'ko-KR';
const cldr = framework.get(locale);
// .. use cldr instance
```


## getAsync

Uses the asynchronous loader to construct a `Promise<CLDR>` instance. Note that this will raise an error if no asynchronous loader has been configured.

#### Syntax

<pre class="syntax">
framework.getAsync(locale): Promise&lt;CLDR&gt;
</pre>

#### Parameters
  - <code class="def">locale: <span>string | [Locale](api-locale.html)</span></code>
    - An identifier for the locale to use

#### Example

```javascript
import { framework } from './framework';

const locale = 'fr-CA';
framework.getAsync(locale).then(cldr => {
  // .. use cldr instance, call setState on component, send action to Redux store, etc.
});
```

## parseLanguageTag

Parse a BCP 47 language tag or Java locale identifier, returning a [LanguageTag](api-languagetag.html) object.

#### Syntax

<pre class="syntax">
static parseLanguageTag(id): LanguageTag
</pre>

#### Parameters
  - <code class="def">id: <span>string</span></code>
    - Identifier to parse

#### Example

```typescript
import { CLDRFramework } from '@phensley/cldr';

const { parseLanguageTag } = CLDRFramework;

const ids = [
  'en-US',
  'und-Latn-ZZ',
  'fr_CA',
  'no-GB-u-ca-gregory-u-nu-mathmono'
];

for (const id of ids) {
  const tag = parseLanguageTag(id);

  console.log(tag.language());
  console.log(tag.script());
  console.log(tag.region());
  console.log(tag.compact());
  console.log(tag.expanded());
  console.log(inspect(tag.extensions()));
  console.log();
}
```
<pre class="output">
en
Zzzz
US
en-US
en-Zzzz-US
{}
&nbsp;
und
Latn
ZZ
und-Latn
und-Latn-ZZ
{}
&nbsp;
fr
Zzzz
CA
fr-CA
fr-Zzzz-CA
{}
&nbsp;
no
Zzzz
GB
no-GB-u-ca-gregory-nu-mathmono
no-Zzzz-GB-u-ca-gregory-nu-mathmono
{ u: [ 'ca-gregory', 'nu-mathmono' ] }
</pre>

#### See Also
  - [LanguageTag](api-languagetag.html)
  - [CLDRFramework.resolveLocale](api-cldrframework.html#resolvelocale)


## resolveLocale

Parses a BCP 47 language tag or Java locale identifier and [resolves it](doc-locales-resolution.html), returning a [Locale](api-locale.html) object.

#### Syntax

<pre class="syntax">
static resolveLocale(id): Locale
</pre>

#### Parameters
  - <code class="def">id: <span>string | [LanguageTag](api-languagetag.html)</span></code>
    - Identifier or language tag to resolve

#### Example

```typescript
import { CLDRFramework } from '@phensley/cldr';
const { resolveLocale } = CLDRFramework;
for (const str of ['en_US', 'zh', 'fr-CA-u-ca-persian-u-nu-mathmono']) {
  const { id, tag } = resolveLocale(str);
  console.log(`${tag.expanded()}`);
}
```

<pre class="output">
en-Latn-US
zh-Hans-CN
fr-Latn-CA-u-ca-persian-nu-mathmono
</pre>

```typescript
import { CLDRFramework } from '@phensley/cldr';
const { parseLanguageTag, resolveLocale } = CLDRFramework;
for (const s of ['und-US', 'fr']) {
  const parsed = parseLanguageTag(s);
  const resolved = resolveLocale(parsed);
  console.log(`${parsed.expanded()}  ${resolved.tag.compact()}`);
}
```

<pre class="output">
und-Zzzz-US  en-Latn-US
fr-Zzzz-ZZ  fr-Latn-FR
</pre>

#### See Also
  - [Locale](api-locale.html)
  - [CLDRFramework.parseLanguageTag](api-cldrframework.html#parselanguagetag)
