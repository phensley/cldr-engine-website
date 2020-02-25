---
id: version-0.25.22-api-schemaconfig
title: SchemaConfig
original_id: api-schemaconfig
---

Allows configuration of the runtime schema accessor.

See the [example application](https://github.com/phensley/cldr-engine-customization-example) for more details.

**Note: This is currently experimental. Until this note changes consider this to be an undocumented, unsupported feature as it may change significantly before 1.0 release.**

The schema configuration allows you to exclude some data which (a) has high dimensionality and (b) is not used by some applications.

The schema config has 2 purposes:
 1. Determine which fields are encoded into a resource pack.
 2. Provide the identifiers to the library at runtime to fetch the encoded fields.

An application might only need units for quantifying data (`kilobyte`, `terabit`), and omitting the rest of the units reduces the size of the resource pack as well as the code bundle containing the identifiers for all of the units.

An example of "high dimensionality" would be unit names. For each unit included in the schema we pull in several fields for each of the 3 possible unit widths (`narrow`, `short`, and `long`):
 * `displayName`
 * Pluralized `unitPattern`
 * Optional `perUnitPattern`

So for the unit `square-kilometer` we end up encoding 12 fields totaling 138 bytes. There are currently 157 different units, so the space saving can be useful for certain applications.

Of course if your project provides the CLDR transitively to other applications, it may make sense to just use the full default configuration. An example is a template language whose end users may have their own requirements and each make use of very different aspects of the CLDR functionality.


#### Syntax

```typescript
export interface SchemaConfig {
  /**
   * Calendar types to include. Note that 'gregory' for the
   * gregorian calendar will be included by default, even if
   * omitted from this list.
   *
   * Ex: ['buddhist', 'japanese', 'persian']
   */
  calendars?: string[];

  /**
   * Control which skeleton date time formats are available at runtime.
   */
  ['gregorian-available-format']?: string[];
  ['gregorian-plural-format']?: string[];
  ['gregorian-interval-format']?: string[];

  ['buddhist-available-format']?: string[];
  ['buddhist-plural-format']?: string[];
  ['buddhist-interval-format']?: string[];

  ['japanese-available-format']?: string[];
  ['japanese-plural-format']?: string[];
  ['japanese-interval-format']?: string[];

  ['persian-available-format']?: string[];
  ['persian-plural-format']?: string[];
  ['persian-interval-format']?: string[];

  /**
   * Currency codes to include.
   *
   * Ex: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', ... ]
   */
  ['currency-id']?: string[];

  /**
   * Language identifiers to include. This only controls
   * inclusion of language display name data.
   */
  ['language-id']?: string[];

  /**
   * Script identifiers to include. This only controls
   * inclusion of script display name data.
   */
  ['script-id']?: string[];

  /**
   * Region identifiers to include. This only controls
   * inclusion of region display name data.
   */
  ['region-id']?: string[];

  /**
   * Units to include.
   *
   * Ex: ['meter', 'kilogram', 'foot']
   */
  ['unit-id']?: string[];

  /**
   * CLDR stable timezone identifiers to include. This only
   * controls inclusion of exemplar city data. All timezone
   * ids and offset data will work even if this array is
   * empty.
   *
   * Ex: ['America/New_York', 'America/Adak', ... ]
   */
  ['timezone-id']?: string[];

  /**
   * Number system names to include. Note that 'latn' will be
   * included by default, even if omitted from this list.
   *
   * Ex: ['arab', 'laoo']
   */
  ['number-system-name']?: string[];
}
```

{%refs SchemaConfig}
