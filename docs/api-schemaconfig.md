---
id: api-schemaconfig
title: SchemaConfig
---

Allows configuration of the runtime schema accessor.


See the [example application](https://github.com/phensley/cldr-engine-customization-example) for more details.

**Note: This is currently experimental. Until this note changes consider this to be an undocumented, unsupported feature as it may change significantly before 1.0 release.**

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