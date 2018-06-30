---
id: doc-design-bundles
title: Resource bundles
---

Resource bundles contain the locale-specific strings that will be used for various purposes. These include calendar and number formatting patterns, names of the months and weekdays, names of units of measure, and so on.

A resource bundle needs to be available when a user selects a particular locale, so we need them available to be loaded at runtime. They should be as small as possible, to be transferred over the network rapidly, and use as little of JavaScript heap as possible.


## Size of the raw CLDR data set

The CLDR JSON data set is quite large. There are 360 locales in the modern set. The design goals of this library require that we have a lot of CLDR data available at runtime, so the overall size of the data is a major concern.

The size of the data set is depends on which files you're using. At the time of this writing, this library uses data contained in the following 16 JSON files across all 360 locales (where present):

```typescript
[
  'ca-buddhist', 'ca-gregorian', 'ca-japanese', 'ca-persian', 'characters',
  'contextTransforms', 'currencies', 'dateFields', 'languages', 'layout',
  'listPatterns', 'numbers', 'scripts', 'territories', 'timeZoneNames',
  'units'
]
```

### Schema overhead

The [CLDR JSON encoding](https://github.com/unicode-cldr) stores values in a hierarchical schema. Finding a value requires following a path down the tree to reach a leaf node holding the value.

The tree itself adds considerable overhead to the JSON encoding. For example, to retrieve the full date format for the en-001 Gregorian calendar, you would traverse the following path:

```javascript
"main": {
  "en-001": {
    "dates": {
      "calendars": {
        "gregorian": {
          "dateFormats": {
            "full": "EEEE, d MMMM y" // leaf

// We traverse 77 bytes of schema ...
"main":{"en-001":{"dates":{"calendars":{"gregorian":{"dateFormats":{"full":

// .. to access a 12 byte value
"EEEE, d MMMM y"

// What if we could eliminate the schema?
```

### Full schema vs values only

Below are the sizes for the JSON representation of these 16 files across all 360 locales:

| size (MB)  |   object                                      |
|------------|-----------------------------------------------|
|    139     | All locales, full schema                      |
|     16     | All locales, full schema, gzip                |
|     34     | All locales, values only                      |
|      7     | All locales, values only, gzip                |

Storing just the values reduces the size to 1/4 of the original. Even if we can eliminate the schema, 34 MB is still large.

#### Questions so far:

 * How do we eliminate the schema while still being able to access the field values?
 * Can we reduce the final size even more?
 * Can we define a bundle encoding that is simultaneously small, simple and fast?

## Resource bundle design

The design of the **phensley/cldr** bundle format involves several design choices, described below.

### 1. Flatten the schema

The CLDR's JSON schema is quite deep, but we prefer something more compact. To achieve this we transform the schema on the fly using [lenses](https://github.com/calmm-js/partial.lenses), to flatten, filter, and transform the data tree.

Using the "dateFormats" example above, we would remove several of the levels, flattening it to:

```javascript
{
  "Gregorian": {
    "dateFormats": {
      "short": "dd/MM/y",
      "medium": "d MMM y",
      "long": "d MMMM y",
      "full": "EEEE, d MMMM y",
    "timeFormats": {
      "short": "h:mm a",
      "medium": "h:mm:ss a",
      "long": "h:mm:ss a z",
      "full": "h:mm:ss a zzzz"
    },
  ...
```

### 2. Define an ordered traversal of all fields in the schema

Given the flattened schema above, we want to define a (deterministic) ordered traversal of all fields for a locale.

For example, given the array `['short', 'medium', 'long', 'full']`, each time we iterate over it we always visit the elements in the same order. We extend this concept to the entire schema, as if it were part of one large array.

We express this traversal using a DSL that can be written in Typescript.
Here are a few types we need in our DSL:

  - <code class="def">keyindex(keys)</code>
    - Map an array element's offset to the element
  - <code class="def">scope(name, block)</code>
    - Creates a named scope that contains a nested array of instructions
  - <code class="def">vector1(name, index)</code>
    - A 1-dimensional vector with a name and a key index

Then we can express our schema's structure using the DSL:

```typescript
formatWidths = keyindex(['short','medium','long','full']);

scope('Gregorian', [
  vector1('dateFormats', formatWidths),
  vector1('timeFormats', formatWidths),
]);
```

### 3. Use the DSL program to encode and access field values

Next we build 2 interpreters for the above DSL "program":

 - <code class="def">Encoder</code>
   - Executed at build time, it traverses the schema and encodes the fields into a resource bundle.
 - <code class="def">Accessor builder</code>
   - Executed once at runtime during library initialization, it builds an accessor object that can be used to fetch field values from a bundle.


#### Encoder

As we traverse the DSL we increment by 1 as we visit each field. This integer offset becomes the position of that field's value in the encoded array.

Once the encoding is complete, we convert the array into a tab-separated string:

```typescript
..
// Gregorian {
//   dateFormats.{short, medium, long, full} => 0, 1, 2, 3, ..
'dd/MM/y\tdd MMM y\td MMMM y\tEEEE, d MMMM y'

//   timeFormats.{short, medium, long, full} => .., 4, 5, 6, 7
'h:mm a\th:mm:ss a\th:mm:ss a z\th:mm:ss a zzzz'
```

#### Accessor builder

The accessor builder constructs an object that mirrors our schema's structure, and our `vector1` type generates a function for fetching a specific field value.

Here is how we use the accessor object for our DSL to fetch the "medium time format" value:

```typescript
// The 'timeFormats' object here is a 1-dimensional vector arrow using the
// key index ['short', 'medium', 'long', 'full'] and the base offset 4
const pattern = CalendarSchema.timeFormats.get(bundle, 'medium');

// The arrow computed 4 + 1 to get the bundle string offset 5
console.log(pattern);
```

<pre class="output">
h:mm:ss a
</pre>

### 4. Encode all locales for a given language in single bundle

We put all of the regions and scripts for a given language together. So for Spanish, we would bundle together 'es', 'es-419', 'es-AR', 'es-BO', etc.

This has a few advantages:
 * A language's regions are quite similar, so we have can exploit this to reduce the duplication.
 * In an application, a user might select their language and then separately select their country. Once the language is selected and that bundle loaded, no further network traffic is required when choosing a region.
 * It results in fewer bundles, and simplifies finding the bundle for a locale, since we only need to map the 2- or 3-character code to a filename without dealing with its script or region subtags.

### 5. Define a base region in the bundle, per script, from which all other regions inherit

Start by creating the full string array for all locales in a given language:

```typescript
{
  'en-001': ['a', 'b', 'c', 'd', 'e', 'f'],
      'en': ['a', 'b', 'Q', 'd', 'e', 'f'],
   'en-CA': ['a', 'R', 'c', 'd', 'S', 'f'],
   ...
}
```

Next compute the pairwise distance between each array and the others, and choose the array with the lowest total distance. This will become the base region.

```typescript
{
  'en-001': {     'en': 1,  'en-CA': 2 },  // dist 3 -> base region
      'en': { 'en-001': 1,  'en-CA': 3 },  // dist 4
   'en-CA': {     'en': 3, 'en-001': 2 }   // dist 5
  }
}
```

To remove the duplicates we:
  * Encode the full string array for the base region
  * Encode a delta index for each individual region.
    * When we find a string that differs, we map the string's offset to a index in an "exceptions" array.

The resulting bundle will look something like this:

```typescript
{
  "language": "en",
  "default": "en-Latn-US",
  "scripts": {
    "Latn": {
      "base": 'a b c d e f',
      "exceptions": 'Q R S',
      "regions": {
        "001": "",
         "US": "2:0",     // c -> Q
         "CA": "1:1 4:2"  // b -> R, e -> S
      }
    }
  }
}
```

## Size of the resource bundles

To summarize we have:
  * Flattened the schema
  * Encoded the values only
  * Encoded all scripts/regions of a language into a single resource bundle
  * Reduced duplicates by regions inheriting from a base region

The resulting bundle sizes:

|    size    |   object                                      |
|------------|-----------------------------------------------|
|     11 MB  | All resource bundles                          |
|    1.5 MB  |   .. with 'gzip --best'                            |
|    191 KB  | 'en' resource bundle (all scripts + regions)  |
|     33 KB  |   .. with 'gzip --best'                            |

