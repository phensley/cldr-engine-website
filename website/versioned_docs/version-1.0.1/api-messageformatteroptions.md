---
id: version-1.0.1-api-messageformatteroptions
title: MessageFormatterOptions
original_id: api-messageformatteroptions
---

Configures a [MessageFormatter](api-messageformatter) instance. See [MessageformatFuncMap](api-messageformatfuncmap).

### Syntax

<pre class="syntax">
{
  language?: string,
  region?: string,
  plurals?: PluralRules,
  formatters?: MessageFormatFuncMap,
  cacheSize?: number
}
</pre>

### Properties
  - <code class="def">plurals: <span>[PluralRules](api-pluralrules)</span></code>
    - A plural rules instance. This lets you explicitly provide the plural rules you want the formatter to use. If omitted, the plural rules will be resolved using the language and region options.
  - <code class="def">language: <span>string</span></code>
    - An ISO 639 language identifier. Will be used to resolve the plural rules.
  - <code class="def">region: <span>string</span></code>
    - An ISO 3166-1 or UN M.49 region code. Will be used to resolve the plural rules.
  - <code class="def">formatters: <span>[MessageFormatFuncMap](api-messageformatfuncmap)</span></code>
    - Custom formatter functions
  - <code class="def">cacheSize: <span>number</span></code>
    - Indicates the number of parsed messages to keep in the least-recently-used cache

### Defaults

```javascript
{
  language: 'root',
  cacheSize: 100
}
```

{%refs MessageFormatterOptions}
