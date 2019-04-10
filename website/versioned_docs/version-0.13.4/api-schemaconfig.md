---
id: version-0.13.4-api-schemaconfig
title: SchemaConfig
original_id: api-schemaconfig
---

Allows configuration of the runtime schema accessor.


See the [example application](https://github.com/phensley/cldr-engine-customization-example) for more details.

**Note: This is currently experimental, docs to come later.**

#### Syntax

```typescript
export interface SchemaConfig {
  /**
   * Calendar types to include.
   *
   * Ex: ['gregorian', 'buddhist', 'japanese', 'persian']
   */
  calendars?: string[];

  /**
   * Currency codes to include.
   *
   * Ex: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', ... ]
   */
  ['currency-id']?: string[];

  /**
   * Language identifiers to include.
   */
  ['language-id']?: string[];

  /**
   * Script identifiers to include.
   */
  ['script-id']?: string[];

  /**
   * Region identifiers to include.
   */
  ['region-id']?: string[];

  /**
   * Units to include.
   *
   * Ex: ['meter', 'kilogram', 'foot']
   */
  ['unit-id']?: string[];

  /**
   * CLDR stable timezone identifiers to include.
   *
   * Ex: ['America/New_York', 'America/Adak', ... ]
   */
  ['timezone-id']?: string[];

  /**
   * Number system names to include.
   *
   * Ex: ['latn', 'arab', 'laoo']
   */
  ['number-system-name']: string[];
}
```