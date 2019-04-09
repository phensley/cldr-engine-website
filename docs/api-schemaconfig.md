---
id: api-schemaconfig
title: SchemaConfig
---

Allows configuration of the runtime schema accessor.

See the [example application](https://github.com/phensley/cldr-engine-customization-example) for more details. (This is currently experimental, docs to come later).

#### Syntax

```typescript
export interface SchemaConfig {
  /**
   * Additional calendar types to include besides "gregorian".
   *
   * Ex: ['buddhist', 'japanese', 'persian']
   */
  calendars?: string[];

  /**
   * Currency codes to include.
   *
   * Ex: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', ... ]
   */
  ['currency-id']?: string[];

  /**
   * Language identifiers to include. Used to pull in display name data.
   *
   * Ex: ['en', 'fr', 'es']
   */
  ['language-id']?: string[];

  /**
   * Script identifiers to include. Used to pull in display name data.
   *
   * Ex: ['Latn', 'Cyrl']
   */
  ['script-id']?: string[];

  /**
   * Region identifiers to include. Used to pull in display name data.
   *
   * Ex: ['001', 'US', '419', 'AR', 'GB']
   */
  ['region-id']?: string[];

  /**
   * Units to include.
   *
   * Ex: ['meter', 'kilogram', 'foot']
   */
  ['unit-id']?: string[];

  /**
   * Number system names to include besides 'latn'.
   *
   * Ex: ['arab', 'arabext', 'laoo']
   */
  ['number-system-name']: string[];
}
```