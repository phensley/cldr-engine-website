---
id: api-cldroptions
title: CLDROptions
---

Options to configure a [CLDRFramework](api-cldrframework.html) instance.

#### Syntax

```typescript
object {
  loader?,
  asyncLoader?,
  packCacheSize?,
  patternCacheSize?
}
```

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


#### Examples

**Asynchronous loader**

```typescript
import { ungzip } from 'pako';
import { CLDROptions } from '@phensley/cldr';

const asyncLoader = language =>
  fetch(`https://unpkg.com/@phensley/cldr@${version}/packs/${language}.json.gz`)
    .then(r => r.arrayBuffer())
    .then(b => JSON.parse(ungzip(b, { to: "string" })))
    .catch(err => console.log(err));

const options: CLDROptions = { asyncLoader };
```

**Synchronous loader, 3 resource packs cached**
```typescript
import * as fs from 'fs';
import { join } from 'path';
import * as zlib from 'zlib';

// Construct path to compressed resource bundles on disk
const packPath = (language: string) => join(__dirname, 'packs', `${language}.json.gz`);

// Synchronous loader
const loader = (language: string): any => {
  const path = packPath(language);
  const compressed = fs.readFileSync(path);
  return zlib.gunzipSync(compressed).toString('utf-8');
};

const options: CLDROptions = {
  loader,
  packCacheSize: 3
};

const framework = new CLDRFramework(options);

let cldr;
cldr = framework.get('en');    // from disk
cldr = framework.get('en-CA'); // from cache

cldr = framework.get('fr');    // from disk
cldr = framework.get('zh');    // from disk
cldr = framework.get('ko');    // from disk, 'en' evicted

cldr = framework.get('fr');    // from cache

cldr = framework.get('en');    // from disk, previously evicted
```
