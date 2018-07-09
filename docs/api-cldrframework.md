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
