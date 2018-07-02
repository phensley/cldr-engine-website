---
id: doc-design-bundles
title: Resource bundles
---

This document goes into detail on the rationale for the design of the [resource bundle file format](https://unpkg.com/@phensley/cldr@0.6.3/packs/) and how field values are encoded and later retrieved at runtime.

Resource bundles / packs contain the locale-specific strings that will be used by the framework for various purposes. These include calendar and number formatting patterns, names of the months and weekdays, names of units of measure, and so on.

When an application changes locale in response to a user action, the bundle for that locale needs to be loaded as quickly as possible. The resource bundles should be as small as possible, so they can be transferred over the network quickly, and once instantiated use as little of JavaScript heap as possible.

The first section discusses some limitations around using the CLDR JSON data directly. The second section discusses the approach used to design this library's resource bundle encoding, and the ways it is accessed internally.


## CLDR JSON data

Below we discuss some of the limitations of using the [JSON encoding of the CLDR data](https://github.com/unicode-cldr) directly at runtime.

### Data size

The CLDR JSON data set is quite large. The design goals for this library require that we have a lot of CLDR data available at runtime, so the size of the data is a major concern.

CLDR data is split across several files. For example, "ca-gregorian.json" contains fields relating to the Gregorian calendar. The size of the data set depends on which files your library requires. At the time of this writing, this library uses data contained in the following 16 JSON files across all 360 modern locales (where present):

```typescript
[
  'ca-buddhist', 'ca-gregorian', 'ca-japanese', 'ca-persian', 'characters',
  'contextTransforms', 'currencies', 'dateFields', 'languages', 'layout',
  'listPatterns', 'numbers', 'scripts', 'territories', 'timeZoneNames',
  'units'
]
```

### Schema overhead

The JSON encoding stores values in a hierarchical schema. Finding a value requires traversing a path in the tree until we reach a leaf node that holds the value.

The intermediate nodes in the tree add considerable overhead to the JSON encoding. For example, if you want to find the "full date format for the Gregorian calendar" in the "en-001/ca-gregorian.json" file, you would traverse the following path:

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
```

Admittedly some of this schema is reused across multiple fields, but it would be nice if we could eliminate it.

#### Storing the full schema vs values only

Below are the sizes for the JSON representation of these 16 files across all 360 locales.

| size (MB)  |   object                                      |
|------------|-----------------------------------------------|
|    139     | All locales, full schema                      |
|     16     | All locales, full schema, gzip                |
|     34     | All locales, values only                      |
|      7     | All locales, values only, gzip                |

Storing just the values reduces the size to 1/4 of the original. Even if we can eliminate the schema, 34 MB is still large.

This raises the question of how to eliminate the schema but still make the field data easily accessible.

### Accessing field values can be brittle

If we were to use the JSON representation directly, the interface for retrieving a field would need to accept a path as an argument.  There are a few possible ways this interface could look:

**Path as template string**

```typescript
const bundle = get('en-001');
const width = 'full';
const value = bundle.get(`main/${locale}/dates/calendars/gregorian/dateFormats/${width}`);
```

**Path as array**

This is more efficient since it doesn't have to reconstruct the array by splitting the string, or implement some iterative traversal of the path.

```typescript
const path = ['main', locale, 'dates', 'calendars', 'gregorian', 'dateFormats', width];
const value = bundle.get(path);
```

**Direct access**
```typescript
const value = bundle.main[locale].dates.calendars.gregorian.dateFormats[width];
```

In all these variants, with path segments composed using strings or object properties, there is a chance of making mistakes. A developer would always need to get the naming correct, e.g. `"dateFormats"` not `"dateformats"`, and any mistakes would need to be caught at runtime with a unit test.

This reliance on high test coverage to catch path/property name errors isn't so bad, and a lot of JavaScript libraries are developed this way; however, since the CLDR schema is large and complex it would be much nicer if we had a typesafe interface to access the fields.

Our goal should be something that looks like the direct access, but done in a typesafe way, and ideally where the schema is a singleton object we can reuse across all bundles:

**Typesafe, autocompletable**
```typescript
const bundle = get('en-001');
const value = schema.calendars.gregorian.dateFormats.get(bundle, width);
```

### Questions so far:

 1. How do we eliminate the schema while still being able to access the field values?
 2. Can we reduce a resource bundle's size further, beyond just eliminating the schema?
 3. Can we define a bundle encoding that is simultaneously small, simple and fast?
 4. Can we define a way of accessing fields in the schema that is typesafe and static?

## Designing the resource bundle

The design of the **phensley/cldr** bundle format involves several choices, described below.

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

For example, given the array `['short', 'medium', 'long', 'full']`, each time we iterate over it we always visit the elements in the same order. **We extend this concept to the entire schema, as if it were part of one large array**.

We express this using a DSL that can be written in Typescript. Here are a few of the types we need in our DSL:

  - <code class="def">keyindex(keys)</code>
    - Map an array element's offset to the element
  - <code class="def">scope(name, block)</code>
    - Creates a named scope that contains a nested array of nodes
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

### 3. Use the DSL program to both encode and access field values

Next we build 2 interpreters for the above DSL:

 - <code class="def">Encoder</code>
   - Executed at build time, it traverses the schema and encodes the fields into a resource bundle.
 - <code class="def">Accessor builder</code>
   - Executed once at runtime during library initialization, it builds an accessor object that can be used to fetch field values from a bundle.


#### Encoder

As we traverse the DSL and visit each field we increment an offset by 1. This offset is the position of that field's value in the final array.

Once the encoding is complete, we convert the array into a tab-separated string:

```typescript
..
// Gregorian {
//   dateFormats.{short, medium, long, full} => offsets 0, 1, 2, 3
['dd/MM/y', 'dd MMM y', 'd MMMM y', 'EEEE, d MMMM y',

//   timeFormats.{short, medium, long, full} => offsets 4, 5, 6, 7
'h:mm a', 'h:mm:ss a', 'h:mm:ss a z', 'h:mm:ss a zzzz'].join('\t')
```

#### Accessor builder

The accessor builder constructs an object that mirrors our schema's structure, and our `vector1` type generates a function for fetching a specific field value.

Here is how we might use the accessor object for our DSL to fetch the "medium time format" value.

The `timeFormats` object is a 1-dimensional vector arrow whose base offset is 4. It uses the key index `['short', 'medium', 'long', 'full']`. Since the argument `'medium'` is at index 1, the desired pattern will be found in the string table at offset 5:

```typescript
const pattern = schema.Gregorian.timeFormats.get(bundle, 'medium');
console.log(pattern);
```

<pre class="output">
h:mm:ss a
</pre>


### 4. Encode all locales for a given language in single bundle

We put all of the regions and scripts for a given language together. So for Spanish, we would bundle together 'es', 'es-419', 'es-AR', 'es-BO', etc.

This has a few advantages:
 * A language's regions tend to be quite similar, so we can exploit this to reduce the duplication.
 * In an application, a user might select their language and then separately select their country. Once the language is selected and that bundle loaded, no further network traffic is required when choosing a region.
 * It results in fewer bundles, and simplifies resolving the bundle for a locale, since we only need to map the 2- or 3-character language code to a filename without dealing with its script and region subtags.

### 5. Define a base region in the bundle, per script, from which all other regions inherit

Start by creating the full string array for all locales in a given language. We use letters of the alphabet as field values for clarity:

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
  'en-001': {     'en': 1,  'en-CA': 2 },  // dist 3, selected as the base region
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
        "001": "",        // en-001 == base region
         "US": "2:0",     // c -> Q
         "CA": "1:1 4:2"  // b -> R, e -> S
      }
    }
  }
}
```

#### Resulting size of the @phensley/cldr resource bundles

To summarize we have:
  * Flattened the schema
  * Encoded the values only
  * Encoded all scripts/regions of a language into a single resource bundle
  * Reduced duplicates by regions inheriting from a base region

The resulting bundle sizes:

|    size    |   object                                      |
|------------|-----------------------------------------------|
|     11 MB  | All resource bundles                          |
|    1.5 MB  |   .. with 'gzip --best'                       |
|    191 KB  | 'en' resource bundle (all scripts + regions)  |
|     33 KB  |   .. with 'gzip --best'                       |

The bundle format can likely be further improved, but it is simple and the size is sufficient for the current version.


### 6. Create a typesafe hierarchy that mirrors our schema

Since our DSL program encodes a locale's fields into a bundle, and is used to build an accessor object, we can construct a set of types that mirrors the structure accessor object, providing a nicer interface for accessing the fields at runtime.

Our DSL example:

```typescript
formatWidths = keyindex(['short','medium','long','full']);

scope('Gregorian', [
  vector1('dateFormats', formatWidths),
  vector1('timeFormats', formatWidths),
]);
```

Which is used to dynamically generate a singleton accessor object at library initialization time:

```typescript
const schema = {
  Gregorian: {
    dateFormats: new Vector1Arrow<FormatWidthType>(0, formatWidths),
    timeFormats: new Vector1Arrow<FormatWidthType>(4, formatWidths),
    ..
  },
  Numbers: {
    ..
  }
}
```

Then we define a set of types that mirror the DSL structure / accessor object:

```typescript
export type FormatWidthType = 'short' | 'medium' | 'long' | 'full';

export interface CalendarSchema {
  readonly dateFormats: Vector1Arrow<FormatWidthType>;
  readonly timeFormats: Vector1Arrow<FormatWidthType>;
}

export interface GregorianSchema extends CalendarSchema {}

export interface Schema {
  readonly Gregorian: GregorianSchema;
}
```

Now we can fetch fields from any bundle in a typesafe way:

```typescript
const value = schema.Gregorian.dateFormats.get(bundle, 'medium');
console.log(value);
```

<pre class="output">
d MMM y
</pre>

A typo will fail to compile ..

```typescript
schema.GregorianSchema.dateformat.get(bundle, 'medium');
// [ts] Property 'dateformat' does not exist on type 'CalendarSchema'. Did you mean 'dateFormats'?

schema.GregorianSchema.dateFormats.get(bundle, 'mediumfoo');
// ts] Argument of type '"mediumfoo"' is not assignable to parameter of type 'FormatWidthType'.
```

We can fetch all values for a field efficiently:

```typescript
const values = schema.Gregorian.dateFormats.mapping(bundle);
console.log(values);
```

<pre class="output">
{
  short: "dd/MM/y",
  medium: "d MMM y",
  long: "d MMMM y",
  full: "EEEE, d MMMM y"
}
</pre>

We can hold references to deep parts of the schema that will be repeatedly used:

```typescript
const { dateFormats } schema.Gregorian;
// ... used later
const value = dateFormats.get(bundle, width);
```

This gives us some wins:
 * Schema access is in code which is checked by the compiler.
 * Enables autocompletion for the entire schema, saving the developer from having to remember the names, arguments, and how the types fit together.
 * Reduces the chance of errors when accessing fields.
 * Separates concerns about the schema's design and correctness from its usage.
 * When we evolve the schema we can easily locate the places inside the library that need to be adapted.
 * We could add comment headers to all of the schema's types and generate documentation, assisting developers in better understanding their meaning and provide examples.
 * The singleton accessor object can be used across any locale / bundle, so we only have to initialize it once.
 * The field accessors are implemented in a general way and reused, e.g. `Vector1Arrow`, `Vector2Arrow`.
 * The field accessors allow us to retrieve multiple fields together as a structure, e.g. `dateFormats.mapping(bundle)`.
