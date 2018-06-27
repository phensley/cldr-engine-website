---
id: doc-init
title: Initialization
---

## Integration

In order to use the framework we must configure it with a resource pack loader.

A resource pack is a JSON file containing all of the string data specific to a given language, covering all scripts and regions for that language. For example, the resource pack `"en.json"` will contain the data for all 104 modern English locales (e.g. "en-US", "en-GB", "en-CA", "en-AU", etc).

The framework must be configured with a function that, when called with a `language` argument, will return the resource pack data for that language. The framework will use this resource pack to construct a `CLDR` instance for the requested locale.

For example, if "es-MX" is requested by the application, the framework will attempt to load the resource pack "es.json", will construct a bundle for "es-MX" and return a `CLDR` instance wrapping that bundle.


```javascript
import wretch from 'wretch';
import { CLDRFramework, CLDROptions } from '@phensley/cldr';

// Import the resource file containing information about the resource packs
import Resource from '@phensley/cldr/packs/resource.json';

// Copy the sha256 hash of all of the packages, to use for cache busting.
// Note: Resource files have been copied by the build process with the
// matching version in the path.
const version = Resource.sha256.substring(0, 10);

// Import default language directly so it's always available. We will load
// this below using the synchronous loader.
import EnglishPack from '@phensley/cldr/packs/en.json';

// Load English synchronously (see below)
const loader = (language: string): any => EnglishPack;

// All other languages are loaded asynchronously at runtime
const asyncLoader = (language: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    // Since English is always loaded, return the static instance
    if (language === 'en') {
      resolve(EnglishPack);
    }

    // Fetch the resource pack by URL
    wretch(`${process.env.PUBLIC_URL}/packs/${language}-${version}.json`)
      .get()
      .json(resolve)
      .catch(reject);
  });
};

// Options for initializing the framework
const options: CLDROptions = {
  loader,
  asyncLoader
};

// Global instance of the framework
export const framework = new CLDRFramework(options);

// Default language to be used on startup. For example this might be the initial
// value for a React property, or the initial value in a Redux store.
export const English = framework.get('en');
```

## Configuration


## Integration

