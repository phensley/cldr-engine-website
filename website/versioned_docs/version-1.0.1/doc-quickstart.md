---
id: version-1.0.1-doc-quickstart
title: Quick start
original_id: doc-quickstart
---

Below are examples of how to integrate the library into an application. There are a few steps:
 1. Configure a [CLDRFramework](api-cldrframework.html) instance with at least one loader. This will provide the framework with a way to fetch language bundles at runtime.
 2. Obtain a [CLDR](api-cldr.html) instance by calling the method corresponding to the type of loader you configured.
    * `framework.get(locale)` uses the synchronous loader
    * `framework.getAsync(locale)` uses the asynchronous loader, returning a promise

## Code Sandbox

Below is [an example on codesandbox.io](https://codesandbox.io/s/qqr1rl40r6) which can be used to learn, demo, experiment, report a bug, etc.

<iframe src="https://codesandbox.io/embed/qqr1rl40r6?fontsize=12" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>


## Integration

In order to use the framework we must configure it with a resource pack loader. This tells the framework how to find the resource pack for a given locale.

A resource pack is a JSON file containing all of the string data specific to a given language, covering all scripts and regions for that language. For example, the resource pack `"en.json"` will contain the data for all 104 modern English locales (e.g. `"en-US", "en-GB", "en-CA", "en-AU"`, etc).

The framework must be configured with a function that, when called with a `language` argument, will return the resource pack data for that language. The framework will use this resource pack to construct a `CLDR` instance for the requested locale.

For example, if "es-MX" is requested by the application, the framework will attempt to load the resource pack "es.json", will construct a [`Bundle`](api-bundle.html) for `es-MX` and return a [`CLDR`](api-cldr.html) instance wrapping that bundle.


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

### Simple example

Once you have a framework instance you can start using it. This is an over-simplified example that may work for some cases. Larger applications are probably using a state manager, so the Redux example below will be more applicable.

#### Synchronous

The synchronous loader is useful for pre-loading multiple resource packs in a server-side application on startup, or a statically-imported pack in a web application, e.g. the `EnglishPack` example above. The call to `framework.get(locale)` will block execution while the resource pack loads.

```typescript
const cldr = framework.get('de');
log(cldr.Numbers.formatCurrency('12345.678', 'CAD', { group: true }));
```
<pre class="output">
12.345,68 CA$
</pre>

#### Asynchronous

THe asynchronous loader returns a promise which, when resolved, could populate an application's state store.

```typescript
framework.getAsync('und-CA').then((cldr) => {
  // use cldr
  log(cldr.Numbers.formatCurrency('12345.678', 'CAD'));
}).then(done);

wait();
```
<pre class="output">
$12,345.68
</pre>


### Redux example

In this example we use Redux and Redux Saga, although it should be straightforward to adapt this to your state container of choice.

**Redux store containing the locale state**

```javascript
import { CLDR } from '@phensley/cldr';
import { LocaleAction } from '../actions';
import { English } from '../locale';
import { Reducer } from 'redux';
import * as icepick from 'icepick';

export interface LocaleState {
  cldr: CLDR;
}

export const initialLocaleState: LocaleState = icepick.freeze({
  cldr: English
});

export const locale: Reducer<LocaleState> =
  (state: LocaleState = initialLocaleState, action: LocaleAction): LocaleState => {

  switch (action.type) {
  case 'locale/update':
    return icepick.set(state, 'cldr', action.payload);
  }
  return state;
};
```

**Saga to watch for locale changes**
```javascript
import { Locale } from '@phensley/cldr';
import { call, put, takeEvery } from 'redux-saga/effects';
import { Action, ActionType } from '../actions';
import { framework } from '../locale';

// Return a Promise that loads the resource pack for this locale.
const getLocale = (locale: Locale) => framework.getAsync(locale);

// Process an action that changes the locale.
export function* changeLocale(action: Action<Locale>): IterableIterator<any> {
  const locale = action.payload;
  try {
    // Make an async call to fetch the CLDR instance for the locale
    const request = yield call(getLocale, locale);

    // Put the CLDR instance into the store
    yield put({ type: ActionType.LOCALE_UPDATE, payload: request });
  } catch (e) {
    yield call(console.warn, e);

    // Put the error into the store
    yield put({ type: ActionType.LOCALE_INVALID, locale });
  }
}

// Watch for actions to change the locale
export function* localeSaga(): IterableIterator<any> {
  yield takeEvery(ActionType.LOCALE_CHANGE, changeLocale);
}
```
