---
id: api-cldroptions
title: CLDROptions
---

Options to configure a [CLDRFramework](api-cldrframework.html) instance.

#### Syntax

<pre class="syntax">
object {
  loader?,
  asyncLoader?,
  packCacheSize?,
  patternCacheSize?
}
</pre>

#### Properties
  - <code class="def">loader?: <span>(language: string) => string | object</span></code>
    - Function that maps a language identifier to a resource pack. May return either the raw string, or the result of `JSON.parse`.
  - <code class="def">asyncLoader?: <span>(language: string) => Promise&lt;string | object&gt;</span></code>
    - Function that maps a language identifier to a Promise that, when resolved, will return a resource pack. The Promise may return either the raw string, or the result of `JSON.parse`.
  - <code class="def">packCacheSize?: <span>number</span></code>
    - Indicates the number of resource packs to cache at any given time. Caching scheme is least-recently used (LRU). Note that resource packs contain all locales for a given language.
    - **Default: 2**
  - <code class="def">patternCacheSize?: <span>number</span></code>
    - Indicates the number of parsed number and calendar patterns to cache at any given time. Caching scheme is least-recently used (LRU).
    - **Default: 50**

If `CLDROptions` is imported via the `@phensley/cldr-core` package, additional properties are available for [customization of the resource pack and schema](https://github.com/phensley/cldr-engine-customization-example).

 - <code class="def">config?: <span>[SchemaConfig](api-schemaconfig.html)</span></code>
   - Object used to configure the runtime schema accessor.
   - **Note:** This config *must* be identical to the one used to generate the resource packs or bad things will occur.

#### Examples

**Asynchronous loader**

```javascript
import { CLDRFramework, LocaleMatcher } from "@phensley/cldr";
import pkg from "./package.json";

// Get exact version of @phensley/cldr dependency
const version = pkg.dependencies["@phensley/cldr"];

const packurl = `https://cdn.jsdelivr.net/npm/@phensley/cldr@${version}/packs`;

// Fetch the language resource pack for this version.
const asyncLoader = language =>
  fetch(`${packurl}/${language}.json`)
    .then(r => r.json())
    .catch(err => console.log(err));

export const framework = new CLDRFramework({ asyncLoader });
```

**Synchronous loader, 3 resource packs cached**

```typescript
import * as fs from 'fs';
import { join } from 'path';
import * as zlib from 'zlib';

import { CLDRFramework, LocaleMatcher } from "@phensley/cldr";

// Construct path to compressed resource bundles on disk
const packPath = (language: string) => join(__dirname,
  '../../node_modules/@phensley/cldr/packs', `${language}.json`);

// Synchronous loader
const loader = (language: string): any => {
  const path = packPath(language);
  return fs.readFileSync(path).toString('utf-8');
};

const options: CLDROptions = {
  loader,
  packCacheSize: 3
};

const framework = new CLDRFramework(options);

let cldr;
cldr = framework.get('en');    // from disk
cldr = framework.get('en-CA'); // from cache, same base language

cldr = framework.get('fr');    // from disk
cldr = framework.get('zh');    // from disk
cldr = framework.get('ko');    // from disk, 'en' is evicted

cldr = framework.get('fr');    // from cache

cldr = framework.get('en');    // from disk again, 'zh' is evicted
```


{%refs CLDROptions}